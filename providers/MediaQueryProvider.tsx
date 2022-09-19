import React, { useContext, createContext } from 'react'
import { useMediaQuery as useMediaQueryChakra } from '@chakra-ui/react'
import { BREAKPOINTS } from 'constants/breakpoints'

type MediaQueryContext = {
  isMobile: boolean
  isTabletOrMobile: boolean
  isLaptopOrDesktop: boolean
  isDesktop: boolean
}
const MediaQueryContext = createContext<MediaQueryContext>({
  isMobile: false,
  isTabletOrMobile: false,
  isLaptopOrDesktop: true,
  isDesktop: false,
})

type MediaQueryProvider = {
  children: React.ReactNode
}
export const MediaQueryProvider: React.FC<MediaQueryProvider> = ({
  children,
}) => {
  const [isMobile] = useMediaQueryChakra(`(max-width${BREAKPOINTS.md})`)
  const [isTabletOrMobile] = useMediaQueryChakra(`(max-width${BREAKPOINTS.lg})`)
  const [isLaptopOrDesktop] = useMediaQueryChakra(
    `(min-width${BREAKPOINTS.xl})`
  )
  const [isDesktop] = useMediaQueryChakra(`(min-width${BREAKPOINTS['2xl']})`)

  return (
    <MediaQueryContext.Provider
      value={{ isMobile, isTabletOrMobile, isLaptopOrDesktop, isDesktop }}
    >
      {children}
    </MediaQueryContext.Provider>
  )
}

export const useMediaQuery = () => useContext(MediaQueryContext)
