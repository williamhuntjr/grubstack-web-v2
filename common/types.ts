export interface IIngredient {
  id?: string
  name: string
  description: string
  thumbnail_url: string
  calories: number
  fat: number
  saturated_fat: number
  trans_fat: number
  cholesterol: number
  sodium: number
  carbs: number
  protein: number
  sugar: number
  fiber: number
  price: number
  is_optional?: boolean
  is_addon?: boolean
  is_extra?: boolean
}

export interface IVariety {
  id?: string
  name: string
  description: string
  thumbnail_url: string
}

export interface IItem {
  id?: string
  name: string
  description: string
  thumbnail_url: string
  slug: string
  varieties?: IVariety[]
  ingredients?: IIngredient[]
  price?: number
  sale_price?: number
  is_onsale?: boolean
  menu_id?: string
  menu_slug?: string
}

export interface IMenu {
  id?: string
  name: string
  description: string
  slug: string
  thumbnail_url: string
  items?: IItem[]
}

export interface ILocation {
  id?: string
  name: string
  address1: string
  city: string
  state: string
  postal: string
  location_type: string
  phone_number: string
  create_date?: string
  menus?: IMenu[]
  is_active: boolean
}

export interface IProperty {
  id: string
  key: string
  value: string
}
