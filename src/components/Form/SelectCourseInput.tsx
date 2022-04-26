import { forwardRef, ForwardRefRenderFunction } from "react";
import { FieldError } from "react-hook-form";

import {
  Input as ChakraInput,
  FormControl,
  InputProps as ChakraInputProps,
  FormErrorMessage,
  Select,
  SelectProps,
} from "@chakra-ui/react";


interface InputProps extends ChakraInputProps {
  name: string;
  label?: string;
  error?: FieldError;
}

const InputBase: ForwardRefRenderFunction<HTMLSelectElement, SelectProps> = (
  { name, ...rest },
  ref
) => {
  return (
    <FormControl isRequired>
      <Select
        name={name}
        id={name}
        type={"email"}
        focusBorderColor="green.800"
        bg="gray.500"
        _placeholder={{ opacity: 0.5, color: 'black' }}
        color="black"
        variant="outline"
        border="none"
        fontSize={{base:"18px", sm:"24px"}}

        size="lg"
        ref={ref}
        {...rest}
      >
        <option>Engenharia de Computação</option>
        <option>Engenharia Civil</option>
        <option>Engenharia de Produção</option>
        <option>Engenharia Ambiental</option>
        <option>Engenharia Mecânica</option>
        <option>Ciência da Computação</option>
        <option>Outro</option>
      </Select>
     
    </FormControl>
  );
};

export const SelectCourseInput = forwardRef(InputBase);