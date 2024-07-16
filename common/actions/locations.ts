'use server'

import { cookies } from 'next/headers'

import { callApi } from 'common/api'
import { ApiMethod } from 'common/constants'
import { ILocation, IMenu, IProperty } from 'common/types'

const LocationCookie = 'store-location'

export async function getAllLocations() {
  const resp = await callApi('/locations', ApiMethod.GET)
  return resp ? (resp.data as ILocation[]) : null
}

export async function getActiveLocations() {
  const resp = await callApi('/locations?isActive=true', ApiMethod.GET)
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

export async function getLocationMenus(locationId: string) {
  const resp = await callApi(`/locations/${locationId}/menus`, ApiMethod.GET)
  return resp ? (resp.data as IMenu[]) : []
}

export async function getLocationProperties(locationId: string) {
  const resp = await callApi(`/locations/${locationId}/properties`, ApiMethod.GET)
  return resp ? (resp.data as IProperty[]) : null
}

export async function getLocationProperty(locationId: string, key: string) {
  const resp = await callApi(`/locations/${locationId}/properties/${key}`, ApiMethod.GET)
  return resp ? (resp.data as IProperty) : null
}
