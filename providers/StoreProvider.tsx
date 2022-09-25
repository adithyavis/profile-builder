import React, { useState, useContext, createContext } from 'react'

import { ProfilePic } from 'types/ProfilePic'
import { PersonalInfo } from 'types/PersonalInfo'
import { Experience, Id } from 'types/Experience'

import {
  createProfilePic,
  editProfilePic as _editProfilePic,
} from 'domain/ProfilePic'
import {
  createPersonalInfo,
  editPersonalInfo as _editPersonalInfo,
} from 'domain/PersonalInfo'
import {
  addExperience as _addExperience,
  editExperience as _editExperience,
} from 'domain/Experience'

type StoreContext = {
  profilePic: ProfilePic
  personalInfo: PersonalInfo | null
  experiences: Experience[]
  addExperience: (args: Experience) => void
  editExperience: (id: Id, args: Partial<Experience>) => void
  editPersonalInfo: (args: PersonalInfo) => void
  editProfilePic: (args: ProfilePic) => void
}
const StoreContext = createContext<StoreContext>({
  profilePic: createProfilePic(),
  personalInfo: createPersonalInfo(null),
  experiences: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  addExperience: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  editExperience: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  editPersonalInfo: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  editProfilePic: () => {},
})

type StoreProvider = {
  children: React.ReactNode
}
export const StoreProvider: React.FC<StoreProvider> = ({ children }) => {
  const [profilePic, setProfilePic] = useState<StoreContext['profilePic']>(
    createProfilePic()
  )
  const [personalInfo, setPersonalInfo] = useState<
    StoreContext['personalInfo']
  >(createPersonalInfo(null))
  const [experiences, setExperiences] = useState<StoreContext['experiences']>(
    []
  )

  const addExperience: StoreContext['addExperience'] = (args) => {
    setExperiences(_addExperience(experiences, args))
  }

  const editExperience: StoreContext['editExperience'] = (id, args) => {
    setExperiences(_editExperience(experiences, id, args))
  }

  const editPersonalInfo: StoreContext['editPersonalInfo'] = (args) => {
    setPersonalInfo(_editPersonalInfo(personalInfo, args))
  }

  const editProfilePic: StoreContext['editProfilePic'] = (args) => {
    setProfilePic(_editProfilePic(profilePic, args))
  }

  return (
    <StoreContext.Provider
      value={{
        profilePic,
        personalInfo,
        experiences,
        addExperience,
        editExperience,
        editPersonalInfo,
        editProfilePic,
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}

export const useStoreContext = () => useContext(StoreContext)
