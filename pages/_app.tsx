import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { BREAKPOINTS } from 'constants/breakpoints'
import type { AppProps } from 'next/app'
import { MediaQueryProvider } from 'providers/MediaQueryProvider'
import { StoreProvider } from 'providers/StoreProvider'

import 'styles/globals.css'

const theme = extendTheme({ breakpoints: BREAKPOINTS })

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <MediaQueryProvider>
        <StoreProvider>
          <Component {...pageProps} />
        </StoreProvider>
      </MediaQueryProvider>
    </ChakraProvider>
  )
}

export default MyApp
