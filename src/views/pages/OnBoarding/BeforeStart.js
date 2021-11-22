import React from "react";
import {
  Box,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Flex,
  Image,
} from "@chakra-ui/react";
import { Logo } from "../../components/controls/Logo";
import Link from "../../components/controls/Link";
import { useHistory } from "react-router-dom";

const BeforeStart = (props) => {
  const history = useHistory();

  const handelClick = () => {
    history.push("/notion1");
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
            Before we start...
          </Heading>
          <Text
            mt="4"
            mb="8"
            align="center"
            maxW="md"
            fontStyle="normal"
            lineHeight={2}
            fontWeight="500"
            fontSize="18px"
          >
            <Text as="span">Duplicate the</Text>
            <Link href="https://www.notion.coffee" target="_blank">
              <Text as="u" mr="1">
                Task Management Template
              </Text>
            </Link>
            in your workspace. Notion Coffee needs a database with certain
            properties to work.
          </Text>
          <Flex justify="center" mb="2">
            <Button
              type="submit"
              colorScheme="teal"
              size="md"
              fontSize="sm"
              onClick={handelClick}
            >
              Continue
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

export default BeforeStart;
