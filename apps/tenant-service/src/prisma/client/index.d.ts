
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Tenant
 * 
 */
export type Tenant = $Result.DefaultSelection<Prisma.$TenantPayload>
/**
 * Model TenantPlan
 * 
 */
export type TenantPlan = $Result.DefaultSelection<Prisma.$TenantPlanPayload>
/**
 * Model TenantFeatureFlag
 * 
 */
export type TenantFeatureFlag = $Result.DefaultSelection<Prisma.$TenantFeatureFlagPayload>
/**
 * Model TenantUsageLog
 * 
 */
export type TenantUsageLog = $Result.DefaultSelection<Prisma.$TenantUsageLogPayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Tenants
 * const tenants = await prisma.tenant.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Tenants
   * const tenants = await prisma.tenant.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.tenant`: Exposes CRUD operations for the **Tenant** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tenants
    * const tenants = await prisma.tenant.findMany()
    * ```
    */
  get tenant(): Prisma.TenantDelegate<ExtArgs>;

  /**
   * `prisma.tenantPlan`: Exposes CRUD operations for the **TenantPlan** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TenantPlans
    * const tenantPlans = await prisma.tenantPlan.findMany()
    * ```
    */
  get tenantPlan(): Prisma.TenantPlanDelegate<ExtArgs>;

  /**
   * `prisma.tenantFeatureFlag`: Exposes CRUD operations for the **TenantFeatureFlag** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TenantFeatureFlags
    * const tenantFeatureFlags = await prisma.tenantFeatureFlag.findMany()
    * ```
    */
  get tenantFeatureFlag(): Prisma.TenantFeatureFlagDelegate<ExtArgs>;

  /**
   * `prisma.tenantUsageLog`: Exposes CRUD operations for the **TenantUsageLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TenantUsageLogs
    * const tenantUsageLogs = await prisma.tenantUsageLog.findMany()
    * ```
    */
  get tenantUsageLog(): Prisma.TenantUsageLogDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Tenant: 'Tenant',
    TenantPlan: 'TenantPlan',
    TenantFeatureFlag: 'TenantFeatureFlag',
    TenantUsageLog: 'TenantUsageLog'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "tenant" | "tenantPlan" | "tenantFeatureFlag" | "tenantUsageLog"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Tenant: {
        payload: Prisma.$TenantPayload<ExtArgs>
        fields: Prisma.TenantFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TenantFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TenantFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>
          }
          findFirst: {
            args: Prisma.TenantFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TenantFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>
          }
          findMany: {
            args: Prisma.TenantFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>[]
          }
          create: {
            args: Prisma.TenantCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>
          }
          createMany: {
            args: Prisma.TenantCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TenantCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>[]
          }
          delete: {
            args: Prisma.TenantDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>
          }
          update: {
            args: Prisma.TenantUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>
          }
          deleteMany: {
            args: Prisma.TenantDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TenantUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TenantUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>
          }
          aggregate: {
            args: Prisma.TenantAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTenant>
          }
          groupBy: {
            args: Prisma.TenantGroupByArgs<ExtArgs>
            result: $Utils.Optional<TenantGroupByOutputType>[]
          }
          count: {
            args: Prisma.TenantCountArgs<ExtArgs>
            result: $Utils.Optional<TenantCountAggregateOutputType> | number
          }
        }
      }
      TenantPlan: {
        payload: Prisma.$TenantPlanPayload<ExtArgs>
        fields: Prisma.TenantPlanFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TenantPlanFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPlanPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TenantPlanFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPlanPayload>
          }
          findFirst: {
            args: Prisma.TenantPlanFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPlanPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TenantPlanFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPlanPayload>
          }
          findMany: {
            args: Prisma.TenantPlanFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPlanPayload>[]
          }
          create: {
            args: Prisma.TenantPlanCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPlanPayload>
          }
          createMany: {
            args: Prisma.TenantPlanCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TenantPlanCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPlanPayload>[]
          }
          delete: {
            args: Prisma.TenantPlanDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPlanPayload>
          }
          update: {
            args: Prisma.TenantPlanUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPlanPayload>
          }
          deleteMany: {
            args: Prisma.TenantPlanDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TenantPlanUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TenantPlanUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPlanPayload>
          }
          aggregate: {
            args: Prisma.TenantPlanAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTenantPlan>
          }
          groupBy: {
            args: Prisma.TenantPlanGroupByArgs<ExtArgs>
            result: $Utils.Optional<TenantPlanGroupByOutputType>[]
          }
          count: {
            args: Prisma.TenantPlanCountArgs<ExtArgs>
            result: $Utils.Optional<TenantPlanCountAggregateOutputType> | number
          }
        }
      }
      TenantFeatureFlag: {
        payload: Prisma.$TenantFeatureFlagPayload<ExtArgs>
        fields: Prisma.TenantFeatureFlagFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TenantFeatureFlagFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantFeatureFlagPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TenantFeatureFlagFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantFeatureFlagPayload>
          }
          findFirst: {
            args: Prisma.TenantFeatureFlagFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantFeatureFlagPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TenantFeatureFlagFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantFeatureFlagPayload>
          }
          findMany: {
            args: Prisma.TenantFeatureFlagFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantFeatureFlagPayload>[]
          }
          create: {
            args: Prisma.TenantFeatureFlagCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantFeatureFlagPayload>
          }
          createMany: {
            args: Prisma.TenantFeatureFlagCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TenantFeatureFlagCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantFeatureFlagPayload>[]
          }
          delete: {
            args: Prisma.TenantFeatureFlagDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantFeatureFlagPayload>
          }
          update: {
            args: Prisma.TenantFeatureFlagUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantFeatureFlagPayload>
          }
          deleteMany: {
            args: Prisma.TenantFeatureFlagDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TenantFeatureFlagUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TenantFeatureFlagUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantFeatureFlagPayload>
          }
          aggregate: {
            args: Prisma.TenantFeatureFlagAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTenantFeatureFlag>
          }
          groupBy: {
            args: Prisma.TenantFeatureFlagGroupByArgs<ExtArgs>
            result: $Utils.Optional<TenantFeatureFlagGroupByOutputType>[]
          }
          count: {
            args: Prisma.TenantFeatureFlagCountArgs<ExtArgs>
            result: $Utils.Optional<TenantFeatureFlagCountAggregateOutputType> | number
          }
        }
      }
      TenantUsageLog: {
        payload: Prisma.$TenantUsageLogPayload<ExtArgs>
        fields: Prisma.TenantUsageLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TenantUsageLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantUsageLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TenantUsageLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantUsageLogPayload>
          }
          findFirst: {
            args: Prisma.TenantUsageLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantUsageLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TenantUsageLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantUsageLogPayload>
          }
          findMany: {
            args: Prisma.TenantUsageLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantUsageLogPayload>[]
          }
          create: {
            args: Prisma.TenantUsageLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantUsageLogPayload>
          }
          createMany: {
            args: Prisma.TenantUsageLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TenantUsageLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantUsageLogPayload>[]
          }
          delete: {
            args: Prisma.TenantUsageLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantUsageLogPayload>
          }
          update: {
            args: Prisma.TenantUsageLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantUsageLogPayload>
          }
          deleteMany: {
            args: Prisma.TenantUsageLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TenantUsageLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TenantUsageLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantUsageLogPayload>
          }
          aggregate: {
            args: Prisma.TenantUsageLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTenantUsageLog>
          }
          groupBy: {
            args: Prisma.TenantUsageLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<TenantUsageLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.TenantUsageLogCountArgs<ExtArgs>
            result: $Utils.Optional<TenantUsageLogCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type TenantCountOutputType
   */

  export type TenantCountOutputType = {
    featureFlags: number
  }

  export type TenantCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    featureFlags?: boolean | TenantCountOutputTypeCountFeatureFlagsArgs
  }

  // Custom InputTypes
  /**
   * TenantCountOutputType without action
   */
  export type TenantCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantCountOutputType
     */
    select?: TenantCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TenantCountOutputType without action
   */
  export type TenantCountOutputTypeCountFeatureFlagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TenantFeatureFlagWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Tenant
   */

  export type AggregateTenant = {
    _count: TenantCountAggregateOutputType | null
    _min: TenantMinAggregateOutputType | null
    _max: TenantMaxAggregateOutputType | null
  }

  export type TenantMinAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    plan: string | null
    status: string | null
    trialEndsAt: Date | null
    billingEmail: string | null
    billingName: string | null
    timezone: string | null
    locale: string | null
    currency: string | null
    customDomain: string | null
    logoUrl: string | null
    dbSchemaName: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TenantMaxAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    plan: string | null
    status: string | null
    trialEndsAt: Date | null
    billingEmail: string | null
    billingName: string | null
    timezone: string | null
    locale: string | null
    currency: string | null
    customDomain: string | null
    logoUrl: string | null
    dbSchemaName: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TenantCountAggregateOutputType = {
    id: number
    name: number
    slug: number
    plan: number
    status: number
    trialEndsAt: number
    billingEmail: number
    billingName: number
    billingAddress: number
    timezone: number
    locale: number
    currency: number
    customDomain: number
    logoUrl: number
    settings: number
    dbSchemaName: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TenantMinAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    plan?: true
    status?: true
    trialEndsAt?: true
    billingEmail?: true
    billingName?: true
    timezone?: true
    locale?: true
    currency?: true
    customDomain?: true
    logoUrl?: true
    dbSchemaName?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TenantMaxAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    plan?: true
    status?: true
    trialEndsAt?: true
    billingEmail?: true
    billingName?: true
    timezone?: true
    locale?: true
    currency?: true
    customDomain?: true
    logoUrl?: true
    dbSchemaName?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TenantCountAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    plan?: true
    status?: true
    trialEndsAt?: true
    billingEmail?: true
    billingName?: true
    billingAddress?: true
    timezone?: true
    locale?: true
    currency?: true
    customDomain?: true
    logoUrl?: true
    settings?: true
    dbSchemaName?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TenantAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tenant to aggregate.
     */
    where?: TenantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tenants to fetch.
     */
    orderBy?: TenantOrderByWithRelationInput | TenantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TenantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tenants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tenants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tenants
    **/
    _count?: true | TenantCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TenantMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TenantMaxAggregateInputType
  }

  export type GetTenantAggregateType<T extends TenantAggregateArgs> = {
        [P in keyof T & keyof AggregateTenant]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTenant[P]>
      : GetScalarType<T[P], AggregateTenant[P]>
  }




  export type TenantGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TenantWhereInput
    orderBy?: TenantOrderByWithAggregationInput | TenantOrderByWithAggregationInput[]
    by: TenantScalarFieldEnum[] | TenantScalarFieldEnum
    having?: TenantScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TenantCountAggregateInputType | true
    _min?: TenantMinAggregateInputType
    _max?: TenantMaxAggregateInputType
  }

  export type TenantGroupByOutputType = {
    id: string
    name: string
    slug: string
    plan: string
    status: string
    trialEndsAt: Date | null
    billingEmail: string
    billingName: string | null
    billingAddress: JsonValue | null
    timezone: string
    locale: string
    currency: string
    customDomain: string | null
    logoUrl: string | null
    settings: JsonValue
    dbSchemaName: string | null
    createdAt: Date
    updatedAt: Date
    _count: TenantCountAggregateOutputType | null
    _min: TenantMinAggregateOutputType | null
    _max: TenantMaxAggregateOutputType | null
  }

  type GetTenantGroupByPayload<T extends TenantGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TenantGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TenantGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TenantGroupByOutputType[P]>
            : GetScalarType<T[P], TenantGroupByOutputType[P]>
        }
      >
    >


  export type TenantSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    plan?: boolean
    status?: boolean
    trialEndsAt?: boolean
    billingEmail?: boolean
    billingName?: boolean
    billingAddress?: boolean
    timezone?: boolean
    locale?: boolean
    currency?: boolean
    customDomain?: boolean
    logoUrl?: boolean
    settings?: boolean
    dbSchemaName?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    featureFlags?: boolean | Tenant$featureFlagsArgs<ExtArgs>
    _count?: boolean | TenantCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tenant"]>

  export type TenantSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    plan?: boolean
    status?: boolean
    trialEndsAt?: boolean
    billingEmail?: boolean
    billingName?: boolean
    billingAddress?: boolean
    timezone?: boolean
    locale?: boolean
    currency?: boolean
    customDomain?: boolean
    logoUrl?: boolean
    settings?: boolean
    dbSchemaName?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["tenant"]>

  export type TenantSelectScalar = {
    id?: boolean
    name?: boolean
    slug?: boolean
    plan?: boolean
    status?: boolean
    trialEndsAt?: boolean
    billingEmail?: boolean
    billingName?: boolean
    billingAddress?: boolean
    timezone?: boolean
    locale?: boolean
    currency?: boolean
    customDomain?: boolean
    logoUrl?: boolean
    settings?: boolean
    dbSchemaName?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TenantInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    featureFlags?: boolean | Tenant$featureFlagsArgs<ExtArgs>
    _count?: boolean | TenantCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TenantIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $TenantPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Tenant"
    objects: {
      featureFlags: Prisma.$TenantFeatureFlagPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      slug: string
      plan: string
      status: string
      trialEndsAt: Date | null
      billingEmail: string
      billingName: string | null
      billingAddress: Prisma.JsonValue | null
      timezone: string
      locale: string
      currency: string
      customDomain: string | null
      logoUrl: string | null
      settings: Prisma.JsonValue
      dbSchemaName: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["tenant"]>
    composites: {}
  }

  type TenantGetPayload<S extends boolean | null | undefined | TenantDefaultArgs> = $Result.GetResult<Prisma.$TenantPayload, S>

  type TenantCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<TenantFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: TenantCountAggregateInputType | true
    }

  export interface TenantDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Tenant'], meta: { name: 'Tenant' } }
    /**
     * Find zero or one Tenant that matches the filter.
     * @param {TenantFindUniqueArgs} args - Arguments to find a Tenant
     * @example
     * // Get one Tenant
     * const tenant = await prisma.tenant.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TenantFindUniqueArgs>(args: SelectSubset<T, TenantFindUniqueArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Tenant that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {TenantFindUniqueOrThrowArgs} args - Arguments to find a Tenant
     * @example
     * // Get one Tenant
     * const tenant = await prisma.tenant.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TenantFindUniqueOrThrowArgs>(args: SelectSubset<T, TenantFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Tenant that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantFindFirstArgs} args - Arguments to find a Tenant
     * @example
     * // Get one Tenant
     * const tenant = await prisma.tenant.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TenantFindFirstArgs>(args?: SelectSubset<T, TenantFindFirstArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Tenant that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantFindFirstOrThrowArgs} args - Arguments to find a Tenant
     * @example
     * // Get one Tenant
     * const tenant = await prisma.tenant.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TenantFindFirstOrThrowArgs>(args?: SelectSubset<T, TenantFindFirstOrThrowArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Tenants that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tenants
     * const tenants = await prisma.tenant.findMany()
     * 
     * // Get first 10 Tenants
     * const tenants = await prisma.tenant.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tenantWithIdOnly = await prisma.tenant.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TenantFindManyArgs>(args?: SelectSubset<T, TenantFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Tenant.
     * @param {TenantCreateArgs} args - Arguments to create a Tenant.
     * @example
     * // Create one Tenant
     * const Tenant = await prisma.tenant.create({
     *   data: {
     *     // ... data to create a Tenant
     *   }
     * })
     * 
     */
    create<T extends TenantCreateArgs>(args: SelectSubset<T, TenantCreateArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Tenants.
     * @param {TenantCreateManyArgs} args - Arguments to create many Tenants.
     * @example
     * // Create many Tenants
     * const tenant = await prisma.tenant.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TenantCreateManyArgs>(args?: SelectSubset<T, TenantCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Tenants and returns the data saved in the database.
     * @param {TenantCreateManyAndReturnArgs} args - Arguments to create many Tenants.
     * @example
     * // Create many Tenants
     * const tenant = await prisma.tenant.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Tenants and only return the `id`
     * const tenantWithIdOnly = await prisma.tenant.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TenantCreateManyAndReturnArgs>(args?: SelectSubset<T, TenantCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Tenant.
     * @param {TenantDeleteArgs} args - Arguments to delete one Tenant.
     * @example
     * // Delete one Tenant
     * const Tenant = await prisma.tenant.delete({
     *   where: {
     *     // ... filter to delete one Tenant
     *   }
     * })
     * 
     */
    delete<T extends TenantDeleteArgs>(args: SelectSubset<T, TenantDeleteArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Tenant.
     * @param {TenantUpdateArgs} args - Arguments to update one Tenant.
     * @example
     * // Update one Tenant
     * const tenant = await prisma.tenant.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TenantUpdateArgs>(args: SelectSubset<T, TenantUpdateArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Tenants.
     * @param {TenantDeleteManyArgs} args - Arguments to filter Tenants to delete.
     * @example
     * // Delete a few Tenants
     * const { count } = await prisma.tenant.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TenantDeleteManyArgs>(args?: SelectSubset<T, TenantDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tenants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tenants
     * const tenant = await prisma.tenant.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TenantUpdateManyArgs>(args: SelectSubset<T, TenantUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Tenant.
     * @param {TenantUpsertArgs} args - Arguments to update or create a Tenant.
     * @example
     * // Update or create a Tenant
     * const tenant = await prisma.tenant.upsert({
     *   create: {
     *     // ... data to create a Tenant
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Tenant we want to update
     *   }
     * })
     */
    upsert<T extends TenantUpsertArgs>(args: SelectSubset<T, TenantUpsertArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Tenants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantCountArgs} args - Arguments to filter Tenants to count.
     * @example
     * // Count the number of Tenants
     * const count = await prisma.tenant.count({
     *   where: {
     *     // ... the filter for the Tenants we want to count
     *   }
     * })
    **/
    count<T extends TenantCountArgs>(
      args?: Subset<T, TenantCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TenantCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Tenant.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TenantAggregateArgs>(args: Subset<T, TenantAggregateArgs>): Prisma.PrismaPromise<GetTenantAggregateType<T>>

    /**
     * Group by Tenant.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TenantGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TenantGroupByArgs['orderBy'] }
        : { orderBy?: TenantGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TenantGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTenantGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Tenant model
   */
  readonly fields: TenantFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Tenant.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TenantClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    featureFlags<T extends Tenant$featureFlagsArgs<ExtArgs> = {}>(args?: Subset<T, Tenant$featureFlagsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TenantFeatureFlagPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Tenant model
   */ 
  interface TenantFieldRefs {
    readonly id: FieldRef<"Tenant", 'String'>
    readonly name: FieldRef<"Tenant", 'String'>
    readonly slug: FieldRef<"Tenant", 'String'>
    readonly plan: FieldRef<"Tenant", 'String'>
    readonly status: FieldRef<"Tenant", 'String'>
    readonly trialEndsAt: FieldRef<"Tenant", 'DateTime'>
    readonly billingEmail: FieldRef<"Tenant", 'String'>
    readonly billingName: FieldRef<"Tenant", 'String'>
    readonly billingAddress: FieldRef<"Tenant", 'Json'>
    readonly timezone: FieldRef<"Tenant", 'String'>
    readonly locale: FieldRef<"Tenant", 'String'>
    readonly currency: FieldRef<"Tenant", 'String'>
    readonly customDomain: FieldRef<"Tenant", 'String'>
    readonly logoUrl: FieldRef<"Tenant", 'String'>
    readonly settings: FieldRef<"Tenant", 'Json'>
    readonly dbSchemaName: FieldRef<"Tenant", 'String'>
    readonly createdAt: FieldRef<"Tenant", 'DateTime'>
    readonly updatedAt: FieldRef<"Tenant", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Tenant findUnique
   */
  export type TenantFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * Filter, which Tenant to fetch.
     */
    where: TenantWhereUniqueInput
  }

  /**
   * Tenant findUniqueOrThrow
   */
  export type TenantFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * Filter, which Tenant to fetch.
     */
    where: TenantWhereUniqueInput
  }

  /**
   * Tenant findFirst
   */
  export type TenantFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * Filter, which Tenant to fetch.
     */
    where?: TenantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tenants to fetch.
     */
    orderBy?: TenantOrderByWithRelationInput | TenantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tenants.
     */
    cursor?: TenantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tenants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tenants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tenants.
     */
    distinct?: TenantScalarFieldEnum | TenantScalarFieldEnum[]
  }

  /**
   * Tenant findFirstOrThrow
   */
  export type TenantFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * Filter, which Tenant to fetch.
     */
    where?: TenantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tenants to fetch.
     */
    orderBy?: TenantOrderByWithRelationInput | TenantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tenants.
     */
    cursor?: TenantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tenants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tenants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tenants.
     */
    distinct?: TenantScalarFieldEnum | TenantScalarFieldEnum[]
  }

  /**
   * Tenant findMany
   */
  export type TenantFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * Filter, which Tenants to fetch.
     */
    where?: TenantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tenants to fetch.
     */
    orderBy?: TenantOrderByWithRelationInput | TenantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tenants.
     */
    cursor?: TenantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tenants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tenants.
     */
    skip?: number
    distinct?: TenantScalarFieldEnum | TenantScalarFieldEnum[]
  }

  /**
   * Tenant create
   */
  export type TenantCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * The data needed to create a Tenant.
     */
    data: XOR<TenantCreateInput, TenantUncheckedCreateInput>
  }

  /**
   * Tenant createMany
   */
  export type TenantCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tenants.
     */
    data: TenantCreateManyInput | TenantCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Tenant createManyAndReturn
   */
  export type TenantCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Tenants.
     */
    data: TenantCreateManyInput | TenantCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Tenant update
   */
  export type TenantUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * The data needed to update a Tenant.
     */
    data: XOR<TenantUpdateInput, TenantUncheckedUpdateInput>
    /**
     * Choose, which Tenant to update.
     */
    where: TenantWhereUniqueInput
  }

  /**
   * Tenant updateMany
   */
  export type TenantUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Tenants.
     */
    data: XOR<TenantUpdateManyMutationInput, TenantUncheckedUpdateManyInput>
    /**
     * Filter which Tenants to update
     */
    where?: TenantWhereInput
  }

  /**
   * Tenant upsert
   */
  export type TenantUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * The filter to search for the Tenant to update in case it exists.
     */
    where: TenantWhereUniqueInput
    /**
     * In case the Tenant found by the `where` argument doesn't exist, create a new Tenant with this data.
     */
    create: XOR<TenantCreateInput, TenantUncheckedCreateInput>
    /**
     * In case the Tenant was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TenantUpdateInput, TenantUncheckedUpdateInput>
  }

  /**
   * Tenant delete
   */
  export type TenantDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * Filter which Tenant to delete.
     */
    where: TenantWhereUniqueInput
  }

  /**
   * Tenant deleteMany
   */
  export type TenantDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tenants to delete
     */
    where?: TenantWhereInput
  }

  /**
   * Tenant.featureFlags
   */
  export type Tenant$featureFlagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantFeatureFlag
     */
    select?: TenantFeatureFlagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantFeatureFlagInclude<ExtArgs> | null
    where?: TenantFeatureFlagWhereInput
    orderBy?: TenantFeatureFlagOrderByWithRelationInput | TenantFeatureFlagOrderByWithRelationInput[]
    cursor?: TenantFeatureFlagWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TenantFeatureFlagScalarFieldEnum | TenantFeatureFlagScalarFieldEnum[]
  }

  /**
   * Tenant without action
   */
  export type TenantDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
  }


  /**
   * Model TenantPlan
   */

  export type AggregateTenantPlan = {
    _count: TenantPlanCountAggregateOutputType | null
    _avg: TenantPlanAvgAggregateOutputType | null
    _sum: TenantPlanSumAggregateOutputType | null
    _min: TenantPlanMinAggregateOutputType | null
    _max: TenantPlanMaxAggregateOutputType | null
  }

  export type TenantPlanAvgAggregateOutputType = {
    priceMonthly: number | null
    priceAnnual: number | null
    maxProducts: number | null
    maxOrdersPerMonth: number | null
    maxStaffUsers: number | null
    maxWarehouses: number | null
  }

  export type TenantPlanSumAggregateOutputType = {
    priceMonthly: number | null
    priceAnnual: number | null
    maxProducts: number | null
    maxOrdersPerMonth: number | null
    maxStaffUsers: number | null
    maxWarehouses: number | null
  }

  export type TenantPlanMinAggregateOutputType = {
    id: string | null
    name: string | null
    priceMonthly: number | null
    priceAnnual: number | null
    maxProducts: number | null
    maxOrdersPerMonth: number | null
    maxStaffUsers: number | null
    maxWarehouses: number | null
    isActive: boolean | null
  }

  export type TenantPlanMaxAggregateOutputType = {
    id: string | null
    name: string | null
    priceMonthly: number | null
    priceAnnual: number | null
    maxProducts: number | null
    maxOrdersPerMonth: number | null
    maxStaffUsers: number | null
    maxWarehouses: number | null
    isActive: boolean | null
  }

  export type TenantPlanCountAggregateOutputType = {
    id: number
    name: number
    priceMonthly: number
    priceAnnual: number
    maxProducts: number
    maxOrdersPerMonth: number
    maxStaffUsers: number
    maxWarehouses: number
    features: number
    isActive: number
    _all: number
  }


  export type TenantPlanAvgAggregateInputType = {
    priceMonthly?: true
    priceAnnual?: true
    maxProducts?: true
    maxOrdersPerMonth?: true
    maxStaffUsers?: true
    maxWarehouses?: true
  }

  export type TenantPlanSumAggregateInputType = {
    priceMonthly?: true
    priceAnnual?: true
    maxProducts?: true
    maxOrdersPerMonth?: true
    maxStaffUsers?: true
    maxWarehouses?: true
  }

  export type TenantPlanMinAggregateInputType = {
    id?: true
    name?: true
    priceMonthly?: true
    priceAnnual?: true
    maxProducts?: true
    maxOrdersPerMonth?: true
    maxStaffUsers?: true
    maxWarehouses?: true
    isActive?: true
  }

  export type TenantPlanMaxAggregateInputType = {
    id?: true
    name?: true
    priceMonthly?: true
    priceAnnual?: true
    maxProducts?: true
    maxOrdersPerMonth?: true
    maxStaffUsers?: true
    maxWarehouses?: true
    isActive?: true
  }

  export type TenantPlanCountAggregateInputType = {
    id?: true
    name?: true
    priceMonthly?: true
    priceAnnual?: true
    maxProducts?: true
    maxOrdersPerMonth?: true
    maxStaffUsers?: true
    maxWarehouses?: true
    features?: true
    isActive?: true
    _all?: true
  }

  export type TenantPlanAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TenantPlan to aggregate.
     */
    where?: TenantPlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TenantPlans to fetch.
     */
    orderBy?: TenantPlanOrderByWithRelationInput | TenantPlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TenantPlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TenantPlans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TenantPlans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TenantPlans
    **/
    _count?: true | TenantPlanCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TenantPlanAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TenantPlanSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TenantPlanMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TenantPlanMaxAggregateInputType
  }

  export type GetTenantPlanAggregateType<T extends TenantPlanAggregateArgs> = {
        [P in keyof T & keyof AggregateTenantPlan]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTenantPlan[P]>
      : GetScalarType<T[P], AggregateTenantPlan[P]>
  }




  export type TenantPlanGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TenantPlanWhereInput
    orderBy?: TenantPlanOrderByWithAggregationInput | TenantPlanOrderByWithAggregationInput[]
    by: TenantPlanScalarFieldEnum[] | TenantPlanScalarFieldEnum
    having?: TenantPlanScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TenantPlanCountAggregateInputType | true
    _avg?: TenantPlanAvgAggregateInputType
    _sum?: TenantPlanSumAggregateInputType
    _min?: TenantPlanMinAggregateInputType
    _max?: TenantPlanMaxAggregateInputType
  }

  export type TenantPlanGroupByOutputType = {
    id: string
    name: string
    priceMonthly: number
    priceAnnual: number
    maxProducts: number
    maxOrdersPerMonth: number
    maxStaffUsers: number
    maxWarehouses: number
    features: JsonValue
    isActive: boolean
    _count: TenantPlanCountAggregateOutputType | null
    _avg: TenantPlanAvgAggregateOutputType | null
    _sum: TenantPlanSumAggregateOutputType | null
    _min: TenantPlanMinAggregateOutputType | null
    _max: TenantPlanMaxAggregateOutputType | null
  }

  type GetTenantPlanGroupByPayload<T extends TenantPlanGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TenantPlanGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TenantPlanGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TenantPlanGroupByOutputType[P]>
            : GetScalarType<T[P], TenantPlanGroupByOutputType[P]>
        }
      >
    >


  export type TenantPlanSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    priceMonthly?: boolean
    priceAnnual?: boolean
    maxProducts?: boolean
    maxOrdersPerMonth?: boolean
    maxStaffUsers?: boolean
    maxWarehouses?: boolean
    features?: boolean
    isActive?: boolean
  }, ExtArgs["result"]["tenantPlan"]>

  export type TenantPlanSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    priceMonthly?: boolean
    priceAnnual?: boolean
    maxProducts?: boolean
    maxOrdersPerMonth?: boolean
    maxStaffUsers?: boolean
    maxWarehouses?: boolean
    features?: boolean
    isActive?: boolean
  }, ExtArgs["result"]["tenantPlan"]>

  export type TenantPlanSelectScalar = {
    id?: boolean
    name?: boolean
    priceMonthly?: boolean
    priceAnnual?: boolean
    maxProducts?: boolean
    maxOrdersPerMonth?: boolean
    maxStaffUsers?: boolean
    maxWarehouses?: boolean
    features?: boolean
    isActive?: boolean
  }


  export type $TenantPlanPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TenantPlan"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      priceMonthly: number
      priceAnnual: number
      maxProducts: number
      maxOrdersPerMonth: number
      maxStaffUsers: number
      maxWarehouses: number
      features: Prisma.JsonValue
      isActive: boolean
    }, ExtArgs["result"]["tenantPlan"]>
    composites: {}
  }

  type TenantPlanGetPayload<S extends boolean | null | undefined | TenantPlanDefaultArgs> = $Result.GetResult<Prisma.$TenantPlanPayload, S>

  type TenantPlanCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<TenantPlanFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: TenantPlanCountAggregateInputType | true
    }

  export interface TenantPlanDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TenantPlan'], meta: { name: 'TenantPlan' } }
    /**
     * Find zero or one TenantPlan that matches the filter.
     * @param {TenantPlanFindUniqueArgs} args - Arguments to find a TenantPlan
     * @example
     * // Get one TenantPlan
     * const tenantPlan = await prisma.tenantPlan.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TenantPlanFindUniqueArgs>(args: SelectSubset<T, TenantPlanFindUniqueArgs<ExtArgs>>): Prisma__TenantPlanClient<$Result.GetResult<Prisma.$TenantPlanPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one TenantPlan that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {TenantPlanFindUniqueOrThrowArgs} args - Arguments to find a TenantPlan
     * @example
     * // Get one TenantPlan
     * const tenantPlan = await prisma.tenantPlan.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TenantPlanFindUniqueOrThrowArgs>(args: SelectSubset<T, TenantPlanFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TenantPlanClient<$Result.GetResult<Prisma.$TenantPlanPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first TenantPlan that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantPlanFindFirstArgs} args - Arguments to find a TenantPlan
     * @example
     * // Get one TenantPlan
     * const tenantPlan = await prisma.tenantPlan.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TenantPlanFindFirstArgs>(args?: SelectSubset<T, TenantPlanFindFirstArgs<ExtArgs>>): Prisma__TenantPlanClient<$Result.GetResult<Prisma.$TenantPlanPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first TenantPlan that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantPlanFindFirstOrThrowArgs} args - Arguments to find a TenantPlan
     * @example
     * // Get one TenantPlan
     * const tenantPlan = await prisma.tenantPlan.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TenantPlanFindFirstOrThrowArgs>(args?: SelectSubset<T, TenantPlanFindFirstOrThrowArgs<ExtArgs>>): Prisma__TenantPlanClient<$Result.GetResult<Prisma.$TenantPlanPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more TenantPlans that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantPlanFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TenantPlans
     * const tenantPlans = await prisma.tenantPlan.findMany()
     * 
     * // Get first 10 TenantPlans
     * const tenantPlans = await prisma.tenantPlan.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tenantPlanWithIdOnly = await prisma.tenantPlan.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TenantPlanFindManyArgs>(args?: SelectSubset<T, TenantPlanFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TenantPlanPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a TenantPlan.
     * @param {TenantPlanCreateArgs} args - Arguments to create a TenantPlan.
     * @example
     * // Create one TenantPlan
     * const TenantPlan = await prisma.tenantPlan.create({
     *   data: {
     *     // ... data to create a TenantPlan
     *   }
     * })
     * 
     */
    create<T extends TenantPlanCreateArgs>(args: SelectSubset<T, TenantPlanCreateArgs<ExtArgs>>): Prisma__TenantPlanClient<$Result.GetResult<Prisma.$TenantPlanPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many TenantPlans.
     * @param {TenantPlanCreateManyArgs} args - Arguments to create many TenantPlans.
     * @example
     * // Create many TenantPlans
     * const tenantPlan = await prisma.tenantPlan.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TenantPlanCreateManyArgs>(args?: SelectSubset<T, TenantPlanCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TenantPlans and returns the data saved in the database.
     * @param {TenantPlanCreateManyAndReturnArgs} args - Arguments to create many TenantPlans.
     * @example
     * // Create many TenantPlans
     * const tenantPlan = await prisma.tenantPlan.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TenantPlans and only return the `id`
     * const tenantPlanWithIdOnly = await prisma.tenantPlan.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TenantPlanCreateManyAndReturnArgs>(args?: SelectSubset<T, TenantPlanCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TenantPlanPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a TenantPlan.
     * @param {TenantPlanDeleteArgs} args - Arguments to delete one TenantPlan.
     * @example
     * // Delete one TenantPlan
     * const TenantPlan = await prisma.tenantPlan.delete({
     *   where: {
     *     // ... filter to delete one TenantPlan
     *   }
     * })
     * 
     */
    delete<T extends TenantPlanDeleteArgs>(args: SelectSubset<T, TenantPlanDeleteArgs<ExtArgs>>): Prisma__TenantPlanClient<$Result.GetResult<Prisma.$TenantPlanPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one TenantPlan.
     * @param {TenantPlanUpdateArgs} args - Arguments to update one TenantPlan.
     * @example
     * // Update one TenantPlan
     * const tenantPlan = await prisma.tenantPlan.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TenantPlanUpdateArgs>(args: SelectSubset<T, TenantPlanUpdateArgs<ExtArgs>>): Prisma__TenantPlanClient<$Result.GetResult<Prisma.$TenantPlanPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more TenantPlans.
     * @param {TenantPlanDeleteManyArgs} args - Arguments to filter TenantPlans to delete.
     * @example
     * // Delete a few TenantPlans
     * const { count } = await prisma.tenantPlan.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TenantPlanDeleteManyArgs>(args?: SelectSubset<T, TenantPlanDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TenantPlans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantPlanUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TenantPlans
     * const tenantPlan = await prisma.tenantPlan.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TenantPlanUpdateManyArgs>(args: SelectSubset<T, TenantPlanUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one TenantPlan.
     * @param {TenantPlanUpsertArgs} args - Arguments to update or create a TenantPlan.
     * @example
     * // Update or create a TenantPlan
     * const tenantPlan = await prisma.tenantPlan.upsert({
     *   create: {
     *     // ... data to create a TenantPlan
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TenantPlan we want to update
     *   }
     * })
     */
    upsert<T extends TenantPlanUpsertArgs>(args: SelectSubset<T, TenantPlanUpsertArgs<ExtArgs>>): Prisma__TenantPlanClient<$Result.GetResult<Prisma.$TenantPlanPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of TenantPlans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantPlanCountArgs} args - Arguments to filter TenantPlans to count.
     * @example
     * // Count the number of TenantPlans
     * const count = await prisma.tenantPlan.count({
     *   where: {
     *     // ... the filter for the TenantPlans we want to count
     *   }
     * })
    **/
    count<T extends TenantPlanCountArgs>(
      args?: Subset<T, TenantPlanCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TenantPlanCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TenantPlan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantPlanAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TenantPlanAggregateArgs>(args: Subset<T, TenantPlanAggregateArgs>): Prisma.PrismaPromise<GetTenantPlanAggregateType<T>>

    /**
     * Group by TenantPlan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantPlanGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TenantPlanGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TenantPlanGroupByArgs['orderBy'] }
        : { orderBy?: TenantPlanGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TenantPlanGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTenantPlanGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TenantPlan model
   */
  readonly fields: TenantPlanFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TenantPlan.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TenantPlanClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TenantPlan model
   */ 
  interface TenantPlanFieldRefs {
    readonly id: FieldRef<"TenantPlan", 'String'>
    readonly name: FieldRef<"TenantPlan", 'String'>
    readonly priceMonthly: FieldRef<"TenantPlan", 'Int'>
    readonly priceAnnual: FieldRef<"TenantPlan", 'Int'>
    readonly maxProducts: FieldRef<"TenantPlan", 'Int'>
    readonly maxOrdersPerMonth: FieldRef<"TenantPlan", 'Int'>
    readonly maxStaffUsers: FieldRef<"TenantPlan", 'Int'>
    readonly maxWarehouses: FieldRef<"TenantPlan", 'Int'>
    readonly features: FieldRef<"TenantPlan", 'Json'>
    readonly isActive: FieldRef<"TenantPlan", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * TenantPlan findUnique
   */
  export type TenantPlanFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantPlan
     */
    select?: TenantPlanSelect<ExtArgs> | null
    /**
     * Filter, which TenantPlan to fetch.
     */
    where: TenantPlanWhereUniqueInput
  }

  /**
   * TenantPlan findUniqueOrThrow
   */
  export type TenantPlanFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantPlan
     */
    select?: TenantPlanSelect<ExtArgs> | null
    /**
     * Filter, which TenantPlan to fetch.
     */
    where: TenantPlanWhereUniqueInput
  }

  /**
   * TenantPlan findFirst
   */
  export type TenantPlanFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantPlan
     */
    select?: TenantPlanSelect<ExtArgs> | null
    /**
     * Filter, which TenantPlan to fetch.
     */
    where?: TenantPlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TenantPlans to fetch.
     */
    orderBy?: TenantPlanOrderByWithRelationInput | TenantPlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TenantPlans.
     */
    cursor?: TenantPlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TenantPlans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TenantPlans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TenantPlans.
     */
    distinct?: TenantPlanScalarFieldEnum | TenantPlanScalarFieldEnum[]
  }

  /**
   * TenantPlan findFirstOrThrow
   */
  export type TenantPlanFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantPlan
     */
    select?: TenantPlanSelect<ExtArgs> | null
    /**
     * Filter, which TenantPlan to fetch.
     */
    where?: TenantPlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TenantPlans to fetch.
     */
    orderBy?: TenantPlanOrderByWithRelationInput | TenantPlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TenantPlans.
     */
    cursor?: TenantPlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TenantPlans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TenantPlans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TenantPlans.
     */
    distinct?: TenantPlanScalarFieldEnum | TenantPlanScalarFieldEnum[]
  }

  /**
   * TenantPlan findMany
   */
  export type TenantPlanFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantPlan
     */
    select?: TenantPlanSelect<ExtArgs> | null
    /**
     * Filter, which TenantPlans to fetch.
     */
    where?: TenantPlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TenantPlans to fetch.
     */
    orderBy?: TenantPlanOrderByWithRelationInput | TenantPlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TenantPlans.
     */
    cursor?: TenantPlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TenantPlans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TenantPlans.
     */
    skip?: number
    distinct?: TenantPlanScalarFieldEnum | TenantPlanScalarFieldEnum[]
  }

  /**
   * TenantPlan create
   */
  export type TenantPlanCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantPlan
     */
    select?: TenantPlanSelect<ExtArgs> | null
    /**
     * The data needed to create a TenantPlan.
     */
    data: XOR<TenantPlanCreateInput, TenantPlanUncheckedCreateInput>
  }

  /**
   * TenantPlan createMany
   */
  export type TenantPlanCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TenantPlans.
     */
    data: TenantPlanCreateManyInput | TenantPlanCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TenantPlan createManyAndReturn
   */
  export type TenantPlanCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantPlan
     */
    select?: TenantPlanSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many TenantPlans.
     */
    data: TenantPlanCreateManyInput | TenantPlanCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TenantPlan update
   */
  export type TenantPlanUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantPlan
     */
    select?: TenantPlanSelect<ExtArgs> | null
    /**
     * The data needed to update a TenantPlan.
     */
    data: XOR<TenantPlanUpdateInput, TenantPlanUncheckedUpdateInput>
    /**
     * Choose, which TenantPlan to update.
     */
    where: TenantPlanWhereUniqueInput
  }

  /**
   * TenantPlan updateMany
   */
  export type TenantPlanUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TenantPlans.
     */
    data: XOR<TenantPlanUpdateManyMutationInput, TenantPlanUncheckedUpdateManyInput>
    /**
     * Filter which TenantPlans to update
     */
    where?: TenantPlanWhereInput
  }

  /**
   * TenantPlan upsert
   */
  export type TenantPlanUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantPlan
     */
    select?: TenantPlanSelect<ExtArgs> | null
    /**
     * The filter to search for the TenantPlan to update in case it exists.
     */
    where: TenantPlanWhereUniqueInput
    /**
     * In case the TenantPlan found by the `where` argument doesn't exist, create a new TenantPlan with this data.
     */
    create: XOR<TenantPlanCreateInput, TenantPlanUncheckedCreateInput>
    /**
     * In case the TenantPlan was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TenantPlanUpdateInput, TenantPlanUncheckedUpdateInput>
  }

  /**
   * TenantPlan delete
   */
  export type TenantPlanDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantPlan
     */
    select?: TenantPlanSelect<ExtArgs> | null
    /**
     * Filter which TenantPlan to delete.
     */
    where: TenantPlanWhereUniqueInput
  }

  /**
   * TenantPlan deleteMany
   */
  export type TenantPlanDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TenantPlans to delete
     */
    where?: TenantPlanWhereInput
  }

  /**
   * TenantPlan without action
   */
  export type TenantPlanDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantPlan
     */
    select?: TenantPlanSelect<ExtArgs> | null
  }


  /**
   * Model TenantFeatureFlag
   */

  export type AggregateTenantFeatureFlag = {
    _count: TenantFeatureFlagCountAggregateOutputType | null
    _min: TenantFeatureFlagMinAggregateOutputType | null
    _max: TenantFeatureFlagMaxAggregateOutputType | null
  }

  export type TenantFeatureFlagMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    flagKey: string | null
    isEnabled: boolean | null
    updatedBy: string | null
    createdAt: Date | null
  }

  export type TenantFeatureFlagMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    flagKey: string | null
    isEnabled: boolean | null
    updatedBy: string | null
    createdAt: Date | null
  }

  export type TenantFeatureFlagCountAggregateOutputType = {
    id: number
    tenantId: number
    flagKey: number
    isEnabled: number
    config: number
    updatedBy: number
    createdAt: number
    _all: number
  }


  export type TenantFeatureFlagMinAggregateInputType = {
    id?: true
    tenantId?: true
    flagKey?: true
    isEnabled?: true
    updatedBy?: true
    createdAt?: true
  }

  export type TenantFeatureFlagMaxAggregateInputType = {
    id?: true
    tenantId?: true
    flagKey?: true
    isEnabled?: true
    updatedBy?: true
    createdAt?: true
  }

  export type TenantFeatureFlagCountAggregateInputType = {
    id?: true
    tenantId?: true
    flagKey?: true
    isEnabled?: true
    config?: true
    updatedBy?: true
    createdAt?: true
    _all?: true
  }

  export type TenantFeatureFlagAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TenantFeatureFlag to aggregate.
     */
    where?: TenantFeatureFlagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TenantFeatureFlags to fetch.
     */
    orderBy?: TenantFeatureFlagOrderByWithRelationInput | TenantFeatureFlagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TenantFeatureFlagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TenantFeatureFlags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TenantFeatureFlags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TenantFeatureFlags
    **/
    _count?: true | TenantFeatureFlagCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TenantFeatureFlagMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TenantFeatureFlagMaxAggregateInputType
  }

  export type GetTenantFeatureFlagAggregateType<T extends TenantFeatureFlagAggregateArgs> = {
        [P in keyof T & keyof AggregateTenantFeatureFlag]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTenantFeatureFlag[P]>
      : GetScalarType<T[P], AggregateTenantFeatureFlag[P]>
  }




  export type TenantFeatureFlagGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TenantFeatureFlagWhereInput
    orderBy?: TenantFeatureFlagOrderByWithAggregationInput | TenantFeatureFlagOrderByWithAggregationInput[]
    by: TenantFeatureFlagScalarFieldEnum[] | TenantFeatureFlagScalarFieldEnum
    having?: TenantFeatureFlagScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TenantFeatureFlagCountAggregateInputType | true
    _min?: TenantFeatureFlagMinAggregateInputType
    _max?: TenantFeatureFlagMaxAggregateInputType
  }

  export type TenantFeatureFlagGroupByOutputType = {
    id: string
    tenantId: string
    flagKey: string
    isEnabled: boolean
    config: JsonValue | null
    updatedBy: string | null
    createdAt: Date
    _count: TenantFeatureFlagCountAggregateOutputType | null
    _min: TenantFeatureFlagMinAggregateOutputType | null
    _max: TenantFeatureFlagMaxAggregateOutputType | null
  }

  type GetTenantFeatureFlagGroupByPayload<T extends TenantFeatureFlagGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TenantFeatureFlagGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TenantFeatureFlagGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TenantFeatureFlagGroupByOutputType[P]>
            : GetScalarType<T[P], TenantFeatureFlagGroupByOutputType[P]>
        }
      >
    >


  export type TenantFeatureFlagSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    flagKey?: boolean
    isEnabled?: boolean
    config?: boolean
    updatedBy?: boolean
    createdAt?: boolean
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tenantFeatureFlag"]>

  export type TenantFeatureFlagSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    flagKey?: boolean
    isEnabled?: boolean
    config?: boolean
    updatedBy?: boolean
    createdAt?: boolean
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tenantFeatureFlag"]>

  export type TenantFeatureFlagSelectScalar = {
    id?: boolean
    tenantId?: boolean
    flagKey?: boolean
    isEnabled?: boolean
    config?: boolean
    updatedBy?: boolean
    createdAt?: boolean
  }

  export type TenantFeatureFlagInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }
  export type TenantFeatureFlagIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }

  export type $TenantFeatureFlagPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TenantFeatureFlag"
    objects: {
      tenant: Prisma.$TenantPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      flagKey: string
      isEnabled: boolean
      config: Prisma.JsonValue | null
      updatedBy: string | null
      createdAt: Date
    }, ExtArgs["result"]["tenantFeatureFlag"]>
    composites: {}
  }

  type TenantFeatureFlagGetPayload<S extends boolean | null | undefined | TenantFeatureFlagDefaultArgs> = $Result.GetResult<Prisma.$TenantFeatureFlagPayload, S>

  type TenantFeatureFlagCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<TenantFeatureFlagFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: TenantFeatureFlagCountAggregateInputType | true
    }

  export interface TenantFeatureFlagDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TenantFeatureFlag'], meta: { name: 'TenantFeatureFlag' } }
    /**
     * Find zero or one TenantFeatureFlag that matches the filter.
     * @param {TenantFeatureFlagFindUniqueArgs} args - Arguments to find a TenantFeatureFlag
     * @example
     * // Get one TenantFeatureFlag
     * const tenantFeatureFlag = await prisma.tenantFeatureFlag.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TenantFeatureFlagFindUniqueArgs>(args: SelectSubset<T, TenantFeatureFlagFindUniqueArgs<ExtArgs>>): Prisma__TenantFeatureFlagClient<$Result.GetResult<Prisma.$TenantFeatureFlagPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one TenantFeatureFlag that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {TenantFeatureFlagFindUniqueOrThrowArgs} args - Arguments to find a TenantFeatureFlag
     * @example
     * // Get one TenantFeatureFlag
     * const tenantFeatureFlag = await prisma.tenantFeatureFlag.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TenantFeatureFlagFindUniqueOrThrowArgs>(args: SelectSubset<T, TenantFeatureFlagFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TenantFeatureFlagClient<$Result.GetResult<Prisma.$TenantFeatureFlagPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first TenantFeatureFlag that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantFeatureFlagFindFirstArgs} args - Arguments to find a TenantFeatureFlag
     * @example
     * // Get one TenantFeatureFlag
     * const tenantFeatureFlag = await prisma.tenantFeatureFlag.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TenantFeatureFlagFindFirstArgs>(args?: SelectSubset<T, TenantFeatureFlagFindFirstArgs<ExtArgs>>): Prisma__TenantFeatureFlagClient<$Result.GetResult<Prisma.$TenantFeatureFlagPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first TenantFeatureFlag that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantFeatureFlagFindFirstOrThrowArgs} args - Arguments to find a TenantFeatureFlag
     * @example
     * // Get one TenantFeatureFlag
     * const tenantFeatureFlag = await prisma.tenantFeatureFlag.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TenantFeatureFlagFindFirstOrThrowArgs>(args?: SelectSubset<T, TenantFeatureFlagFindFirstOrThrowArgs<ExtArgs>>): Prisma__TenantFeatureFlagClient<$Result.GetResult<Prisma.$TenantFeatureFlagPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more TenantFeatureFlags that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantFeatureFlagFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TenantFeatureFlags
     * const tenantFeatureFlags = await prisma.tenantFeatureFlag.findMany()
     * 
     * // Get first 10 TenantFeatureFlags
     * const tenantFeatureFlags = await prisma.tenantFeatureFlag.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tenantFeatureFlagWithIdOnly = await prisma.tenantFeatureFlag.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TenantFeatureFlagFindManyArgs>(args?: SelectSubset<T, TenantFeatureFlagFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TenantFeatureFlagPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a TenantFeatureFlag.
     * @param {TenantFeatureFlagCreateArgs} args - Arguments to create a TenantFeatureFlag.
     * @example
     * // Create one TenantFeatureFlag
     * const TenantFeatureFlag = await prisma.tenantFeatureFlag.create({
     *   data: {
     *     // ... data to create a TenantFeatureFlag
     *   }
     * })
     * 
     */
    create<T extends TenantFeatureFlagCreateArgs>(args: SelectSubset<T, TenantFeatureFlagCreateArgs<ExtArgs>>): Prisma__TenantFeatureFlagClient<$Result.GetResult<Prisma.$TenantFeatureFlagPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many TenantFeatureFlags.
     * @param {TenantFeatureFlagCreateManyArgs} args - Arguments to create many TenantFeatureFlags.
     * @example
     * // Create many TenantFeatureFlags
     * const tenantFeatureFlag = await prisma.tenantFeatureFlag.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TenantFeatureFlagCreateManyArgs>(args?: SelectSubset<T, TenantFeatureFlagCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TenantFeatureFlags and returns the data saved in the database.
     * @param {TenantFeatureFlagCreateManyAndReturnArgs} args - Arguments to create many TenantFeatureFlags.
     * @example
     * // Create many TenantFeatureFlags
     * const tenantFeatureFlag = await prisma.tenantFeatureFlag.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TenantFeatureFlags and only return the `id`
     * const tenantFeatureFlagWithIdOnly = await prisma.tenantFeatureFlag.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TenantFeatureFlagCreateManyAndReturnArgs>(args?: SelectSubset<T, TenantFeatureFlagCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TenantFeatureFlagPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a TenantFeatureFlag.
     * @param {TenantFeatureFlagDeleteArgs} args - Arguments to delete one TenantFeatureFlag.
     * @example
     * // Delete one TenantFeatureFlag
     * const TenantFeatureFlag = await prisma.tenantFeatureFlag.delete({
     *   where: {
     *     // ... filter to delete one TenantFeatureFlag
     *   }
     * })
     * 
     */
    delete<T extends TenantFeatureFlagDeleteArgs>(args: SelectSubset<T, TenantFeatureFlagDeleteArgs<ExtArgs>>): Prisma__TenantFeatureFlagClient<$Result.GetResult<Prisma.$TenantFeatureFlagPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one TenantFeatureFlag.
     * @param {TenantFeatureFlagUpdateArgs} args - Arguments to update one TenantFeatureFlag.
     * @example
     * // Update one TenantFeatureFlag
     * const tenantFeatureFlag = await prisma.tenantFeatureFlag.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TenantFeatureFlagUpdateArgs>(args: SelectSubset<T, TenantFeatureFlagUpdateArgs<ExtArgs>>): Prisma__TenantFeatureFlagClient<$Result.GetResult<Prisma.$TenantFeatureFlagPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more TenantFeatureFlags.
     * @param {TenantFeatureFlagDeleteManyArgs} args - Arguments to filter TenantFeatureFlags to delete.
     * @example
     * // Delete a few TenantFeatureFlags
     * const { count } = await prisma.tenantFeatureFlag.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TenantFeatureFlagDeleteManyArgs>(args?: SelectSubset<T, TenantFeatureFlagDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TenantFeatureFlags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantFeatureFlagUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TenantFeatureFlags
     * const tenantFeatureFlag = await prisma.tenantFeatureFlag.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TenantFeatureFlagUpdateManyArgs>(args: SelectSubset<T, TenantFeatureFlagUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one TenantFeatureFlag.
     * @param {TenantFeatureFlagUpsertArgs} args - Arguments to update or create a TenantFeatureFlag.
     * @example
     * // Update or create a TenantFeatureFlag
     * const tenantFeatureFlag = await prisma.tenantFeatureFlag.upsert({
     *   create: {
     *     // ... data to create a TenantFeatureFlag
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TenantFeatureFlag we want to update
     *   }
     * })
     */
    upsert<T extends TenantFeatureFlagUpsertArgs>(args: SelectSubset<T, TenantFeatureFlagUpsertArgs<ExtArgs>>): Prisma__TenantFeatureFlagClient<$Result.GetResult<Prisma.$TenantFeatureFlagPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of TenantFeatureFlags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantFeatureFlagCountArgs} args - Arguments to filter TenantFeatureFlags to count.
     * @example
     * // Count the number of TenantFeatureFlags
     * const count = await prisma.tenantFeatureFlag.count({
     *   where: {
     *     // ... the filter for the TenantFeatureFlags we want to count
     *   }
     * })
    **/
    count<T extends TenantFeatureFlagCountArgs>(
      args?: Subset<T, TenantFeatureFlagCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TenantFeatureFlagCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TenantFeatureFlag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantFeatureFlagAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TenantFeatureFlagAggregateArgs>(args: Subset<T, TenantFeatureFlagAggregateArgs>): Prisma.PrismaPromise<GetTenantFeatureFlagAggregateType<T>>

    /**
     * Group by TenantFeatureFlag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantFeatureFlagGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TenantFeatureFlagGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TenantFeatureFlagGroupByArgs['orderBy'] }
        : { orderBy?: TenantFeatureFlagGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TenantFeatureFlagGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTenantFeatureFlagGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TenantFeatureFlag model
   */
  readonly fields: TenantFeatureFlagFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TenantFeatureFlag.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TenantFeatureFlagClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tenant<T extends TenantDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TenantDefaultArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TenantFeatureFlag model
   */ 
  interface TenantFeatureFlagFieldRefs {
    readonly id: FieldRef<"TenantFeatureFlag", 'String'>
    readonly tenantId: FieldRef<"TenantFeatureFlag", 'String'>
    readonly flagKey: FieldRef<"TenantFeatureFlag", 'String'>
    readonly isEnabled: FieldRef<"TenantFeatureFlag", 'Boolean'>
    readonly config: FieldRef<"TenantFeatureFlag", 'Json'>
    readonly updatedBy: FieldRef<"TenantFeatureFlag", 'String'>
    readonly createdAt: FieldRef<"TenantFeatureFlag", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TenantFeatureFlag findUnique
   */
  export type TenantFeatureFlagFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantFeatureFlag
     */
    select?: TenantFeatureFlagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantFeatureFlagInclude<ExtArgs> | null
    /**
     * Filter, which TenantFeatureFlag to fetch.
     */
    where: TenantFeatureFlagWhereUniqueInput
  }

  /**
   * TenantFeatureFlag findUniqueOrThrow
   */
  export type TenantFeatureFlagFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantFeatureFlag
     */
    select?: TenantFeatureFlagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantFeatureFlagInclude<ExtArgs> | null
    /**
     * Filter, which TenantFeatureFlag to fetch.
     */
    where: TenantFeatureFlagWhereUniqueInput
  }

  /**
   * TenantFeatureFlag findFirst
   */
  export type TenantFeatureFlagFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantFeatureFlag
     */
    select?: TenantFeatureFlagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantFeatureFlagInclude<ExtArgs> | null
    /**
     * Filter, which TenantFeatureFlag to fetch.
     */
    where?: TenantFeatureFlagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TenantFeatureFlags to fetch.
     */
    orderBy?: TenantFeatureFlagOrderByWithRelationInput | TenantFeatureFlagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TenantFeatureFlags.
     */
    cursor?: TenantFeatureFlagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TenantFeatureFlags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TenantFeatureFlags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TenantFeatureFlags.
     */
    distinct?: TenantFeatureFlagScalarFieldEnum | TenantFeatureFlagScalarFieldEnum[]
  }

  /**
   * TenantFeatureFlag findFirstOrThrow
   */
  export type TenantFeatureFlagFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantFeatureFlag
     */
    select?: TenantFeatureFlagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantFeatureFlagInclude<ExtArgs> | null
    /**
     * Filter, which TenantFeatureFlag to fetch.
     */
    where?: TenantFeatureFlagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TenantFeatureFlags to fetch.
     */
    orderBy?: TenantFeatureFlagOrderByWithRelationInput | TenantFeatureFlagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TenantFeatureFlags.
     */
    cursor?: TenantFeatureFlagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TenantFeatureFlags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TenantFeatureFlags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TenantFeatureFlags.
     */
    distinct?: TenantFeatureFlagScalarFieldEnum | TenantFeatureFlagScalarFieldEnum[]
  }

  /**
   * TenantFeatureFlag findMany
   */
  export type TenantFeatureFlagFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantFeatureFlag
     */
    select?: TenantFeatureFlagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantFeatureFlagInclude<ExtArgs> | null
    /**
     * Filter, which TenantFeatureFlags to fetch.
     */
    where?: TenantFeatureFlagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TenantFeatureFlags to fetch.
     */
    orderBy?: TenantFeatureFlagOrderByWithRelationInput | TenantFeatureFlagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TenantFeatureFlags.
     */
    cursor?: TenantFeatureFlagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TenantFeatureFlags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TenantFeatureFlags.
     */
    skip?: number
    distinct?: TenantFeatureFlagScalarFieldEnum | TenantFeatureFlagScalarFieldEnum[]
  }

  /**
   * TenantFeatureFlag create
   */
  export type TenantFeatureFlagCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantFeatureFlag
     */
    select?: TenantFeatureFlagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantFeatureFlagInclude<ExtArgs> | null
    /**
     * The data needed to create a TenantFeatureFlag.
     */
    data: XOR<TenantFeatureFlagCreateInput, TenantFeatureFlagUncheckedCreateInput>
  }

  /**
   * TenantFeatureFlag createMany
   */
  export type TenantFeatureFlagCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TenantFeatureFlags.
     */
    data: TenantFeatureFlagCreateManyInput | TenantFeatureFlagCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TenantFeatureFlag createManyAndReturn
   */
  export type TenantFeatureFlagCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantFeatureFlag
     */
    select?: TenantFeatureFlagSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many TenantFeatureFlags.
     */
    data: TenantFeatureFlagCreateManyInput | TenantFeatureFlagCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantFeatureFlagIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TenantFeatureFlag update
   */
  export type TenantFeatureFlagUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantFeatureFlag
     */
    select?: TenantFeatureFlagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantFeatureFlagInclude<ExtArgs> | null
    /**
     * The data needed to update a TenantFeatureFlag.
     */
    data: XOR<TenantFeatureFlagUpdateInput, TenantFeatureFlagUncheckedUpdateInput>
    /**
     * Choose, which TenantFeatureFlag to update.
     */
    where: TenantFeatureFlagWhereUniqueInput
  }

  /**
   * TenantFeatureFlag updateMany
   */
  export type TenantFeatureFlagUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TenantFeatureFlags.
     */
    data: XOR<TenantFeatureFlagUpdateManyMutationInput, TenantFeatureFlagUncheckedUpdateManyInput>
    /**
     * Filter which TenantFeatureFlags to update
     */
    where?: TenantFeatureFlagWhereInput
  }

  /**
   * TenantFeatureFlag upsert
   */
  export type TenantFeatureFlagUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantFeatureFlag
     */
    select?: TenantFeatureFlagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantFeatureFlagInclude<ExtArgs> | null
    /**
     * The filter to search for the TenantFeatureFlag to update in case it exists.
     */
    where: TenantFeatureFlagWhereUniqueInput
    /**
     * In case the TenantFeatureFlag found by the `where` argument doesn't exist, create a new TenantFeatureFlag with this data.
     */
    create: XOR<TenantFeatureFlagCreateInput, TenantFeatureFlagUncheckedCreateInput>
    /**
     * In case the TenantFeatureFlag was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TenantFeatureFlagUpdateInput, TenantFeatureFlagUncheckedUpdateInput>
  }

  /**
   * TenantFeatureFlag delete
   */
  export type TenantFeatureFlagDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantFeatureFlag
     */
    select?: TenantFeatureFlagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantFeatureFlagInclude<ExtArgs> | null
    /**
     * Filter which TenantFeatureFlag to delete.
     */
    where: TenantFeatureFlagWhereUniqueInput
  }

  /**
   * TenantFeatureFlag deleteMany
   */
  export type TenantFeatureFlagDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TenantFeatureFlags to delete
     */
    where?: TenantFeatureFlagWhereInput
  }

  /**
   * TenantFeatureFlag without action
   */
  export type TenantFeatureFlagDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantFeatureFlag
     */
    select?: TenantFeatureFlagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantFeatureFlagInclude<ExtArgs> | null
  }


  /**
   * Model TenantUsageLog
   */

  export type AggregateTenantUsageLog = {
    _count: TenantUsageLogCountAggregateOutputType | null
    _avg: TenantUsageLogAvgAggregateOutputType | null
    _sum: TenantUsageLogSumAggregateOutputType | null
    _min: TenantUsageLogMinAggregateOutputType | null
    _max: TenantUsageLogMaxAggregateOutputType | null
  }

  export type TenantUsageLogAvgAggregateOutputType = {
    productCount: number | null
    orderCount: number | null
    staffCount: number | null
    warehouseCount: number | null
  }

  export type TenantUsageLogSumAggregateOutputType = {
    productCount: number | null
    orderCount: number | null
    staffCount: number | null
    warehouseCount: number | null
  }

  export type TenantUsageLogMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    month: string | null
    productCount: number | null
    orderCount: number | null
    staffCount: number | null
    warehouseCount: number | null
    updatedAt: Date | null
  }

  export type TenantUsageLogMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    month: string | null
    productCount: number | null
    orderCount: number | null
    staffCount: number | null
    warehouseCount: number | null
    updatedAt: Date | null
  }

  export type TenantUsageLogCountAggregateOutputType = {
    id: number
    tenantId: number
    month: number
    productCount: number
    orderCount: number
    staffCount: number
    warehouseCount: number
    updatedAt: number
    _all: number
  }


  export type TenantUsageLogAvgAggregateInputType = {
    productCount?: true
    orderCount?: true
    staffCount?: true
    warehouseCount?: true
  }

  export type TenantUsageLogSumAggregateInputType = {
    productCount?: true
    orderCount?: true
    staffCount?: true
    warehouseCount?: true
  }

  export type TenantUsageLogMinAggregateInputType = {
    id?: true
    tenantId?: true
    month?: true
    productCount?: true
    orderCount?: true
    staffCount?: true
    warehouseCount?: true
    updatedAt?: true
  }

  export type TenantUsageLogMaxAggregateInputType = {
    id?: true
    tenantId?: true
    month?: true
    productCount?: true
    orderCount?: true
    staffCount?: true
    warehouseCount?: true
    updatedAt?: true
  }

  export type TenantUsageLogCountAggregateInputType = {
    id?: true
    tenantId?: true
    month?: true
    productCount?: true
    orderCount?: true
    staffCount?: true
    warehouseCount?: true
    updatedAt?: true
    _all?: true
  }

  export type TenantUsageLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TenantUsageLog to aggregate.
     */
    where?: TenantUsageLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TenantUsageLogs to fetch.
     */
    orderBy?: TenantUsageLogOrderByWithRelationInput | TenantUsageLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TenantUsageLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TenantUsageLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TenantUsageLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TenantUsageLogs
    **/
    _count?: true | TenantUsageLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TenantUsageLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TenantUsageLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TenantUsageLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TenantUsageLogMaxAggregateInputType
  }

  export type GetTenantUsageLogAggregateType<T extends TenantUsageLogAggregateArgs> = {
        [P in keyof T & keyof AggregateTenantUsageLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTenantUsageLog[P]>
      : GetScalarType<T[P], AggregateTenantUsageLog[P]>
  }




  export type TenantUsageLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TenantUsageLogWhereInput
    orderBy?: TenantUsageLogOrderByWithAggregationInput | TenantUsageLogOrderByWithAggregationInput[]
    by: TenantUsageLogScalarFieldEnum[] | TenantUsageLogScalarFieldEnum
    having?: TenantUsageLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TenantUsageLogCountAggregateInputType | true
    _avg?: TenantUsageLogAvgAggregateInputType
    _sum?: TenantUsageLogSumAggregateInputType
    _min?: TenantUsageLogMinAggregateInputType
    _max?: TenantUsageLogMaxAggregateInputType
  }

  export type TenantUsageLogGroupByOutputType = {
    id: string
    tenantId: string
    month: string
    productCount: number
    orderCount: number
    staffCount: number
    warehouseCount: number
    updatedAt: Date
    _count: TenantUsageLogCountAggregateOutputType | null
    _avg: TenantUsageLogAvgAggregateOutputType | null
    _sum: TenantUsageLogSumAggregateOutputType | null
    _min: TenantUsageLogMinAggregateOutputType | null
    _max: TenantUsageLogMaxAggregateOutputType | null
  }

  type GetTenantUsageLogGroupByPayload<T extends TenantUsageLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TenantUsageLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TenantUsageLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TenantUsageLogGroupByOutputType[P]>
            : GetScalarType<T[P], TenantUsageLogGroupByOutputType[P]>
        }
      >
    >


  export type TenantUsageLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    month?: boolean
    productCount?: boolean
    orderCount?: boolean
    staffCount?: boolean
    warehouseCount?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["tenantUsageLog"]>

  export type TenantUsageLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    month?: boolean
    productCount?: boolean
    orderCount?: boolean
    staffCount?: boolean
    warehouseCount?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["tenantUsageLog"]>

  export type TenantUsageLogSelectScalar = {
    id?: boolean
    tenantId?: boolean
    month?: boolean
    productCount?: boolean
    orderCount?: boolean
    staffCount?: boolean
    warehouseCount?: boolean
    updatedAt?: boolean
  }


  export type $TenantUsageLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TenantUsageLog"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      month: string
      productCount: number
      orderCount: number
      staffCount: number
      warehouseCount: number
      updatedAt: Date
    }, ExtArgs["result"]["tenantUsageLog"]>
    composites: {}
  }

  type TenantUsageLogGetPayload<S extends boolean | null | undefined | TenantUsageLogDefaultArgs> = $Result.GetResult<Prisma.$TenantUsageLogPayload, S>

  type TenantUsageLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<TenantUsageLogFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: TenantUsageLogCountAggregateInputType | true
    }

  export interface TenantUsageLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TenantUsageLog'], meta: { name: 'TenantUsageLog' } }
    /**
     * Find zero or one TenantUsageLog that matches the filter.
     * @param {TenantUsageLogFindUniqueArgs} args - Arguments to find a TenantUsageLog
     * @example
     * // Get one TenantUsageLog
     * const tenantUsageLog = await prisma.tenantUsageLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TenantUsageLogFindUniqueArgs>(args: SelectSubset<T, TenantUsageLogFindUniqueArgs<ExtArgs>>): Prisma__TenantUsageLogClient<$Result.GetResult<Prisma.$TenantUsageLogPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one TenantUsageLog that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {TenantUsageLogFindUniqueOrThrowArgs} args - Arguments to find a TenantUsageLog
     * @example
     * // Get one TenantUsageLog
     * const tenantUsageLog = await prisma.tenantUsageLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TenantUsageLogFindUniqueOrThrowArgs>(args: SelectSubset<T, TenantUsageLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TenantUsageLogClient<$Result.GetResult<Prisma.$TenantUsageLogPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first TenantUsageLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantUsageLogFindFirstArgs} args - Arguments to find a TenantUsageLog
     * @example
     * // Get one TenantUsageLog
     * const tenantUsageLog = await prisma.tenantUsageLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TenantUsageLogFindFirstArgs>(args?: SelectSubset<T, TenantUsageLogFindFirstArgs<ExtArgs>>): Prisma__TenantUsageLogClient<$Result.GetResult<Prisma.$TenantUsageLogPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first TenantUsageLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantUsageLogFindFirstOrThrowArgs} args - Arguments to find a TenantUsageLog
     * @example
     * // Get one TenantUsageLog
     * const tenantUsageLog = await prisma.tenantUsageLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TenantUsageLogFindFirstOrThrowArgs>(args?: SelectSubset<T, TenantUsageLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__TenantUsageLogClient<$Result.GetResult<Prisma.$TenantUsageLogPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more TenantUsageLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantUsageLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TenantUsageLogs
     * const tenantUsageLogs = await prisma.tenantUsageLog.findMany()
     * 
     * // Get first 10 TenantUsageLogs
     * const tenantUsageLogs = await prisma.tenantUsageLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tenantUsageLogWithIdOnly = await prisma.tenantUsageLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TenantUsageLogFindManyArgs>(args?: SelectSubset<T, TenantUsageLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TenantUsageLogPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a TenantUsageLog.
     * @param {TenantUsageLogCreateArgs} args - Arguments to create a TenantUsageLog.
     * @example
     * // Create one TenantUsageLog
     * const TenantUsageLog = await prisma.tenantUsageLog.create({
     *   data: {
     *     // ... data to create a TenantUsageLog
     *   }
     * })
     * 
     */
    create<T extends TenantUsageLogCreateArgs>(args: SelectSubset<T, TenantUsageLogCreateArgs<ExtArgs>>): Prisma__TenantUsageLogClient<$Result.GetResult<Prisma.$TenantUsageLogPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many TenantUsageLogs.
     * @param {TenantUsageLogCreateManyArgs} args - Arguments to create many TenantUsageLogs.
     * @example
     * // Create many TenantUsageLogs
     * const tenantUsageLog = await prisma.tenantUsageLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TenantUsageLogCreateManyArgs>(args?: SelectSubset<T, TenantUsageLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TenantUsageLogs and returns the data saved in the database.
     * @param {TenantUsageLogCreateManyAndReturnArgs} args - Arguments to create many TenantUsageLogs.
     * @example
     * // Create many TenantUsageLogs
     * const tenantUsageLog = await prisma.tenantUsageLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TenantUsageLogs and only return the `id`
     * const tenantUsageLogWithIdOnly = await prisma.tenantUsageLog.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TenantUsageLogCreateManyAndReturnArgs>(args?: SelectSubset<T, TenantUsageLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TenantUsageLogPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a TenantUsageLog.
     * @param {TenantUsageLogDeleteArgs} args - Arguments to delete one TenantUsageLog.
     * @example
     * // Delete one TenantUsageLog
     * const TenantUsageLog = await prisma.tenantUsageLog.delete({
     *   where: {
     *     // ... filter to delete one TenantUsageLog
     *   }
     * })
     * 
     */
    delete<T extends TenantUsageLogDeleteArgs>(args: SelectSubset<T, TenantUsageLogDeleteArgs<ExtArgs>>): Prisma__TenantUsageLogClient<$Result.GetResult<Prisma.$TenantUsageLogPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one TenantUsageLog.
     * @param {TenantUsageLogUpdateArgs} args - Arguments to update one TenantUsageLog.
     * @example
     * // Update one TenantUsageLog
     * const tenantUsageLog = await prisma.tenantUsageLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TenantUsageLogUpdateArgs>(args: SelectSubset<T, TenantUsageLogUpdateArgs<ExtArgs>>): Prisma__TenantUsageLogClient<$Result.GetResult<Prisma.$TenantUsageLogPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more TenantUsageLogs.
     * @param {TenantUsageLogDeleteManyArgs} args - Arguments to filter TenantUsageLogs to delete.
     * @example
     * // Delete a few TenantUsageLogs
     * const { count } = await prisma.tenantUsageLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TenantUsageLogDeleteManyArgs>(args?: SelectSubset<T, TenantUsageLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TenantUsageLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantUsageLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TenantUsageLogs
     * const tenantUsageLog = await prisma.tenantUsageLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TenantUsageLogUpdateManyArgs>(args: SelectSubset<T, TenantUsageLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one TenantUsageLog.
     * @param {TenantUsageLogUpsertArgs} args - Arguments to update or create a TenantUsageLog.
     * @example
     * // Update or create a TenantUsageLog
     * const tenantUsageLog = await prisma.tenantUsageLog.upsert({
     *   create: {
     *     // ... data to create a TenantUsageLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TenantUsageLog we want to update
     *   }
     * })
     */
    upsert<T extends TenantUsageLogUpsertArgs>(args: SelectSubset<T, TenantUsageLogUpsertArgs<ExtArgs>>): Prisma__TenantUsageLogClient<$Result.GetResult<Prisma.$TenantUsageLogPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of TenantUsageLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantUsageLogCountArgs} args - Arguments to filter TenantUsageLogs to count.
     * @example
     * // Count the number of TenantUsageLogs
     * const count = await prisma.tenantUsageLog.count({
     *   where: {
     *     // ... the filter for the TenantUsageLogs we want to count
     *   }
     * })
    **/
    count<T extends TenantUsageLogCountArgs>(
      args?: Subset<T, TenantUsageLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TenantUsageLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TenantUsageLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantUsageLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TenantUsageLogAggregateArgs>(args: Subset<T, TenantUsageLogAggregateArgs>): Prisma.PrismaPromise<GetTenantUsageLogAggregateType<T>>

    /**
     * Group by TenantUsageLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantUsageLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TenantUsageLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TenantUsageLogGroupByArgs['orderBy'] }
        : { orderBy?: TenantUsageLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TenantUsageLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTenantUsageLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TenantUsageLog model
   */
  readonly fields: TenantUsageLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TenantUsageLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TenantUsageLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TenantUsageLog model
   */ 
  interface TenantUsageLogFieldRefs {
    readonly id: FieldRef<"TenantUsageLog", 'String'>
    readonly tenantId: FieldRef<"TenantUsageLog", 'String'>
    readonly month: FieldRef<"TenantUsageLog", 'String'>
    readonly productCount: FieldRef<"TenantUsageLog", 'Int'>
    readonly orderCount: FieldRef<"TenantUsageLog", 'Int'>
    readonly staffCount: FieldRef<"TenantUsageLog", 'Int'>
    readonly warehouseCount: FieldRef<"TenantUsageLog", 'Int'>
    readonly updatedAt: FieldRef<"TenantUsageLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TenantUsageLog findUnique
   */
  export type TenantUsageLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantUsageLog
     */
    select?: TenantUsageLogSelect<ExtArgs> | null
    /**
     * Filter, which TenantUsageLog to fetch.
     */
    where: TenantUsageLogWhereUniqueInput
  }

  /**
   * TenantUsageLog findUniqueOrThrow
   */
  export type TenantUsageLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantUsageLog
     */
    select?: TenantUsageLogSelect<ExtArgs> | null
    /**
     * Filter, which TenantUsageLog to fetch.
     */
    where: TenantUsageLogWhereUniqueInput
  }

  /**
   * TenantUsageLog findFirst
   */
  export type TenantUsageLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantUsageLog
     */
    select?: TenantUsageLogSelect<ExtArgs> | null
    /**
     * Filter, which TenantUsageLog to fetch.
     */
    where?: TenantUsageLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TenantUsageLogs to fetch.
     */
    orderBy?: TenantUsageLogOrderByWithRelationInput | TenantUsageLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TenantUsageLogs.
     */
    cursor?: TenantUsageLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TenantUsageLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TenantUsageLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TenantUsageLogs.
     */
    distinct?: TenantUsageLogScalarFieldEnum | TenantUsageLogScalarFieldEnum[]
  }

  /**
   * TenantUsageLog findFirstOrThrow
   */
  export type TenantUsageLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantUsageLog
     */
    select?: TenantUsageLogSelect<ExtArgs> | null
    /**
     * Filter, which TenantUsageLog to fetch.
     */
    where?: TenantUsageLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TenantUsageLogs to fetch.
     */
    orderBy?: TenantUsageLogOrderByWithRelationInput | TenantUsageLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TenantUsageLogs.
     */
    cursor?: TenantUsageLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TenantUsageLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TenantUsageLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TenantUsageLogs.
     */
    distinct?: TenantUsageLogScalarFieldEnum | TenantUsageLogScalarFieldEnum[]
  }

  /**
   * TenantUsageLog findMany
   */
  export type TenantUsageLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantUsageLog
     */
    select?: TenantUsageLogSelect<ExtArgs> | null
    /**
     * Filter, which TenantUsageLogs to fetch.
     */
    where?: TenantUsageLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TenantUsageLogs to fetch.
     */
    orderBy?: TenantUsageLogOrderByWithRelationInput | TenantUsageLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TenantUsageLogs.
     */
    cursor?: TenantUsageLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TenantUsageLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TenantUsageLogs.
     */
    skip?: number
    distinct?: TenantUsageLogScalarFieldEnum | TenantUsageLogScalarFieldEnum[]
  }

  /**
   * TenantUsageLog create
   */
  export type TenantUsageLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantUsageLog
     */
    select?: TenantUsageLogSelect<ExtArgs> | null
    /**
     * The data needed to create a TenantUsageLog.
     */
    data: XOR<TenantUsageLogCreateInput, TenantUsageLogUncheckedCreateInput>
  }

  /**
   * TenantUsageLog createMany
   */
  export type TenantUsageLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TenantUsageLogs.
     */
    data: TenantUsageLogCreateManyInput | TenantUsageLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TenantUsageLog createManyAndReturn
   */
  export type TenantUsageLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantUsageLog
     */
    select?: TenantUsageLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many TenantUsageLogs.
     */
    data: TenantUsageLogCreateManyInput | TenantUsageLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TenantUsageLog update
   */
  export type TenantUsageLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantUsageLog
     */
    select?: TenantUsageLogSelect<ExtArgs> | null
    /**
     * The data needed to update a TenantUsageLog.
     */
    data: XOR<TenantUsageLogUpdateInput, TenantUsageLogUncheckedUpdateInput>
    /**
     * Choose, which TenantUsageLog to update.
     */
    where: TenantUsageLogWhereUniqueInput
  }

  /**
   * TenantUsageLog updateMany
   */
  export type TenantUsageLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TenantUsageLogs.
     */
    data: XOR<TenantUsageLogUpdateManyMutationInput, TenantUsageLogUncheckedUpdateManyInput>
    /**
     * Filter which TenantUsageLogs to update
     */
    where?: TenantUsageLogWhereInput
  }

  /**
   * TenantUsageLog upsert
   */
  export type TenantUsageLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantUsageLog
     */
    select?: TenantUsageLogSelect<ExtArgs> | null
    /**
     * The filter to search for the TenantUsageLog to update in case it exists.
     */
    where: TenantUsageLogWhereUniqueInput
    /**
     * In case the TenantUsageLog found by the `where` argument doesn't exist, create a new TenantUsageLog with this data.
     */
    create: XOR<TenantUsageLogCreateInput, TenantUsageLogUncheckedCreateInput>
    /**
     * In case the TenantUsageLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TenantUsageLogUpdateInput, TenantUsageLogUncheckedUpdateInput>
  }

  /**
   * TenantUsageLog delete
   */
  export type TenantUsageLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantUsageLog
     */
    select?: TenantUsageLogSelect<ExtArgs> | null
    /**
     * Filter which TenantUsageLog to delete.
     */
    where: TenantUsageLogWhereUniqueInput
  }

  /**
   * TenantUsageLog deleteMany
   */
  export type TenantUsageLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TenantUsageLogs to delete
     */
    where?: TenantUsageLogWhereInput
  }

  /**
   * TenantUsageLog without action
   */
  export type TenantUsageLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantUsageLog
     */
    select?: TenantUsageLogSelect<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const TenantScalarFieldEnum: {
    id: 'id',
    name: 'name',
    slug: 'slug',
    plan: 'plan',
    status: 'status',
    trialEndsAt: 'trialEndsAt',
    billingEmail: 'billingEmail',
    billingName: 'billingName',
    billingAddress: 'billingAddress',
    timezone: 'timezone',
    locale: 'locale',
    currency: 'currency',
    customDomain: 'customDomain',
    logoUrl: 'logoUrl',
    settings: 'settings',
    dbSchemaName: 'dbSchemaName',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TenantScalarFieldEnum = (typeof TenantScalarFieldEnum)[keyof typeof TenantScalarFieldEnum]


  export const TenantPlanScalarFieldEnum: {
    id: 'id',
    name: 'name',
    priceMonthly: 'priceMonthly',
    priceAnnual: 'priceAnnual',
    maxProducts: 'maxProducts',
    maxOrdersPerMonth: 'maxOrdersPerMonth',
    maxStaffUsers: 'maxStaffUsers',
    maxWarehouses: 'maxWarehouses',
    features: 'features',
    isActive: 'isActive'
  };

  export type TenantPlanScalarFieldEnum = (typeof TenantPlanScalarFieldEnum)[keyof typeof TenantPlanScalarFieldEnum]


  export const TenantFeatureFlagScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    flagKey: 'flagKey',
    isEnabled: 'isEnabled',
    config: 'config',
    updatedBy: 'updatedBy',
    createdAt: 'createdAt'
  };

  export type TenantFeatureFlagScalarFieldEnum = (typeof TenantFeatureFlagScalarFieldEnum)[keyof typeof TenantFeatureFlagScalarFieldEnum]


  export const TenantUsageLogScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    month: 'month',
    productCount: 'productCount',
    orderCount: 'orderCount',
    staffCount: 'staffCount',
    warehouseCount: 'warehouseCount',
    updatedAt: 'updatedAt'
  };

  export type TenantUsageLogScalarFieldEnum = (typeof TenantUsageLogScalarFieldEnum)[keyof typeof TenantUsageLogScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type TenantWhereInput = {
    AND?: TenantWhereInput | TenantWhereInput[]
    OR?: TenantWhereInput[]
    NOT?: TenantWhereInput | TenantWhereInput[]
    id?: StringFilter<"Tenant"> | string
    name?: StringFilter<"Tenant"> | string
    slug?: StringFilter<"Tenant"> | string
    plan?: StringFilter<"Tenant"> | string
    status?: StringFilter<"Tenant"> | string
    trialEndsAt?: DateTimeNullableFilter<"Tenant"> | Date | string | null
    billingEmail?: StringFilter<"Tenant"> | string
    billingName?: StringNullableFilter<"Tenant"> | string | null
    billingAddress?: JsonNullableFilter<"Tenant">
    timezone?: StringFilter<"Tenant"> | string
    locale?: StringFilter<"Tenant"> | string
    currency?: StringFilter<"Tenant"> | string
    customDomain?: StringNullableFilter<"Tenant"> | string | null
    logoUrl?: StringNullableFilter<"Tenant"> | string | null
    settings?: JsonFilter<"Tenant">
    dbSchemaName?: StringNullableFilter<"Tenant"> | string | null
    createdAt?: DateTimeFilter<"Tenant"> | Date | string
    updatedAt?: DateTimeFilter<"Tenant"> | Date | string
    featureFlags?: TenantFeatureFlagListRelationFilter
  }

  export type TenantOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    plan?: SortOrder
    status?: SortOrder
    trialEndsAt?: SortOrderInput | SortOrder
    billingEmail?: SortOrder
    billingName?: SortOrderInput | SortOrder
    billingAddress?: SortOrderInput | SortOrder
    timezone?: SortOrder
    locale?: SortOrder
    currency?: SortOrder
    customDomain?: SortOrderInput | SortOrder
    logoUrl?: SortOrderInput | SortOrder
    settings?: SortOrder
    dbSchemaName?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    featureFlags?: TenantFeatureFlagOrderByRelationAggregateInput
  }

  export type TenantWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    slug?: string
    AND?: TenantWhereInput | TenantWhereInput[]
    OR?: TenantWhereInput[]
    NOT?: TenantWhereInput | TenantWhereInput[]
    name?: StringFilter<"Tenant"> | string
    plan?: StringFilter<"Tenant"> | string
    status?: StringFilter<"Tenant"> | string
    trialEndsAt?: DateTimeNullableFilter<"Tenant"> | Date | string | null
    billingEmail?: StringFilter<"Tenant"> | string
    billingName?: StringNullableFilter<"Tenant"> | string | null
    billingAddress?: JsonNullableFilter<"Tenant">
    timezone?: StringFilter<"Tenant"> | string
    locale?: StringFilter<"Tenant"> | string
    currency?: StringFilter<"Tenant"> | string
    customDomain?: StringNullableFilter<"Tenant"> | string | null
    logoUrl?: StringNullableFilter<"Tenant"> | string | null
    settings?: JsonFilter<"Tenant">
    dbSchemaName?: StringNullableFilter<"Tenant"> | string | null
    createdAt?: DateTimeFilter<"Tenant"> | Date | string
    updatedAt?: DateTimeFilter<"Tenant"> | Date | string
    featureFlags?: TenantFeatureFlagListRelationFilter
  }, "id" | "slug">

  export type TenantOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    plan?: SortOrder
    status?: SortOrder
    trialEndsAt?: SortOrderInput | SortOrder
    billingEmail?: SortOrder
    billingName?: SortOrderInput | SortOrder
    billingAddress?: SortOrderInput | SortOrder
    timezone?: SortOrder
    locale?: SortOrder
    currency?: SortOrder
    customDomain?: SortOrderInput | SortOrder
    logoUrl?: SortOrderInput | SortOrder
    settings?: SortOrder
    dbSchemaName?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TenantCountOrderByAggregateInput
    _max?: TenantMaxOrderByAggregateInput
    _min?: TenantMinOrderByAggregateInput
  }

  export type TenantScalarWhereWithAggregatesInput = {
    AND?: TenantScalarWhereWithAggregatesInput | TenantScalarWhereWithAggregatesInput[]
    OR?: TenantScalarWhereWithAggregatesInput[]
    NOT?: TenantScalarWhereWithAggregatesInput | TenantScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Tenant"> | string
    name?: StringWithAggregatesFilter<"Tenant"> | string
    slug?: StringWithAggregatesFilter<"Tenant"> | string
    plan?: StringWithAggregatesFilter<"Tenant"> | string
    status?: StringWithAggregatesFilter<"Tenant"> | string
    trialEndsAt?: DateTimeNullableWithAggregatesFilter<"Tenant"> | Date | string | null
    billingEmail?: StringWithAggregatesFilter<"Tenant"> | string
    billingName?: StringNullableWithAggregatesFilter<"Tenant"> | string | null
    billingAddress?: JsonNullableWithAggregatesFilter<"Tenant">
    timezone?: StringWithAggregatesFilter<"Tenant"> | string
    locale?: StringWithAggregatesFilter<"Tenant"> | string
    currency?: StringWithAggregatesFilter<"Tenant"> | string
    customDomain?: StringNullableWithAggregatesFilter<"Tenant"> | string | null
    logoUrl?: StringNullableWithAggregatesFilter<"Tenant"> | string | null
    settings?: JsonWithAggregatesFilter<"Tenant">
    dbSchemaName?: StringNullableWithAggregatesFilter<"Tenant"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Tenant"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Tenant"> | Date | string
  }

  export type TenantPlanWhereInput = {
    AND?: TenantPlanWhereInput | TenantPlanWhereInput[]
    OR?: TenantPlanWhereInput[]
    NOT?: TenantPlanWhereInput | TenantPlanWhereInput[]
    id?: StringFilter<"TenantPlan"> | string
    name?: StringFilter<"TenantPlan"> | string
    priceMonthly?: IntFilter<"TenantPlan"> | number
    priceAnnual?: IntFilter<"TenantPlan"> | number
    maxProducts?: IntFilter<"TenantPlan"> | number
    maxOrdersPerMonth?: IntFilter<"TenantPlan"> | number
    maxStaffUsers?: IntFilter<"TenantPlan"> | number
    maxWarehouses?: IntFilter<"TenantPlan"> | number
    features?: JsonFilter<"TenantPlan">
    isActive?: BoolFilter<"TenantPlan"> | boolean
  }

  export type TenantPlanOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    priceMonthly?: SortOrder
    priceAnnual?: SortOrder
    maxProducts?: SortOrder
    maxOrdersPerMonth?: SortOrder
    maxStaffUsers?: SortOrder
    maxWarehouses?: SortOrder
    features?: SortOrder
    isActive?: SortOrder
  }

  export type TenantPlanWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: TenantPlanWhereInput | TenantPlanWhereInput[]
    OR?: TenantPlanWhereInput[]
    NOT?: TenantPlanWhereInput | TenantPlanWhereInput[]
    priceMonthly?: IntFilter<"TenantPlan"> | number
    priceAnnual?: IntFilter<"TenantPlan"> | number
    maxProducts?: IntFilter<"TenantPlan"> | number
    maxOrdersPerMonth?: IntFilter<"TenantPlan"> | number
    maxStaffUsers?: IntFilter<"TenantPlan"> | number
    maxWarehouses?: IntFilter<"TenantPlan"> | number
    features?: JsonFilter<"TenantPlan">
    isActive?: BoolFilter<"TenantPlan"> | boolean
  }, "id" | "name">

  export type TenantPlanOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    priceMonthly?: SortOrder
    priceAnnual?: SortOrder
    maxProducts?: SortOrder
    maxOrdersPerMonth?: SortOrder
    maxStaffUsers?: SortOrder
    maxWarehouses?: SortOrder
    features?: SortOrder
    isActive?: SortOrder
    _count?: TenantPlanCountOrderByAggregateInput
    _avg?: TenantPlanAvgOrderByAggregateInput
    _max?: TenantPlanMaxOrderByAggregateInput
    _min?: TenantPlanMinOrderByAggregateInput
    _sum?: TenantPlanSumOrderByAggregateInput
  }

  export type TenantPlanScalarWhereWithAggregatesInput = {
    AND?: TenantPlanScalarWhereWithAggregatesInput | TenantPlanScalarWhereWithAggregatesInput[]
    OR?: TenantPlanScalarWhereWithAggregatesInput[]
    NOT?: TenantPlanScalarWhereWithAggregatesInput | TenantPlanScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TenantPlan"> | string
    name?: StringWithAggregatesFilter<"TenantPlan"> | string
    priceMonthly?: IntWithAggregatesFilter<"TenantPlan"> | number
    priceAnnual?: IntWithAggregatesFilter<"TenantPlan"> | number
    maxProducts?: IntWithAggregatesFilter<"TenantPlan"> | number
    maxOrdersPerMonth?: IntWithAggregatesFilter<"TenantPlan"> | number
    maxStaffUsers?: IntWithAggregatesFilter<"TenantPlan"> | number
    maxWarehouses?: IntWithAggregatesFilter<"TenantPlan"> | number
    features?: JsonWithAggregatesFilter<"TenantPlan">
    isActive?: BoolWithAggregatesFilter<"TenantPlan"> | boolean
  }

  export type TenantFeatureFlagWhereInput = {
    AND?: TenantFeatureFlagWhereInput | TenantFeatureFlagWhereInput[]
    OR?: TenantFeatureFlagWhereInput[]
    NOT?: TenantFeatureFlagWhereInput | TenantFeatureFlagWhereInput[]
    id?: StringFilter<"TenantFeatureFlag"> | string
    tenantId?: StringFilter<"TenantFeatureFlag"> | string
    flagKey?: StringFilter<"TenantFeatureFlag"> | string
    isEnabled?: BoolFilter<"TenantFeatureFlag"> | boolean
    config?: JsonNullableFilter<"TenantFeatureFlag">
    updatedBy?: StringNullableFilter<"TenantFeatureFlag"> | string | null
    createdAt?: DateTimeFilter<"TenantFeatureFlag"> | Date | string
    tenant?: XOR<TenantRelationFilter, TenantWhereInput>
  }

  export type TenantFeatureFlagOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    flagKey?: SortOrder
    isEnabled?: SortOrder
    config?: SortOrderInput | SortOrder
    updatedBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    tenant?: TenantOrderByWithRelationInput
  }

  export type TenantFeatureFlagWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    tenantId_flagKey?: TenantFeatureFlagTenantIdFlagKeyCompoundUniqueInput
    AND?: TenantFeatureFlagWhereInput | TenantFeatureFlagWhereInput[]
    OR?: TenantFeatureFlagWhereInput[]
    NOT?: TenantFeatureFlagWhereInput | TenantFeatureFlagWhereInput[]
    tenantId?: StringFilter<"TenantFeatureFlag"> | string
    flagKey?: StringFilter<"TenantFeatureFlag"> | string
    isEnabled?: BoolFilter<"TenantFeatureFlag"> | boolean
    config?: JsonNullableFilter<"TenantFeatureFlag">
    updatedBy?: StringNullableFilter<"TenantFeatureFlag"> | string | null
    createdAt?: DateTimeFilter<"TenantFeatureFlag"> | Date | string
    tenant?: XOR<TenantRelationFilter, TenantWhereInput>
  }, "id" | "tenantId_flagKey">

  export type TenantFeatureFlagOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    flagKey?: SortOrder
    isEnabled?: SortOrder
    config?: SortOrderInput | SortOrder
    updatedBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: TenantFeatureFlagCountOrderByAggregateInput
    _max?: TenantFeatureFlagMaxOrderByAggregateInput
    _min?: TenantFeatureFlagMinOrderByAggregateInput
  }

  export type TenantFeatureFlagScalarWhereWithAggregatesInput = {
    AND?: TenantFeatureFlagScalarWhereWithAggregatesInput | TenantFeatureFlagScalarWhereWithAggregatesInput[]
    OR?: TenantFeatureFlagScalarWhereWithAggregatesInput[]
    NOT?: TenantFeatureFlagScalarWhereWithAggregatesInput | TenantFeatureFlagScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TenantFeatureFlag"> | string
    tenantId?: StringWithAggregatesFilter<"TenantFeatureFlag"> | string
    flagKey?: StringWithAggregatesFilter<"TenantFeatureFlag"> | string
    isEnabled?: BoolWithAggregatesFilter<"TenantFeatureFlag"> | boolean
    config?: JsonNullableWithAggregatesFilter<"TenantFeatureFlag">
    updatedBy?: StringNullableWithAggregatesFilter<"TenantFeatureFlag"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"TenantFeatureFlag"> | Date | string
  }

  export type TenantUsageLogWhereInput = {
    AND?: TenantUsageLogWhereInput | TenantUsageLogWhereInput[]
    OR?: TenantUsageLogWhereInput[]
    NOT?: TenantUsageLogWhereInput | TenantUsageLogWhereInput[]
    id?: StringFilter<"TenantUsageLog"> | string
    tenantId?: StringFilter<"TenantUsageLog"> | string
    month?: StringFilter<"TenantUsageLog"> | string
    productCount?: IntFilter<"TenantUsageLog"> | number
    orderCount?: IntFilter<"TenantUsageLog"> | number
    staffCount?: IntFilter<"TenantUsageLog"> | number
    warehouseCount?: IntFilter<"TenantUsageLog"> | number
    updatedAt?: DateTimeFilter<"TenantUsageLog"> | Date | string
  }

  export type TenantUsageLogOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    month?: SortOrder
    productCount?: SortOrder
    orderCount?: SortOrder
    staffCount?: SortOrder
    warehouseCount?: SortOrder
    updatedAt?: SortOrder
  }

  export type TenantUsageLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    tenantId_month?: TenantUsageLogTenantIdMonthCompoundUniqueInput
    AND?: TenantUsageLogWhereInput | TenantUsageLogWhereInput[]
    OR?: TenantUsageLogWhereInput[]
    NOT?: TenantUsageLogWhereInput | TenantUsageLogWhereInput[]
    tenantId?: StringFilter<"TenantUsageLog"> | string
    month?: StringFilter<"TenantUsageLog"> | string
    productCount?: IntFilter<"TenantUsageLog"> | number
    orderCount?: IntFilter<"TenantUsageLog"> | number
    staffCount?: IntFilter<"TenantUsageLog"> | number
    warehouseCount?: IntFilter<"TenantUsageLog"> | number
    updatedAt?: DateTimeFilter<"TenantUsageLog"> | Date | string
  }, "id" | "tenantId_month">

  export type TenantUsageLogOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    month?: SortOrder
    productCount?: SortOrder
    orderCount?: SortOrder
    staffCount?: SortOrder
    warehouseCount?: SortOrder
    updatedAt?: SortOrder
    _count?: TenantUsageLogCountOrderByAggregateInput
    _avg?: TenantUsageLogAvgOrderByAggregateInput
    _max?: TenantUsageLogMaxOrderByAggregateInput
    _min?: TenantUsageLogMinOrderByAggregateInput
    _sum?: TenantUsageLogSumOrderByAggregateInput
  }

  export type TenantUsageLogScalarWhereWithAggregatesInput = {
    AND?: TenantUsageLogScalarWhereWithAggregatesInput | TenantUsageLogScalarWhereWithAggregatesInput[]
    OR?: TenantUsageLogScalarWhereWithAggregatesInput[]
    NOT?: TenantUsageLogScalarWhereWithAggregatesInput | TenantUsageLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TenantUsageLog"> | string
    tenantId?: StringWithAggregatesFilter<"TenantUsageLog"> | string
    month?: StringWithAggregatesFilter<"TenantUsageLog"> | string
    productCount?: IntWithAggregatesFilter<"TenantUsageLog"> | number
    orderCount?: IntWithAggregatesFilter<"TenantUsageLog"> | number
    staffCount?: IntWithAggregatesFilter<"TenantUsageLog"> | number
    warehouseCount?: IntWithAggregatesFilter<"TenantUsageLog"> | number
    updatedAt?: DateTimeWithAggregatesFilter<"TenantUsageLog"> | Date | string
  }

  export type TenantCreateInput = {
    id?: string
    name: string
    slug: string
    plan?: string
    status?: string
    trialEndsAt?: Date | string | null
    billingEmail: string
    billingName?: string | null
    billingAddress?: NullableJsonNullValueInput | InputJsonValue
    timezone?: string
    locale?: string
    currency?: string
    customDomain?: string | null
    logoUrl?: string | null
    settings?: JsonNullValueInput | InputJsonValue
    dbSchemaName?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    featureFlags?: TenantFeatureFlagCreateNestedManyWithoutTenantInput
  }

  export type TenantUncheckedCreateInput = {
    id?: string
    name: string
    slug: string
    plan?: string
    status?: string
    trialEndsAt?: Date | string | null
    billingEmail: string
    billingName?: string | null
    billingAddress?: NullableJsonNullValueInput | InputJsonValue
    timezone?: string
    locale?: string
    currency?: string
    customDomain?: string | null
    logoUrl?: string | null
    settings?: JsonNullValueInput | InputJsonValue
    dbSchemaName?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    featureFlags?: TenantFeatureFlagUncheckedCreateNestedManyWithoutTenantInput
  }

  export type TenantUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    billingEmail?: StringFieldUpdateOperationsInput | string
    billingName?: NullableStringFieldUpdateOperationsInput | string | null
    billingAddress?: NullableJsonNullValueInput | InputJsonValue
    timezone?: StringFieldUpdateOperationsInput | string
    locale?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    customDomain?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    settings?: JsonNullValueInput | InputJsonValue
    dbSchemaName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    featureFlags?: TenantFeatureFlagUpdateManyWithoutTenantNestedInput
  }

  export type TenantUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    billingEmail?: StringFieldUpdateOperationsInput | string
    billingName?: NullableStringFieldUpdateOperationsInput | string | null
    billingAddress?: NullableJsonNullValueInput | InputJsonValue
    timezone?: StringFieldUpdateOperationsInput | string
    locale?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    customDomain?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    settings?: JsonNullValueInput | InputJsonValue
    dbSchemaName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    featureFlags?: TenantFeatureFlagUncheckedUpdateManyWithoutTenantNestedInput
  }

  export type TenantCreateManyInput = {
    id?: string
    name: string
    slug: string
    plan?: string
    status?: string
    trialEndsAt?: Date | string | null
    billingEmail: string
    billingName?: string | null
    billingAddress?: NullableJsonNullValueInput | InputJsonValue
    timezone?: string
    locale?: string
    currency?: string
    customDomain?: string | null
    logoUrl?: string | null
    settings?: JsonNullValueInput | InputJsonValue
    dbSchemaName?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TenantUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    billingEmail?: StringFieldUpdateOperationsInput | string
    billingName?: NullableStringFieldUpdateOperationsInput | string | null
    billingAddress?: NullableJsonNullValueInput | InputJsonValue
    timezone?: StringFieldUpdateOperationsInput | string
    locale?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    customDomain?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    settings?: JsonNullValueInput | InputJsonValue
    dbSchemaName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TenantUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    billingEmail?: StringFieldUpdateOperationsInput | string
    billingName?: NullableStringFieldUpdateOperationsInput | string | null
    billingAddress?: NullableJsonNullValueInput | InputJsonValue
    timezone?: StringFieldUpdateOperationsInput | string
    locale?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    customDomain?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    settings?: JsonNullValueInput | InputJsonValue
    dbSchemaName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TenantPlanCreateInput = {
    id?: string
    name: string
    priceMonthly: number
    priceAnnual: number
    maxProducts?: number
    maxOrdersPerMonth?: number
    maxStaffUsers?: number
    maxWarehouses?: number
    features?: JsonNullValueInput | InputJsonValue
    isActive?: boolean
  }

  export type TenantPlanUncheckedCreateInput = {
    id?: string
    name: string
    priceMonthly: number
    priceAnnual: number
    maxProducts?: number
    maxOrdersPerMonth?: number
    maxStaffUsers?: number
    maxWarehouses?: number
    features?: JsonNullValueInput | InputJsonValue
    isActive?: boolean
  }

  export type TenantPlanUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    priceMonthly?: IntFieldUpdateOperationsInput | number
    priceAnnual?: IntFieldUpdateOperationsInput | number
    maxProducts?: IntFieldUpdateOperationsInput | number
    maxOrdersPerMonth?: IntFieldUpdateOperationsInput | number
    maxStaffUsers?: IntFieldUpdateOperationsInput | number
    maxWarehouses?: IntFieldUpdateOperationsInput | number
    features?: JsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type TenantPlanUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    priceMonthly?: IntFieldUpdateOperationsInput | number
    priceAnnual?: IntFieldUpdateOperationsInput | number
    maxProducts?: IntFieldUpdateOperationsInput | number
    maxOrdersPerMonth?: IntFieldUpdateOperationsInput | number
    maxStaffUsers?: IntFieldUpdateOperationsInput | number
    maxWarehouses?: IntFieldUpdateOperationsInput | number
    features?: JsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type TenantPlanCreateManyInput = {
    id?: string
    name: string
    priceMonthly: number
    priceAnnual: number
    maxProducts?: number
    maxOrdersPerMonth?: number
    maxStaffUsers?: number
    maxWarehouses?: number
    features?: JsonNullValueInput | InputJsonValue
    isActive?: boolean
  }

  export type TenantPlanUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    priceMonthly?: IntFieldUpdateOperationsInput | number
    priceAnnual?: IntFieldUpdateOperationsInput | number
    maxProducts?: IntFieldUpdateOperationsInput | number
    maxOrdersPerMonth?: IntFieldUpdateOperationsInput | number
    maxStaffUsers?: IntFieldUpdateOperationsInput | number
    maxWarehouses?: IntFieldUpdateOperationsInput | number
    features?: JsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type TenantPlanUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    priceMonthly?: IntFieldUpdateOperationsInput | number
    priceAnnual?: IntFieldUpdateOperationsInput | number
    maxProducts?: IntFieldUpdateOperationsInput | number
    maxOrdersPerMonth?: IntFieldUpdateOperationsInput | number
    maxStaffUsers?: IntFieldUpdateOperationsInput | number
    maxWarehouses?: IntFieldUpdateOperationsInput | number
    features?: JsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type TenantFeatureFlagCreateInput = {
    id?: string
    flagKey: string
    isEnabled?: boolean
    config?: NullableJsonNullValueInput | InputJsonValue
    updatedBy?: string | null
    createdAt?: Date | string
    tenant: TenantCreateNestedOneWithoutFeatureFlagsInput
  }

  export type TenantFeatureFlagUncheckedCreateInput = {
    id?: string
    tenantId: string
    flagKey: string
    isEnabled?: boolean
    config?: NullableJsonNullValueInput | InputJsonValue
    updatedBy?: string | null
    createdAt?: Date | string
  }

  export type TenantFeatureFlagUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    flagKey?: StringFieldUpdateOperationsInput | string
    isEnabled?: BoolFieldUpdateOperationsInput | boolean
    config?: NullableJsonNullValueInput | InputJsonValue
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenant?: TenantUpdateOneRequiredWithoutFeatureFlagsNestedInput
  }

  export type TenantFeatureFlagUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    flagKey?: StringFieldUpdateOperationsInput | string
    isEnabled?: BoolFieldUpdateOperationsInput | boolean
    config?: NullableJsonNullValueInput | InputJsonValue
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TenantFeatureFlagCreateManyInput = {
    id?: string
    tenantId: string
    flagKey: string
    isEnabled?: boolean
    config?: NullableJsonNullValueInput | InputJsonValue
    updatedBy?: string | null
    createdAt?: Date | string
  }

  export type TenantFeatureFlagUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    flagKey?: StringFieldUpdateOperationsInput | string
    isEnabled?: BoolFieldUpdateOperationsInput | boolean
    config?: NullableJsonNullValueInput | InputJsonValue
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TenantFeatureFlagUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    flagKey?: StringFieldUpdateOperationsInput | string
    isEnabled?: BoolFieldUpdateOperationsInput | boolean
    config?: NullableJsonNullValueInput | InputJsonValue
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TenantUsageLogCreateInput = {
    id?: string
    tenantId: string
    month: string
    productCount?: number
    orderCount?: number
    staffCount?: number
    warehouseCount?: number
    updatedAt?: Date | string
  }

  export type TenantUsageLogUncheckedCreateInput = {
    id?: string
    tenantId: string
    month: string
    productCount?: number
    orderCount?: number
    staffCount?: number
    warehouseCount?: number
    updatedAt?: Date | string
  }

  export type TenantUsageLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    month?: StringFieldUpdateOperationsInput | string
    productCount?: IntFieldUpdateOperationsInput | number
    orderCount?: IntFieldUpdateOperationsInput | number
    staffCount?: IntFieldUpdateOperationsInput | number
    warehouseCount?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TenantUsageLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    month?: StringFieldUpdateOperationsInput | string
    productCount?: IntFieldUpdateOperationsInput | number
    orderCount?: IntFieldUpdateOperationsInput | number
    staffCount?: IntFieldUpdateOperationsInput | number
    warehouseCount?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TenantUsageLogCreateManyInput = {
    id?: string
    tenantId: string
    month: string
    productCount?: number
    orderCount?: number
    staffCount?: number
    warehouseCount?: number
    updatedAt?: Date | string
  }

  export type TenantUsageLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    month?: StringFieldUpdateOperationsInput | string
    productCount?: IntFieldUpdateOperationsInput | number
    orderCount?: IntFieldUpdateOperationsInput | number
    staffCount?: IntFieldUpdateOperationsInput | number
    warehouseCount?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TenantUsageLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    month?: StringFieldUpdateOperationsInput | string
    productCount?: IntFieldUpdateOperationsInput | number
    orderCount?: IntFieldUpdateOperationsInput | number
    staffCount?: IntFieldUpdateOperationsInput | number
    warehouseCount?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }
  export type JsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }
  export type JsonFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type TenantFeatureFlagListRelationFilter = {
    every?: TenantFeatureFlagWhereInput
    some?: TenantFeatureFlagWhereInput
    none?: TenantFeatureFlagWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type TenantFeatureFlagOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TenantCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    plan?: SortOrder
    status?: SortOrder
    trialEndsAt?: SortOrder
    billingEmail?: SortOrder
    billingName?: SortOrder
    billingAddress?: SortOrder
    timezone?: SortOrder
    locale?: SortOrder
    currency?: SortOrder
    customDomain?: SortOrder
    logoUrl?: SortOrder
    settings?: SortOrder
    dbSchemaName?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TenantMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    plan?: SortOrder
    status?: SortOrder
    trialEndsAt?: SortOrder
    billingEmail?: SortOrder
    billingName?: SortOrder
    timezone?: SortOrder
    locale?: SortOrder
    currency?: SortOrder
    customDomain?: SortOrder
    logoUrl?: SortOrder
    dbSchemaName?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TenantMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    plan?: SortOrder
    status?: SortOrder
    trialEndsAt?: SortOrder
    billingEmail?: SortOrder
    billingName?: SortOrder
    timezone?: SortOrder
    locale?: SortOrder
    currency?: SortOrder
    customDomain?: SortOrder
    logoUrl?: SortOrder
    dbSchemaName?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type TenantPlanCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    priceMonthly?: SortOrder
    priceAnnual?: SortOrder
    maxProducts?: SortOrder
    maxOrdersPerMonth?: SortOrder
    maxStaffUsers?: SortOrder
    maxWarehouses?: SortOrder
    features?: SortOrder
    isActive?: SortOrder
  }

  export type TenantPlanAvgOrderByAggregateInput = {
    priceMonthly?: SortOrder
    priceAnnual?: SortOrder
    maxProducts?: SortOrder
    maxOrdersPerMonth?: SortOrder
    maxStaffUsers?: SortOrder
    maxWarehouses?: SortOrder
  }

  export type TenantPlanMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    priceMonthly?: SortOrder
    priceAnnual?: SortOrder
    maxProducts?: SortOrder
    maxOrdersPerMonth?: SortOrder
    maxStaffUsers?: SortOrder
    maxWarehouses?: SortOrder
    isActive?: SortOrder
  }

  export type TenantPlanMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    priceMonthly?: SortOrder
    priceAnnual?: SortOrder
    maxProducts?: SortOrder
    maxOrdersPerMonth?: SortOrder
    maxStaffUsers?: SortOrder
    maxWarehouses?: SortOrder
    isActive?: SortOrder
  }

  export type TenantPlanSumOrderByAggregateInput = {
    priceMonthly?: SortOrder
    priceAnnual?: SortOrder
    maxProducts?: SortOrder
    maxOrdersPerMonth?: SortOrder
    maxStaffUsers?: SortOrder
    maxWarehouses?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type TenantRelationFilter = {
    is?: TenantWhereInput
    isNot?: TenantWhereInput
  }

  export type TenantFeatureFlagTenantIdFlagKeyCompoundUniqueInput = {
    tenantId: string
    flagKey: string
  }

  export type TenantFeatureFlagCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    flagKey?: SortOrder
    isEnabled?: SortOrder
    config?: SortOrder
    updatedBy?: SortOrder
    createdAt?: SortOrder
  }

  export type TenantFeatureFlagMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    flagKey?: SortOrder
    isEnabled?: SortOrder
    updatedBy?: SortOrder
    createdAt?: SortOrder
  }

  export type TenantFeatureFlagMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    flagKey?: SortOrder
    isEnabled?: SortOrder
    updatedBy?: SortOrder
    createdAt?: SortOrder
  }

  export type TenantUsageLogTenantIdMonthCompoundUniqueInput = {
    tenantId: string
    month: string
  }

  export type TenantUsageLogCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    month?: SortOrder
    productCount?: SortOrder
    orderCount?: SortOrder
    staffCount?: SortOrder
    warehouseCount?: SortOrder
    updatedAt?: SortOrder
  }

  export type TenantUsageLogAvgOrderByAggregateInput = {
    productCount?: SortOrder
    orderCount?: SortOrder
    staffCount?: SortOrder
    warehouseCount?: SortOrder
  }

  export type TenantUsageLogMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    month?: SortOrder
    productCount?: SortOrder
    orderCount?: SortOrder
    staffCount?: SortOrder
    warehouseCount?: SortOrder
    updatedAt?: SortOrder
  }

  export type TenantUsageLogMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    month?: SortOrder
    productCount?: SortOrder
    orderCount?: SortOrder
    staffCount?: SortOrder
    warehouseCount?: SortOrder
    updatedAt?: SortOrder
  }

  export type TenantUsageLogSumOrderByAggregateInput = {
    productCount?: SortOrder
    orderCount?: SortOrder
    staffCount?: SortOrder
    warehouseCount?: SortOrder
  }

  export type TenantFeatureFlagCreateNestedManyWithoutTenantInput = {
    create?: XOR<TenantFeatureFlagCreateWithoutTenantInput, TenantFeatureFlagUncheckedCreateWithoutTenantInput> | TenantFeatureFlagCreateWithoutTenantInput[] | TenantFeatureFlagUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: TenantFeatureFlagCreateOrConnectWithoutTenantInput | TenantFeatureFlagCreateOrConnectWithoutTenantInput[]
    createMany?: TenantFeatureFlagCreateManyTenantInputEnvelope
    connect?: TenantFeatureFlagWhereUniqueInput | TenantFeatureFlagWhereUniqueInput[]
  }

  export type TenantFeatureFlagUncheckedCreateNestedManyWithoutTenantInput = {
    create?: XOR<TenantFeatureFlagCreateWithoutTenantInput, TenantFeatureFlagUncheckedCreateWithoutTenantInput> | TenantFeatureFlagCreateWithoutTenantInput[] | TenantFeatureFlagUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: TenantFeatureFlagCreateOrConnectWithoutTenantInput | TenantFeatureFlagCreateOrConnectWithoutTenantInput[]
    createMany?: TenantFeatureFlagCreateManyTenantInputEnvelope
    connect?: TenantFeatureFlagWhereUniqueInput | TenantFeatureFlagWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type TenantFeatureFlagUpdateManyWithoutTenantNestedInput = {
    create?: XOR<TenantFeatureFlagCreateWithoutTenantInput, TenantFeatureFlagUncheckedCreateWithoutTenantInput> | TenantFeatureFlagCreateWithoutTenantInput[] | TenantFeatureFlagUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: TenantFeatureFlagCreateOrConnectWithoutTenantInput | TenantFeatureFlagCreateOrConnectWithoutTenantInput[]
    upsert?: TenantFeatureFlagUpsertWithWhereUniqueWithoutTenantInput | TenantFeatureFlagUpsertWithWhereUniqueWithoutTenantInput[]
    createMany?: TenantFeatureFlagCreateManyTenantInputEnvelope
    set?: TenantFeatureFlagWhereUniqueInput | TenantFeatureFlagWhereUniqueInput[]
    disconnect?: TenantFeatureFlagWhereUniqueInput | TenantFeatureFlagWhereUniqueInput[]
    delete?: TenantFeatureFlagWhereUniqueInput | TenantFeatureFlagWhereUniqueInput[]
    connect?: TenantFeatureFlagWhereUniqueInput | TenantFeatureFlagWhereUniqueInput[]
    update?: TenantFeatureFlagUpdateWithWhereUniqueWithoutTenantInput | TenantFeatureFlagUpdateWithWhereUniqueWithoutTenantInput[]
    updateMany?: TenantFeatureFlagUpdateManyWithWhereWithoutTenantInput | TenantFeatureFlagUpdateManyWithWhereWithoutTenantInput[]
    deleteMany?: TenantFeatureFlagScalarWhereInput | TenantFeatureFlagScalarWhereInput[]
  }

  export type TenantFeatureFlagUncheckedUpdateManyWithoutTenantNestedInput = {
    create?: XOR<TenantFeatureFlagCreateWithoutTenantInput, TenantFeatureFlagUncheckedCreateWithoutTenantInput> | TenantFeatureFlagCreateWithoutTenantInput[] | TenantFeatureFlagUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: TenantFeatureFlagCreateOrConnectWithoutTenantInput | TenantFeatureFlagCreateOrConnectWithoutTenantInput[]
    upsert?: TenantFeatureFlagUpsertWithWhereUniqueWithoutTenantInput | TenantFeatureFlagUpsertWithWhereUniqueWithoutTenantInput[]
    createMany?: TenantFeatureFlagCreateManyTenantInputEnvelope
    set?: TenantFeatureFlagWhereUniqueInput | TenantFeatureFlagWhereUniqueInput[]
    disconnect?: TenantFeatureFlagWhereUniqueInput | TenantFeatureFlagWhereUniqueInput[]
    delete?: TenantFeatureFlagWhereUniqueInput | TenantFeatureFlagWhereUniqueInput[]
    connect?: TenantFeatureFlagWhereUniqueInput | TenantFeatureFlagWhereUniqueInput[]
    update?: TenantFeatureFlagUpdateWithWhereUniqueWithoutTenantInput | TenantFeatureFlagUpdateWithWhereUniqueWithoutTenantInput[]
    updateMany?: TenantFeatureFlagUpdateManyWithWhereWithoutTenantInput | TenantFeatureFlagUpdateManyWithWhereWithoutTenantInput[]
    deleteMany?: TenantFeatureFlagScalarWhereInput | TenantFeatureFlagScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type TenantCreateNestedOneWithoutFeatureFlagsInput = {
    create?: XOR<TenantCreateWithoutFeatureFlagsInput, TenantUncheckedCreateWithoutFeatureFlagsInput>
    connectOrCreate?: TenantCreateOrConnectWithoutFeatureFlagsInput
    connect?: TenantWhereUniqueInput
  }

  export type TenantUpdateOneRequiredWithoutFeatureFlagsNestedInput = {
    create?: XOR<TenantCreateWithoutFeatureFlagsInput, TenantUncheckedCreateWithoutFeatureFlagsInput>
    connectOrCreate?: TenantCreateOrConnectWithoutFeatureFlagsInput
    upsert?: TenantUpsertWithoutFeatureFlagsInput
    connect?: TenantWhereUniqueInput
    update?: XOR<XOR<TenantUpdateToOneWithWhereWithoutFeatureFlagsInput, TenantUpdateWithoutFeatureFlagsInput>, TenantUncheckedUpdateWithoutFeatureFlagsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }
  export type NestedJsonFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type TenantFeatureFlagCreateWithoutTenantInput = {
    id?: string
    flagKey: string
    isEnabled?: boolean
    config?: NullableJsonNullValueInput | InputJsonValue
    updatedBy?: string | null
    createdAt?: Date | string
  }

  export type TenantFeatureFlagUncheckedCreateWithoutTenantInput = {
    id?: string
    flagKey: string
    isEnabled?: boolean
    config?: NullableJsonNullValueInput | InputJsonValue
    updatedBy?: string | null
    createdAt?: Date | string
  }

  export type TenantFeatureFlagCreateOrConnectWithoutTenantInput = {
    where: TenantFeatureFlagWhereUniqueInput
    create: XOR<TenantFeatureFlagCreateWithoutTenantInput, TenantFeatureFlagUncheckedCreateWithoutTenantInput>
  }

  export type TenantFeatureFlagCreateManyTenantInputEnvelope = {
    data: TenantFeatureFlagCreateManyTenantInput | TenantFeatureFlagCreateManyTenantInput[]
    skipDuplicates?: boolean
  }

  export type TenantFeatureFlagUpsertWithWhereUniqueWithoutTenantInput = {
    where: TenantFeatureFlagWhereUniqueInput
    update: XOR<TenantFeatureFlagUpdateWithoutTenantInput, TenantFeatureFlagUncheckedUpdateWithoutTenantInput>
    create: XOR<TenantFeatureFlagCreateWithoutTenantInput, TenantFeatureFlagUncheckedCreateWithoutTenantInput>
  }

  export type TenantFeatureFlagUpdateWithWhereUniqueWithoutTenantInput = {
    where: TenantFeatureFlagWhereUniqueInput
    data: XOR<TenantFeatureFlagUpdateWithoutTenantInput, TenantFeatureFlagUncheckedUpdateWithoutTenantInput>
  }

  export type TenantFeatureFlagUpdateManyWithWhereWithoutTenantInput = {
    where: TenantFeatureFlagScalarWhereInput
    data: XOR<TenantFeatureFlagUpdateManyMutationInput, TenantFeatureFlagUncheckedUpdateManyWithoutTenantInput>
  }

  export type TenantFeatureFlagScalarWhereInput = {
    AND?: TenantFeatureFlagScalarWhereInput | TenantFeatureFlagScalarWhereInput[]
    OR?: TenantFeatureFlagScalarWhereInput[]
    NOT?: TenantFeatureFlagScalarWhereInput | TenantFeatureFlagScalarWhereInput[]
    id?: StringFilter<"TenantFeatureFlag"> | string
    tenantId?: StringFilter<"TenantFeatureFlag"> | string
    flagKey?: StringFilter<"TenantFeatureFlag"> | string
    isEnabled?: BoolFilter<"TenantFeatureFlag"> | boolean
    config?: JsonNullableFilter<"TenantFeatureFlag">
    updatedBy?: StringNullableFilter<"TenantFeatureFlag"> | string | null
    createdAt?: DateTimeFilter<"TenantFeatureFlag"> | Date | string
  }

  export type TenantCreateWithoutFeatureFlagsInput = {
    id?: string
    name: string
    slug: string
    plan?: string
    status?: string
    trialEndsAt?: Date | string | null
    billingEmail: string
    billingName?: string | null
    billingAddress?: NullableJsonNullValueInput | InputJsonValue
    timezone?: string
    locale?: string
    currency?: string
    customDomain?: string | null
    logoUrl?: string | null
    settings?: JsonNullValueInput | InputJsonValue
    dbSchemaName?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TenantUncheckedCreateWithoutFeatureFlagsInput = {
    id?: string
    name: string
    slug: string
    plan?: string
    status?: string
    trialEndsAt?: Date | string | null
    billingEmail: string
    billingName?: string | null
    billingAddress?: NullableJsonNullValueInput | InputJsonValue
    timezone?: string
    locale?: string
    currency?: string
    customDomain?: string | null
    logoUrl?: string | null
    settings?: JsonNullValueInput | InputJsonValue
    dbSchemaName?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TenantCreateOrConnectWithoutFeatureFlagsInput = {
    where: TenantWhereUniqueInput
    create: XOR<TenantCreateWithoutFeatureFlagsInput, TenantUncheckedCreateWithoutFeatureFlagsInput>
  }

  export type TenantUpsertWithoutFeatureFlagsInput = {
    update: XOR<TenantUpdateWithoutFeatureFlagsInput, TenantUncheckedUpdateWithoutFeatureFlagsInput>
    create: XOR<TenantCreateWithoutFeatureFlagsInput, TenantUncheckedCreateWithoutFeatureFlagsInput>
    where?: TenantWhereInput
  }

  export type TenantUpdateToOneWithWhereWithoutFeatureFlagsInput = {
    where?: TenantWhereInput
    data: XOR<TenantUpdateWithoutFeatureFlagsInput, TenantUncheckedUpdateWithoutFeatureFlagsInput>
  }

  export type TenantUpdateWithoutFeatureFlagsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    billingEmail?: StringFieldUpdateOperationsInput | string
    billingName?: NullableStringFieldUpdateOperationsInput | string | null
    billingAddress?: NullableJsonNullValueInput | InputJsonValue
    timezone?: StringFieldUpdateOperationsInput | string
    locale?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    customDomain?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    settings?: JsonNullValueInput | InputJsonValue
    dbSchemaName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TenantUncheckedUpdateWithoutFeatureFlagsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    billingEmail?: StringFieldUpdateOperationsInput | string
    billingName?: NullableStringFieldUpdateOperationsInput | string | null
    billingAddress?: NullableJsonNullValueInput | InputJsonValue
    timezone?: StringFieldUpdateOperationsInput | string
    locale?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    customDomain?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    settings?: JsonNullValueInput | InputJsonValue
    dbSchemaName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TenantFeatureFlagCreateManyTenantInput = {
    id?: string
    flagKey: string
    isEnabled?: boolean
    config?: NullableJsonNullValueInput | InputJsonValue
    updatedBy?: string | null
    createdAt?: Date | string
  }

  export type TenantFeatureFlagUpdateWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    flagKey?: StringFieldUpdateOperationsInput | string
    isEnabled?: BoolFieldUpdateOperationsInput | boolean
    config?: NullableJsonNullValueInput | InputJsonValue
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TenantFeatureFlagUncheckedUpdateWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    flagKey?: StringFieldUpdateOperationsInput | string
    isEnabled?: BoolFieldUpdateOperationsInput | boolean
    config?: NullableJsonNullValueInput | InputJsonValue
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TenantFeatureFlagUncheckedUpdateManyWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    flagKey?: StringFieldUpdateOperationsInput | string
    isEnabled?: BoolFieldUpdateOperationsInput | boolean
    config?: NullableJsonNullValueInput | InputJsonValue
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use TenantCountOutputTypeDefaultArgs instead
     */
    export type TenantCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TenantCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TenantDefaultArgs instead
     */
    export type TenantArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TenantDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TenantPlanDefaultArgs instead
     */
    export type TenantPlanArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TenantPlanDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TenantFeatureFlagDefaultArgs instead
     */
    export type TenantFeatureFlagArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TenantFeatureFlagDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TenantUsageLogDefaultArgs instead
     */
    export type TenantUsageLogArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TenantUsageLogDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}