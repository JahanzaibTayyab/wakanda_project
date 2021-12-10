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
            h="6"
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
            <Link
              isExternal={true}
              href="https://www.notion.so/mikecafe/Notion-Coffe-Espresso-Demo-24f1ef7413b84ade8241d226cc45c706"
              target="_blank"
            >
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
              bg="yellow.600"
              textColor="white"
              size="md"
              fontSize="sm"
              onClick={handelClick}
            >
              Continue
            </Button>
          </Flex>
          <Box boxShadow="dark-lg" marginTop="5">
            <Image
              top="-5"
              position="relative"
              src="https://firebasestorage.googleapis.com/v0/b/react-coffee-a2736.appspot.com/o/beforePic.png?alt=media&token=c94b271d-9a3f-4f62-bfc9-6cf83198c65e"
              alt="Img"
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default BeforeStart;
