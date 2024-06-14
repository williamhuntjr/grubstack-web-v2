import { NextResponse } from 'next/server'

import { getLocation, setCurrentLocation } from 'common/actions/locations'

export async function POST(req: Request) {
  const json = await req.json()
  if (json.locationId) {
    const data = await getLocation(Number(json.locationId))
    if (data) {
      await setCurrentLocation(data)
      return NextResponse.json({ status: { code: 'success', message: 'Your location has been set' }}, { status: 200 })
    } else {
      return NextResponse.json({ status: { code: 'error', message: 'Could not set location' }}, { status: 400 })
    }
  }
}