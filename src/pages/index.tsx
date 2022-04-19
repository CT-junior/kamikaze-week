import { Box, Center, Heading, Image, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import { Hexagono } from "../components/Hexagono";

const Home: NextPage = () => {
  return (
    <Center display="flex" flexDirection="column">
      <Center >
        <Box w="65px" h="160px" bgGradient='linear(to-br, green.800, orange.900)' zIndex={2} />
      </Center>
      <Center>
        <Box w="80px" h="8px" bg="blackAlpha.900" zIndex="1" mt="-2px"/>
      </Center>
      <Box bg="gray.800" h="540px" w="360px" mt="-25px">
        <Image src="/images/bg-card.svg" position="absolute" zIndex={0} />
        <Heading
          position="relative"
          fontSize="36px"
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
            <img src="/images/avatar.png" />
          </Hexagono>
        </Center>
        <Box>
          <Text
            as="h2"
            fontWeight="700"
            fontSize="24px"
            mt="10px"
            textAlign="center"
          >
            André Altoé Santiago
          </Text>
          <Text as="p" textAlign="center" fontSize="14px">
            andrealtosantos@gmail.com
          </Text>
          <Text as="p" textAlign="center" mt="25px" fontSize="14px">
          Engenharia de Computação<br/>5º Período
          </Text>
          <Center mt="10px">
            <Image src="/images/qr-code.svg"/>
          </Center>
          

        </Box>
      </Box>
    </Center>
  );
};

export default Home;
