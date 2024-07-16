import breakpoints from 'assets/sass/breakpoints.module.scss'

export const xsMq = `(max-width:${breakpoints.xs})`
export const smMq = `(max-width:${breakpoints.sm})`
export const mdMq = `(max-width:${breakpoints.md})`
export const lgMq = `(max-width:${breakpoints.lg})`

export enum ApiMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export enum RestaurantProperty {
  'RestaurantName' = 'restaurant_name',
  'LogoImageUrl' = 'logo_image_url',
  'BannerImageUrl' = 'banner_image_url',
  'MobileBannerImageUrl' = 'mobile_banner_image_url',
  'PrimaryColor' = 'primary_color',
  'PrimaryColorContrast' = 'primary_color_contrast',
  'SecondaryColor' = 'secondary_color',
  'SecondaryColorContrast' = 'secondary_color_contrast',
  'HeaderBackgroundColor' = 'header_background_color',
  'HeaderForegroundColor' = 'header_foreground_color',
  'FooterBackgroundColor' = 'footer_background_color',
  'FooterForegroundColor' = 'footer_foreground_color',
  'TextColor' = 'text_color',
  'HeadlineTextColor' = 'headline_text_color',
}
