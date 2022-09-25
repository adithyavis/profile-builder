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
    ...args,
  }
}

export const addExperience = (
  experiences: Experience[],
  newExperience: Experience
) => {
  const resultingExperiences: Experience[] = []
  let isNewExperienceAdded = false
  for (let i = 0; i < experiences.length; i++) {
    const currentExperience = experiences[i]
    const periodsComparisonResult = comparePeriods(
      newExperience.period,
      currentExperience.period
    )
    if (periodsComparisonResult >= 0) {
      resultingExperiences.push(newExperience)
      isNewExperienceAdded = true
    }
    resultingExperiences.push(currentExperience)
  }
  if (!isNewExperienceAdded) {
    resultingExperiences.push(newExperience)
  }
  return resultingExperiences
}

export const editExperience = (
  experiences: Experience[],
  targetId: Id,
  args: Partial<Experience>
) => {
  return experiences.map((experience) => {
    if (experience.id === targetId) {
      return createExperience({ ...experience, ...args })
    }
    return experience
  })
}

export const deleteExperience = (experiences: Experience[], targetId: Id) => {
  return experiences.filter((experience) => {
    return experience.id === targetId
  })
}
