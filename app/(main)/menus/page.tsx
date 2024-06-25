import type { Metadata } from 'next'
import { Menus } from 'modules/menus/menus'
import { getCurrentLocation, getLocationMenus } from 'common/actions/locations'

export const metadata: Metadata = {
  title: 'GrubStack',
  description: 'Food CRM and Order Processing',
}

export default async function Page() {
  const location = await getCurrentLocation()
  const menus = await getLocationMenus(location.id)

  return <Menus data={menus} />
}
