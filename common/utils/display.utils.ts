export function trimDialogTitle(title: string): string {
  return title.length > 40 ? `${title.substring(0, 40)}...` : title
}
