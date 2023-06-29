import { extendTheme } from "@chakra-ui/react";
import "@fontsource-variable/quicksand";

const fontTheme = extendTheme({
  fonts: {
    heading: `'Quicksand Variable', sans-serif`,
    body: `'Quicksand Variable', sans-serif`
  }
});

export default fontTheme;
