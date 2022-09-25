export const isValidMonth = (month) => {
  if (!Number.isInteger(month)) {
    return false
  }
  return month >= 1 && month <= 12
}

export const isValidYear = (year) => {
  if (!Number.isInteger(year)) {
    return false
  }
  const currentDate = new Date()
  return year >= 1 && year <= currentDate.getFullYear()
}

/**
 * Return 1 if time1 is more recent than time2, 0 if they are the same times and -1 otherwise.
 */
export const compare = (time1, time2) => {
  if (time1.year > time2.year) {
    return 1
  } else if (time1.year < time2.year) {
    return -1
  }

  if (time1.month > time2.month) {
    return 1
  } else if (time1.month < time2.month) {
    return -1
  }
  return 0
}
