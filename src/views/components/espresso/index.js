import React, { useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  SimpleGrid,
  Divider,
  Button,
  Switch,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Icon,
  useToast,
} from "@chakra-ui/react";
import { ChevronDownIcon, InfoOutlineIcon } from "@chakra-ui/icons";
import { FaReact } from "react-icons/fa";
import RefreshLink from "./RefreshLink";
import "./dashboard.css";
import RefreshLinkModal from "./Modals/RefreshLinkModal";
import ChangeDatabaseModal from "./Modals/ChangeDatabaseModal";
import ChangePageModal from "./Modals/ChangePageModal";
import EmbedInNotionModal from "./Modals/EmbedInNotionModal";
import { ModalToast } from "../../../constants/_data/Mockup";

const DashboardContent = (props) => {
  const { title } = props;

  const toast = useToast();

  const [enableSwitch, setEnabledSwitch] = useState(false);
  const [disabledRefreshLinkButton, setDisabledRefreshLinkButton] =
    useState(false);
  const [showRefreshLinkModal, setShowRefreshLinkModal] = useState(false);
  const [showChangePageModal, setShowChangePageModal] = useState(false);
  const [showEmbedInNotionModal, setShowEmbedInNotionModal] = useState(false);
  const [showChangeDatabaseModal, setShowChangeDatabaseModal] = useState(false);
  const [disabledEmbedWidgetButton, setDisabledEmbedWidgetButton] =
    useState(false);
  const handleRefreshLinkClick = () => {
    setDisabledRefreshLinkButton(true);
    setShowRefreshLinkModal(true);
  };

  const handelSwitchClick = (e) => {
    setEnabledSwitch(!enableSwitch);
  };

  const handleEmbedWidgetClick = () => {
    setShowEmbedInNotionModal(true);
    setDisabledEmbedWidgetButton(true);
  };

  const handelOkClickRefreshLinkModal = () => {
    toast({
      position: "bottom-right",
      title: ModalToast.RefreshLink.success.title,
      description: ModalToast.RefreshLink.success.description,
      duration: ModalToast.RefreshLink.success.duration,
      status: "success",
      isClosable: true,
    });
    setDisabledRefreshLinkButton(false);
    setShowRefreshLinkModal(false);
  };

  const handelCancelClickRefreshLinkModal = () => {
    setDisabledRefreshLinkButton(false);
    setShowRefreshLinkModal(false);
  };

  const handelOkClickChangeDatabaseModal = () => {
    toast({
      position: "bottom-right",
      title: ModalToast.ChangeDatabase.success.title,
      description: ModalToast.ChangeDatabase.success.description,
      duration: ModalToast.ChangeDatabase.success.duration,
      status: "success",
      isClosable: true,
    });
    setShowChangeDatabaseModal(false);
  };

  const handelCancelClickChangeDatabaseModal = () => {
    setShowChangeDatabaseModal(false);
  };

  const handelOkClickChangePageModal = () => {
    toast({
      position: "bottom-right",
      title: ModalToast.ChangePage.success.title,
      description: ModalToast.ChangePage.success.description,
      duration: ModalToast.ChangePage.success.duration,
      status: "success",
      isClosable: true,
    });
    setShowChangePageModal(false);
  };

  const handelCancelClickChangePageModal = () => {
    setShowChangePageModal(false);
  };

  const handelOkClickEmbedInNotionModal = () => {
    toast({
      position: "bottom-right",
      title: ModalToast.EmbedInNotion.success.title,
      description: ModalToast.EmbedInNotion.success.description,
      duration: ModalToast.EmbedInNotion.success.duration,
      status: "success",
      isClosable: true,
    });
    setDisabledEmbedWidgetButton(false);
    setShowEmbedInNotionModal(false);
  };

  const handelCancelClickEmbedInNotionModal = () => {
    setDisabledEmbedWidgetButton(false);
    setShowEmbedInNotionModal(false);
  };

  return (
    <>
      <Heading size="md" fontWeight="bold" mb={6}>
        {title}
      </Heading>
      <Box
        flex={1}
        px={{
          base: 0,
          md: 5,
        }}
        mb={10}
      >
        <SimpleGrid columns={{ sm: 1, md: 2 }}>
          <Box>
            <Flex justify="space-between">
              <Heading size="sm" fontWeight="bold">
                Embeddable secret link
              </Heading>
              <Box
                display={{
                  base: "block",
                  md: "none",
                }}
              >
                <InfoOutlineIcon color="gray.500" />
              </Box>
            </Flex>
            <Text
              mt={2}
              color="gray.500"
              fontSize="xs"
              fontWeight="500"
              display={{
                base: "none",
                md: "block",
              }}
              mr={10}
            >
              You can copy and paste this URL in Notion to embed the widget. You
              will need the 6 digit code in the Notion page to use it, this is
              to make sure you have signed in into your workspace. Even so this
              is a public URL, <a className="textYellow">keep it secret.</a>
            </Text>
          </Box>
          <Box>
            <RefreshLink
              icon={props.refreshIcon}
              disabled
              inputValue="https://app.notion.coffee/w/espresso/asdadsadsasasd"
            />
            <Flex justify="flex-end">
              <Button
                bg="yellow.600"
                textColor="white"
                isDisabled={disabledRefreshLinkButton}
                fontSize="xs"
                mt={4}
                leftIcon={props.refreshIcon}
                onClick={handleRefreshLinkClick}
              >
                Refresh Link
              </Button>
            </Flex>
            <Flex alignItems="center" justifyContent="flex-end" mt={5}>
              <Switch
                id="email-alerts"
                size="sm"
                colorScheme="yellow"
                value={enableSwitch}
                onChange={handelSwitchClick}
              />
              <Text ml={5} fontSize="xs" textAlign="center">
                Secret public link{" "}
                <a className="textYellow">
                  {enableSwitch ? "enabled" : "disabled"}
                </a>
              </Text>
            </Flex>
          </Box>
        </SimpleGrid>
        <Divider
          py={4}
          display={{
            base: "none",
            md: "block",
          }}
        />
      </Box>
      <Box
        flex={1}
        px={{
          base: 0,
          md: 5,
        }}
        mb={10}
      >
        <SimpleGrid columns={{ sm: 1, md: 2 }}>
          <Box>
            <Flex justify="space-between">
              <Heading size="sm" fontWeight="bold">
                Page for Embed
              </Heading>
              <Box
                display={{
                  base: "block",
                  md: "none",
                }}
              >
                <InfoOutlineIcon color="gray.500" />
              </Box>
            </Flex>
            <Text
              mt={2}
              color="gray.500"
              fontSize="xs"
              fontWeight="500"
              display={{
                base: "none",
                md: "block",
              }}
              mr={10}
            >
              This is the page where the widget will be embedded. we will not
              remove anything from this page, only add the widget and the
              security authentication code.
            </Text>
          </Box>
          <Box>
            <Flex justify="flex-end">
              <Menu>
                <MenuButton
                  as={Button}
                  rightIcon={<ChevronDownIcon />}
                  leftIcon={<Icon as={FaReact} color="orange.500" />}
                  size="sm"
                  fontSize="sm"
                  fontWeight={500}
                  textAlign="left"
                  bg="white"
                  borderWidth="1px"
                >
                  Widget’s Page
                </MenuButton>
                <MenuList>
                  <MenuItem>Loream Text 1</MenuItem>
                  <MenuItem>Loream Text 2</MenuItem>
                  <MenuItem>Loream Text 3</MenuItem>
                  <MenuItem>Loream Text 4</MenuItem>
                  <MenuItem>Loream Text 5</MenuItem>
                </MenuList>
              </Menu>
            </Flex>
            <Flex justify="flex-end">
              <Button
                bg="yellow.600"
                textColor="white"
                isDisabled={disabledEmbedWidgetButton}
                fontSize="xs"
                mt={4}
                leftIcon={props.refreshIcon}
                onClick={handleEmbedWidgetClick}
              >
                Embed Widget
              </Button>
            </Flex>
          </Box>
        </SimpleGrid>
        <Divider
          py={4}
          mb={4}
          display={{
            base: "none",
            md: "block",
          }}
        />
      </Box>
      <Box
        flex={1}
        px={{
          base: 0,
          md: 5,
        }}
      >
        <SimpleGrid columns={{ sm: 1, md: 2 }}>
          <Box>
            <Flex justify="space-between">
              <Heading size="sm" fontWeight="bold">
                Task Database
              </Heading>
              <Box
                display={{
                  base: "block",
                  md: "none",
                }}
              >
                <InfoOutlineIcon color="gray.500" />
              </Box>
            </Flex>
            <Text
              mt={2}
              color="gray.500"
              fontSize="xs"
              fontWeight="500"
              display={{
                base: "none",
                md: "block",
              }}
              mr={10}
            >
              This is the database where the task data will be saved. Please, be
              aware that this database must contain at least the same properties
              as the{" "}
              <a className="textUnderline">
                Notion Coffee template task database.
              </a>
            </Text>
          </Box>
          <Box>
            <Flex justify="flex-end">
              <Menu>
                <MenuButton
                  as={Button}
                  rightIcon={<ChevronDownIcon />}
                  leftIcon={<InfoOutlineIcon color="gray.500" />}
                  size="sm"
                  fontSize="sm"
                  fontWeight={500}
                  textAlign="left"
                  bg="white"
                  borderWidth="1px"
                >
                  Task Database
                </MenuButton>
                <MenuList>
                  <MenuItem>Loream Text 1</MenuItem>
                  <MenuItem>Loream Text 2</MenuItem>
                  <MenuItem>Loream Text 3</MenuItem>
                  <MenuItem>Loream Text 4</MenuItem>
                  <MenuItem>Loream Text 5</MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          </Box>
        </SimpleGrid>
      </Box>
      {showRefreshLinkModal && (
        <RefreshLinkModal
          open={showRefreshLinkModal}
          onClose={handelCancelClickRefreshLinkModal}
          onOk={handelOkClickRefreshLinkModal}
        />
      )}
      {showChangeDatabaseModal && (
        <ChangeDatabaseModal
          open={showChangeDatabaseModal}
          onClose={handelCancelClickChangeDatabaseModal}
          onOk={handelOkClickChangeDatabaseModal}
        />
      )}
      {showChangePageModal && (
        <ChangePageModal
          open={showChangePageModal}
          onClose={handelCancelClickChangePageModal}
          onOk={handelOkClickChangePageModal}
        />
      )}
      {showEmbedInNotionModal && (
        <EmbedInNotionModal
          open={showEmbedInNotionModal}
          onClose={handelCancelClickEmbedInNotionModal}
          onOk={handelOkClickEmbedInNotionModal}
        />
      )}
    </>
  );
};

export default DashboardContent;
