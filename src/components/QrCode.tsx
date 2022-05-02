import { Box } from "@chakra-ui/react";
import QRCode from "qrcode.react";
import { useRef } from "react";

const icon = require('../../public/images/qrcode.png');

interface QRCodeProps {
  string?: any,
  size: number,
  bgColor?: string,
  fgColor?: string,
}
export function QrCode({ string, size, bgColor = "#fff", fgColor = "#000" }: QRCodeProps) {
  const qrRef = useRef();
  const qrCode = (
    <QRCode
      id="qrCodeId"
      size={size}
      value={string}
      bgColor={bgColor}
      fgColor={fgColor}
      level="H"
    />
  );
  return (
    <Box bg='white' p='3' ref={qrRef}>
      {qrCode}
    </Box>
  );
}
