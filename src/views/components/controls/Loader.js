import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalBody,
  Spinner,
  ModalContent,
  useToast,
  Text,
  Flex,
} from "@chakra-ui/react";
const UILoader = (props) => {
  const toast = useToast();
  const { open } = props;
  return (
    <Modal isOpen={open} isCentered>
      <ModalOverlay bg="rgba(255,255,255,0.2)" />
      <ModalContent bg="transparent" boxShadow="none">
        <ModalBody>
          <Flex direction="column" justify="center" alignItems="center">
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
              label="loading"
            />
            <Text mt={5} fontWeight="semibold">
              Getting everything ready...
            </Text>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default UILoader;
