import React from 'react'
import { Heading, Button } from '@chakra-ui/react'
import { Container, VStack, Flex, Spacer } from '@chakra-ui/react'
import { EditIcon } from '@chakra-ui/icons'
import {
  useForm,
  UseFormReset,
  UseFormRegister,
  UseFormHandleSubmit,
  FieldValues,
  DeepMap,
  FieldError,
} from 'react-hook-form'
import { useStoreContext } from 'providers/StoreProvider'
import { ProfilePicture } from 'components/About/ProfilePicture'
import { PersonalInfoCard } from 'components/About/PersonalInfoCard'
import { PersonalInfoForm } from 'components/About/PersonalInfoForm'
import { Modal, useModal } from 'components/core/Modal'
import { createPersonalInfo } from 'domain/PersonalInfo'

const useEditPersonalInfoForm = () => {
  const {
    handleSubmit: handleSubmitEditPersonalInfoForm,
    register: registerEditPersonalInfoForm,
    reset: resetEditPersonalInfoForm,
    formState: { errors: errorsEditPersonalInfoForm },
  } = useForm()

  return {
    handleSubmitEditPersonalInfoForm,
    registerEditPersonalInfoForm,
    resetEditPersonalInfoForm,
    errorsEditPersonalInfoForm,
  }
}

const useEditPersonalInfoModal = (
  registerEditPersonalInfoForm: UseFormRegister<FieldValues>,
  errorsEditPersonalInfoForm: DeepMap<FieldValues, FieldError>,
  resetEditPersonalInfoForm: UseFormReset<FieldValues>,
  handleSubmitEditPersonalInfoForm: UseFormHandleSubmit<FieldValues>
) => {
  const { personalInfo, editPersonalInfo } = useStoreContext()

  const {
    isOpen: isEditPersonalInfoModalOpen,
    onOpen: onOpenEditPersonalInfoModal,
    onClose: onCloseEditPersonalInfoModal,
  } = useModal()

  const handleOpenEditPersonalInfoModal = () => {
    onOpenEditPersonalInfoModal()
  }
  const handleCloseEditPersonalInfoModal = () => {
    onCloseEditPersonalInfoModal()
    resetEditPersonalInfoForm()
  }

  const handleSaveEditPersonalInfoModal = handleSubmitEditPersonalInfoForm(
    ({ name, headline, age, location, summary }) => {
      editPersonalInfo(
        createPersonalInfo({
          name,
          headline,
          age,
          location,
          summary,
        })
      )
      handleCloseEditPersonalInfoModal()
    }
  )

  const renderEditPersonalInfoModalBody = () => {
    return (
      <PersonalInfoForm
        personalInfo={personalInfo}
        register={registerEditPersonalInfoForm}
        errors={errorsEditPersonalInfoForm}
      />
    )
  }
  return {
    isEditPersonalInfoModalOpen,
    handleOpenEditPersonalInfoModal,
    handleCloseEditPersonalInfoModal,
    handleSaveEditPersonalInfoModal,
    renderEditPersonalInfoModalBody,
  }
}

export const About: React.FC = () => {
  const {
    handleSubmitEditPersonalInfoForm,
    registerEditPersonalInfoForm,
    resetEditPersonalInfoForm,
    errorsEditPersonalInfoForm,
  } = useEditPersonalInfoForm()
  const {
    isEditPersonalInfoModalOpen,
    handleOpenEditPersonalInfoModal,
    handleCloseEditPersonalInfoModal,
    handleSaveEditPersonalInfoModal,
    renderEditPersonalInfoModalBody,
  } = useEditPersonalInfoModal(
    registerEditPersonalInfoForm,
    errorsEditPersonalInfoForm,
    resetEditPersonalInfoForm,
    handleSubmitEditPersonalInfoForm
  )
  return (
    <>
      <Container maxWidth={350}>
        <VStack spacing="2" p={4}>
          <ProfilePicture />
          <Flex alignItems="center" minWidth="100%" pt={8}>
            <Heading as="h3" size="xl" py={4}>
              About
            </Heading>
            <Spacer />
            <Button
              colorScheme="white"
              onClick={handleOpenEditPersonalInfoModal}
            >
              <EditIcon color="purple" />
            </Button>
          </Flex>
          <PersonalInfoCard />
        </VStack>
      </Container>
      <Modal
        isOpen={isEditPersonalInfoModalOpen}
        title="Edit personal info"
        bodyComponent={renderEditPersonalInfoModalBody()}
        onClose={handleCloseEditPersonalInfoModal}
        onSave={handleSaveEditPersonalInfoModal}
      />
    </>
  )
}
