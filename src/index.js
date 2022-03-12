import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import App from "./App";
import LoginOAuth from "./Login/loginPage";
import InputForm from "./Form/InputForm.jsx";
import Requests from "./AdminPage/profile-page.jsx";
import ProfilePage from "./profilePage/profile-page.jsx";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import theme from "./Themes/theme";
import { AuthProvider } from "./context/auth";
import Router from "./Router";
const RootElement = document.getElementById("root");
ReactDOM.render(
  <AuthProvider>
    <ThemeProvider theme={theme}>
     <Router/>
    </ThemeProvider>
  </AuthProvider>,
  RootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
