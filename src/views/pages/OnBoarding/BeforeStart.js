import React from "react";
import {
  Box,
  Button,
  Heading,
  Text,
  Stack,
  useColorModeValue,
  Flex
} from "@chakra-ui/react";
import { Logo } from "../../components/controls/Logo";
import Link from "../../components/controls/Link";
import Card from "../../components/controls/Card";
import { useHistory } from "react-router-dom";

const BeforeStart = () => {
  const history = useHistory();

  const handleSubmit = () => {
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
          <Text mt="4" mb="8" align="center" maxW="md" fontWeight="500" fontSize='18px'>
            <Text as="span">Duplicate the</Text>
            <Link href="#" >
            <Text as="u" mr='1'>Task Management Template</Text>
            </Link>
            in your workspace. Notion Coffee needs a database with certain properties to work.
          </Text>
          <Flex justify='center' mb='2'>
          <Button
                type="submit"
                colorScheme="teal"
                size="md"
                fontSize="sm"
                onClick={handleSubmit}
              >
                Continue
              </Button>
            </Flex>
          <Card>
            <Stack spacing="6">
           
            
            </Stack>
          </Card>
        </Box>
      </Box>
    </>
  );
};

export default BeforeStart;
