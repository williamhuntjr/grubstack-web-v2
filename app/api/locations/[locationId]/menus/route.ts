import { NextResponse } from 'next/server'
import { getLocationMenus } from 'common/actions/locations'

export async function GET(request: Request, { params }: { params: { locationId: string } }) {
  const locationId = params.locationId
  const menus = await getLocationMenus(locationId)
  return NextResponse.json({ data: menus }, { status: 200 })
}
