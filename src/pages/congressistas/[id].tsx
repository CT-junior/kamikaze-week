import {
  Box,
  Center,
  Heading,
  HStack,
  Image,
  Spinner,
  Text,
} from "@chakra-ui/react";

import type { NextPage } from "next";

import { Hexagono } from "../../components/Hexagono";

import { useRouter } from "next/router";
import { api } from "../../services/api";
import { useEffect, useState } from "react";

interface User {
  name: {
    stringValue: string,
  },
  course: {
    stringValue: string,
  },
  period: {
    integerValue: string,
  },
  phone: {
    stringValue: string,
  },
  email: {
    stringValue: string,
  },
  avatarUrl: {
    stringValue: string,
  },
}

const Congressistas: NextPage = () =>{
  const [data, setData] = useState<User>();
  const { query } = useRouter();
  const { id } = query;

  
  useEffect(() => {
    if (!!id) {
      api.get(`congressistas/${id}`).then(response => {
        setData(response.data.fields);
        console.log(response.data)
      }).catch((error) => {
        console.log(error)
      })
    }
  }, [id]);

  if (!data) {
    return (
      <Center h="100vh">
        <Spinner />
      </Center>
    )
  }
  return (
    <Center display="flex" flexDirection="column" position="relative">
      <Center display={{ base: "none", sm: "flex" }}>
        <Box
          w="65px"
          h="160px"
          bgGradient="linear(to-br, green.800, orange.900)"
          zIndex={2}
        />
      </Center>
      <Center mt={{ base: "16px", sm: "-3px" }}>
        <Box w="80px" h="8px" bg="blackAlpha.900" zIndex="1" />
      </Center>
      <Box
        bg="gray.800"
        h={{ base: "100vh", sm: "unset" }}
        w={{ base: "100%", sm: "360px" }}
        mt={{ base: "-24px", sm: "-25px" }}
      >
        <Image
          src="/images/bg-card.svg"
          position="absolute"
          zIndex={0}
          w={{ base: "100%", sm: "unset" }}
        />
        <>
          <Heading
            position="relative"
            fontSize="36px"
            fontFamily="Montserrat"
            fontWeight="800"
            letterSpacing="-2px"
            textAlign="center"
            lineHeight="32px"
            mt="40px"
            zIndex={1}
          >
            SEMANA DA <br />
            CT JUNIOR
          </Heading>
          <Center mt="-32px">
            <Hexagono>
              <img src={data.avatarUrl.stringValue} />
            </Hexagono>
          </Center>
          <Box pl="10px" pr="10px">
            <Center>
              <HStack justify="center" align="center">
                <Image
                  display={{ base: "unset", sm: "none" }}
                  src="/images/ct-logo.svg"
                  boxSize="53px"
                />
                <Box>
                  <Text
                    as="h2"
                    fontWeight="700"
                    fontSize="24px"
                    mt="10px"
                    textAlign={{ base: "left", sm: "center" }}
                    lineHeight="25px"
                  >
                    {data.name.stringValue}
                  </Text>
                  <Text
                    as="p"
                    textAlign={{ base: "left", sm: "center" }}
                    fontSize="14px"
                    mt="10px"
                  >
                    {data.email.stringValue}
                  </Text>
                </Box>
              </HStack>
            </Center>

            <Text
              as="p"
              textAlign="center"
              mt={{ base: "50px", sm: "30px" }}
              fontSize="16px"
            >
              {data.course.stringValue}
              <br />
              {data.period.integerValue}º Período
            </Text>
            <Center mt={{ base: "20px", sm: "10px" }} mb="25px">
              <Image
                src="/images/qr-code.svg"
                w={{ base: "60%", sm: "unset" }}
              />
            </Center>
          </Box>
        </>
      </Box>
    </Center>
  );
};

export default Congressistas;
