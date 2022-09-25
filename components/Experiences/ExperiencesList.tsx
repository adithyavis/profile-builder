import React, { useState } from 'react'
import { VStack, Button, Image } from '@chakra-ui/react'
import { EditIcon } from '@chakra-ui/icons'
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
import { useStoreContext } from 'providers/StoreProvider'
import { InfoCard } from 'components/core/InfoCard'
import { Modal, useModal } from 'components/core/Modal'
import { ExperienceForm } from 'components/Experiences/ExperienceForm'
import { createExperience, getExperience } from 'domain/Experience'
import { createCompany } from 'domain/Company'
import { createPeriod } from 'domain/Period'
import { getPeriodPresentation } from 'utils/time'

import { Id } from 'types/Experience'
import { LogoUri } from 'types/Company'
import { PeriodTo, PeriodFrom } from 'types/Period'

const useEditExperienceForm = () => {
  const {
    handleSubmit: handleSubmitEditExperienceForm,
    register: registerEditExperienceForm,
    watch: watchEditExperienceForm,
    setError: setErrorsEditExperienceForm,
    reset: resetEditExperienceForm,
    clearErrors: clearErrorsEditExperienceForm,
    formState: { errors: errorsEditExperienceForm },
  } = useForm()

  return {
    handleSubmitEditExperienceForm,
    registerEditExperienceForm,
    watchEditExperienceForm,
    setErrorsEditExperienceForm,
    clearErrorsEditExperienceForm,
    resetEditExperienceForm,
    errorsEditExperienceForm,
  }
}

const useEditExperienceModal = (
  registerEditExperienceForm: UseFormRegister<FieldValues>,
  watchEditExperienceForm: UseFormWatch<FieldValues>,
  setErrorsEditExperienceForm: UseFormSetError<FieldValues>,
  clearErrorsEditExperienceForm: UseFormClearErrors<FieldValues>,
  errorsEditExperienceForm: DeepMap<FieldValues, FieldError>,
  resetEditExperienceForm: UseFormReset<FieldValues>,
  handleSubmitEditExperienceForm: UseFormHandleSubmit<FieldValues>
) => {
  const { experiences, editExperience } = useStoreContext()

  const {
    isOpen: isEditExperienceModalOpen,
    onOpen: onOpenEditExperienceModal,
    onClose: onCloseEditExperienceModal,
  } = useModal()

  const [currentExperienceId, setCurrentExperienceId] = useState<string | null>(
    null
  )

  const handleOpenEditExperienceModal = (id: Id) => {
    setCurrentExperienceId(id)
    onOpenEditExperienceModal()
  }

  const handleCloseEditExperienceModal = () => {
    onCloseEditExperienceModal()
    setCurrentExperienceId(null)
    resetEditExperienceForm()
  }

  const handleSaveEditExperienceModal = handleSubmitEditExperienceForm(
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
      if (currentExperienceId === null) {
        return
      }
      const to: PeriodTo = toIsLatest
        ? { isLatest: true }
        : { month: toMonth, year: toYear }
      const from: PeriodFrom = { month: fromMonth, year: fromYear }
      editExperience(
        currentExperienceId,
        createExperience({
          role: role,
          summary: summary,
          company: createCompany({ name: company }),
          period: createPeriod({ from, to }),
        })
      )
      handleCloseEditExperienceModal()
    }
  )

  const renderEditExperienceModalBody = () => {
    if (currentExperienceId === null) {
      return <></>
    }
    return (
      <ExperienceForm
        experience={getExperience(experiences, currentExperienceId)}
        register={registerEditExperienceForm}
        watch={watchEditExperienceForm}
        setError={setErrorsEditExperienceForm}
        clearErrors={clearErrorsEditExperienceForm}
        errors={errorsEditExperienceForm}
      />
    )
  }

  return {
    isEditExperienceModalOpen,
    handleOpenEditExperienceModal,
    handleCloseEditExperienceModal,
    handleSaveEditExperienceModal,
    renderEditExperienceModalBody,
  }
}

export const ExperiencesList: React.FC = ({}) => {
  const { experiences } = useStoreContext()

  const {
    handleSubmitEditExperienceForm,
    registerEditExperienceForm,
    watchEditExperienceForm,
    setErrorsEditExperienceForm,
    clearErrorsEditExperienceForm,
    resetEditExperienceForm,
    errorsEditExperienceForm,
  } = useEditExperienceForm()

  const {
    isEditExperienceModalOpen,
    handleOpenEditExperienceModal,
    handleCloseEditExperienceModal,
    handleSaveEditExperienceModal,
    renderEditExperienceModalBody,
  } = useEditExperienceModal(
    registerEditExperienceForm,
    watchEditExperienceForm,
    setErrorsEditExperienceForm,
    clearErrorsEditExperienceForm,
    errorsEditExperienceForm,
    resetEditExperienceForm,
    handleSubmitEditExperienceForm
  )

  const renderLogo = (src: LogoUri) => {
    return <Image boxSize={75} src={src} alt="Company Logo" mx={4} />
  }

  const renderEditIcon = (id: Id) => {
    const handleClickEditButton = () => {
      handleOpenEditExperienceModal(id)
    }
    return (
      <Button colorScheme="white" onClick={handleClickEditButton}>
        <EditIcon color="purple" />
      </Button>
    )
  }

  return (
    <>
      <VStack width="100%" alignItems="start" gap={8}>
        {experiences.map((experience) => (
          <InfoCard
            key={experience.id}
            title={experience.role}
            subtitle={experience.company.name}
            miscInfos={[
              {
                key: 'period',
                value: getPeriodPresentation(
                  experience.period.from,
                  experience.period.to
                ),
              },
            ]}
            description={experience.summary}
            headerLeftComponent={renderLogo(experience.company.logoUri)}
            headerRightComponent={renderEditIcon(experience.id)}
          />
        ))}
      </VStack>
      <Modal
        isOpen={isEditExperienceModalOpen}
        title="Edit experience"
        bodyComponent={renderEditExperienceModalBody()}
        onClose={handleCloseEditExperienceModal}
        onSave={handleSaveEditExperienceModal}
      />
    </>
  )
}
