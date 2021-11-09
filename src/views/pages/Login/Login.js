import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Heading,
  SimpleGrid,
  FormErrorMessage,
  Text,
  FormControl,
  FormLabel,
  Input,
  Stack,
  InputGroup,
  useColorModeValue,
  Flex,
  Divider,
  InputRightAddon,
  VisuallyHidden,
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { AiFillFacebook } from "react-icons/ai";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Logo } from "../../components/controls/Logo";
import Link from "../../components/controls/Link";
import Card from "../../components/controls/Card";
import Banner from "../../components/authenticationModules/Banner";
import { LocalStorage } from "../../../constants/LocalStorage";
// import { signInWithEmailAndPassword } from "@firebase/auth";
// import { auth } from "../../../utils/init-firebase";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup
    .string()
    .min(8)
    .required()
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "Password must contain at least 8 characters, one uppercase, one number and one special case character"
    ),
});

const Login = (props) => {
  const location = useLocation();
  const history = useHistory();
  const [show, setShow] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (location.state?.forgetPassword && location.state?.email) {
      setShowBanner(true);
      setEmail(location.state?.email);
    }
    if (location?.search) {
      setShowBanner(true);
      setEmail(localStorage.getItem(LocalStorage.WAKANDA_EMAIL));
    }
  }, [location]);

  useEffect(() => {}, [props.signInResponse]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const handleClick = () => setShow(!show);

  const handleCloseIcon = () => {
    setShowBanner(false);
    setEmail("");
    localStorage.removeItem(LocalStorage.WAKANDA_EMAIL);
  };

  const handleResendEmailClick = () => {
    props.reSendEmail({ email });
  };

  const handleGoogleClick = () => {};

  const handleFaceBookClick = () => {};

  const onSubmit = async (values) => {
    props.signInUser({ history, ...values });
    reset();
  };

  return (
    <>
      <Box
        bg={useColorModeValue("gray.50", "inherit")}
        minH="100vh"
        py="12"
        px={{
          base: "4",
          lg: "8",
        }}
      >
        <Box maxW="md" mx="auto">
          <Logo
            mx="auto"
            h="8"
            mb={{
              base: "10",
              md: "20",
            }}
          />
          <Heading textAlign="center" size="xl" fontWeight="extrabold">
            Sign in to your account
          </Heading>
          <Text mt="4" mb="8" align="center" maxW="md" fontWeight="small">
            <Text as="span">Don&apos;t have an account?</Text>
            <Link href="/signup" fontWeight="bold">
              Sign up here
            </Link>
          </Text>
          <Card>
            <Stack spacing="6">
              <FormControl
                isInvalid={!!errors?.email?.message}
                errortext={errors?.email?.message}
                isRequired
              >
                <FormLabel>Email</FormLabel>
                <Input type="email" name="email" {...register("email")} />
                <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={!!errors?.password?.message}
                errortext={errors?.password?.message}
                isRequired
              >
                <Flex justify="space-between">
                  <FormLabel>Password</FormLabel>
                  <Link href="/forgetpassword" fontWeight="bold">
                    Forgot Password?
                  </Link>
                </Flex>
                <InputGroup size="md">
                  <Input
                    {...register("password")}
                    type={show ? "text" : "password"}
                    name="password"
                    pr="4.5rem"
                  />
                  <InputRightAddon onClick={handleClick}>
                    {show ? "Hide" : "Show"}
                  </InputRightAddon>
                </InputGroup>
                <FormErrorMessage>{errors?.password?.message}</FormErrorMessage>
              </FormControl>
              <Button
                type="submit"
                colorScheme="teal"
                size="lg"
                fontSize="md"
                onClick={handleSubmit(onSubmit)}
                disabled={!!errors.email || !!errors.password}
              >
                Sign in
              </Button>
            </Stack>
            <Flex align="center" color="gray.300" mt="6">
              <Box flex="1">
                <Divider borderColor="currentcolor" />
              </Box>
              <Text
                as="span"
                px="3"
                fontStyle="italic"
                color={useColorModeValue("gray.500", "gray.300")}
                fontWeight="medium"
              >
                or continue with
              </Text>
              <Box flex="1">
                <Divider borderColor="currentcolor" />
              </Box>
            </Flex>
            <SimpleGrid mt="12" columns={2} spacing="2">
              <Button
                color="currentColor"
                variant="outline"
                onClick={handleFaceBookClick}
              >
                <VisuallyHidden>Login with Facebook</VisuallyHidden>
                <AiFillFacebook size={22} />
              </Button>
              <Button
                color="currentColor"
                variant="outline"
                onClick={handleGoogleClick}
              >
                <VisuallyHidden>Login with Google</VisuallyHidden>
                <FaGoogle />
              </Button>
            </SimpleGrid>
          </Card>
        </Box>
      </Box>
      {showBanner && (
        <Banner
          email={email}
          handleCloseIcon={handleCloseIcon}
          handleResendEmailClick={handleResendEmailClick}
          {...props}
        />
      )}
    </>
  );
};

export default Login;
