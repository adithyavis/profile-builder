type Month = number
type Year = number

export type PeriodFrom = {
  month: Month
  year: Year
}
export type PeriodTo = { month?: Month; year?: Year; isLatest?: true }
export type Period = { from: PeriodFrom; to: PeriodTo }
