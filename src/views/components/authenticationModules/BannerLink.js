import React from "react";
import { chakra } from "@chakra-ui/react";

export const BannerLink = (props) => (
  <chakra.a
    {...props}
    px="4"
    py="1"
    textAlign="center"
    backgroundColor="white"
    textColor="blue.500"
    borderWidth="1px"
    borderColor="whiteAlpha.400"
    rounded="base"
    cursor="pointer"
    _hover={{
      bg: "whiteAlpha.800",
    }}
  />
);
