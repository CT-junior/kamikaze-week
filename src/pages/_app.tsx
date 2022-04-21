import type { AppProps } from 'next/app'
import { ChakraProvider } from "@chakra-ui/react";
import { ReactQueryDevtools } from 'react-query/devtools'
import { theme } from "../styles/theme";

import {QueryClientProvider } from "react-query";
import { queryClient } from "../services/queryClient";

import { makeServer } from "../services/mirage";

// if (process.env.NODE_ENV === "development") {
//   makeServer();
// }
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default MyApp
