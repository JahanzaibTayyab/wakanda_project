import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
} from "@chakra-ui/react";

const CommonModal = (props) => {
  const { children, isOpen, id, onClose, title, actions, ...rest } = props;
  return (
    <Modal isOpen={isOpen} onClose={onClose} id={id} {...rest}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader color="gray.700">{title}</ModalHeader>
        <ModalBody fontSize="sm">{children}</ModalBody>
        <ModalFooter>{actions}</ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default CommonModal;
