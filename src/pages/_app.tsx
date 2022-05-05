import "../styles/globals.css";
import type { AppProps } from "next/app";
import initAuth from "../server/initAuth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ResponsiveAppBar from "../components/Navigation/AppBar";

initAuth();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ResponsiveAppBar />
      <Component {...pageProps} />
      <ToastContainer />
    </>
  );
}

export default MyApp;
