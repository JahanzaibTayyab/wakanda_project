import { Flex, IconButton, HStack, Text, useColorMode } from "@chakra-ui/react";
import { CalendarIcon, StarIcon } from "@chakra-ui/icons";
import { CategoriesIcon } from "./WidgetIcons";

function WidgetButtons(props) {
  const { colorMode, toggleColorMode } = useColorMode();

  const handleColor = (hasValue) => {
    let color;
    if (colorMode === "light") return hasValue ? "green.200" : "gray.300";
    else return hasValue ? "green.200" : "white";
  };

  const handleOpacity = (hasValue) =>{
    if (hasValue || colorMode==="light") return "1"
    else return "0.25";
  }

  return (
    <HStack spacing="16px" mb={2} px={4}>
      <CalendarIcon
        boxSize={4}
        color={() => handleColor(props.hasDate)}
        opacity={() => handleOpacity(props.hasDate)}
      />
      <CategoriesIcon
        boxSize={5}
        color={() => handleColor(props.hasCategories)}
        opacity={() => handleOpacity(props.hasCategories)}
      />
      <Flex align="center">
        <StarIcon
          boxSize={4}
          color={() => handleColor(props.hasPriority)}
          opacity={() => handleOpacity(props.hasPriority)}
        />
        <Text ml="1" fontSize="xs" color="green.300" fontWeight="bolder">
          {props.hasPriority}
        </Text>
      </Flex>
    </HStack>
  );
}

export default WidgetButtons;