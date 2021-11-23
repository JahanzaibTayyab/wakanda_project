import React, { useEffect } from "react";
import {
  Box,
  Flex,
  Stack,
  Divider,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import { FaReact } from "react-icons/fa";
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
    window.location.reload(true);
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
      >
        <Box fontSize="sm" lineHeight="tall">
          <Box
            as="a"
            p="3"
            display="block"
            transition="background 0.1s"
            rounded="xl"
            _hover={{
              bg: "whiteAlpha.200",
            }}
            whiteSpace="nowrap"
          >
            <Logo />
            <Box as="a" href={match.url + "/profile"} cursor="pointer">
              <UserInfo
                name={user?.workspace}
                email={currentUser?.email}
                image={user?.workspaceIcon}
              />
            </Box>
          </Box>
          <ScrollArea pt="5" pb="6">
            <Flex direction="column" justify="space-between">
              <div>
                <Stack pb="6">
                  <NavSectionTitle>Widgets</NavSectionTitle>
                  <SidebarLink
                    icon={<FaReact />}
                    href={match.url + "/widgets/espresso"}
                    fontStyle="italic"
                  >
                    Espresso
                  </SidebarLink>
                  <SidebarLink
                    icon={<FaReact />}
                    showComingSoon
                    href={match.url + "#"}
                    fontStyle="italic"
                  >
                    Latte
                  </SidebarLink>
                  <SidebarLink
                    icon={<FaReact />}
                    showComingSoon
                    href={match.url + "#"}
                    fontStyle="italic"
                  >
                    Flat white
                  </SidebarLink>
                  <SidebarLink
                    icon={<FaReact />}
                    showComingSoon
                    href={match.url + "#"}
                    fontStyle="italic"
                  >
                    Machiatto
                  </SidebarLink>
                </Stack>
                <Stack pb="6">
                  <NavSectionTitle>Configuration</NavSectionTitle>
                  <SidebarLink
                    icon={<FaReact />}
                    href={match.url + "/configuration/theme"}
                  >
                    Theme
                  </SidebarLink>
                </Stack>
              </div>
              <Flex direction="column">
                <Divider mb={5} />
                <Stack pb="6">
                  <SidebarLink icon={<FaReact />}>Support</SidebarLink>
                  <SidebarLink icon={<FaReact />} onClick={logoutUser}>
                    Logout
                  </SidebarLink>
                </Stack>
              </Flex>
            </Flex>
          </ScrollArea>
        </Box>
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
            <Flex direction="column" flex="1" overflow="auto" px="10" pt="8">
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
