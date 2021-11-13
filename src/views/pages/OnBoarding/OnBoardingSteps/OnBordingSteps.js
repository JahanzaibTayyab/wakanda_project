import { Box, Stack, Button, Text, HStack } from '@chakra-ui/react'
import   React, {useState , useEffect} from 'react'
import { Step } from './Step'
import { StepContent } from './StepContent'
import { Steps } from './Steps'
import { useSteps } from './useSteps'

export const OnBoardingSteps = () => {
  const { nextStep, prevStep, reset, activeStep } = useSteps({
    initialStep: 0,
  })
  const [connectNotionSuccess, setConnentNotionSuccess] =useState(false)
  const [connectNotionError, setConnentNotionError] =useState(false)
  const [connectDatabaseActive, setConnentDatabaseActive] =useState(false)
  const [connectDatabaseSuccess, setConnentDatabaseSuccess] =useState(false)
  const [connectDatabaseError, setConnentDatabaseError] =useState(false)
  const [embedActive, setEmbedActive] =useState(false)
  const [embedSuccess, setEmbedSuccess] =useState(false)
  const [embedError, setEmbedError] =useState(false)
 
  useEffect(()=>{

  })
   
  return (
    <Box
      mx="auto"
      maxW="2xl"
      py="10"
      px={{
        base: '6',
        md: '8',
      }}
      minH="400px"
    >
      <Steps activeStep={activeStep}>
        <Step title={connectNotionSuccess? "Notion account connected.": connectNotionError? "Error with connecting Notion account.":"Connecting your Notion account."} 
        textColor={connectNotionSuccess? "gray.600": connectNotionError? "red.400":"yellow.500"}>
         {connectNotionError&&
            <StepContent>
            <Stack shouldWrapChildren spacing="4">
              <Text textColor="red.400">
               this is error
              </Text>
            </Stack>
          </StepContent>
         }
        </Step>
        <Step title={connectDatabaseSuccess? "Task databse ready.": connectDatabaseError? "Error with the task database." : connectDatabaseActive? "Checking the task database." :"Check the task database."}
        textColor={connectDatabaseSuccess? "gray.600": connectDatabaseError? "red.400" :connectDatabaseActive?"yellow.500" : "gray.400" }>
          {connectDatabaseError &&
          <StepContent>
          <Stack shouldWrapChildren spacing="4">
            <Text>
              this is error for connect database
            </Text>
          </Stack>
        </StepContent>

          }
        </Step>
        <Step title={embedSuccess? "Widget and code embedded.": embedError? "Error embedding the widget and code.." : embedActive? "Embedding the widget and code." :"Embed the widget and code."}
        textColor={embedSuccess? "gray.600": embedError? "red.400" :embedActive?"yellow.500" : "gray.400" }>
          {embedError &&
          <StepContent>
          <Stack shouldWrapChildren spacing="4">
            <Text>
              Embed Widget and dashboard error
            </Text>
            </Stack>
        </StepContent>
          }
        </Step>
      </Steps>
    </Box>
  )
}