import { extendTheme } from "@chakra-ui/react";
import "@fontsource-variable/quicksand";

const fontTheme = extendTheme({
  fonts: {
    heading: `'Quicksand Variable', sans-serif`,
    body: `'Quicksand Variable', sans-serif`
  },
  styles: {
    global: {
      body: {
        bg: "#D9D9D9",
      }
    }
  }
});

export default fontTheme;
