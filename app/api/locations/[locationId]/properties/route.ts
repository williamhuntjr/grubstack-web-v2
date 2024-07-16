import { NextResponse } from 'next/server'
import { getLocationProperties } from 'common/actions/locations'

export async function GET(request: Request, { params }: { params: { locationId: string } }) {
  const locationId = params.locationId
  const properties = await getLocationProperties(locationId)
  return NextResponse.json({ data: properties }, { status: 200 })
}
