import React, { useState } from "react";
import { Button, useToast } from "@chakra-ui/react";
import Modal from "../../controls/Modal";
import { ModalToast } from "../../../../constants/_data/Mockup";
const ChangePageModal = (props) => {
  const toast = useToast();
  const [buttonText, setButtonText] = useState("Change Page");
  const [disabledButton, setDisabledButton] = useState(false);
  const { open, onClose, onOk } = props;

  const handelOnClose = () => {
    setButtonText("Change Page");
    setDisabledButton(false);
    onClose();
  };
  const handleRefreshModalClick = () => {
    setButtonText("Changing Page...");
    setDisabledButton(true);
    toast({
      position: "bottom-right",
      title: ModalToast.ChangePage.info.title,
      duration: ModalToast.ChangePage.info.duration,
      isClosable: true,
    });
    setTimeout(() => {
      onOk();
    }, [3500]);
  };
  return (
    <Modal
      title="Change Page"
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
      Your widget will be embedded in this new page.
    </Modal>
  );
};

export default ChangePageModal;
