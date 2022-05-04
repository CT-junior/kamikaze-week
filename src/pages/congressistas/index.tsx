import type { NextPage } from "next";

import {
  Link,
  Box,
  Flex,
  Heading,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  Spinner,
  Image,
} from "@chakra-ui/react";

import { useEffect, useState } from "react";

type Congressist = {
  clientId: string;
  nome: string;
  curso: string;
  periodo: string;
  telefone: string;
  email: string;
  imagemUrl: string;
};

const Congressistas: NextPage = () => {
  const [ congressistas, setCongressistas] = useState<Congressist[]>([]);
  
  let isLoading = true;

  const getNotes = async (passwd: string) => {
    await fetch("/api/congressists",
    {
      method: 'POST',
      body: JSON.stringify({pass: passwd})
    }
    )
      .then((response) => response.json())
      .then(data => {
        setCongressistas(data)
      });
  }
  
  useEffect(() => { 
    let passwd = prompt("Qual a senha?");

    getNotes(passwd);
  }, []);

  return (
    <Box>
      <Flex width="100%" my="6" maxW={1480} mx="auto" px="6">
        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Congressistas
              {!isLoading && (
                <Spinner size="sm" color="gray.500" ml="4" />
              )}
            </Heading>
            <Heading size="md">Total: {congressistas.length || 0}</Heading>
          </Flex>
              <Table colorScheme="whiteAlpha">
                <Thead>
                  <Tr>
                    <Th>Congressista</Th>
                    <Th>Curso</Th>
                    <Th>Telefone</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {congressistas.map((congressista) => {
                    return (
                      <Tr key={congressista.nome}>
                        <Td>
                          <Flex>
                            <Image
                              src={`${congressista.imagemUrl}`}
                              borderRadius="full"
                              boxSize="45px"
                              mr={4}
                              alt=''
                            />
                            <Box>
                              <Link color="purple.400" href={`/congressistas/${congressista.clientId}`}>
                                <Text fontWeight="bold">
                                  {congressista.nome}
                                </Text>
                              </Link>
                              <Text fontSize="small" color="gray.300">
                                {congressista.email}
                              </Text>
                            </Box>
                          </Flex>
                        </Td>
                        <Td>
                          <Box>
                            <Text>{congressista.curso}</Text>
                            <Text fontSize="sm" color="gray.300">
                              {congressista.periodo}º período
                            </Text>
                          </Box>
                        </Td>
                        <Td>{congressista.telefone}</Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
        </Box>
      </Flex>
    </Box>
  );
};

export default Congressistas;
