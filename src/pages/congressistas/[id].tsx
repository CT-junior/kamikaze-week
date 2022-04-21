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

import type { GetStaticPaths, GetStaticProps, NextPage } from "next";

import { NextParsedUrlQuery } from "next/dist/server/request-meta";
import { Hexagono } from "../../components/Hexagono";

import { useRouter } from "next/router";
import { useUsers } from "../../services/hooks/useCongressistas";

const Congressista: NextPage = () => {
  const { query } = useRouter();
  const { id } = query;
  console.log(id);

  const { data, isLoading, isFetching, error } = useUsers();

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
        {isLoading ? (
          <Flex justify="center">
            <Spinner />
          </Flex>
        ) : error ? (
          <Flex>
            <Text>Falha ao obter dados dos usuários.</Text>
          </Flex>
        ) : (
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
                <img src={data[1].avatar} />
              </Hexagono>
            </Center>
            <Box pl="10px" pr="10px">
              <Center>
                <HStack justify="center" align="center">
                  <Image display={{base: "unset", sm: "none"}} src="/images/ct-logo.svg" boxSize="53px" />
                  <Box>
                    <Text
                      as="h2"
                      fontWeight="700"
                      fontSize="24px"
                      mt="10px"
                      textAlign={{ base: "left", sm: "center" }}
                      lineHeight="25px"
                    >
                      {data[1].name}
                    </Text>
                    <Text
                      as="p"
                      textAlign={{ base: "left", sm: "center" }}
                      fontSize="14px"
                      mt="10px"
                    >
                      {data[1].email}
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
                {data[1].course}
                <br />
                {data[1].period}º Período
              </Text>
              <Center mt={{ base: "20px", sm: "10px" }} mb="25px">
                <Image
                  src="/images/qr-code.svg"
                  w={{ base: "60%", sm: "unset" }}
                />
              </Center>
            </Box>
          </>
        )}
      </Box>
    </Center>
  );
};

export default Congressista;

// export const getStaticPaths: GetStaticPaths = async () => {
//   const response = await fetch(`https://my-json-server.typicode.com/heber364/backendWorldtrip/continents`);
//   const data = await response.json();

//   const paths = data.map((continent: { id: string }) => {
//     return { params: { id: continent.id } };
//   });
//   return {
//     paths,
//     fallback: false,
//   };
// };

// interface IParams extends NextParsedUrlQuery {
//   id: string;
// }

// export const getStaticProps: GetStaticProps = async (context) => {
//   const { id } = context.params as IParams;

//   const response = await await fetch(`https://my-json-server.typicode.com/heber364/backendWorldtrip/continents/${id}`);
//   const data = await response.json();

//   return {
//     props: {
//       continent: data,
//     },
//   };
// };
