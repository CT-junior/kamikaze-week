import { WarningIcon } from "@chakra-ui/icons";
import { HStack, Stack, Text } from "@chakra-ui/react";

interface StatusScanProps {
  id: string;
}

export function StatusScan({ id }: StatusScanProps) {
  if (!id) {
    return (
      <HStack align="center" justify="center" spacing={2}>
        <Text as="span">ID: <Text as="span" color="yellow.500">Pendente</Text></Text>
        <WarningIcon color="yellow.500" />
      </HStack>
    );
  }
  return (
    <HStack align="center" justify="center" spacing={2}>
      <Text as="span">ID: <Text as="span" color="green.500">{id}</Text></Text>
      <WarningIcon color="green.500" />
    </HStack>
  );

}
