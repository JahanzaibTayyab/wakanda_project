import React, { useState } from "react";
import { Button, useToast } from "@chakra-ui/react";
import Modal from "../../controls/Modal";
import { ModalToast } from "../../../../constants/_data/Mockup";
const ChangeDatabaseModal = (props) => {
  const toast = useToast();
  const [buttonText, setButtonText] = useState("Change Database");
  const [disabledButton, setDisabledButton] = useState(false);
  const { open, onClose, onOk } = props;

  const handelOnClose = () => {
    setButtonText("Change Database");
    setDisabledButton(false);
    onClose();
  };
  const handleRefreshModalClick = () => {
    setButtonText("Changing Database...");
    setDisabledButton(true);
    toast({
      position: "bottom-right",
      title: ModalToast.ChangeDatabase.info.title,
      duration: ModalToast.ChangeDatabase.info.duration,
      isClosable: true,
    });
    setTimeout(() => {
      onOk();
    }, [3500]);
  };
  return (
    <Modal
      title="Change Database"
      isOpen={open}
      actions={
        <>
          <Button fontSize="sm" mr={3} onClick={handelOnClose}>
            Cancel
          </Button>
          <Button
            bg="yellow.600"
            textColor="white"
            isDisabled={disabledButton}
            fontSize="sm"
            onClick={handleRefreshModalClick}
          >
            {buttonText}
          </Button>
        </>
      }
    >
      Your widget will start recording tasks only in this new database you have
      selected.
    </Modal>
  );
};

export default ChangeDatabaseModal;
