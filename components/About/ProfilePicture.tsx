import React from 'react'
import { Box, Image, Flex, Spacer, Button } from '@chakra-ui/react'
import { EditIcon } from '@chakra-ui/icons'
import { useStoreContext } from 'providers/StoreProvider'

export const ProfilePicture: React.FC = () => {
  const { profilePic } = useStoreContext()
  return (
    <Box position="relative">
      <Image
        boxSize="100%"
        src={profilePic.profilePicUri}
        alt="Profile Picture"
      />
      <Flex position="absolute" top="0" left="0" minWidth="100%" p={2}>
        <Spacer />
        <Button colorScheme="purple">
          <EditIcon />
        </Button>
      </Flex>
    </Box>
  )
}
