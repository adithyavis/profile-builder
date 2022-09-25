import type { NextPage } from 'next'
import { Grid, GridItem, VStack } from '@chakra-ui/react'
import { useMediaQuery } from 'providers/MediaQueryProvider'
import { Header } from 'components/Header'
import { About } from 'components/About'
import { Experiences } from 'components/Experiences'

const Home: NextPage = () => {
  const { isMobile } = useMediaQuery()
  if (isMobile) {
    return (
      <VStack>
        <Header />
        <About />
        <Experiences />
      </VStack>
    )
  }
  return (
    <Grid
      templateAreas={`"header header"
                  "sidebar main"`}
      gridTemplateRows={'50px 1fr'}
      gridTemplateColumns={'400px 1fr'}
      h="100vh"
      gap="1"
      color="blackAlpha.700"
      fontWeight="bold"
    >
      <GridItem area={'header'}>
        <Header />
      </GridItem>
      <GridItem area={'sidebar'}>
        <About />
      </GridItem>
      <GridItem area={'main'} overflow="scroll">
        <Experiences />
      </GridItem>
    </Grid>
  )
}

export default Home
