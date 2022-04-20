import { forwardRef, ForwardRefRenderFunction } from "react";
import { FieldError } from "react-hook-form";

import {
  Input as ChakraInput,
  FormControl,
  InputProps as ChakraInputProps,
  FormErrorMessage,
} from "@chakra-ui/react";


interface InputProps extends ChakraInputProps {
  name: string;
  label?: string;
  error?: FieldError;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, label, error= null, ...rest },
  ref
) => {
  return (
    <FormControl isInvalid={!!error}>
      <ChakraInput
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
      />
      { !!error && (
        <FormErrorMessage>
          {error.message}
        </FormErrorMessage>
      )}
     
    </FormControl>
  );
};

export const Input = forwardRef(InputBase);