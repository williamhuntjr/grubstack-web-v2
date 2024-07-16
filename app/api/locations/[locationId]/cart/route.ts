import { NextResponse } from 'next/server'
import { getCart } from 'common/actions/cart'

export async function GET(request: Request, { params }: { params: { locationId: string } }) {
  const locationId = params.locationId
  const cart = await getCart(locationId)
  return NextResponse.json({ data: cart }, { status: 200 })
}
