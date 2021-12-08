import React, { useState } from "react";
import {
  Button,
  useToast,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  InputGroup,
  InputRightAddon,
} from "@chakra-ui/react";
import Modal from "../../components/controls/Modal";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../../../contexts/AuthContext";

const schema = yup.object().shape({
  password: yup
    .string()
    .min(8)
    .required()
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "Password must contain at least 8 characters (lowercase and uppercase), one number and one special case character"
    ),
});

const ReauthenticateModal = (props) => {
  const toast = useToast();
  const { open, onClose } = props;
  const { reauthenticate, reauthenticateUser } = useAuth();
  const [show, setShow] = useState(false);
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
    const cred = await reauthenticate(payload.password);
    try {
      await reauthenticateUser(cred);
      toast({
        position: "bottom-right",
        title: "Reauthenticate User",
        description: `Reauthenticate Successfully , now you can update email`,
        status: "success",
        isClosable: true,
      });
      onClose();
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
  const handleClick = () => setShow(!show);

  return (
    <Modal
      title="Reauthenticate User"
      isOpen={open}
      actions={
        <>
          <Button fontSize="sm" size="lg" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            bg="yellow.600"
            textColor="white"
            isFullWidth
            size="lg"
            fontSize="md"
            onClick={handleSubmit(onSubmit)}
            disabled={!!errors.password}
          >
            Sign in
          </Button>
        </>
      }
    >
      <FormLabel>Password</FormLabel>
      <FormControl
        isInvalid={!!errors?.password?.message}
        errortext={errors?.password?.message}
        isRequired
      >
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
    </Modal>
  );
};

export default ReauthenticateModal;
