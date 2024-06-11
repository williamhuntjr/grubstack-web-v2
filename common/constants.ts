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
