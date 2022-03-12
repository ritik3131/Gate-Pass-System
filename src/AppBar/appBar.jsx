import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import WindowDimension from "./windowDimension";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CoPresentIcon from "@mui/icons-material/CoPresent";
import EditIcon from "@mui/icons-material/Edit";
import GateLogo from "../assets/Logo.png";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth";
export default function ButtonAppBar() {
  const { width } = WindowDimension();
  const authCtx = React.useContext(AuthContext);
  const [sideBar, setSideBar] = React.useState(false);
  const navigate = useNavigate();
  function handleClick(e) {
    setSideBar(!sideBar);
  }
  const { user } = authCtx;
  let menuBarList = [];
  if (user && !user.isAdmin) menuBarList = ["Profile", "New Request"];
  else menuBarList = ["All Requests"];

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={handleClick}
      onKeyDown={handleClick}
    >
      <List>
        <ListItem>
          <img
            src={GateLogo}
            alt="GateLogo"
            width={"40%"}
            height={"40%"}
            style={{
              paddingLeft: "25%",
            }}
          />
        </ListItem>
        {menuBarList.map((text, index) => (
          <ListItem
            button
            key={text}
            onClick={() => {
              if (text === "Profile" && !user.isAdmin)
                navigate("/user/profile-page");
              else if (text === "New Request" && !user.isAdmin)
                navigate("/user/Input");
              else if (text === "All Requests" && user.isAdmin)
                navigate("/Admin/requests");
            }}
          >
            <ListItemIcon>
              {index === 0 ? <AccountCircleIcon /> : <></>}
              {index === 1 ? <EditIcon /> : <></>}
              {index === 2 ? <CoPresentIcon /> : <></>}
            </ListItemIcon>
            <ListItemText style={{ marginLeft: "-10px" }}>
              <Typography variant="HeadingList">{text}</Typography>
            </ListItemText>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ backgroundColor: "" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleClick}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="Heading"
            style={{
              flexGrow: 1,
              backgroundColor: "",
              display: "flex",
              justifyContent: "center",
              justifyItems: "center",
              textAlign: "center",
            }}
          >
            Welcome to Gate Pass System
          </Typography>
          <Button
            color="inherit"
            variant="outlined"
            href="https://gate-pass-system-iitbbs.herokuapp.com/api/v1/logout"
            onClick={authCtx.logout}
          >
            <LogoutIcon />
            {width <= 414 ? `` : `Logout`}
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer open={sideBar} onClose={handleClick}>
        {list("left")}
      </Drawer>
    </Box>
  );
}
