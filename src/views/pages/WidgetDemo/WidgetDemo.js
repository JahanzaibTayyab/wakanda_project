import React, { useEffect } from "react";
import {
  Progress,
  Flex,
  Input,
  FormControl,
  FormErrorMessage,
  HStack,
  VStack,
  Button,
  Center,
  Box,
  Text,
} from "@chakra-ui/react";
import moment from "moment";
import "firebase/firestore";
import { Formik, Form, Field } from "formik";
import WidgetButtons from "../../components/widget/WidgetButtons";
// import { useParams } from "react-router";
import { PinInput, PinInputField } from "@chakra-ui/react";
import { auth, functions } from "../../../utils/init-firebase";
import { httpsCallable } from "@firebase/functions";
// import { signInWithCustomToken } from "@firebase/auth";
// import { useAuth } from "../../../contexts/AuthContext";

const REGEX_LIST = [
  { field: "date", regex: /(0?[1-9]|[12][0-9]|3[01])[\/\|-](0?[1-9]|1[0-2])/g },
  {
    field: "day",
    regex: /(^|[^0-9a-z])([tT]oday|[yY]esterday|[tT]omorrow)([^0-9a-z]|$)/g,
  },
  {
    field: "month",
    regex: /(0?[1-9]|[12][0-9]|3[01])[\/\|-](0?[1-9]|1[0-2])/g,
  },
  { field: "year", regex: /(^|[^0-9a-z])(19|20|21)([0-9][0-9])([^0-9a-z]|$)/g },
  { field: "priority", regex: /(?:p)([\d+]{1,})/g },
  { field: "categories", regex: /(?:#)(.[^\s]*)/g },
];

function WidgetDemo() {
  const cancelRef = React.useRef();
  const saveCallable = httpsCallable(functions, "saveSingleTask");
  // const { uniqueUrl } = useParams();
  const [inputValue, setInputValue] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [categories, setCategories] = React.useState([]);
  const [day, setDay] = React.useState();
  const [month, setMonth] = React.useState();
  const [year, setYear] = React.useState();
  const [priority, setPriority] = React.useState();
  const [isAllowed, setAllowed] = React.useState(false);
  const [pinLoading, setPinLoading] = React.useState(false);
  const [pinError, setPinError] = React.useState(false);

  if (!isAllowed) {
    return (
        <VStack size="sm" maxW="380px" mx="auto">
          {pinLoading ? (
            <Progress colorScheme="yellow" size="xs" isIndeterminate />
          ) : (
            ""
          )}
          <Text pt="2" pb="0" fontSize="sm">
            Enter Pin Code
          </Text>
          <Center pb="2" w="100%">
            <VStack>
              <Text align="center" fontSize="xs">
                {" "}
                This is the 9 characters alphanumeric code embedded in your
                Notion page.
              </Text>
              <HStack>
                <PinInput
                  errorBorderColor="red.100"
                  focusBorderColor="yellow.500"
                  isInvalid={pinError}
                  isDisabled={pinLoading}
                  type="alphanumeric"
                  size="sm"
                  otp
                  mask
                  onChange={() => setPinError(false)}
                  onComplete={async (value) => {
                    setPinLoading(true);
                    const oneTimeAuthCallable = httpsCallable(
                      functions,
                      "oneTimeAuth"
                    );
                    await oneTimeAuthCallable({
                      uniqueUrl:
                        "https://react-coffee-a2736.web.app/espresso/demo",
                      pinCode: value,
                    })
                      .then((res) => {
                        if (res.data.demo) {
                          setAllowed(true);
                          setPinLoading(false);
                          setPinError(false);
                        } else {
                          setAllowed(false);
                          setPinLoading(false);
                          setPinError(false);
                        }
                      })
                      .catch((err) => {
                        console.log("error", err);
                        setPinError(true);
                        setPinLoading(false);
                      });
                  }}
                >
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                </PinInput>
              </HStack>{" "}
            </VStack>{" "}
          </Center>{" "}
          <Text py="1" pt="0" pr="8" fontSize="xs" color="red.500">
            {pinError ? "Incorrect pin or url" : ""}
          </Text>
        </VStack>
    );
  }

  const handleInputChange = (e) => {
    let newValue = e.currentTarget.value
      .replace(/<[^>]*>/g, "")
      .replace(/(&nbsp;|<br>)/g, "");
    setInputValue(newValue);
    let newTask = {
      description: newValue,
      day: undefined,
      month: undefined,
      year: undefined,
      priority: undefined,
      categories: [],
    };
    for (let pattern of REGEX_LIST) {
      const matchedElement = newValue.match(pattern.regex);
      if (matchedElement && matchedElement?.length > 0) {
        switch (pattern.field) {
          case "date":
            newTask.day = Number(
              matchedElement[0].split(/-|\//)[0].replace(" ", "")
            );
            newTask.month =
              Number(matchedElement[0].split(/-|\//)[1].replace(" ", "")) - 1;
            break;
          case "day":
            matchedElement[0] = matchedElement[0].trim();
            switch (matchedElement[0]) {
              case "today" || "Today":
                newTask.day = moment().get("date");
                newTask.month = moment().get("month");
                newTask.year = moment().get("year");
                break;
              case "tomorrow" || "Tomorrow":
                newTask.day = moment().add(1, "days").get("date");
                newTask.month = moment().add(1, "days").get("month");
                newTask.year = moment().add(1, "days").get("year");
                break;
              case "yesterday" || "Yesterday":
                newTask.day = moment().subtract(1, "days").get("date");
                newTask.month = moment().subtract(1, "days").get("month");
                newTask.year = moment().subtract(1, "days").get("year");
                break;
            }
            break;
          case "month":
            newTask.month =
              Number(matchedElement[0].split(/-|\//)[1].replace(" ", "")) - 1;
            break;
          case "year":
            newTask.year = Number(
              matchedElement[0]
                .replace(" ", "")
                .replace(/[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]*/g, "")
            );
            break;
          case "priority":
            newTask.priority = Number(matchedElement[0].replace(/[^\d+]/, ""));
            break;
          case "categories":
            newTask.categories = matchedElement.map((el) =>
              el.replace(/[^\w]/g, "")
            );
            break;
          default:
            console.log(matchedElement);
        }
      }
      newValue = newValue.replace(pattern.regex, "");
      setDescription(newValue);
      setDay(newTask.day);
      setMonth(newTask.month);
      setYear(newTask.year);
      setPriority(newTask.priority);
      setCategories(newTask.categories);
    }
  };

  const resetAll = () => {
    setDescription("");
    setDay();
    setMonth();
    setYear();
    setPriority();
    setCategories([]);
  };

  return (
    <>
      <WidgetButtons
        hasCategories={categories.length > 0}
        hasPriority={priority}
        hasDate={day || month || year}
      />
      <Formik
        initialValues={{ task: "" }}
        onSubmit={async (values, { setErrors, setSubmitting }) => {
          await saveCallable({
            description: description,
            categories: categories,
            priority: priority,
            date: day,
            month: month,
            year: year,
          })
            .then((res) => {
              setSubmitting(false);
              setInputValue("");
              resetAll();
            })
            .catch((err) => {
              setErrors({
                task: "Something went wrong",
              });
              setSubmitting(false);
            });
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Flex>
              <Field name="task">
                {({ field, form }) => (
                  <FormControl id="task" isInvalid={form.errors.task}>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Write a new task..."
                      size="sm"
                      onChange={handleInputChange}
                      value={inputValue}
                      focusBorderColor="green.50"
                      borderRadius="md"
                    />
                    <FormErrorMessage>{form.errors.task}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Button
                ml={2}
                colorScheme="green"
                isLoading={isSubmitting}
                disabled={isSubmitting || inputValue === ""}
                type="submit"
                size="sm"
              >
                Add
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default WidgetDemo;
