import React from 'react'
import {
  Modal as CModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from '@chakra-ui/react'

type Modal = {
  isOpen: boolean
  title: string
  bodyComponent?: React.ReactNode
  onSave?: () => void
  onClose: () => void
}
export const Modal: React.FC<Modal> = ({
  isOpen,
  title,
  bodyComponent,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onSave = () => {},
  onClose,
}) => {
  return (
    <CModal isOpen={isOpen} size="xl" onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>{bodyComponent}</ModalBody>

        <ModalFooter>
          <Button colorScheme="purple" mr={3} onClick={onSave}>
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </CModal>
  )
}

export { useDisclosure as useModal } from '@chakra-ui/react'
