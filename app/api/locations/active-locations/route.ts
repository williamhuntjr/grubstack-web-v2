import { NextResponse } from 'next/server'
import { getActiveLocations } from 'common/actions/locations'

export async function GET() {
  const resp = await getActiveLocations()
  return NextResponse.json(resp)
}

export const dynamic = 'force-dynamic'