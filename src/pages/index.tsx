import { Center, Heading, Spinner } from "@chakra-ui/react";

import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <Center h="100vh" display="flex" flexDirection="column">
      <Heading>PÁGINA EM CONSTRUÇÃO</Heading>
      <Spinner
        mt="24px"
        thickness="4px"
        speed="0.80s"
        color="green.800"
        size="xl"
      />
    </Center>
  );
};

export default Home;
