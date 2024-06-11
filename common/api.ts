'use server'

import { RequestInit } from 'next/dist/server/web/spec-extension/request'
import { appConfig } from './config'

export const callApi = async (endpoint: string, method: string, body?: RequestInit['body'] | null | undefined) => {
  const sendRequest = async () => {
    let headers: RequestInit['headers'] = {
      Authorization: `Basic ${appConfig.accessToken}`,
    }

    const params: globalThis.RequestInit = {
      method: method,
      body: body,
      next: { revalidate: 60 }
    }

    if (method == 'PUT' || method == 'POST') {
      headers = {
        ...headers,
        'Content-Type': 'application/json',
      }
    }

    params.headers = headers

    const resp = await fetch(`${appConfig.apiLocation}${endpoint}`, params)
    const json = await resp.json()
    return { resp, json }
  }

  let { resp, json } = await sendRequest()

  if (resp.status != 200 && resp.status != 201) {
    console.error(new Error(json.status.message))
    return
  }

  return json
}
