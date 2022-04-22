import { Box } from "@chakra-ui/react";
import QRCode from "qrcode.react";
import {useRef} from "react";

const icon = require('../../public/images/qrcode.png');

interface QRCodeProps {
  string?: any,
  size: number,
  bgColor?: string,
  fgColor?: string,
}
export function QrCode({string, size, bgColor = "#202024", fgColor="#00585d"}: QRCodeProps) {
  const qrRef = useRef();
  const qrCode = (
    <QRCode
    id="qrCodeId"
    size={size}
    value={string}
    bgColor={bgColor}
    fgColor={fgColor}
    level="H"
    imageSettings={{
      src: icon.default.src,
      excavate: false,
      width: size * 0.3,
      height: size * 0.3,
    }}
    />
  );
  return (
      <Box ref={qrRef}>
        {qrCode}
    </Box>
  );
}
