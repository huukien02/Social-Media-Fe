import type { AppProps } from "next/app";
import store from "../redux/store";
import { Provider } from "react-redux";
import { Box } from "@mui/material";
import BackgroundSwitch from "../components/Toggle";
import { useState } from "react";
import Navbar from "../components/Navbar";

export default function MyApp({ Component, pageProps }: AppProps) {
  const [background, setBackground] = useState("white");

  const handleToggle = () => {
    setBackground((prev) => (prev === "white" ? "black" : "white"));
  };

  return (
    <>
      <Box sx={{ backgroundColor: background, height: "100%" }}>
        <Provider store={store}>
          <Navbar />
          {/* <BackgroundSwitch onToggle={handleToggle} /> */}
          <Component {...pageProps} />
        </Provider>
      </Box>
    </>
  );
}
