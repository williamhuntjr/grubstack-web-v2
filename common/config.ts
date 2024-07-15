export interface IGlobalConstants {
  apiLocation: string
  accessToken: string
  siteUrl: string
  tenantId: string
  productionUrl: string
}

export const appConfig: IGlobalConstants = {
  apiLocation: process.env.API_URL || 'https://api.grubstack.app/v1',
  accessToken: process.env.ACCESS_TOKEN || 'abcd1234',
  siteUrl: process.env.SITE_URL || 'http://localhost:3003',
  tenantId: process.env.TENANT_ID || 'some-tenant-id',
  productionUrl: process.env.PRODUCTION_URL || 'http://local.grubstack.app'
}
