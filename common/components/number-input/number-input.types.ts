export interface INumberInput {
  value: number
  onValueChange(value: number): void
  noNegativeValues?: boolean
}
