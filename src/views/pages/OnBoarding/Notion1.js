import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  Box,
  Button,
  Heading,
  Text,
  Image,
  useColorModeValue,
  Flex,
  useToast,
} from "@chakra-ui/react";
import { Logo } from "../../components/controls/Logo";
import Link from "../../components/controls/Link";
import { NotionLogo } from "../../components/controls/NotionLogo";
import { useHistory } from "react-router-dom";
import { notionOAuthUlr } from "../../../store/actions/NotionAuth";
const Notion1 = (props) => {
  const { redirectedUrl, error } = props;
  const [notion, setNotion] = useState(true);
  const toast = useToast();
  const history = useHistory();

  useEffect(() => {
    props.notionOAuthUlr();
  }, []);

  useEffect(() => {
    if (redirectedUrl) {
      setNotion(false);
    }
  }, [redirectedUrl]);

  useEffect(() => {
    if (error) {
      toast({
        position: "bottom-right",
        title: error?.status,
        description: error?.message,
        duration: 6000,
        status: "error",
        isClosable: true,
      });
    }
  }, [error]);

  const handelClick = () => {
    if (redirectedUrl) {
      window.open(redirectedUrl, "_blank");
      history.push("/onboard");
    }
  };
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
            Connect Notion account
          </Heading>
          <Text
            mt="4"
            mb="8"
            align="center"
            maxW="md"
            lineHeight={2}
            fontStyle="normal"
            fontWeight="500"
            fontSize="18px"
          >
            <Text as="span">Allow access to</Text>
            <Link href="https://www.notion.coffee" target="_blank">
              <Text as="u" mr="1">
                Notion Coffee
              </Text>
            </Link>
            and share the Notion Coffee task management template duplicated in
            your workspace
          </Text>
          <Flex justify="center" mb="2">
            <Button
              type="submit"
              variant="outline"
              isLoading={notion}
              leftIcon={<NotionLogo />}
              loadingText="... Loading Notion"
              size="md"
              fontSize="sm"
              spinner
              onClick={handelClick}
            >
              Connect Notion
            </Button>
          </Flex>
          <Image
            src="https://firebasestorage.googleapis.com/v0/b/react-coffee-a2736.appspot.com/o/beforeStart.png?alt=media&token=222495a4-3651-4440-a9cf-3941fb08959a"
            alt="Img"
          />
        </Box>
      </Box>
    </>
  );
};

const mapStateToProps = ({ NotionAuth }) => {
  return {
    loading: NotionAuth?.loading,
    redirectedUrl: NotionAuth?.oauthUrl?.redirectUrl,
    response: NotionAuth?.response,
    error: NotionAuth?.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    notionOAuthUlr: (userData) => {
      dispatch(notionOAuthUlr(userData));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Notion1);
