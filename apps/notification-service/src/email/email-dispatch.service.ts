import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import * as handlebars from 'handlebars';
import * as fs from 'fs';
import * as path from 'path';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationLogService } from '../notification-log/notification-log.service';

@Injectable()
export class EmailDispatchService {
  private readonly logger = new Logger(EmailDispatchService.name);
  private transporter: nodemailer.Transporter;

  constructor(
    private readonly config: ConfigService,
    private readonly prisma: PrismaService,
    private readonly logService: NotificationLogService,
  ) {
    this.transporter = nodemailer.createTransport({
      host: this.config.get<string>('app.smtp.host', 'mailhog'),
      port: parseInt(this.config.get<string>('app.smtp.port', '1025'), 10),
      secure: false, // true for 465, false for others
      auth: this.config.get('app.smtp.auth'),
    });
  }

  async send(params: {
    tenantId: string;
    recipientUserId?: string;
    recipientAddress: string;
    templateKey: string;
    eventType: string;
    variables: Record<string, string>;
  }): Promise<void> {
    const { tenantId, recipientAddress, templateKey, variables, eventType, recipientUserId } = params;

    // 1. Create initial log entry
    const log = await this.logService.create({
      tenantId,
      recipientUserId,
      recipientAddress,
      channel: 'email',
      eventType,
      status: 'queued',
    });

    try {
      // 2. Load template (either from DB or filesystem for dev simplicity)
      const templatePath = path.join(__dirname, '..', 'templates', 'email', `${templateKey}.hbs`);
      const source = fs.readFileSync(templatePath, 'utf8');
      const template = handlebars.compile(source);
      const html = template(variables);

      // 3. Send email via SMTP (MailHog in dev)
      const info = await this.transporter.sendMail({
        from: `"${this.config.get('app.email.fromName')}" <${this.config.get('app.email.fromAddress')}>`,
        to: recipientAddress,
        subject: this.getSubject(templateKey, variables),
        html,
      });

      // 4. Update log as sent
      await this.logService.update(log.id, {
        status: 'sent',
        provider: 'mailhog',
        providerMessageId: info.messageId,
        sentAt: new Date(),
      });

      this.logger.log(`Email sent to ${recipientAddress} via MailHog. Event: ${eventType}`);
    } catch (error: any) {
      this.logger.error(`Failed to send email to ${recipientAddress}`, error);
      await this.logService.update(log.id, {
        status: 'failed',
        errorMessage: error.message,
      });
      throw error;
    }
  }

  // Helper for userId dispatch (if we need to fetch email from User DB — Phase 1 logic skips for simplicity)
  async sendToUserId(params: any): Promise<void> {
    // In Phase 1, we expect the event payload to have the email address if possible.
    // Otherwise, we would need gRPC call to auth-service but we prefer event-driven payload containing the email.
    this.logger.warn('sendToUserId NOT IMPLEMENTED in Phase 1 — using direct send');
    await this.send(params);
  }

  private getSubject(templateKey: string, variables: any): string {
    const subjects = {
      email_verification: 'Verify your Ecom Platform email',
      welcome_user: `Welcome to Ecom Platform, ${variables.firstName}!`,
      account_locked: 'Urgent: Your account has been locked',
      password_reset_confirm: 'Security Alert: Your password has been changed',
      tenant_welcome: 'Store Ready: Set up your new commerce engine',
      tenant_suspended: 'Store Suspension Notice',
    };
    return subjects[templateKey as keyof typeof subjects] ?? 'Ecom Platform Notification';
  }
}
