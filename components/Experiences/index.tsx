import React from 'react'
import { Heading, Button, Text, VStack, Flex, Spacer } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import {
  useForm,
  UseFormRegister,
  UseFormWatch,
  FieldValues,
  DeepMap,
  FieldError,
  UseFormSetError,
  UseFormClearErrors,
  UseFormHandleSubmit,
  UseFormReset,
} from 'react-hook-form'
import Image from 'next/image'
import { useStoreContext } from 'providers/StoreProvider'
import { ExperiencesList } from 'components/Experiences/ExperiencesList'
import { Modal, useModal } from 'components/core/Modal'
import { ExperienceForm } from 'components/Experiences/ExperienceForm'
import { createExperience } from 'domain/Experience'
import { createCompany } from 'domain/Company'
import { createPeriod } from 'domain/Period'

const useAddExperienceForm = () => {
  const {
    handleSubmit: handleSubmitAddExperienceForm,
    register: registerAddExperienceForm,
    watch: watchAddExperienceForm,
    setError: setErrorsAddExperienceForm,
    clearErrors: clearErrorsAddExperienceForm,
    reset: resetAddExperienceForm,
    formState: { errors: errorsAddExperienceForm },
  } = useForm()

  return {
    handleSubmitAddExperienceForm,
    registerAddExperienceForm,
    watchAddExperienceForm,
    setErrorsAddExperienceForm,
    clearErrorsAddExperienceForm,
    resetAddExperienceForm,
    errorsAddExperienceForm,
  }
}

const useAddExperienceModal = (
  registerAddExperienceForm: UseFormRegister<FieldValues>,
  watchAddExperienceForm: UseFormWatch<FieldValues>,
  setErrorsAddExperienceForm: UseFormSetError<FieldValues>,
  clearErrorsAddExperienceForm: UseFormClearErrors<FieldValues>,
  errorsAddExperienceForm: DeepMap<FieldValues, FieldError>,
  resetAddExperienceForm: UseFormReset<FieldValues>,
  handleSubmitAddExperienceForm: UseFormHandleSubmit<FieldValues>
) => {
  const { addExperience } = useStoreContext()

  const {
    isOpen: isAddExperienceModalOpen,
    onOpen: onOpenAddExperienceModal,
    onClose: onCloseAddExperienceModal,
  } = useModal()

  const handleOpenAddExperienceModal = () => {
    onOpenAddExperienceModal()
  }
  const handleCloseAddExperienceModal = () => {
    onCloseAddExperienceModal()
    resetAddExperienceForm()
  }

  const handleSaveAddExperienceModal = handleSubmitAddExperienceForm(
    ({
      role,
      company,
      toMonth,
      toYear,
      toIsLatest,
      fromMonth,
      fromYear,
      summary,
    }) => {
      const to = toIsLatest
        ? { toIsLatest: true }
        : { month: toMonth, year: toYear }
      const from = { month: fromMonth, year: fromYear }
      addExperience(
        createExperience({
          role: role,
          summary: summary,
          company: createCompany({ name: company }),
          period: createPeriod({ from, to }),
        })
      )
      handleCloseAddExperienceModal()
    }
  )

  const renderAddExperienceModalBody = () => {
    return (
      <ExperienceForm
        register={registerAddExperienceForm}
        watch={watchAddExperienceForm}
        setError={setErrorsAddExperienceForm}
        clearErrors={clearErrorsAddExperienceForm}
        errors={errorsAddExperienceForm}
      />
    )
  }
  return {
    isAddExperienceModalOpen,
    handleOpenAddExperienceModal,
    handleCloseAddExperienceModal,
    handleSaveAddExperienceModal,
    renderAddExperienceModalBody,
  }
}

export const Experiences: React.FC = () => {
  const { experiences } = useStoreContext()

  const {
    handleSubmitAddExperienceForm,
    registerAddExperienceForm,
    watchAddExperienceForm,
    setErrorsAddExperienceForm,
    clearErrorsAddExperienceForm,
    resetAddExperienceForm,
    errorsAddExperienceForm,
  } = useAddExperienceForm()

  const {
    isAddExperienceModalOpen,
    handleOpenAddExperienceModal,
    handleCloseAddExperienceModal,
    handleSaveAddExperienceModal,
    renderAddExperienceModalBody,
  } = useAddExperienceModal(
    registerAddExperienceForm,
    watchAddExperienceForm,
    setErrorsAddExperienceForm,
    clearErrorsAddExperienceForm,
    errorsAddExperienceForm,
    resetAddExperienceForm,
    handleSubmitAddExperienceForm
  )

  return (
    <>
      <VStack spacing="2" p={4}>
        <Flex alignItems="center" minWidth="100%" pt={8}>
          <Heading as="h3" size="xl" py={8}>
            Experiences
          </Heading>
          <Spacer />
          <Button colorScheme="white" onClick={handleOpenAddExperienceModal}>
            <AddIcon color="purple" />
          </Button>
        </Flex>
        {experiences.length === 0 ? (
          <VStack justifyContent="center" height={300} gap={4}>
            <Image
              src="/assets/svg/noResults.svg"
              alt="No experiences"
              width="200"
              height="200"
            />
            <Text fontSize="2xl" noOfLines={2}>
              {'No results found :('}
            </Text>
          </VStack>
        ) : (
          <ExperiencesList />
        )}
      </VStack>
      <Modal
        isOpen={isAddExperienceModalOpen}
        title="Add experience"
        bodyComponent={renderAddExperienceModalBody()}
        onClose={handleCloseAddExperienceModal}
        onSave={handleSaveAddExperienceModal}
      />
    </>
  )
}
