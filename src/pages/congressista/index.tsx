import {
  Box,
  Button,
  Center,
  FormLabel,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import type { NextPage } from "next";

import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "../../components/Form";
import { Input as InputChakra } from "@chakra-ui/react";

type RegisterCongressmanFormData = {
  name: string;
  course: string;
  period: string;
  phone: number;
  email: string;
};

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const RegisterCongressmanFormSchema = yup.object().shape({
  name: yup.string().required("Nome obrigatório"),
  course: yup.string().required("Curso obrigatório"),
  period: yup
    .number()
    .typeError("Período obrigatório")
    .required("Período obrigatório"),
  phone: yup
    .string()
    .required("Número de telefone obrigatório.")
    .matches(phoneRegExp, "Número de telefone inválido.")
    .min(10, "Número de telefone inválido.")
    .max(11, "Número de telefone inválido."),
  email: yup.string().required("E-mail obrigatório").email("E-mail inválido"),
});

const Cadastro: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(RegisterCongressmanFormSchema),
  });

  const handleRegisterCongressman: SubmitHandler<
    RegisterCongressmanFormData
  > = async (values) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(values);
  };

  return (
    <Center h="100vh">
      <Box
        bg="gray.800"
        bgImage="url('/images/bg-cadastro.svg')"
        bgRepeat="no-repeat"

        h={{ base: "100vh", sm: "unset" }}
        w={{ base: "100%", sm: "485px" }}
        display="flex" flexDirection="column"
      >
        {/* <Image src="/images/bg-cadastro.svg" position="absolute"  /> */}
        <Box position="relative" p="20px 40px">
          <Heading
            as="h1"
            fontSize="24px"
            fontWeight="700"
            textAlign="center"
            lineHeight="22px"
          >
            Cadastro de congressista
          </Heading>
          <Text
            as="h2"
            fontFamily="Montserrat"
            fontSize={{base:"32px",sm:"36px"}}
            fontWeight="800"
            textAlign="center"
            lineHeight="32px"
            mt="12px"
          >
            SEMANA DA <br />
            CT JUNIOR
          </Text>
          <Box
            as="form"
            mt="20px"
            onSubmit={handleSubmit(handleRegisterCongressman)}
          >
            <Stack spacing="15px">
              <Input
                name="name"
                type="text"
                placeholder="Nome"
                error={errors.name}
                {...register("name")}
              />
              <Input
                name="course"
                type="text"
                placeholder="Curso"
                error={errors.course}
                {...register("course")}
              />
              <Input
                name="period"
                type="number"
                placeholder="Período"
                error={errors.period}
                {...register("period")}
              />
              <Input
                name="phone"
                type="number"
                placeholder="Telefone"
                error={errors.phone}
                {...register("phone")}
              />
              <Input
                name="email"
                type="email"
                placeholder="Email"
                error={errors.email}
                {...register("email")}
              />
              <Center>
                <Stack align="center">
                  <Text as="span" color="gray.500">Foto do perfil (opcional)</Text>
                  <FormLabel
                    textAlign="center"
                    htmlFor="file"
                    bg="gray.500"
                    h="77px"
                    w="77px"
                    borderRadius="15px"

                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Image src="/images/file-upload-icon.svg" />
                  </FormLabel>
                  <InputChakra
                    name="file"
                    id="file"
                    type="file"
                    display="none"
                  />
                </Stack>
              </Center>

              <Button
                type="submit"
                bg="white"
                color="black"
                fontSize={{base:"18px", sm:"24px"}}
                fontWeight="600"
                h={{base:"40px", sm:"60px"}}
                isLoading={isSubmitting}
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

export default Cadastro;
