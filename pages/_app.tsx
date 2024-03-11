import type { AppProps } from "next/app";
import store from "../redux/store";
import { Provider } from "react-redux";
import { Box } from "@mui/material";
import Navbar from "../components/Navbar";
import "../src/app/globals.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Box
      sx={{
        backgroundImage: 'url("https://i.gifer.com/BXe0.gif")',
        width: "100%",
        height: "100vh",
      }}
    >
      <Provider store={store}>
        <Navbar />
        <Component {...pageProps} />
      </Provider>
    </Box>
  );
}
