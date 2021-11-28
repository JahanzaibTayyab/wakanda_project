import React from "react";
import { Box, Heading, Text, useColorModeValue, Flex } from "@chakra-ui/react";
import { connect } from "react-redux";
import { Logo } from "../../components/controls/Logo";
import { OnBoardingSteps } from "./OnBoardingSteps/OnBoardingSteps";
import {
  notionOAuthToken,
  resetNotionAuthStates,
} from "../../../store/actions/NotionAuth";
import { resetSignInStates } from "../../../store/actions/SignIn";
import {
  resetPreparingStates,
  generatePinCode,
  generateUniqueUrl,
  findDataBase,
  findPage,
} from "../../../store/actions/Dashboard";
import { saveData } from "../../../store/actions/Profile";

const Preparing = (props) => {
  return (
    <>
      <Box
        bg={useColorModeValue("gray.50", "inherit")}
        minH="100vh"
        py="12"
        px={{
          base: "4",
          lg: "8",
        }}
      >
        <Box maxW="md" mx="auto">
          <Logo
            mx="auto"
            h="8"
            mb={{
              base: "10",
              md: "20",
            }}
          />
          <Heading textAlign="center" size="xl" fontWeight="extrabold">
            Preparing your productivity boost
          </Heading>
          <Text
            mt="4"
            align="center"
            maxW="md"
            fontWeight="400"
            fontSize="18px"
          >
            Just a minute and it’ll be ready...
          </Text>

          <Flex justify="center" mb="2">
            <OnBoardingSteps {...props} />
          </Flex>
        </Box>
      </Box>
    </>
  );
};

const mapStateToProps = ({ NotionAuth, Dashboard }) => {
  return {
    loading: NotionAuth?.loading,
    redirectedUrl: NotionAuth?.oauthUrl?.redirectUrl,
    response: NotionAuth?.response,
    error: NotionAuth?.error,
    uniqueLinkGenerated: Dashboard?.uniqueLinkGenerated,
    pinCodeGenerated: Dashboard?.pinCodeGenerated,
    dashboardError: Dashboard?.error,
    dashboardResponse: Dashboard?.response,
    databases: Dashboard?.databases,
    pages: Dashboard?.pages,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    notionOAuthToken: (userData) => {
      dispatch(notionOAuthToken(userData));
    },
    generateUniqueUrl: (data) => {
      dispatch(generateUniqueUrl(data));
    },
    generatePinCode: (data) => {
      dispatch(generatePinCode(data));
    },
    findDataBase: (data) => {
      dispatch(findDataBase(data));
    },
    findPage: (data) => {
      dispatch(findPage(data));
    },
    saveData: (data) => {
      dispatch(saveData(data));
    },
    resetNotionAuthStates: (data) => {
      dispatch(resetNotionAuthStates(data));
    },
    resetSignInStates: (data) => {
      dispatch(resetSignInStates(data));
    },
    resetPreparingStates: (data) => {
      dispatch(resetPreparingStates(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Preparing);
