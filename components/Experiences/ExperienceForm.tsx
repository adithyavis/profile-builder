import React, { useState, useEffect } from 'react'
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Textarea,
  Select,
  VStack,
  Flex,
  Box,
  Checkbox,
} from '@chakra-ui/react'
import {
  UseFormRegister,
  FieldValues,
  DeepMap,
  FieldError,
  UseFormWatch,
  UseFormSetError,
  UseFormClearErrors,
} from 'react-hook-form'
import { isValidPeriod } from 'domain/Period'

import { Experience } from 'types/Experience'

const MONTHS = Array.from({ length: 12 }, (_, i) => {
  const date = new Date(0, i)
  const numeric: number = date.getMonth() + 1 // Jan is 1
  const shortString: string = date.toLocaleDateString('default', {
    month: 'short',
  })
  return {
    numeric,
    shortString,
  }
})

const currentYear = new Date().getFullYear()
const YEARS = Array.from({ length: 15 }, (_, i) => {
  const date = new Date(currentYear - i, 0)
  const numeric: number = date.getFullYear()
  return {
    numeric,
  }
})

const validatePeriodAndSetError = (
  value: FieldValues,
  setError: UseFormSetError<FieldValues>,
  clearErrors: UseFormClearErrors<FieldValues>
) => {
  if (value.toIsLatest) {
    clearErrors('toMonth')
    return
  }
  const from = {
    month: value.fromMonth,
    year: value.fromYear,
  }
  const to = {
    month: value.toMonth,
    year: value.toYear,
  }

  if (!isValidPeriod({ from, to })) {
    setError('toMonth', {
      message: 'From date should be an earlier than To date',
    })
  } else {
    clearErrors('toMonth')
  }
}

type Props = {
  experience?: Experience
  register: UseFormRegister<FieldValues>
  watch: UseFormWatch<FieldValues>
  errors: DeepMap<FieldValues, FieldError>
  setError: UseFormSetError<FieldValues>
  clearErrors: UseFormClearErrors<FieldValues>
}
export const ExperienceForm: React.FC<Props> = ({
  experience,
  errors,
  setError,
  clearErrors,
  register,
  watch,
}) => {
  const [isToDisabled, setIsToDisabled] = useState<boolean>(false)

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === 'toIsLatest') {
        setIsToDisabled(value.toIsLatest)
      }
      if (
        name === 'toIsLatest' ||
        name === 'toMonth' ||
        name === 'toYear' ||
        name === 'fromMonth' ||
        name === 'fromYear'
      ) {
        validatePeriodAndSetError(value, setError, clearErrors)
      }
    })
    return () => {
      subscription.unsubscribe()
    }
  }, [watch, setError, clearErrors])

  return (
    <form>
      <VStack gap={4}>
        <FormControl isInvalid={errors.role} width="100%">
          <FormLabel htmlFor="role">Role</FormLabel>
          <Input
            defaultValue={experience ? experience.role : ''}
            {...register('role', {
              required: 'Role is required',
            })}
          />
          <FormErrorMessage>
            {errors.role && errors.role.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.company} width="100%">
          <FormLabel htmlFor="company">Company</FormLabel>
          <Input
            defaultValue={experience ? experience.company.name : ''}
            {...register('company', {
              required: 'Company is required',
            })}
          />
          <FormErrorMessage>
            {errors.company && errors.company.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl
          isInvalid={errors.fromMonth || errors.fromYear}
          width="100%"
        >
          <FormLabel htmlFor="from">From</FormLabel>
          <Flex width="100%" gap={3}>
            <Box flex={1}>
              <Select
                defaultValue={experience ? experience.period.from.month : 1}
                {...register('fromMonth', {
                  required: 'Month is required',
                  valueAsNumber: true,
                })}
              >
                {MONTHS.map((month) => (
                  <option key={month.numeric} value={month.numeric}>
                    {month.shortString}
                  </option>
                ))}
              </Select>
            </Box>
            <Box flex={1}>
              <Select
                defaultValue={
                  experience ? experience.period.from.year : currentYear
                }
                {...register('fromYear', {
                  required: 'Year is required',
                  valueAsNumber: true,
                })}
              >
                {YEARS.map((year) => (
                  <option key={year.numeric} value={year.numeric}>
                    {year.numeric}
                  </option>
                ))}
              </Select>
            </Box>
          </Flex>
          <FormErrorMessage>
            {errors.fromMonth && errors.fromMonth.message}
          </FormErrorMessage>
          <FormErrorMessage>
            {errors.fromYear && errors.fromYear.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.toMonth || errors.toYear} width="100%">
          <FormLabel htmlFor="to">To</FormLabel>
          <Flex width="100%" gap={3}>
            <Box flex={1}>
              <Select
                defaultValue={experience ? experience.period.to.month : 1}
                disabled={isToDisabled}
                {...register('toMonth', {
                  required: 'Month is required',
                  valueAsNumber: true,
                })}
              >
                {MONTHS.map((month) => (
                  <option key={month.numeric} value={month.numeric}>
                    {month.shortString}
                  </option>
                ))}
              </Select>
            </Box>
            <Box flex={1}>
              <Select
                defaultValue={
                  experience ? experience.period.to.year : currentYear
                }
                disabled={isToDisabled}
                {...register('toYear', {
                  required: 'Year is required',
                  valueAsNumber: true,
                })}
              >
                {YEARS.map((year) => (
                  <option key={year.numeric} value={year.numeric}>
                    {year.numeric}
                  </option>
                ))}
              </Select>
            </Box>
          </Flex>
          <Checkbox isInvalid={false} {...register('toIsLatest')}>
            Currently working
          </Checkbox>
          <FormErrorMessage>
            {errors.toMonth && errors.toMonth.message}
          </FormErrorMessage>
          <FormErrorMessage>
            {errors.toYear && errors.toYear.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.summary} width="100%">
          <FormLabel htmlFor="summary">Summary</FormLabel>
          <Textarea
            defaultValue={experience ? experience.summary : ''}
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
