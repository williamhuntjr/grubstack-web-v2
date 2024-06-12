'use server'

import { cookies } from 'next/headers'

import { callApi } from 'common/api'
import { ApiMethod } from 'common/constants'
import { ILocation } from 'common/types'

const LocationCookie = 'store-location'

export async function getAllLocations() {
  const resp = await callApi('/locations', ApiMethod.GET)
  return resp ? (resp.data as ILocation[]) : null
}

export async function getLocation(locationId: number) {
  const resp = await callApi(`/locations/${locationId}`, ApiMethod.GET)
  return resp ? (resp.data as ILocation) : null
}

export async function setCurrentLocation(location: ILocation) {
  cookies().set({
    name: LocationCookie,
    value: JSON.stringify(location),
    httpOnly: true,
    path: '/',
  })
}

export async function getCurrentLocation() {
  const hasCookie = cookies().has(LocationCookie)
  if (hasCookie) {
    const cookie = cookies().get(LocationCookie)
    return JSON.parse(cookie?.value ?? '')
  } else {
    return null
  }
}