import React from 'react'
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Textarea,
  VStack,
} from '@chakra-ui/react'
import {
  UseFormRegister,
  FieldValues,
  DeepMap,
  FieldError,
} from 'react-hook-form'

import { PersonalInfo } from 'types/PersonalInfo'

type Props = {
  personalInfo?: PersonalInfo | null
  register: UseFormRegister<FieldValues>
  errors: DeepMap<FieldValues, FieldError>
}
export const PersonalInfoForm: React.FC<Props> = ({
  personalInfo,
  errors,
  register,
}) => {
  return (
    <form>
      <VStack gap={4}>
        <FormControl isInvalid={errors.name} width="100%">
          <FormLabel htmlFor="name">Name</FormLabel>
          <Input
            defaultValue={personalInfo ? personalInfo.name : ''}
            {...register('name', {
              required: 'Name is required',
            })}
          />
          <FormErrorMessage>
            {errors.name && errors.name.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.headline} width="100%">
          <FormLabel htmlFor="headline">Headline</FormLabel>
          <Input
            defaultValue={personalInfo ? personalInfo.headline : ''}
            {...register('headline', {
              required: 'Headline is required',
            })}
          />
          <FormErrorMessage>
            {errors.headline && errors.headline.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.age} width="100%">
          <FormLabel htmlFor="summary">Age</FormLabel>
          <Input
            defaultValue={personalInfo ? personalInfo.age : ''}
            type="number"
            {...register('age', {
              required: 'Age is required',
              valueAsNumber: true,
            })}
          />
          <FormErrorMessage>
            {errors.age && errors.age.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.location} width="100%">
          <FormLabel htmlFor="location">Location</FormLabel>
          <Input
            defaultValue={personalInfo ? personalInfo.location : ''}
            {...register('location', {
              required: 'Location is required',
            })}
          />
          <FormErrorMessage>
            {errors.location && errors.location.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.summary} width="100%">
          <FormLabel htmlFor="summary">Summary</FormLabel>
          <Textarea
            defaultValue={personalInfo ? personalInfo.summary : ''}
            {...register('summary', {
              required: 'Summary is required',
            })}
          />
          <FormErrorMessage>
            {errors.summary && errors.summary.message}
          </FormErrorMessage>
        </FormControl>
      </VStack>
    </form>
  )
}
