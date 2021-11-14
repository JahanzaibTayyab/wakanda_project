import React,{useState} from "react";
import {
  Box,
  Button,
  Heading,
  Text,
  Stack,
  useColorModeValue,
  Flex
} from "@chakra-ui/react";
import { Logo } from "../../components/controls/Logo";
import Link from "../../components/controls/Link";
import Card from "../../components/controls/Card";
import { NotionLogo } from "../../components/controls/NotionLogo";
import { useHistory } from "react-router-dom";
const Notion1 = () => {
 const [notion, setNotion] = useState(false)
  
const history = useHistory();
  const handleSubmit = () => {
    setNotion(true)
   setTimeout(()=>{
  history.push("/onboard")
   },1000)
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
          Connect Notion account
          </Heading>
          <Text mt="4" mb="8" align="center" maxW="md" fontWeight="500" fontSize='18px'>
            <Text as="span">Allow access to</Text>
            <Link href="#" >
            <Text as="u" mr='1'>Notion Coffe</Text>
            </Link>
            and share the Notion Coffe task management template duplicated in your workspace
          </Text>
          <Flex justify='center' mb='2'>
          <Button
                type="submit"
                variant="outline"
                isLoading={notion}
                leftIcon={<NotionLogo />}
                loadingText= "... Loading Notion"
                size="md"
                fontSize="sm"
                spinner
                onClick={handleSubmit}
              >
                Connenct Notion
              </Button>
            </Flex> 
          
          <Card>
            <Stack spacing="6">
           
            
            </Stack>
          </Card>
        </Box>
      </Box>
    </>
  );
};

export default Notion1;
