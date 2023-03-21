import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import React from "react";
import * as ReactDOM from "react-dom/client";
import App from "./App";

const theme = extendTheme({
  fonts: {
    body: "Noto Sans JP",
    heading: "Noto Sans JP",
  },
});

const rootElement = document.getElementById("root") as HTMLElement;
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ChakraProvider resetCSS theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
