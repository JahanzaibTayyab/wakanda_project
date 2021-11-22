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
  useToast,
  InputRightAddon,
  VisuallyHidden,
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { useTimer } from "use-timer";
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
import { Toast } from "../../../constants/Toast";
import { useAuth } from "../../../contexts/AuthContext";
import {
  getAuth,
  GoogleAuthProvider,
  getRedirectResult,
  FacebookAuthProvider,
} from "@firebase/auth";

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

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Login = (props) => {
  const { userHasWorkSpace } = props;
  const location = useLocation();
  const query = useQuery();
  const history = useHistory();
  const toast = useToast();
  const auth = getAuth();
  const { time, start } = useTimer({
    endTime: 5,
    initialTime: 1,
    onTimeOver: () => {
      if (userHasWorkSpace) {
        localStorage.setItem(LocalStorage.TOKEN, currentUser.accessToken);
        localStorage.setItem(LocalStorage.USER_ID, currentUser.uid);
        history.push("/app/widgets/espresso");
      } else {
        localStorage.setItem(LocalStorage.TOKEN, currentUser.accessToken);
        localStorage.setItem(LocalStorage.USER_ID, currentUser.uid);
        history.push("/before");
      }
    },
  });
  const { signInWithGoogle, login, logout, signInWithFacebook, currentUser } =
    useAuth();

  const [show, setShow] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [email, setEmail] = useState("");
  const [disabledForm, setDisabledForm] = useState(false);
  const [isGoogleLogin, setIsGoogleLogin] = useState(false);
  const [socialLogin, setSocialLogin] = useState(false);

  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        const credential = isGoogleLogin
          ? GoogleAuthProvider.credentialFromResult(result)
          : FacebookAuthProvider.credentialFromResult(result);
        const user = result.user;
        history.replace({
          pathname: "/login",
          search: `oauthToken=${user.accessToken}`,
          state: { token: user.accessToken },
        });
      })
      .catch((error) => {
        const credential = isGoogleLogin
          ? GoogleAuthProvider.credentialFromError(error)
          : FacebookAuthProvider.credentialFromError(error);
      });
  }, [auth]);

  useEffect(() => {
    if (query.get("v")) {
      setShowBanner(true);
      setEmail(localStorage.getItem(LocalStorage.WAKANDA_EMAIL));
    }
    if (query.get("oauthToken")) {
      toast({
        position: "bottom-right",
        title: Toast.SocialLoginVerification.info.title,
        duration: Toast.SocialLoginVerification.info.duration,
        isClosable: true,
      });
      setDisabledForm(true);
      setSocialLogin(true);
      props.verifyToken({
        token: query.get("oauthToken"),
        socialLogin: true,
        user: currentUser,
        history,
      });
    }
  }, [location]);

  useEffect(() => {
    const { user } = props;
    if (user) {
      if (!user?.emailVerified) {
        setShowBanner(true);
        setEmail(user.email);
      }
    }
  }, [props.user]);

  useEffect(() => {
    const { tokenVerified } = props;
    if (socialLogin) {
      if (tokenVerified) {
        setSocialLogin(false);
        start();
        toast({
          position: "bottom-right",
          title: Toast.SocialLoginVerification.success.title,
          description: `${Toast.SocialLoginVerification.success.description} ${time} `,
          duration: Toast.SocialLoginVerification.success.duration,
          status: "success",
          isClosable: true,
        });
      }
    }
  }, [props.user, props.userHasWorkSpace, props.tokenVerified]);

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

  const handleGoogleClick = () => {
    setSocialLogin(true);
    setIsGoogleLogin(true);
    signInWithGoogle();
  };

  const handleFaceBookClick = () => {
    setSocialLogin(true);
    setIsGoogleLogin(false);
    signInWithFacebook();
  };

  const onSubmit = async (payload) => {
    reset();
    login(payload.email, payload.password)
      .then((res) => {
        if (res.user.emailVerified) {
          props.signInSuccess(res.user);
          props.userData({ user: res.user, history });
          // localStorage.setItem(LocalStorage.TOKEN, res.user.accessToken);
          // localStorage.setItem(LocalStorage.USER_ID, res.user.uid);
          // history.push("/app/widgets/espresso");
        } else {
          logout();
          props.signInSuccess(res.user);
        }
      })
      .catch((error) => {
        props.signInFailure(error.message);
        toast({
          position: "bottom-right",
          description: error.message,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
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
                isDisabled={disabledForm}
              >
                <FormLabel>Email</FormLabel>
                <Input type="email" name="email" {...register("email")} />
                <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={!!errors?.password?.message}
                errortext={errors?.password?.message}
                isRequired
                isDisabled={disabledForm}
              >
                <Flex justify="space-between">
                  <FormLabel>Password</FormLabel>
                  <Link href="/forget-password" fontWeight="bold">
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
                disabled={!!errors.email || !!errors.password || disabledForm}
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
                disabled={disabledForm}
                onClick={handleFaceBookClick}
              >
                <VisuallyHidden>Login with Facebook</VisuallyHidden>
                <AiFillFacebook size={22} />
              </Button>
              <Button
                color="currentColor"
                variant="outline"
                onClick={handleGoogleClick}
                disabled={disabledForm}
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
