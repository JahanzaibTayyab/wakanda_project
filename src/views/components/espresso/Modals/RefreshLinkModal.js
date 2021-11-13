import React, { useState } from "react";
import { Button, useToast } from "@chakra-ui/react";
import Modal from "../../controls/Modal";
import { ModalToast } from "../../../../constants/_data/Mockup";
const RefreshLinkModal = (props) => {
  const toast = useToast();
  const [buttonText, setButtonText] = useState("Refresh");
  const [disabledButton, setDisabledButton] = useState(false);
  const { open, onClose, onOk } = props;

  const handelOnClose = () => {
    setButtonText("Refresh");
    setDisabledButton(false);
    onClose();
  };
  const handleRefreshModalClick = () => {
    setButtonText("Refreshing...");
    setDisabledButton(true);
    toast({
      position: "bottom-right",
      title: ModalToast.RefreshLink.info.title,
      duration: ModalToast.RefreshLink.info.duration,
      isClosable: true,
    });
    setTimeout(() => {
      onOk();
    }, [3500]);
  };
  return (
    <Modal
      title="Refresh link"
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
      Are you sure? Your embeds will become unusable.
    </Modal>
  );
};

export default RefreshLinkModal;
