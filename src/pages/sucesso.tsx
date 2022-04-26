import {
    Box,
    Button,
    Center,
    FormLabel,
    Heading,
    Image,
    Stack,
    Text,
    useToast,
  } from "@chakra-ui/react";
  import type { NextPage } from "next";
  
  import { SubmitHandler, useForm } from "react-hook-form";
  import * as yup from "yup";
  import { yupResolver } from "@hookform/resolvers/yup";
  import { Input } from "../components/Form";
  import { Input as InputChakra } from "@chakra-ui/react";
  import React, { useState } from "react";
  import { handleUploadImage } from "../services/firebase";
  import { SelectCourseInput } from "../components/Form/SelectCourseInput";
  import Router from "next/router";
  
  const Cadastro: NextPage = () => {
 
    return (
      <Center h="100vh">
        <Box
          bg="gray.800"
          bgImage="url('/images/bg-cadastro.svg')"
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
            <Box mt="20px">
              <Text fontSize="xl" align='center' fontFamily="Montserrat">
                  Cadastro concluído!
              </Text>
              <Text mt={10} align="justify">
                  Bem vindo à Semana da CT Junior, um e-mail lhe foi enviado com informações sobre o evento e seu crachá virtual!
              </Text>
            </Box>
          </Box>
        </Box>
      </Center>
    );
  };
  
  export default Cadastro;
  