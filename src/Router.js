import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import LoginOAuth from "./Login/loginPage";
import InputForm from "./Form/InputForm.jsx";
import Requests from "./AdminPage/profile-page.jsx";
import ProfilePage from "./profilePage/profile-page.jsx";

function Router() {
  // const { user } = useContext(AuthContext);
  // const profileComponent = user ? (
  //   user.isAdmin ? (
  //     <Requests />
  //   ) : (
  //     <ProfilePage />
  //   )
  // ) : (
  //   <Navigate to="/" />
  // );
  // const inputComponent = user ? (
  //   user.isAdmin ? (
  //     <Requests />
  //   ) : (
  //     <InputForm />
  //   )
  // ) : (
  //   <Navigate to="/" />
  // );
  // const adminComponent =
  //   user && user.isAdmin ? <Requests /> : <Navigate to="/" />;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginOAuth />} />
        <Route path="/user/profile-page" element={<ProfilePage />} />
        <Route path="/user/Input" element={<InputForm />} />
        <Route path="/Admin/requests" element={<Requests />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
