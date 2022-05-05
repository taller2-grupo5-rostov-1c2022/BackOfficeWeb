import "../styles/globals.css";
import type { AppProps } from "next/app";
import initAuth from "../server/initAuth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

initAuth();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <ToastContainer />
    </>
  );
}

export default MyApp;
