import React from 'react'
import { VStack, Flex, Text, Box } from '@chakra-ui/react'

type Card = {
  title: string
  subtitle: string
  miscInfos: { key: string; value: string }[]
  description?: string
  headerLeftComponent?: React.ReactNode
  headerRightComponent?: React.ReactNode
}
export const InfoCard: React.FC<Card> = ({
  title,
  subtitle,
  miscInfos,
  description,
  headerLeftComponent,
  headerRightComponent,
}) => {
  return (
    <VStack width="100%" alignItems="start" gap={1}>
      {/* Header */}
      <Flex width="100%">
        {headerLeftComponent && <Box>{headerLeftComponent}</Box>}
        <Box flex="1">
          <Text fontSize="2xl" noOfLines={2}>
            {title}
          </Text>
          <Text fontSize="xl" fontWeight="normal" noOfLines={2}>
            {subtitle}
          </Text>
          {miscInfos.map((info) => (
            <Text
              key={info.key}
              fontSize="md"
              fontWeight="normal"
              color="grey"
              noOfLines={1}
            >
              {info.value}
            </Text>
          ))}
        </Box>
        {headerRightComponent && <Box>{headerRightComponent}</Box>}
      </Flex>
      {/* Body */}
      {description && (
        <Text fontSize="md" fontWeight="normal" noOfLines={5}>
          {description}
        </Text>
      )}
    </VStack>
  )
}
