export interface IGlobalConstants {
  apiLocation: string
  accessToken: string
  productionUrl: string
  squareAppId: string
}

export const appConfig: IGlobalConstants = {
  apiLocation: process.env.API_URL || 'https://api.grubstack.app/v1',
  accessToken: process.env.ACCESS_TOKEN || 'abcd1234',
  productionUrl: process.env.PRODUCTION_URL || 'http://local.grubstack.app',
  squareAppId: process.env.SQUARE_APP_ID || 'sandbox-sq0idb-gCjFLdsHSC4VkTyBRod5Rg',
}
