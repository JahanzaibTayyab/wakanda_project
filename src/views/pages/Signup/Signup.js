import React, { useState } from "react";
import {
  Box,
  Button,
  Heading,
  SimpleGrid,
  Text,
  FormControl,
  FormLabel,
  Input,
  Stack,
  InputGroup,
  useColorModeValue,
  Flex,
  Divider,
  VisuallyHidden,
  Checkbox,
  FormErrorMessage,
  InputRightAddon,
} from "@chakra-ui/react";

import { FaGoogle } from "react-icons/fa";
import { AiFillFacebook } from "react-icons/ai";
import { FiExternalLink } from "react-icons/fi";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Logo } from "../../components/controls/Logo";
import Link from "../../components/controls/Link";
import Card from "../../components/controls/Card";
import Banner from "../../components/authenticationModules/Banner";

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
  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password"), null], "Passwords don't match."),
});

const Signup = (props) => {
  const [email, setEmail] = useState("");
  const [show, setShow] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [checkedTermsAndCondition, setCheckedTermsAndCondition] =
    useState(false);
  const [checkedPrivacyPolicy, setCheckedPrivacyPolicy] = useState(false);
  const [emailAlreadyTaken, setEmailAlreadyTaken] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const handleSignUpClick = () => {
    window.scrollTo(0, document.body.scrollHeight);
    setShowBanner(true);
  };

  const handleShowConfirmPasswordClick = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleGoogleClick = () => {};

  const handleFaceBookClick = () => {};

  const handleClick = () => setShow(!show);

  const handleCloseIcon = () => {
    setShowBanner(false);
  };

  const handleResendEmailClick = () => {};

  const onSubmit = (values) => {
    console.log(values);
    setEmail(values.email);
    reset();
  };

  const onChangeEmail = (e) => {
    console.log(e.target.value);
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
            Create a new account
          </Heading>
          <Text mt="4" mb="8" align="center" maxW="md" fontWeight="small">
            <Text as="span">Already have an account?</Text>
            <Link href="/sigin" fontWeight="bold">
              Sign in
            </Link>
          </Text>
          <Card>
            <Stack spacing="6">
              <FormControl
                isInvalid={!!errors?.email?.message || emailAlreadyTaken}
                errortext={errors?.email?.message}
                isRequired
              >
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  name="email"
                  {...register("email")}
                  onFocus={onChangeEmail}
                />

                <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
                {emailAlreadyTaken && (
                  <FormErrorMessage>
                    This email is already registered.
                  </FormErrorMessage>
                )}
              </FormControl>
              <FormControl
                isInvalid={!!errors?.password?.message}
                errortext={errors?.password?.message}
                isRequired
              >
                <Flex justify="space-between">
                  <FormLabel>Password</FormLabel>
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
              <FormControl
                isInvalid={!!errors?.confirmPassword?.message}
                errortext={errors?.confirmPassword?.message}
                isRequired
              >
                <Flex justify="space-between">
                  <FormLabel>Confirm Password</FormLabel>
                </Flex>
                <InputGroup size="md">
                  <Input
                    {...register("confirmPassword")}
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    pr="4.5rem"
                  />
                  <InputRightAddon onClick={handleShowConfirmPasswordClick}>
                    {showConfirmPassword ? "Hide" : "Show"}
                  </InputRightAddon>
                </InputGroup>
                <FormErrorMessage>
                  {errors?.confirmPassword?.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl id="conditionCheckBox">
                <Checkbox
                  marginBottom="1"
                  value={checkedTermsAndCondition}
                  onChange={(e) =>
                    setCheckedTermsAndCondition(e.target.checked)
                  }
                  fontSize="sm"
                >
                  I read and accept the
                  <Link>
                    <Text pr="1" as="u" fontWeight={500}>
                      terms & conditions{" "}
                    </Text>
                    <FiExternalLink style={{ display: "inline" }} />
                  </Link>
                </Checkbox>
                <Checkbox
                  marginTop="1"
                  fontSize="sm"
                  value={checkedPrivacyPolicy}
                  onChange={(e) => setCheckedPrivacyPolicy(e.target.checked)}
                >
                  I read and accept the
                  <Link>
                    <Text pr="1" as="u" fontWeight={500}>
                      privacy policy
                    </Text>
                    <FiExternalLink style={{ display: "inline" }} />
                  </Link>
                </Checkbox>
              </FormControl>
              <Button
                type="submit"
                colorScheme="teal"
                size="lg"
                fontSize="md"
                onClick={handleSubmit(onSubmit)}
                disabled={
                  !!errors.email ||
                  !!errors.password ||
                  !!errors.confirmPassword ||
                  !checkedTermsAndCondition ||
                  !checkedPrivacyPolicy
                }
              >
                Sign Up
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

export default Signup;
