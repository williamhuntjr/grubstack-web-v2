import { NextResponse } from 'next/server'
import { getAllLocations } from 'common/actions/locations'

export async function GET() {
  const resp = await getAllLocations()
  return NextResponse.json(resp)
}

export const dynamic = 'force-dynamic'
