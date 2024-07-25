import type { Metadata } from 'next'
import { getCurrentLocation } from 'common/actions/locations'
import { getLocationProperties } from 'common/actions/locations'
import { Homepage } from 'modules/homepage/homepage'
import { IProperty } from 'common/types'

export const metadata: Metadata = {
  title: 'GrubStack',
  description: 'Food CRM and Order Processing',
}

export default async function Page() {
  let properties:IProperty[]|null = []

  const location = await getCurrentLocation()

  if (location) {
    properties = await getLocationProperties(location.id)
  }

  return <Homepage properties={properties ?? []} />
}
