import { Box, Stack, Text, useToast } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { Step } from "./Step";
import { StepContent } from "./StepContent";
import { Steps } from "./Steps";
import { useSteps } from "./useSteps";
import { Toast } from "../../../../constants/Toast";
import { LocalStorage } from "../../../../constants/LocalStorage";
import { useAuth } from "../../../../contexts/AuthContext";
import { useHistory, useLocation } from "react-router-dom";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

export const OnBoardingSteps = (props) => {
  const {
    uniqueLinkGenerated,
    pinCodeGenerated,
    dashboardError,
    dashboardResponse,
  } = props;

  const toast = useToast();
  const { currentUser } = useAuth();
  const location = useLocation();
  const query = useQuery();
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
  //dummy code
  // useEffect(() => {
  //   if (currentUser) {
  //     // props.notionOAuthToken({
  //     //   code: "e9840cab-5d10-4bf3-ac70-0b1913d907e9",
  //     //   id: currentUser?.uid,
  //     // });
  //     nextStep();
  //     setTimeout(() => {
  //       nextStep();
  //     }, [3000]);
  //     setTimeout(() => {
  //       nextStep();
  //       props.generatePinCode();
  //     }, [8000]);
  //   }
  // }, [currentUser]);

  useEffect(() => {
    const { response, error } = props;
    if (response) {
      setConnentNotionError(false);
      setConnentNotionSuccess(true);
      setConnentDatabaseActive(true);
      props.saveData({
        id: currentUser.uid,
        data: {
          workspaceIcon: response?.data?.workspaceIcon,
          workspace: response?.data?.workspace,
        },
      });
      nextStep();
      props.findDataBase({ id: currentUser.uid });
    }
    if (error) {
      setConnentNotionError(true);
    }
  }, [props.response, props.error]);

  useEffect(() => {
    const { databases, dashboardError, pages } = props;
    if (activeStep === 1) {
      if (databases && pages) {
        setConnentNotionError(false);
        setConnentDatabaseSuccess(true);
        setEmbedActive(true);
        props.saveData({
          id: currentUser.uid,
          data: {
            database: databases[0]?.id,
            page: pages[0]?.id,
          },
        });
        nextStep();
      }
      if (dashboardError) {
        setConnentDatabaseError(true);
      }
    }
  }, [props.databases, props.pages]);

  useEffect(() => {
    if (currentUser) {
      if (query.get("code")) {
        props.notionOAuthToken({
          code: query.get("code"),
          id: currentUser?.uid,
        });
      }
    }
  }, [location, currentUser]);

  useEffect(() => {
    if (pinCodeGenerated) {
      if (dashboardResponse) {
        props.saveData({
          id: currentUser?.uid,
          data: {
            pinCode: dashboardResponse,
          },
        });
      }
      props.generateUniqueUrl();
    }
  }, [pinCodeGenerated]);

  useEffect(() => {
    if (uniqueLinkGenerated) {
      if (dashboardResponse) {
        props.saveData({
          id: currentUser?.uid,
          data: {
            uniqueUrl: dashboardResponse,
          },
        });
      }
      props.resetPreparingStates();
      props.resetNotionAuthStates();
      props.resetSignInStates();
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
    }
  }, [uniqueLinkGenerated]);

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
          isError={connectNotionError}
        >
          {connectNotionError && (
            <StepContent>
              <Stack shouldWrapChildren spacing="4">
                <Text textColor="red.400">{props.error?.message}</Text>
              </Stack>
            </StepContent>
          )}
        </Step>
        <Step
          title={
            connectDatabaseSuccess
              ? "Task database ready."
              : connectDatabaseError
              ? "Error with the task database."
              : connectDatabaseActive
              ? "Checking the task database."
              : "Check the task database."
          }
          isError={connectDatabaseError}
        >
          {connectDatabaseError && (
            <StepContent>
              <Stack shouldWrapChildren spacing="4">
                <Text textColor="red.400">{props.dashboardError?.message}</Text>
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
          isError={embedError}
        >
          {embedError && (
            <StepContent>
              <Stack shouldWrapChildren spacing="4">
                <Text textColor="red.400">
                  Embed Widget and dashboard error
                </Text>
              </Stack>
            </StepContent>
          )}
        </Step>
      </Steps>
    </Box>
  );
};
