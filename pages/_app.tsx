import "../styles/globals.css";
import type { AppProps } from "next/app";
import Header from "../components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <div className="font-poppins text-darkgray">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <Header />

      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
