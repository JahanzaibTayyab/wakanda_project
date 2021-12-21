import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useToast,
  Box,
  Text,
  Flex,
  FormErrorMessage,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useLocation, Redirect, useHistory } from "react-router-dom";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Logo } from "../../components/controls/Logo";
import Card from "../../components/controls/Card";
import { useAuth } from "../../../contexts/AuthContext";

const schema = yup.object().shape({
  password: yup
    .string()
    .min(8)
    .required()
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "Password must contain at least 8 characters (lowercase and uppercase), one number and one special character"
    ),
  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password"), null], "Passwords don't match."),
});

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function ResetPasswordPage() {
  const { resetPassword, verifyPasswordResetCodeVerification } = useAuth();
  const query = useQuery();
  const [disableForm, setDisableForm] = useState(true);
  const toast = useToast();
  const history = useHistory();

  useEffect(() => {
    toast({
      position: "bottom-right",
      title: "Verifying Code",
      isClosable: true,
    });
    async function verifyToken() {
      try {
        await verifyPasswordResetCodeVerification(query.get("oobCode"));
        toast({
          position: "bottom-right",
          title: "Token Verified",
          description: "You can Change your password",
          status: "success",
          isClosable: true,
        });
        setDisableForm(false);
      } catch (error) {
        toast({
          position: "bottom-right",
          title: error?.message,
          description: error?.status,
          status: "error",
          isClosable: true,
        });
      }
    }
    verifyToken();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const onSubmit = async (payload) => {
    try {
      await resetPassword(query.get("oobCode"), payload.password);
      toast({
        position: "bottom-right",
        description: "Password has been changed, you can login now.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      <Redirect to={"/login"} />;
    } catch (error) {
      toast({
        position: "bottom-right",
        description: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
    reset();
  };

  return (
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
          h="6"
          mb={{
            base: "10",
            md: "20",
          }}
        />
        <Heading textAlign="center" my={12}>
          Reset password
        </Heading>
        <Text mt="4" mb="8" align="center" maxW="md" fontWeight="small">
          <Text as="span">Go back to?</Text>
          <Button
            ml={1}
            colorScheme="yellow"
            variant="link"
            onClick={() => history.push("/login")}
            fontWeight="bold"
          >
            Login
          </Button>
        </Text>
        <Card maxW="md" mx="auto" mt={4}>
          <Stack spacing="6">
            <FormControl
              isInvalid={!!errors?.password?.message}
              errortext={errors?.password?.message}
              isRequired
              isDisabled={disableForm}
            >
              <Flex justify="space-between">
                <FormLabel>Password</FormLabel>
              </Flex>
              <Input
                {...register("password")}
                type={"password"}
                name="password"
                pr="4.5rem"
              />
              <FormErrorMessage>{errors?.password?.message}</FormErrorMessage>
            </FormControl>
            <FormControl
              isInvalid={!!errors?.confirmPassword?.message}
              errortext={errors?.confirmPassword?.message}
              isRequired
              isDisabled={disableForm}
            >
              <Flex justify="space-between">
                <FormLabel>Confirm Password</FormLabel>
              </Flex>
              <Input
                {...register("confirmPassword")}
                type={"password"}
                name="confirmPassword"
                pr="4.5rem"
              />
              <FormErrorMessage>
                {errors?.confirmPassword?.message}
              </FormErrorMessage>
            </FormControl>
            <Button
              type="submit"
              bg="yellow.500"
              textColor="white"
              size="lg"
              fontSize="md"
              onClick={handleSubmit(onSubmit)}
              disabled={
                !!errors.password || !!errors.confirmPassword || disableForm
              }
            >
              Reset password
            </Button>
          </Stack>
        </Card>
      </Box>
    </Box>
  );
}
