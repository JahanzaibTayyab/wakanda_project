import { CheckIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { BsFillPlayFill } from "react-icons/bs";
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
  const { isActive, isCompleted, step } = useStep();
  const accentColor = useColorModeValue("yellow.500", "yellow.300");
  const mutedColor = useColorModeValue("gray.600", "whiteAlpha.800");
  const activeColor = useColorModeValue("white", "black");
  const successColor = useColorModeValue("green.500", "white");
  const errorColor = useColorModeValue("red.400", "white");
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
            isActive
              ? accentColor
              : isCompleted
              ? successColor
              : isError
              ? errorColor
              : "transparent"
          }
        >
          {isActive ? (
            <Icon as={BsFillPlayFill} />
          ) : isCompleted ? (
            <Icon as={CheckIcon} />
          ) : (
            <Icon as={ChevronRightIcon} style={{ size: "15px" }} />
          )}
        </Circle>
        <Heading
          fontSize="lg"
          fontWeight="semibold"
          color={isActive || isCompleted ? "inherit" : mutedColor}
        >
          {title}
        </Heading>
      </HStack>
      <Collapse in={isActive}>{children}</Collapse>
    </Box>
  );
};
