import { Controller, Get, Query, Param } from '@nestjs/common';
import { CatalogService } from '../catalog.service';
import { ElasticsearchService } from './elasticsearch.service';
import { ConfigService } from '@nestjs/config';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@Controller('v1/catalog/search')
export class SearchController {
  constructor(
    private readonly elasticsearch: ElasticsearchService,
    private readonly config: ConfigService,
  ) {}

  @Get()
  async search(
    @CurrentUser('tenantId') tenantId: string,
    @Query('q') q: string,
    @Query('category') category?: string,
  ) {
    const indexPrefix = this.config.get<string>('app.elasticsearch.indexPrefix', 'products_');
    const index = `${indexPrefix}${tenantId.replace(/-/g, '_')}`;

    const query = {
      query: {
        bool: {
          must: [
            {
              multi_match: {
                query: q,
                fields: ['name^3', 'description', 'tags', 'variants.sku'],
                fuzziness: 'AUTO',
              },
            },
          ],
          filter: [
            ...(category ? [{ term: { categoryId: category } }] : []),
          ],
        },
      },
    };

    const result = await this.elasticsearch.search(index, query);
    return result.body.hits.hits.map((h: any) => h._source);
  }
}
