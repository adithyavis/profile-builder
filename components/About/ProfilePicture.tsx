import React from 'react'
import { Box, Image, Flex, Spacer, Button, Input } from '@chakra-ui/react'
import { EditIcon } from '@chakra-ui/icons'
import { useStoreContext } from 'providers/StoreProvider'
import { createProfilePic } from 'domain/ProfilePic'

export const ProfilePicture: React.FC = () => {
  const { profilePic, editProfilePic } = useStoreContext()

  const handleUploadProfilePic = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      editProfilePic(
        createProfilePic({
          profilePicUri: URL.createObjectURL(event.target.files[0]),
        })
      )
    }
  }

  return (
    <Box position="relative" width="100%">
      <Image
        boxSize="100%"
        src={profilePic.profilePicUri}
        alt="Profile Picture"
      />
      <Flex position="absolute" top="0" left="0" minWidth="100%" p={2}>
        <Spacer />
        <Button as="label" htmlFor="profilePic" colorScheme="purple">
          <EditIcon />
        </Button>
        <Input
          type="file"
          name="profilePic"
          id="profilePic"
          accept="image/*"
          hidden
          onChange={handleUploadProfilePic}
        />
      </Flex>
    </Box>
  )
}
