import React from "react";
import {
  Box,
  Button,
  Heading,
  FormErrorMessage,
  Text,
  FormControl,
  FormLabel,
  Input,
  Stack,
  useColorModeValue,
  Flex
} from "@chakra-ui/react";
import { Logo } from "../../components/controls/Logo";

import { OnBoardingSteps } from "./OnBoardingSteps/OnBordingSteps";

const Preparing = () => {
  
  const onSubmit = () => {
   
  };

  const handleSubmit = () => {
   
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
          Preparing your productivity boost
          </Heading>
          <Text mt="4" mb="8" align="center" maxW="md" fontWeight="400" fontSize='18px'>
          Just a minute and it’ll be ready...
            </Text>
           
          <Flex justify='center' mb='2'>
           <OnBoardingSteps />
            </Flex>
        </Box>
      </Box>
    </>
  );
};

export default Preparing;
