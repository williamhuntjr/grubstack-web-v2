import type { Metadata } from 'next'
import { getCurrentLocation } from 'common/actions/locations'
import { getLocationMenus } from 'common/actions/locations'
import { MenuItems } from 'modules/menu-items/menu-items'

export const metadata: Metadata = {
  title: 'GrubStack',
  description: 'Food CRM and Order Processing',
}

export default async function Page({ params }: { params: { menu_slug: string } }) {
  const location = await getCurrentLocation()
  const menus = location ? await getLocationMenus(location.id) : []
  const filtered = menus.filter((menu) => menu.slug.toLowerCase() == params.menu_slug.toLowerCase())

  return <MenuItems data={filtered.length > 0 ? filtered[0] : undefined} locationId={location.id} />
}
