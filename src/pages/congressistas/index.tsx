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

import { collection, getDocs } from 'firebase/firestore';
import { db } from "../../services/firebase";
const dbInstance = collection(db, 'congressistas');

const Congressistas: NextPage = () => {
  const [ congressistas, setCongressistas] = useState([]);
  
  let isLoading = true;

  const getNotes = () => {
    getDocs(dbInstance)
        .then((data) => {
          setCongressistas(data.docs.map((item) => {
                return { ...item.data(), id: item.id }
                
            }));
        })
        let isLoading = true;
  }
  
  useEffect(() => { 
    getNotes();
    
  }, [])

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
                      <Tr key={congressista.name}>
                        <Td>
                          <Flex>
                            <Image
                              src={`${congressista.avatarUrl}`}
                              borderRadius="full"
                              boxSize="45px"
                              mr={4}
                            />
                            <Box>
                              <Link color="purple.400" href={`/congressistas/${congressista.id}`}>
                                <Text fontWeight="bold">
                                  {congressista.name}
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
                            <Text>{congressista.course}</Text>
                            <Text fontSize="sm" color="gray.300">
                              {congressista.period}º período
                            </Text>
                          </Box>
                        </Td>
                        <Td>{congressista.phone}</Td>
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
