import React, { useContext} from "react";
import { AuthContext } from "../context/auth";
import  { Navigate } from 'react-router-dom'
import ProfilePageCard from "./Card";
export default function ProfilePage() {
  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to='/'/>;
  if (!user.isAdmin) return <Navigate to='/user/profile-page'/>;
  return <ProfilePageCard />;
}
