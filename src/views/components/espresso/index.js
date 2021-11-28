import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  SimpleGrid,
  Divider,
  Button,
  Switch,
  useToast,
  Select,
} from "@chakra-ui/react";
import { ChevronDownIcon, InfoOutlineIcon } from "@chakra-ui/icons";
import RefreshLink from "./RefreshLink";
import "./dashboard.css";
import RefreshLinkModal from "./Modals/RefreshLinkModal";
import ChangeDatabaseModal from "./Modals/ChangeDatabaseModal";
import ChangePageModal from "./Modals/ChangePageModal";
import EmbedInNotionModal from "./Modals/EmbedInNotionModal";
import { ModalToast } from "../../../constants/Toast";
import Loader from "../controls/Loader";
import { useAuth } from "../../../contexts/AuthContext";

const DashboardContent = (props) => {
  const { title, databases, pages, user } = props;
  const { currentUser } = useAuth();

  const toast = useToast();

  const [enableSwitch, setEnabledSwitch] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const [initialRendering, setInitialRendering] = useState(true);
  const [disabledRefreshLinkButton, setDisabledRefreshLinkButton] =
    useState(false);
  const [showRefreshLinkModal, setShowRefreshLinkModal] = useState(false);
  const [showChangePageModal, setShowChangePageModal] = useState(false);
  const [showEmbedInNotionModal, setShowEmbedInNotionModal] = useState(false);
  const [showChangeDatabaseModal, setShowChangeDatabaseModal] = useState(false);
  const [disabledEmbedWidgetButton, setDisabledEmbedWidgetButton] =
    useState(false);
  const [databaseOptionValue, setDatabaseOptionValue] = useState();
  const [pageOptionValue, setPageOptionValue] = useState();
  const [showPageError, setShowPageError] = useState(false);

  useEffect(() => {
    if (initialRendering) {
      props.findDataBase({ fromDashBoard: true });
    }
  }, []);

  useEffect(() => {
    if (user) {
      if (initialRendering) {
        if (!user?.page) {
          setShowPageError(true);
        }
        if (!user?.pinCode || !user?.uniqueUrl) {
          props.generateUniqueUrl();
          props.generatePinCode();
        }
      }
    }
  }, [user]);

  useEffect(() => {
    const { dashboardResponse, pinCodeGenerated } = props;
    if (pinCodeGenerated && showPageError) {
      props.saveData({
        id: currentUser?.uid,
        data: { pinCode: dashboardResponse },
      });
      props.getProfile();
      toast({
        position: "bottom-right",
        title: "Unique Url and pinCode generated",
        status: "success",
        isClosable: true,
      });
    }
  }, [props.pinCodeGenerated]);

  useEffect(() => {
    if (initialRendering) {
      if (databases && pages) {
        setInitialRendering(false);
        setShowLoader(false);
      }
    }
  }, [pages, databases]);

  useEffect(() => {
    const { uniqueLinkGenerated, dashboardResponse } = props;
    if (uniqueLinkGenerated) {
      if ((dashboardResponse && showRefreshLinkModal) || showPageError) {
        props.saveData({
          id: currentUser?.uid,
          data: { uniqueUrl: dashboardResponse },
        });
        if (showRefreshLinkModal) {
          toast({
            position: "bottom-right",
            title: ModalToast.RefreshLink.success.title,
            description: ModalToast.RefreshLink.success.description,
            duration: ModalToast.RefreshLink.success.duration,
            status: "success",
            isClosable: true,
          });
        }
        setDisabledRefreshLinkButton(false);
        setShowRefreshLinkModal(false);
      }
    }
  }, [props.uniqueLinkGenerated]);

  useEffect(() => {
    const { dashboardResponse, dashboardError } = props;
    if (dashboardResponse) {
      if (showChangePageModal) {
        if (dashboardResponse?.pinCodeBlock) {
          setShowPageError(false);
          props.getProfile();
          toast({
            position: "bottom-right",
            title: ModalToast.ChangePage.success.title,
            description: ModalToast.ChangePage.success.description,
            duration: ModalToast.ChangePage.success.duration,
            status: "success",
            isClosable: true,
          });
          setShowChangePageModal(false);
        }
      }
    }
    if (dashboardError) {
      setShowLoader(false);
      setShowChangePageModal(false);
      setShowRefreshLinkModal(false);
      setDisabledEmbedWidgetButton(false);
      setDisabledRefreshLinkButton(false);
      setShowChangePageModal(false);
      setShowEmbedInNotionModal(false);
    }
  }, [props.dashboardResponse, props.dashboardError]);

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
    props.generateUniqueUrl();
  };

  const handelCancelClickRefreshLinkModal = () => {
    setDisabledRefreshLinkButton(false);
    setShowRefreshLinkModal(false);
  };

  const handelOkClickChangeDatabaseModal = () => {
    props.saveData({
      id: currentUser?.uid,
      data: { database: databaseOptionValue },
    });
    toast({
      position: "bottom-right",
      title: ModalToast.ChangeDatabase.success.title,
      description: ModalToast.ChangeDatabase.success.description,
      duration: ModalToast.ChangeDatabase.success.duration,
      status: "success",
      isClosable: true,
    });
    props.getProfile();
    setShowChangeDatabaseModal(false);
  };

  const handelCancelClickChangeDatabaseModal = () => {
    setShowChangeDatabaseModal(false);
  };

  const handelOkClickChangePageModal = () => {
    props.saveData({
      id: currentUser?.uid,
      data: { page: pageOptionValue },
    });
    props.embededPinCode();
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

  const handelChangeDatabaseClick = (e) => {
    if (e.target.value) {
      setDatabaseOptionValue(e.target.value);
      setShowChangeDatabaseModal(true);
    }
  };

  const handelChangePageOptionClick = (e) => {
    if (e.target.value) {
      setPageOptionValue(e.target.value);
      setShowChangePageModal(true);
    }
  };

  return (
    <>
      {showLoader ? (
        <Loader open={true} />
      ) : (
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
                  You can copy and paste this URL in Notion to embed the widget.
                  You will need the 6 digit code in the Notion page to use it,
                  this is to make sure you have signed in into your workspace.
                  Even so this is a public URL,{" "}
                  <a className="textYellow">keep it secret.</a>
                </Text>
              </Box>
              <Box>
                <RefreshLink
                  icon={props.refreshIcon}
                  disabled
                  inputValue={user?.uniqueUrl}
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
                  This is the page where the widget will be embedded. we will
                  not remove anything from this page, only add the widget and
                  the security authentication code.
                </Text>
              </Box>
              <Box>
                <Flex
                  justify="flex-end"
                  direction="column"
                  alignItems="flex-end"
                >
                  <Select
                    size="md"
                    icon={<ChevronDownIcon />}
                    fontSize="sm"
                    fontWeight={500}
                    textAlign="left"
                    bg="white"
                    borderWidth="1px"
                    mt={2}
                    maxWidth={{ sm: "100%", md: 200 }}
                    placeholder="Select page"
                    value={user?.page}
                    errorBorderColor="red.400"
                    onChange={handelChangePageOptionClick}
                    isRequired
                    isInvalid={showPageError}
                  >
                    {pages?.map((page) => {
                      return (
                        <option value={page.id} key={page.id}>
                          {page.properties?.Name?.title[0]?.text.content}
                        </option>
                      );
                    })}
                  </Select>
                  {showPageError && (
                    <Text color="red.400" fontSize="sm" mt={2}>
                      Please select a page where to embed the widget.
                    </Text>
                  )}
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
                  This is the database where the task data will be saved.
                  Please, be aware that this database must contain at least the
                  same properties as the{" "}
                  <a className="textUnderline">
                    Notion Coffee template task database.
                  </a>
                </Text>
              </Box>
              <Box>
                <Flex justify="flex-end">
                  <Select
                    size="md"
                    icon={<ChevronDownIcon />}
                    fontSize="sm"
                    fontWeight={500}
                    textAlign="left"
                    bg="white"
                    borderWidth="1px"
                    mt={2}
                    maxWidth={{ sm: "100%", md: 200 }}
                    placeholder="Select database"
                    value={user?.database}
                    onChange={handelChangeDatabaseClick}
                    isRequired
                  >
                    {databases?.map((database) => {
                      return (
                        <option value={database.id} key={database.id}>
                          {database.title[0].text.content}
                        </option>
                      );
                    })}
                  </Select>
                </Flex>
              </Box>
            </SimpleGrid>
          </Box>
        </>
      )}
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
