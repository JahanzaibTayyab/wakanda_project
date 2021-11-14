import { Box, Stack, Text, useToast } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { Step } from "./Step";
import { StepContent } from "./StepContent";
import { Steps } from "./Steps";
import { useSteps } from "./useSteps";
import { Toast } from "../../../../constants/Toast";
import { LocalStorage } from "../../../../constants/LocalStorage";
import { useAuth } from "../../../../contexts/AuthContext";
import { useHistory } from "react-router-dom";

export const OnBoardingSteps = (props) => {
  const toast = useToast();
  const { currentUser } = useAuth();
  const history = useHistory();
  const { nextStep, prevStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });
  const [connectNotionSuccess, setConnentNotionSuccess] = useState(false);
  const [connectNotionError, setConnentNotionError] = useState(false);
  const [connectDatabaseActive, setConnentDatabaseActive] = useState(false);
  const [connectDatabaseSuccess, setConnentDatabaseSuccess] = useState(false);
  const [connectDatabaseError, setConnentDatabaseError] = useState(false);
  const [embedActive, setEmbedActive] = useState(false);
  const [embedSuccess, setEmbedSuccess] = useState(false);
  const [embedError, setEmbedError] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      toast({
        position: "bottom-right",
        title: Toast.SocialLoginVerification.success.title,
        description: `${Toast.SocialLoginVerification.success.description} 0 `,
        duration: Toast.SocialLoginVerification.success.duration,
        status: "success",
        isClosable: true,
      });
      localStorage.setItem(LocalStorage.TOKEN, currentUser.accessToken);
      localStorage.setItem(LocalStorage.USER_ID, currentUser.uid);
      history.push("/app/widgets/espresso");
    }, [3000]);
  });

  return (
    <Box
      mx="auto"
      maxW="2xl"
      py="10"
      px={{
        base: "6",
        md: "8",
      }}
      minH="400px"
    >
      <Steps activeStep={activeStep}>
        <Step
          title={
            connectNotionSuccess
              ? "Notion account connected."
              : connectNotionError
              ? "Error with connecting Notion account."
              : "Connecting your Notion account."
          }
          textColor={
            connectNotionSuccess
              ? "gray.600"
              : connectNotionError
              ? "red.400"
              : "yellow.500"
          }
        >
          {connectNotionError && (
            <StepContent>
              <Stack shouldWrapChildren spacing="4">
                <Text textColor="red.400">this is error</Text>
              </Stack>
            </StepContent>
          )}
        </Step>
        <Step
          title={
            connectDatabaseSuccess
              ? "Task databse ready."
              : connectDatabaseError
              ? "Error with the task database."
              : connectDatabaseActive
              ? "Checking the task database."
              : "Check the task database."
          }
          textColor={
            connectDatabaseSuccess
              ? "gray.600"
              : connectDatabaseError
              ? "red.400"
              : connectDatabaseActive
              ? "yellow.500"
              : "gray.400"
          }
        >
          {connectDatabaseError && (
            <StepContent>
              <Stack shouldWrapChildren spacing="4">
                <Text>this is error for connect database</Text>
              </Stack>
            </StepContent>
          )}
        </Step>
        <Step
          title={
            embedSuccess
              ? "Widget and code embedded."
              : embedError
              ? "Error embedding the widget and code.."
              : embedActive
              ? "Embedding the widget and code."
              : "Embed the widget and code."
          }
          textColor={
            embedSuccess
              ? "gray.600"
              : embedError
              ? "red.400"
              : embedActive
              ? "yellow.500"
              : "gray.400"
          }
        >
          {embedError && (
            <StepContent>
              <Stack shouldWrapChildren spacing="4">
                <Text>Embed Widget and dashboard error</Text>
              </Stack>
            </StepContent>
          )}
        </Step>
      </Steps>
    </Box>
  );
};
