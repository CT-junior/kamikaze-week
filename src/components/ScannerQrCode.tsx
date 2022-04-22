import { Box, Image } from "@chakra-ui/react";

export function ScannerQrCode() {
  return (
      <Box
        textAlign="center"
        bg="gray.500"
        h="77px"
        w="77px"
        borderRadius="15px"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Image src="/images/scan-qr-icon.svg" />
      </Box>

  );
}
