import React, { useState } from "react";
import { Button, useToast } from "@chakra-ui/react";
import Modal from "../../controls/Modal";
import { ModalToast } from "../../../../constants/_data/Mockup";

const EmbedInNotionModal = (props) => {
  const toast = useToast();
  const [buttonText, setButtonText] = useState("Embed");
  const [disabledButton, setDisabledButton] = useState(false);
  const { open, onClose, onOk } = props;

  const handelOnClose = () => {
    setButtonText("Embed");
    setDisabledButton(false);
    onClose();
  };
  const handleRefreshModalClick = () => {
    setButtonText("Embedding");
    setDisabledButton(true);
    toast({
      position: "bottom-right",
      title: ModalToast.EmbedInNotion.info.title,
      duration: ModalToast.EmbedInNotion.info.duration,
      isClosable: true,
    });
    setTimeout(() => {
      onOk();
    }, [3500]);
  };
  return (
    <Modal
      title="Embed in Notion"
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
      Your current widget embed will be replaced with this new URL.
    </Modal>
  );
};

export default EmbedInNotionModal;
