import {
  Box,
  Center,
  Heading,
  HStack,
  Image,
  Text,
} from "@chakra-ui/react";

import { Hexagono } from "../../components/Hexagono";

import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../services/firebase";

import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { QrCode } from "../../components/QrCode";
import { useRouter } from 'next/router'
interface CongressistaProps {
  data:{
    name: string;
    course: string
    period: number
    phone: string
    email: string
    avatarUrl: string
  },
  id: string
}

export default function Congressistas({ data, id }: CongressistaProps) {
  const linkTag = `http://localhost:3000${useRouter().asPath}`
  console.log(linkTag)
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
              <img src={data.avatarUrl} />
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
              <QrCode size={200} string={linkTag} />
            </Center>
          </Box>
        </>
      </Box>
    </Center>
  );
}

export const getStaticPaths: GetStaticPaths = async ()  => {
  const snapshot = await getDocs(collection(db, "congressistas"));
  const paths = snapshot.docs.map((doc) => {
    return {
      params: { id: doc.id.toString() },
    };
  });
  return {
    paths,
    fallback: false,
  };
};

interface IParams extends ParsedUrlQuery {
  id: string;
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params as IParams;

  const docRef = doc(db, "congressistas", id);
  const docSnap = await getDoc(docRef);
  return {
    props: { data: docSnap.data() ||null, id},
  };
};
