import React from 'react'
import { Center, Text } from '@chakra-ui/react'
import { useStoreContext } from 'providers/StoreProvider'
import { InfoCard } from 'components/core/InfoCard'
import { getAgePresentation } from 'utils/age'

export const PersonalInfoCard: React.FC = () => {
  const { personalInfo } = useStoreContext()
  if (personalInfo === null) {
    return (
      <Center>
        <Text>Empty!!</Text>
      </Center>
    )
  }
  return (
    <InfoCard
      title={personalInfo.name}
      subtitle={personalInfo.headline}
      miscInfos={[
        { key: 'age', value: getAgePresentation(personalInfo.age) },
        { key: 'place', value: personalInfo.location },
      ]}
      description={personalInfo.summary}
    />
  )
}
