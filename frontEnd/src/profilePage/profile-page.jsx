import * as React from "react";
import Box from "@mui/material/Box";
import Appbar from "../AppBar/appBar";
import ProfilePage from "./ActualProfile.jsx";
export default function AppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Appbar />
      <div style={{ margin: "10px" }}>
        <ProfilePage />
      </div>
    </Box>
  );
}
