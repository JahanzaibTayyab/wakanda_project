import { chakra, useColorModeValue } from "@chakra-ui/system";
import * as React from "react";

export const Link = (props) => (
  <chakra.a
    marginStart="1"
    href="#"
    color={useColorModeValue("yellow.500", "yellow.200")}
    _hover={{
      color: useColorModeValue("yellow.600", "yellow.300"),
    }}
    display={{
      base: "block",
      sm: "inline",
    }}
    {...props}
  />
);
export default Link;
