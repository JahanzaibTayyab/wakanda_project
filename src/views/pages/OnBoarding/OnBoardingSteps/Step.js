import { CheckIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { BsFillPlayFill, BsExclamation } from "react-icons/bs";
import {
  Box,
  Circle,
  Collapse,
  Heading,
  HStack,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import * as React from "react";
import { useStep } from "./useStep";

export const Step = (props) => {
  const { title, children, isError, ...boxProps } = props;
  const { isActive, isCompleted } = useStep();
  const accentColor = useColorModeValue("yellow.500", "yellow.300");
  const mutedColor = useColorModeValue("gray.600", "whiteAlpha.800");
  const activeColor = useColorModeValue("white", "black");
  const successColor = useColorModeValue("green.500", "white");
  const errorColor = useColorModeValue("red.400", "white");
  const unActiveColor = useColorModeValue("gray.400", "gray.200");
  return (
    <Box {...boxProps} mb="8">
      <HStack spacing="4">
        <Circle
          size="10"
          fontWeight="bold"
          color={
            isActive ? activeColor : isCompleted ? accentColor : mutedColor
          }
          bg={
            isError
              ? errorColor
              : isCompleted
              ? successColor
              : isActive
              ? accentColor
              : "transparent"
          }
        >
          {isError ? (
            <Icon as={BsExclamation} color="white" w={12} h={12} />
          ) : isCompleted ? (
            <Icon as={CheckIcon} color="white" w={6} h={6} />
          ) : isActive ? (
            <Icon as={BsFillPlayFill} w={6} h={6} />
          ) : (
            <Icon as={ChevronRightIcon} color="gray.400" w={12} h={12} />
          )}
        </Circle>
        <Heading
          fontSize="lg"
          fontWeight={isActive || isCompleted ? "semibold" : "normal"}
          color={
            isError
              ? errorColor
              : isCompleted
              ? mutedColor
              : isActive
              ? accentColor
              : unActiveColor
          }
        >
          {title}
        </Heading>
      </HStack>
      <Collapse in={isActive}>{children}</Collapse>
    </Box>
  );
};
