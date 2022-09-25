import { createCompany } from 'domain/Company'
import { createPeriod, comparePeriods } from 'domain/Period'
import { generate as generateId } from 'utils/id'

import { Experience, Id } from 'types/Experience'

const defaultExperience: Experience = {
  id: generateId(),
  role: 'Software Engineer',
  summary:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. At quis risus sed vulputate odio ut enim. Vel risus commodo viverra maecenas accumsan lacus vel facilisis. Urna et pharetra pharetra massa massa ultricies mi quis hendrerit. Id leo in vitae turpis massa sed elementum. Consectetur adipiscing elit duis tristique sollicitudin nibh sit amet commodo. Amet nisl suscipit adipiscing bibendum est.',
  company: createCompany(),
  period: createPeriod(),
}

export const createExperience = (args?: Partial<Experience>): Experience => {
  return {
    ...defaultExperience,
    ...{ id: generateId() },
    ...args,
  }
}

export const getExperience = (
  experiences: Experience[],
  id: Id
): Experience | undefined => {
  return experiences.find((experience) => experience.id === id)
}

export const sortExperiences = (experiences: Experience[]) => {
  experiences.sort((experience1, experience2) => {
    return -1 * comparePeriods(experience1.period, experience2.period)
  })
}

export const addExperience = (
  experiences: Experience[],
  newExperience: Experience
) => {
  const resultingExperiences: Experience[] = [
    ...experiences,
    createExperience({ ...newExperience }),
  ]
  sortExperiences(resultingExperiences)
  return resultingExperiences
}

export const editExperience = (
  experiences: Experience[],
  targetId: Id,
  args: Partial<Experience>
) => {
  const resultingExperiences = experiences.map((experience) => {
    if (experience.id === targetId) {
      return createExperience({ ...experience, ...args })
    }
    return experience
  })
  sortExperiences(resultingExperiences)
  return resultingExperiences
}

export const deleteExperience = (experiences: Experience[], targetId: Id) => {
  return experiences.filter((experience) => {
    return experience.id === targetId
  })
}
