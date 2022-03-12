import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "../context/auth";
import axiosInstance from "../util/axiosIntance";
import ProfilePageCard from "./Card";
export default function ProfilePage() {
  const [name, setName] = useState("");
  const [branch, setBranch] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [image, setImage] = useState("");

  const [hostel, setHostel] = useState("");
  const [hostelRoomNumber, setHostelRoomNumber] = useState("");

  const [request, setRequest] = useState([]);
  const authCtx = useContext(AuthContext);
  useEffect(() => {
    const getUser = async () => {
      const response = await axiosInstance.get(
        "https://gate-pass-system-iitbbs.herokuapp.com/api/v1/user/profile-page"
      );

      const {
        name,
        image,
        phoneNo,
        rollNo,
        branch,
        requests,
        hostel,
        roomNo,
        mailId,
      } = response.data.data.user;
      if (name && phoneNo && hostel && rollNo && roomNo && branch)
      localStorage.setItem("requestForm", true);
      else localStorage.setItem("requestForm", false);
      const { token } = response.data.data;
      authCtx.login({ name, token, mailId });
      setName(name);
      setImage(image);
      setPhoneNo(phoneNo);
      setRollNo(rollNo);
      setBranch(branch);
      setRequest(requests);
      setHostel(hostel);
      setHostelRoomNumber(roomNo);
    };
    getUser();
  }, [authCtx]);

  // const { user } = authCtx;
  // if (!user) return <Navigate to="/" />;
  // if (user && user.isAdmin) return <Navigate to="/Admin/requests" />;
  return (
    <ProfilePageCard
      name={name}
      branch={branch}
      phoneNumber={phoneNo}
      rollNumber={rollNo}
      hostelRoomNumber={hostelRoomNumber}
      hostel={hostel}
      image={image}
      requests={request}
    />
  );
}
