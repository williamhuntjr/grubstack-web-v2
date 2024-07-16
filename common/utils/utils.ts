import { IProperty } from 'common/types'

export const cls = (...classes: (string | false | undefined)[]): string => classes.filter(Boolean).join(' ')

export function getProperty(properties: IProperty[], key: string) {
  const filtered = properties.filter((property) => property.key == key)
  return filtered.length > 0 ? filtered[0].value : undefined
}
