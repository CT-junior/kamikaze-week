import NextLink from "next/link";
import type { NextPage } from "next";

import {
  Link,
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Icon,
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
import { RiAddLine, RiPencilLine } from "react-icons/ri";

import { useUsers } from "../../services/hooks/useCongressistas";

type User = {
  name: string;
  course: string;
  period: string;
  phone: number;
  email: string;
};

const Congressistas: NextPage = () => {
  const { data, isLoading, isFetching, error } = useUsers();

  return (
    <Box>
      <Flex width="100%" my="6" maxW={1480} mx="auto" px="6">
        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Congressistas
              {!isLoading && isFetching && (
                <Spinner size="sm" color="gray.500" ml="4" />
              )}
            </Heading>
          </Flex>

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
              <Table colorScheme="whiteAlpha">
                <Thead>
                  <Tr>
                    <Th>Congressista</Th>
                    <Th>Curso</Th>
                    <Th>Telefone</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data.map((congressista) => {
                    return (
                      <Tr key={congressista.name}>
                        <Td>
                          <Flex>
                            <Image
                              src={congressista.avatar}
                              borderRadius="full"
                              boxSize="45px"
                              mr={4}
                            />
                            <Box>
                              <Link color="purple.400">
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
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
};

export default Congressistas;
