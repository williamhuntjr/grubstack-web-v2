export interface ICardListItem {
  name: string
  thumbnail_url: string
  slug: string
}

export interface ICardList {
  data: ICardListItem[]
  title: string
  route: string
}
