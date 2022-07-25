import "../styles/globals.css";
import type { AppProps } from "next/app";
import { NextUIProvider } from "@nextui-org/react";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.min.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider>
      <>
        <ToastContainer autoClose={3000} position={"bottom-center"} />
        <Component {...pageProps} />
      </>
    </NextUIProvider>
  );
}

export default MyApp;
