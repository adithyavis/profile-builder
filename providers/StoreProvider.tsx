import React, { useContext, createContext } from 'react'

import { ProfilePic } from 'types/ProfilePic'
import { PersonalInfo } from 'types/PersonalInfo'
import { Experience } from 'types/Experience'

import { createProfilePic } from 'domain/ProfilePic'
import { createPersonalInfo } from 'domain/PersonalInfo'

type StoreContext = {
  profilePic: ProfilePic
  personalInfo: PersonalInfo | null
  experiences: Experience[]
}
const StoreContext = createContext<StoreContext>({
  profilePic: createProfilePic(),
  personalInfo: createPersonalInfo(null),
  experiences: [],
})

type StoreProvider = {
  children: React.ReactNode
}
export const StoreProvider: React.FC<StoreProvider> = ({ children }) => {
  const profilePic: ProfilePic = createProfilePic()
  const personalInfo: PersonalInfo | null = createPersonalInfo(null)
  const experiences: Experience[] = []

  return (
    <StoreContext.Provider value={{ profilePic, personalInfo, experiences }}>
      {children}
    </StoreContext.Provider>
  )
}

export const useStoreContext = () => useContext(StoreContext)
