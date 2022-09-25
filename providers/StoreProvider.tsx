import React, { useState, useContext, createContext, useEffect } from 'react'

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
  editPersonalInfo: (args: Partial<PersonalInfo> | null) => void
  editProfilePic: (args: Partial<ProfilePic>) => void
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

function usePermState<S>(
  initialVal: S | (() => S),
  valKey: string
): [S, (val: S) => void] {
  const [savePerm] = useState<boolean>(true)
  const [val, setVal] = useState<S>(initialVal)

  useEffect(() => {
    /** Rehydrate previously saved values on client-side */
    try {
      setVal(JSON.parse(window.localStorage.getItem(`${valKey}`) || ''))
    } catch (e) {
      setVal(initialVal)
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const setPermVal = (newVal: S) => {
    setVal(newVal)
    /** Save values permanently */
    if (savePerm) {
      window.localStorage.setItem(`${valKey}`, JSON.stringify(newVal))
    }
  }

  return [val, setPermVal]
}

type StoreProvider = {
  children: React.ReactNode
}
export const StoreProvider: React.FC<StoreProvider> = ({ children }) => {
  const [profilePic, setProfilePic] = usePermState<StoreContext['profilePic']>(
    createProfilePic(),
    'profilePic'
  )
  const [personalInfo, setPersonalInfo] = usePermState<
    StoreContext['personalInfo']
  >(createPersonalInfo(null), 'personalInfo')
  const [experiences, setExperiences] = usePermState<
    StoreContext['experiences']
  >([], 'experiences')

  const addExperience: StoreContext['addExperience'] = (args) => {
    setExperiences(_addExperience(experiences, args))
  }

  const editExperience: StoreContext['editExperience'] = (id, args) => {
    setExperiences(_editExperience(experiences, id, args))
  }

  const editPersonalInfo: StoreContext['editPersonalInfo'] = (args) => {
    if (args === null) {
      setPersonalInfo(null)
      return
    }
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
