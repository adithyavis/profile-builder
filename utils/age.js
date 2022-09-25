export const isValidAge = (age) => {
  if (!Number.isInteger(age)) {
    return false
  }
  return true
}

export const getAgePresentation = (age) => {
  return `${age} years old`
}
