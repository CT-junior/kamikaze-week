import { Center, Heading, Spinner } from "@chakra-ui/react";

import type { NextPage } from "next";

const Congresso: NextPage = () => {
  return (
    <Center h="100vh" display="flex" flexDirection="column">
      <Heading>PÁGINA EM CONSTRUÇÃO</Heading>
      <Spinner
        mt="24px"
        thickness="4px"
        speed="0.80s"
        color="orange.900"
        size="xl"
      />
    </Center>
  );
};

export default Congresso;
