import type { Metadata } from 'next'
import { getCurrentLocation } from 'common/actions/locations'
import { getLocationProperties } from 'common/actions/locations'
import { Homepage } from 'modules/homepage/homepage'

export const metadata: Metadata = {
  title: 'GrubStack',
  description: 'Food CRM and Order Processing',
}

export default async function Page() {
  const location = await getCurrentLocation()
  const properties = await getLocationProperties(location.id)
  return <Homepage properties={properties ?? []} />
}
