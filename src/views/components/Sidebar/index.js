import React, { useEffect } from "react";
import {
  Box,
  Flex,
  Stack,
  Divider,
  Spacer,
  useColorModeValue as mode,
  VStack,
} from "@chakra-ui/react";
import { ArrowRightIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { connect } from "react-redux";
import { Logo } from "../controls/DashboardLogo";
import { MobileMenuButton } from "./MobileMenuButton";
import NavBreadcrumb from "./NavBreadcrumb";
import { NavSectionTitle } from "./NavSectionTitle";
import { ScrollArea } from "./ScrollArea";
import { SidebarLink } from "./SidebarLink";
import { useMobileMenuState } from "./useMobileMenuState";
import { UserInfo } from "./UserInfo";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import { LocalStorage } from "../../../constants/LocalStorage";
import { getProfile } from "../../../store/actions/Profile";

const SideBar = (props) => {
  const { children, user } = props;
  const { isOpen, toggle } = useMobileMenuState();
  const { match } = props;
  const history = useHistory();
  const { logout, currentUser } = useAuth();

  const logoutUser = () => {
    logout();
    localStorage.removeItem(LocalStorage.TOKEN);
    localStorage.removeItem(LocalStorage.USER_ID);
    localStorage.removeItem(LocalStorage.WAKANDA_EMAIL);
    history.push("/login");
    // window.location.reload(true);
  };
  useEffect(() => {
    props.getProfile();
  }, []);


  return (
    <Flex
      height="100vh"
      bg={mode("gray.800", "gray.400")}
      overflow="hidden"
      sx={{
        "--sidebar-width": "16rem",
      }}
    >
      <Box
        as="nav"
        display="block"
        flex="1"
        width="var(--sidebar-width)"
        left="0"
        py="5"
        px="3"
        color="gray.200"
        position="fixed"
        h="full"
        fontSize="sm"
        lineHeight="tall"
      >
        <VStack
          px={2}
          alignItems="start"
          direction="column"
          h="100%"
          spacing={8}
        >
          <Logo />
          <Box
            as="a"
            p="3"
            px={-2}
            display="block"
            transition="background 0.1s"
            rounded="xl"
            _hover={{
              bg: "whiteAlpha.200",
            }}
            whiteSpace="nowrap"
            onClick={()=>history.push(match.url + "/profile")}
            cursor="pointer"
            width="full"
          >
            <UserInfo
              mt={0}
              name={user?.workspace}
              email={currentUser?.email}
              image={user?.workspaceIcon}
            />
          </Box>
          <ScrollArea pt="5" pb="6">
            <NavSectionTitle py={2}>Widgets</NavSectionTitle>
            <SidebarLink
              icon={<ArrowRightIcon />}
              onClick={()=>history.push(match.url + "/widgets/espresso")}
              fontStyle="italic"
            >
              Espresso
            </SidebarLink>
            <SidebarLink
              icon={<ArrowRightIcon />}
              showComingSoon
              fontStyle="italic"
            >
              Latte
            </SidebarLink>
            <SidebarLink
              icon={<ArrowRightIcon />}
              showComingSoon
              fontStyle="italic"
            >
              Flat white
            </SidebarLink>
            <SidebarLink
              icon={<ArrowRightIcon />}
              showComingSoon
              fontStyle="italic"
            >
              Machiatto
            </SidebarLink>
            <Spacer />
            <Divider my={3} />
            <SidebarLink icon={<ExternalLinkIcon />} onClick={logoutUser}>
              Logout
            </SidebarLink>
          </ScrollArea>
        </VStack>
      </Box>
      <Box
        flex="1"
        p={{
          base: "0",
          md: "0",
        }}
        marginStart={{
          md: "var(--sidebar-width)",
        }}
        position="relative"
        left={isOpen ? "var(--sidebar-width)" : "0"}
        transition="left 0.2s"
      >
        <Box
          bg={mode("white", "gray.700")}
          height="100%"
          pb="6"
          rounded={{
            md: "lg",
          }}
        >
          <Flex direction="column" height="full" width="full">
            <Flex
              w="full"
              py="4"
              justify="space-between"
              align="center"
              px="10"
            >
              <Flex align="center" minH="8">
                <MobileMenuButton onClick={toggle} isOpen={isOpen} />
                <NavBreadcrumb />
              </Flex>
            </Flex>
            <Flex
              direction="column"
              flex="1"
              overflow="auto"
              px={{base:"4",md:"10"}}
              pt="8"
            >
              {children}
            </Flex>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
};

const mapStateToProps = ({ Profile }) => {
  return {
    user: Profile?.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProfile: (data) => {
      dispatch(getProfile(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
