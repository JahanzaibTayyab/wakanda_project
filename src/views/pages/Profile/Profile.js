import React, { useState, useEffect } from "react";
import _ from "lodash";
import {
  Heading,
  SimpleGrid,
  Box,
  Button,
  Flex,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Text,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import { NotionLogo } from "../../components/controls/NotionLogo";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useHistory } from "react-router-dom";
import Loader from "../../components/controls/Loader";
import { useAuth } from "../../../contexts/AuthContext";
import { LocalStorage } from "../../../constants/LocalStorage";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  name: yup.string().required(),
});

const Profile = (props) => {
  const history = useHistory();
  const toast = useToast();
  const { currentUser, sendUserEmailVerification, logout, updateUserEmail } =
    useAuth();
  const { user } = props;
  const [showLoader, setShowLoader] = useState(true);
  const [showButtonContainer, setShowButtonContainer] = useState(false);
  const [initialValue, setInitialValue] = useState({});
  const [disabledForm, setDisabledForm] = useState(false);

  useEffect(() => {
    if (user) {
      setShowLoader(false);
      setInitialValue({ name: user?.workspace, email: currentUser?.email });
      reset({ name: user?.workspace, email: currentUser?.email });
    }
  }, [user, currentUser]);

  useEffect(() => {
    const { redirectedUrl, error } = props;
    if (redirectedUrl) {
      window.open(redirectedUrl, "_blank");
    }
    if (error) {
      toast({
        position: "bottom-right",
        title: "Something Went wrong",
        description: error?.message,
        isClosable: true,
      });
    }
  }, [props.redirectedUrl, props.error]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const onSubmit = async (values) => {
    if (values) {
      if (values.name) {
        const isEqual = _.isEqual(values.name.trim(), initialValue.name);
        if (!isEqual) {
          console.log("Called Name");
          props.saveData({
            id: currentUser?.uid,
            data: {
              workspace: values.name.trim(),
            },
          });
        }
      }
      if (values.email) {
        const isEqual = _.isEqual(values.email.trim(), initialValue.email);
        if (!isEqual) {
          await updateUserEmail(values.email);
          await sendUserEmailVerification();
          logout();
          localStorage.removeItem(LocalStorage.TOKEN);
          localStorage.removeItem(LocalStorage.USER_ID);
          localStorage.removeItem(LocalStorage.WAKANDA_EMAIL);
          history.push("/login");
          window.location.reload(true);
        }
      }
      props.getProfile();
    }
  };
  const handelChangeInput = () => {
    if (!showButtonContainer) {
      setShowButtonContainer(true);
    }
  };

  const handelChangeNotion = () => {
    setDisabledForm(true);
    setShowButtonContainer(false);
    toast({
      position: "bottom-right",
      title: "Changing Notion configuration...",
      isClosable: true,
      duration: null,
    });
    props.notionOAuthUlr();
  };

  return (
    <>
      <Heading size="md" fontWeight="bold" mb={6}>
        User Profile
      </Heading>
      {showLoader ? (
        <Loader open={showLoader} />
      ) : (
        <>
          <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }}>
            <Box>
              <Flex justify="flex-end" mb={10}>
                <Button
                  variant="outline"
                  fontSize="md"
                  leftIcon={<NotionLogo />}
                  borderWidth={2}
                  borderColor="black"
                  size="lg"
                  onClick={handelChangeNotion}
                >
                  Change Notion
                </Button>
              </Flex>
              <Stack spacing="6">
                <FormControl
                  isInvalid={!!errors?.name?.message}
                  errortext={errors?.name?.message}
                  isDisabled={disabledForm}
                >
                  <FormLabel>Name</FormLabel>
                  <Input
                    type="text"
                    name="name"
                    placeholder={user?.workspace}
                    {...register("name")}
                    onChange={handelChangeInput}
                  />
                  <FormErrorMessage>{errors?.name?.message}</FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={!!errors?.email?.message}
                  errortext={errors?.email?.message}
                  isDisabled={disabledForm}
                >
                  <FormLabel>Email</FormLabel>
                  <Text textColor="gray.500" mb={3} fontSize="sm">
                    If you change your email, you will be logged out and will
                    need to verify your new email address before signin in
                    again.
                  </Text>
                  <Input
                    type="email"
                    name="email"
                    placeholder={currentUser?.email}
                    {...register("email")}
                    onChange={handelChangeInput}
                  />
                  <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
                </FormControl>
              </Stack>
              {showButtonContainer && (
                <Flex justify="flex-end" py={5}>
                  <Button
                    mr={5}
                    size="lg"
                    fontSize="md"
                    onClick={() => history.goBack()}
                  >
                    Cancel
                  </Button>
                  <Button
                    bg="yellow.500"
                    textColor="white"
                    type="submit"
                    size="lg"
                    fontSize="md"
                    onClick={handleSubmit(onSubmit)}
                    disabled={!!errors.email || !!errors.name}
                  >
                    Save Changes
                  </Button>
                </Flex>
              )}
            </Box>
          </SimpleGrid>
        </>
      )}
    </>
  );
};

export default Profile;
