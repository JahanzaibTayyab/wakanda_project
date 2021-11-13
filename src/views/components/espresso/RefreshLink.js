import React from "react";
import {
  Input,
  InputGroup,
  InputLeftAddon,
  IconButton,
} from "@chakra-ui/react";
const RefreshLink = (props) => {
  const { icon, inputValue, ...rest } = props;
  return (
    <>
      <InputGroup
        mt={{
          base: "4",
          md: "0",
        }}
      >
        <InputLeftAddon
          children={
            <IconButton
              bg="transparent !important"
              variant="ghost"
              icon={icon}
            />
          }
        />
        <Input
          type="text"
          value={inputValue}
          isReadOnly
          {...rest}
          fontSize="sm"
        />
      </InputGroup>
    </>
  );
};

export default RefreshLink;
