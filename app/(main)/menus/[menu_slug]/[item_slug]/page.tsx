import type { Metadata } from 'next'
import { getCurrentLocation } from 'common/actions/locations'
import { getLocationMenus } from 'common/actions/locations'
import { ItemDetails } from 'modules/item-details/item-details'

export const metadata: Metadata = {
  title: 'GrubStack',
  description: 'Food CRM and Order Processing',
}

export default async function Page({ params }: { params: { menu_slug: string; item_slug: string } }) {
  const location = await getCurrentLocation()
  const menus = location ? await getLocationMenus(location.id) : []
  const filteredMenu = menus.filter((menu) => menu.slug.toLowerCase() == params.menu_slug.toLowerCase())
  const filteredItem =
    filteredMenu.length > 0 ? filteredMenu[0].items?.filter((item) => item.slug.toLowerCase() == params.item_slug.toLowerCase()) : undefined

  return (
    <ItemDetails
      data={filteredItem ? filteredItem[0] : undefined}
      menu={filteredMenu.length > 0 ? filteredMenu[0] : undefined}
      locationId={location.id}
    />
  )
}
