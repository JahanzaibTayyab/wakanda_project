import React, { useState } from "react";
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
} from "@chakra-ui/react";
import { NotionLogo } from "../../components/controls/NotionLogo";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useHistory } from "react-router-dom";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  name: yup.string().required(),
});

const Profile = () => {
  const history = useHistory();
  const [disableSaveButton, setDisableSaveButton] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const onSubmit = (values) => {
    console.log(values);
    reset();
  };
  return (
    <>
      <Heading size="md" fontWeight="bold" mb={6}>
        User Profile
      </Heading>
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
            >
              Change Notion
            </Button>
          </Flex>
          <Stack spacing="6">
            <FormControl
              isInvalid={!!errors?.name?.message}
              errortext={errors?.name?.message}
            >
              <FormLabel>Name</FormLabel>
              <Input type="text" name="name" {...register("name")} />
              <FormErrorMessage>{errors?.name?.message}</FormErrorMessage>
            </FormControl>
            <FormControl
              isInvalid={!!errors?.email?.message}
              errortext={errors?.email?.message}
            >
              <FormLabel>Email</FormLabel>
              <Text textColor="gray.500" mb={3} fontSize="sm">
                If you change your email, you will be logged out and will need
                to verify your new email address before signin in again.
              </Text>
              <Input type="email" name="email" {...register("email")} />
              <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
            </FormControl>
          </Stack>
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
        </Box>
      </SimpleGrid>
    </>
  );
};

export default Profile;
