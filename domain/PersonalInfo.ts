import { PersonalInfo } from 'types/PersonalInfo'

const defaultNonNullPersonalInfo: PersonalInfo = {
  name: 'Adithya Viswamithiran',
  headline: 'Lorem ipsum dolor sit amet',
  age: 26,
  location: 'Tokyo, Japan',
  summary:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. At quis risus sed vulputate odio ut enim. Vel risus commodo viverra maecenas accumsan lacus vel facilisis. Urna et pharetra pharetra massa massa ultricies mi quis hendrerit. Id leo in vitae turpis massa sed elementum. Consectetur adipiscing elit duis tristique sollicitudin nibh sit amet commodo. Amet nisl suscipit adipiscing bibendum est.',
}

export const createPersonalInfo = (
  args?: Partial<PersonalInfo> | null
): PersonalInfo | null => {
  if (args === null) {
    return null
  }
  return {
    ...defaultNonNullPersonalInfo,
    ...args,
  }
}

export const editPersonalInfo = (
  personalInfo: PersonalInfo | null,
  args: Partial<PersonalInfo>
) => {
  return createPersonalInfo({ ...personalInfo, ...args })
}
