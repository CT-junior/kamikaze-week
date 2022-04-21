import {
  Box,
  Center,
  Flex,
  Heading,
  HStack,
  Image,
  Spinner,
  Text,
} from "@chakra-ui/react";

import type { NextPage } from "next";

import { Hexagono } from "../../components/Hexagono";

import { useRouter } from "next/router";
import { useUser, useUsers } from "../../services/hooks/useCongressistas";
import { api } from "../../services/api";
import { useEffect, useState } from "react";

interface User  {
  name: string;
  course: string;
  period: string;
  phone: number;
  email: string;
  avatar: string;
}
const Congressista: NextPage = () => {
  const [data, setData] = useState<User>({
    name: '',
    course: '',
    period: '',
    phone: 0,
    email: '',
    avatar: '',
  });
  
  const { query } = useRouter();
  const { id } = query;

  console.log(id)


  useEffect(() => {
    try {
      api.get(`users/${id}`).then((response) => {
        console.log(response);
        setData(response.data.user)
      });
    } catch (error) {
      console.log(error)
    }

  }, [id]);

  // const { data, isLoading, isFetching, error } = useUser(id);

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
        {/* {isLoading ? (
          <Flex justify="center">
            <Spinner />
          </Flex>
        ) : ( */}
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
              <img src={data.avatar} />
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
                    {data.name}
                  </Text>
                  <Text
                    as="p"
                    textAlign={{ base: "left", sm: "center" }}
                    fontSize="14px"
                    mt="10px"
                  >
                    {data.email}
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
              {data.course}
              <br />
              {data.period}º Período
            </Text>
            <Center mt={{ base: "20px", sm: "10px" }} mb="25px">
              <Image
                src="/images/qr-code.svg"
                w={{ base: "60%", sm: "unset" }}
              />
            </Center>
          </Box>
        </>
        {/* )} */}
      </Box>
    </Center>
  );
};

export default Congressista;
