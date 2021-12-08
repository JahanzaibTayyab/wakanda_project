import React, { useEffect } from "react";
import {
  Input,
  InputGroup,
  InputLeftAddon,
  IconButton,
  useClipboard,
  useToast,
} from "@chakra-ui/react";
const RefreshLink = (props) => {
  const toast = useToast();
  const { icon, inputValue, ...rest } = props;
  const { hasCopied, onCopy } = useClipboard(inputValue);
  useEffect(() => {
    if (hasCopied) {
      toast({
        position: "bottom-right",
        title: "Link Copied",
        status: "success",
        isClosable: true,
      });
    }
  }, [hasCopied]);
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
              onClick={onCopy}
            />
          }
        />
        <Input
          type="text"
          value={inputValue}
          isReadOnly
          color="blackAlpha.500"
          {...rest}
          fontSize="sm"
        />
      </InputGroup>
    </>
  );
};

export default RefreshLink;
