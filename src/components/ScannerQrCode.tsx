import { Box, Button, Modal, Image, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure, VStack } from "@chakra-ui/react";
import dynamic from "next/dynamic";

const QrReader = dynamic(() => import("react-qr-reader"), { ssr: false });

type props = {
  setData: Function;
}

export function ScannerQrCode({ setData }: props) {
  const { isOpen, onOpen: openModal, onClose: closeModal } = useDisclosure();

  function handleScan(data: string) {
    setData(data)
    closeModal();
  }

  function handleError(data: any) {
    console.log(data)
  }

  return (
    <>
      <Box
        textAlign="center"
        bg="gray.500"
        h="77px"
        w="77px"
        borderRadius="15px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        onClick={openModal}
      >
        <Image src="/images/scan-qr-icon.svg" alt='' />
      </Box>


      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        isCentered
        size="xl"
      >
        <ModalOverlay backdropFilter="blur(6px)">
          <ModalContent bg="gray.900">
            <ModalHeader>Scanear</ModalHeader>
            <ModalCloseButton />

            <ModalBody>

              <QrReader
                delay={300}
                onError={handleError}
                onScan={handleScan}
                style={{ width: '100%' }}
              />

            </ModalBody>

            <ModalFooter>
              <Button onClick={closeModal} colorScheme="blue">
                Fechar
              </Button>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </>

  );
}
