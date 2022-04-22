import { WarningIcon } from "@chakra-ui/icons";
import { HStack, Stack, Text } from "@chakra-ui/react";

interface StatusScanProps {
  status: boolean;
  researched: boolean;
}

export function StatusScan({ status, researched }: StatusScanProps) {
  if (!status && !researched) {
    return (
      <HStack align="center" justify="center" spacing={2}>
        <Text as="span">Status: <Text as="span" color="yellow.500">Pendente</Text></Text>
        <WarningIcon color="yellow.500" />
      </HStack>
    );
  } else if (!status && researched) {
    return (
      <HStack align="center" justify="center" spacing={2}>
        <Text as="span">Status: <Text as="span" color="red.500">Não encontrado</Text></Text>
        <WarningIcon color="red.500" />
      </HStack>
    );
  } else{
    return (
        <HStack align="center" justify="center" spacing={2}>
        <Text as="span">Status: <Text as="span" color="green.500">Encontrado</Text></Text>
        <WarningIcon color="green.500" />
      </HStack>
      );
  }

}
