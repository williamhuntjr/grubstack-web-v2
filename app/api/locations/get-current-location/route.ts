import { NextResponse } from 'next/server'
import { getCurrentLocation } from "actions/locations"

export async function GET() {
  const location = await getCurrentLocation()
  if (location) {
    return NextResponse.json({ data: location, status: { code: 'success' }}, { status: 200 })
  } else {
    return NextResponse.json({ data: null, status: { code: 'success' }}, { status: 200 })
  }
}

export const dynamic = 'force-dynamic'