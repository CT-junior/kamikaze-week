import { Box, Button, Center, Stack, Text, Select } from "@chakra-ui/react";
import type { NextPage } from "next";
import { Input } from "../../components/Form";

import { WarningIcon } from "@chakra-ui/icons";
import React, { useEffect, useState } from "react";

import { ScannerQrCode } from "../../components/ScannerQrCode";
import { StatusScan } from "../../components/StatusScan";

type RegisterCongressmanFormData = {
  name: string;
  course: string;
  period: string;
  phone: number;
  email: string;
};

const Palestra: NextPage = () => {
  const [result, setResult] = useState('')
  const [status, setStatus] = useState(false);
  const [researched, setResearched] = useState(false);

  useEffect(() => {
    console.log(result);
  }, [result])

  return (
    <Center h="100vh">
      <Box
        bg="gray.800"
        bgImage="url('/images/bg-scaner.svg')"
        bgSize="cover"
        bgRepeat="no-repeat"
        h={{ base: "100vh", sm: "unset" }}
        w={{ base: "100%", sm: "485px" }}
        display="flex"
        flexDirection="column"
      >
        <Box position="relative" p="20px 40px">
          <Text
            as="h2"
            fontFamily="Montserrat"
            fontSize={{ base: "32px", sm: "36px" }}
            fontWeight="800"
            textAlign="center"
            lineHeight="32px"
            mt="12px"
          >
            SEMANA DA <br />
            CT JUNIOR
          </Text>
          <Box as="form" mt="20px" onSubmit={() => {}}>
            <Stack spacing="15px">
              <Text textAlign="center" mt={"20px"} fontSize="20px">
                Escanear comprovante
              </Text>
              <Center>
                <ScannerQrCode setData={setResult} />
              </Center>
              <Text textAlign="center" mt={"20px"} fontSize="20px">
                ou buscar por e-mail
              </Text>
              <Input name="email" type="email" placeholder="Email" />
              <Button
                bg="white"
                color="black"
                fontSize={{ base: "18px", sm: "24px" }}
                fontWeight="600"
                h={{ base: "40px", sm: "60px" }}
              >
                BUSCAR
              </Button>
              <StatusScan status={status} researched={researched} />
              <Select
                placeholder="Qual palestra"
                focusBorderColor="green.800"
                bg="gray.500"
                _placeholder={{ opacity: 0.5, color: "black" }}
                color="black"
                variant="outline"
                border="none"
              >
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>
              <Button
                type="submit"
                bg="white"
                color="black"
                fontSize={{ base: "18px", sm: "24px" }}
                fontWeight="600"
                h={{ base: "40px", sm: "60px" }}
              >
                ENVIAR
              </Button>
            </Stack>
          </Box>
        </Box>
      </Box>
    </Center>
  );
};

export default Palestra;
