import type { Metadata } from 'next'
import { Menus } from 'modules/menus/menus'
import { getCurrentLocation, getLocationMenus } from 'common/actions/locations'
import { IMenu, IItem } from 'common/types'

export const metadata: Metadata = {
  title: 'GrubStack',
  description: 'Food CRM and Order Processing',
}

function getRandomItem(data: IMenu[]) {
  let items: IItem[] = []

  data.forEach((menu) => {
    menu.items?.forEach((item) =>
      items.push({
        ...item,
        menu_id: menu.id,
        menu_slug: menu.slug,
      })
    )
  })

  var random = items[Math.floor(Math.random() * items.length)]
  return random
}

export default async function Page() {
  const location = await getCurrentLocation()
  const menus = location ? await getLocationMenus(location.id) : []
  const featuredItem = getRandomItem(menus)

  return <Menus data={menus} featuredItem={featuredItem} locationId={location.id} />
}
