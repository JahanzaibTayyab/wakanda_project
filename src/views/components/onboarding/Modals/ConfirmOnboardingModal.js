import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  VStack,
  Center,
  Button,
  Text,
  Input,
  InputGroup,
  InputLeftAddon,
  IconButton,
  useClipboard,
} from "@chakra-ui/react";
import { CopyIcon } from "@chakra-ui/icons";

const ConfirmOnboardingModal = (props) => {
  const { isOpen, onClose, onOk, uniqueLink } = props;
  const { hasCopied, onCopy } = useClipboard(uniqueLink);

  return (
    <Modal
      size="xl"
      closeOnOverlayClick={false}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>All set!</ModalHeader>
        <ModalBody pb={6}>
          <VStack
            spacing={4}
          >
            <Text>
              Everything is set up correctly. Now you only need to embed this URL in a
              Notion page as an embed block:
            </Text>
            <InputGroup>
              <InputLeftAddon
                onClick={onCopy}
                children={<CopyIcon color="gray.300" />}
              />
              <Input
                type="text"
                value={uniqueLink}
                isReadOnly
                color="blackAlpha.500"
                fontSize="sm"
              />
            </InputGroup>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Center>
            <Button variant="ghost" onClick={onOk} colorScheme="yellow">
              Great, go to dashboard!
            </Button>
          </Center>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmOnboardingModal;
