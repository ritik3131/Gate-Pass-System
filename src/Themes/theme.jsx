import {createTheme} from "@mui/material/styles";
const theme = createTheme({
  typography: {
    h5: {
      fontFamily: `'Robot',sans-serif`,
      fontWeight: 900,
      color: "#357a38",
    },
    h5a: {
      fontFamily: `'Robot',sans-serif`,
      fontWeight: 900,
      color: "grey",
      fontSize: "34px",
    },
    h6a: {
      fontFamily: `'Robot',sans-serif`,
      fontWeight: 900,
      color: "grey",
      // fontSize: "20px",
    },

    h1: {
      fontFamily: `'Robot',sans-serif`,
      fontWeight: 900,
      color: "Black",
      fontSize: "30px",
    },

    button1: {
      color: "#616161",
      fontSize: "17px",
    },
    CredMan: {
      fontFamily: `'Robot',sans-serif`,
      fontWeight: 900,
      color: "#9E9E9E",
    },
    Heading: {
      fontFamily: `'Robot',sans-serif`,
      fontWeight: 900,
      fontSize: "25px",
      color: "white",
    },
    HeadingList: {
      fontFamily: `'Robot',sans-serif`,
      fontWeight: 900,
      fontSize: "20px",
      color: "#9E9E9E",
    },
  },
});
export default theme;
