import { Box, Button, Center, Stack, Text, Select } from "@chakra-ui/react";
import type { NextPage } from "next";
import { Input } from "../../components/Form";

import React, { useEffect, useState } from "react";

import { ScannerQrCode } from "../../components/ScannerQrCode";
import { StatusScan } from "../../components/StatusScan";
import { api } from "../../services/api";

type RegisterCongressmanFormData = {
  name: string;
  course: string;
  period: string;
  phone: number;
  email: string;
};

const Palestra: NextPage = () => {
  const [email, setEmail] = useState('');
  const [result, setResult] = useState('');
  const [workshop, setWorkshop] = useState('');

  const [debugResponse, setDebugResponse] = useState('');

  async function handleSearchByEmail() {
    await fetch(`/api/find/${email}`,
      {
        method: 'GET',
      }
    )
      .then((response) => response.json())
      .then(data => {
        console.log(data);
        setResult(data.result.clientId);
      });
  }

  function handleSubmit() {
    fetch('/api/palestra', {
      method: "POST",
      body: JSON.stringify({
        "congressistId":result, 
        "workshopId": workshop
      })
    }).then(response => {
      console.log(response);
    })

    
  }

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

          <Text>{debugResponse}</Text>

          <Box as="form" mt="20px">
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
              <Input name="email" type="email" placeholder="Email" onChange={(email) => { setEmail(email.target.value) }} />
              <Button
                bg="white"
                color="black"
                fontSize={{ base: "18px", sm: "24px" }}
                fontWeight="600"
                h={{ base: "40px", sm: "60px" }}
                onClick={() => handleSearchByEmail()}
              >
                BUSCAR
              </Button>
              <StatusScan id={result} />
              <Select
                placeholder="Qual palestra"
                focusBorderColor="green.800"
                bg="gray.500"
                _placeholder={{ opacity: 0.5, color: "black" }}
                color="black"
                variant="outline"
                border="none"
                onChange={(event) => setWorkshop(event.target.value)}
              >
                <option value="rh">RH</option>
                <option value="comercial">Comercial</option>
                <option value="tec">Tec</option>
                <option value="civil">Civil</option>
              </Select>
              <Button
                bg="white"
                color="black"
                fontSize={{ base: "18px", sm: "24px" }}
                fontWeight="600"
                h={{ base: "40px", sm: "60px" }}
                onClick={()=> handleSubmit()}
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
