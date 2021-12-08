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
  resetEmbeddedLinkStates,
  generatePinCode,
  generateUniqueUrl,
} from "../../../store/actions/EmbeddedLink.js";
import {
  findDataBase,
  resetTaskDataBaseStates,
} from "../../../store/actions/TaskDatabase";
import { findPage, resetPagesStates } from "../../../store/actions/Pages";
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

const mapStateToProps = ({ NotionAuth, EmbeddedLink, Pages, TaskDatabase }) => {
  return {
    loading: NotionAuth?.loading,
    redirectedUrl: NotionAuth?.oauthUrl?.redirectUrl,
    response: NotionAuth?.response,
    error: NotionAuth?.error,
    uniqueLinkGenerated: EmbeddedLink?.uniqueLinkGenerated,
    pinCodeGenerated: EmbeddedLink?.pinCodeGenerated,
    embeddedLinkError: EmbeddedLink?.error,
    embeddedLinkResponse: EmbeddedLink?.response,
    databases: TaskDatabase?.databases,
    taskDatabaseError: TaskDatabase?.error,
    taskDatabaseResponse: TaskDatabase?.response,
    pages: Pages?.pages,
    pagesError: Pages?.error,
    pagesResponse: Pages?.response,
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
    resetEmbeddedLinkStates: (data) => {
      dispatch(resetEmbeddedLinkStates(data));
    },
    resetTaskDataBaseStates: (data) => {
      dispatch(resetTaskDataBaseStates(data));
    },
    resetPagesStates: (data) => {
      dispatch(resetPagesStates(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Preparing);
