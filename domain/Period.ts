import { compare as compareTimes } from 'utils/time'

import { Period } from 'types/Period'

const defaultPeriod: Period = {
  from: { month: 1, year: 2022 },
  to: { isLatest: true },
}

export const createPeriod = (args?: Partial<Period>): Period => {
  return {
    ...defaultPeriod,
    ...args,
  }
}

export const isValidPeriod = (period: Period) => {
  if (period.to.isLatest) {
    return true
  }
  return compareTimes(period.to, period.from) >= 0
}

export const comparePeriods = (
  period1: Period,
  period2: Period
): -1 | 0 | 1 => {
  if (period1.to.isLatest) {
    if (period2.to.isLatest) {
      return compareTimes(period1.from, period2.from)
    }
    return 1
  }

  if (period2.to.isLatest) {
    return -1
  }

  const toTimesComparisonResult = compareTimes(period1.to, period2.to)
  if (toTimesComparisonResult === 0) {
    return compareTimes(period1.from, period2.from)
  } else {
    return toTimesComparisonResult
  }
}
