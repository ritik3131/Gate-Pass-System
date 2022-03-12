import * as React from "react";
import { Navigate } from "react-router";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import { Button, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { Grid, TextField, ListItem as Item } from "@mui/material";
import Request from "./request";
import axiosInstance from "../util/axiosIntance";
import { useState } from "react";

export default function ProfilePage(props) {
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  // const name = props.name;
  // const rollNumber = props.rollNumber;
  // const phoneNumber = props.phoneNumber;
  // const branch = props.Branch;
  const {
    name,
    rollNumber,
    phoneNumber,
    branch,
    image,
    requests,
    hostel,
    hostelRoomNumber,
  } = props;
  const [Name, setName] = React.useState(name);
  const [isEdit, setIsEdit] = useState(false);
  const [RollNumber, setRollNumber] = React.useState(rollNumber);
  const [PhoneNumber, setPhoneNumber] = React.useState(phoneNumber);
  const [Branch, setBranch] = React.useState(branch);
  const [Image, setImage] = React.useState(image);
  const [Hostel, setHostel] = React.useState(hostel);
  const [HostelRoomNumber, setHostelRoomNumber] =
    React.useState(hostelRoomNumber);
  const [userRequest, setRequest] = useState(requests);
  const [readOnlyChecker, setReadOnlyChecker] = useState(true);
  React.useEffect(() => {
    setName(name);
    setRollNumber(rollNumber);
    setPhoneNumber(phoneNumber);
    setBranch(branch);
    setRequest(requests);
    setImage(image);
    setHostelRoomNumber(hostelRoomNumber);
    setHostel(hostel);
  }, [
    name,
    rollNumber,
    phoneNumber,
    branch,
    image,
    requests,
    hostel,
    hostelRoomNumber,
  ]);
  console.log(Image);
  const removeRequestHandler = (id) => {
    setRequest(userRequest.filter((req) => req._id !== id));
  };
  const textFieldColor = "grey";
  const textFieldSX = {
    input: {
      "-webkit-text-fill-color": `${textFieldColor} !important`,
      color: `${textFieldColor} !important`,
    },
  };
  async function handleSaveProfile(e) {
    e.preventDefault();
    const body = {
      rollNo: RollNumber,
      phoneNo: PhoneNumber,
      roomNo: HostelRoomNumber,
      hostel: Hostel,
      branch: Branch,
    };
     await axiosInstance.post(
      "https://gate-pass-system-iitbbs.herokuapp.com/api/v1/user/updateMe",
      body
    );
    setIsEdit(false);
    return <Navigate to="/user/profile-page" />;
  }
  return (
    <Grid container>
      <Grid item xs={12} sm={6}>
        <Card sx={{}}>
          <CardHeader
            style={{
              display: "flex",
              alignContent: "center",
              alignItems: "center",
              textAlign: "center",
              justifyContent: "center",
              justifyItems: "center",
            }}
            title={
              <Typography variant="h1" style={{ color: "#1976D2" }}>
                YOUR PROFILE
              </Typography>
            }
          />
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
          >
            <Grid item xs={3}>
              <Avatar
                style={{
                  width: "100px",
                  backgroundColor: "",
                  height: "100px",
                  fontSize: "60px",
                }}
                src={image}
              >
                P
              </Avatar>
            </Grid>
          </Grid>
          <CardHeader
            style={{ marginTop: "-5px" }}
            title={
              <TextField
                id="outlined-helperText"
                label={
                  <Typography
                    variant="h6a"
                    style={{
                      marginRight: "4px",
                      marginLeft: "1.5px",
                    }}
                  >
                    Name
                  </Typography>
                }
                value={Name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                fullWidth={true}
                error={!Name}
                helperText={
                  !readOnlyChecker && !Name ? (
                    <div style={{ marginLeft: "-10px" }}>
                      Name can't be empty
                    </div>
                  ) : (
                    ``
                  )
                }
                inputProps={{
                  style: {
                    color: "grey",
                    fontFamily: `'Robot',sans-serif`,
                    fontWeight: 700,
                    borderColor: "white",
                  },
                }}
                InputProps={{
                  readOnly: readOnlyChecker,
                  style: {
                    color: "grey",
                    fontFamily: `'Robot',sans-serif`,
                    fontWeight: 700,
                  },
                }}
              />
            }
          />
          <CardHeader
            style={{ marginTop: "-20px" }}
            title={
              <TextField
                id="outlined-basic"
                sx={textFieldSX}
                disabled={readOnlyChecker}
                label={<div style={{ marginRight: "12px" }}>Roll Number</div>}
                value={RollNumber}
                fullWidth={true}
                error={!RollNumber}
                helperText={
                  !readOnlyChecker && !RollNumber ? (
                    <div style={{ marginLeft: "-10px" }}>
                      Roll Number can't be empty
                    </div>
                  ) : (
                    ``
                  )
                }
                onChange={(e) => {
                  setRollNumber(e.target.value);
                }}
                inputProps={{
                  style: {
                    color: "grey",
                    fontFamily: `'Robot',sans-serif`,
                    fontWeight: 700,
                    borderColor: "white",
                  },
                }}
                InputLabelProps={{
                  style: {
                    fontSize: 18,
                    fontFamily: `'Robot', sans-serif`,
                    fontWeight: 900,
                    color: "grey",
                  },
                }}
                InputProps={{
                  readOnly: readOnlyChecker,
                  style: {
                    color: "grey",
                    fontFamily: `'Robot',sans-serif`,
                    fontWeight: 700,
                  },
                }}
              />
            }
          />
          <CardHeader
            style={{ marginTop: "-20px" }}
            title={
              <TextField
                disabled={readOnlyChecker}
                id="outlined-helperText"
                sx={textFieldSX}
                label={
                  <Typography
                    variant="h6a"
                    style={{
                      marginRight: "4px",
                      marginLeft: "1.5px",
                    }}
                  >
                    Number
                  </Typography>
                }
                value={PhoneNumber}
                fullWidth={true}
                error={!PhoneNumber}
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                }}
                helperText={
                  !readOnlyChecker && !PhoneNumber ? (
                    <div style={{ marginLeft: "-10px" }}>
                      Phone Number can't be empty
                    </div>
                  ) : (
                    ``
                  )
                }
                inputProps={{
                  style: {
                    color: "grey",
                    fontFamily: `'Robot',sans-serif`,
                    fontWeight: 700,
                    borderColor: "white",
                  },
                }}
                InputProps={{
                  readOnly: readOnlyChecker,
                  style: {
                    color: "grey",
                    fontFamily: `'Robot',sans-serif`,
                    fontWeight: 700,
                  },
                }}
              />
            }
          />
          <CardHeader
            style={{ marginTop: "-20px" }}
            title={
              <TextField
                disabled={readOnlyChecker}
                id="outlined-helperText"
                sx={textFieldSX}
                label={
                  <Typography
                    variant="h6a"
                    style={{
                      marginRight: "4px",
                      marginLeft: "1.5px",
                    }}
                  >
                    Branch
                  </Typography>
                }
                value={Branch}
                fullWidth={true}
                error={!Branch}
                onChange={(e) => {
                  setBranch(e.target.value);
                }}
                helperText={
                  !readOnlyChecker && !Branch ? (
                    <div style={{ marginLeft: "-10px" }}>
                      Branch can't be empty
                    </div>
                  ) : (
                    ``
                  )
                }
                inputProps={{
                  style: {
                    color: "grey",
                    fontFamily: `'Robot',sans-serif`,
                    fontWeight: 700,
                  },
                }}
                InputProps={{
                  readOnly: readOnlyChecker,
                  style: {
                    color: "grey",
                    fontFamily: `'Robot',sans-serif`,
                    fontWeight: 700,
                  },
                }}
              />
            }
          />
          <CardHeader
            style={{ marginTop: "-20px" }}
            title={
              <TextField
                disabled={readOnlyChecker}
                id="outlined-helperText"
                sx={textFieldSX}
                label={
                  <Typography
                    variant="h6a"
                    style={{
                      marginRight: "4px",
                      marginLeft: "1.5px",
                    }}
                  >
                    Hostel
                  </Typography>
                }
                value={Hostel}
                fullWidth={true}
                error={!Hostel}
                onChange={(e) => {
                  setHostel(e.target.value);
                }}
                helperText={
                  !readOnlyChecker && !Hostel ? (
                    <div style={{ marginLeft: "-10px" }}>
                      Hostel can't be empty
                    </div>
                  ) : (
                    ``
                  )
                }
                inputProps={{
                  style: {
                    color: "grey",
                    fontFamily: `'Robot',sans-serif`,
                    fontWeight: 700,
                  },
                }}
                InputProps={{
                  readOnly: readOnlyChecker,
                  style: {
                    color: "grey",
                    fontFamily: `'Robot',sans-serif`,
                    fontWeight: 700,
                  },
                }}
              />
            }
          />
          <CardHeader
            style={{ marginTop: "-20px" }}
            title={
              <TextField
                disabled={readOnlyChecker}
                id="outlined-helperText"
                sx={textFieldSX}
                label={
                  <Typography
                    variant="h6a"
                    style={{
                      marginRight: "4px",
                      marginLeft: "1.5px",
                    }}
                  >
                    Room Number
                  </Typography>
                }
                value={HostelRoomNumber}
                fullWidth={true}
                error={!HostelRoomNumber}
                onChange={(e) => {
                  setHostelRoomNumber(e.target.value);
                }}
                helperText={
                  !readOnlyChecker && !HostelRoomNumber ? (
                    <div style={{ marginLeft: "-10px" }}>
                      Hostel Room Number can't be empty
                    </div>
                  ) : (
                    ``
                  )
                }
                inputProps={{
                  style: {
                    color: "grey",
                    fontFamily: `'Robot',sans-serif`,
                    fontWeight: 700,
                  },
                }}
                InputProps={{
                  readOnly: readOnlyChecker,
                  style: {
                    color: "grey",
                    fontFamily: `'Robot',sans-serif`,
                    fontWeight: 700,
                  },
                }}
              />
            }
          />

          <div
            style={{
              margin: "auto",
              width: "90%",
              paddingBottom: "",
              backgroundColor: "",
            }}
          >
            {!isEdit && (
              <Button
                variant="outlined"
                fullWidth={true}
                style={{ marginBottom: "10px" }}
                endIcon={<EditIcon />}
                onClick={() => {
                  setReadOnlyChecker(!readOnlyChecker);
                  setIsEdit(true);
                }}
              >
                {`Edit`}
              </Button>
            )}
          </div>
          {isEdit && (
            <div
              style={{
                margin: "auto",
                width: "90%",
                paddingBottom: "",
                backgroundColor: "",
              }}
            >
              <Button
                variant="outlined"
                fullWidth={true}
                type="submit"
                style={{ marginBottom: "10px" }}
                endIcon={<SaveIcon />}
                onClick={handleSaveProfile}
                disabled={
                  !(
                    Name &&
                    RollNumber &&
                    PhoneNumber &&
                    Branch &&
                    Hostel &&
                    HostelRoomNumber
                  )
                }
              >
                Save Profile
              </Button>
            </div>
          )}
        </Card>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Card style={{ margin: "10px" }}>
          <CardHeader
            style={{
              display: "flex",
              alignContent: "center",
              alignItems: "center",
              textAlign: "center",
              justifyContent: "center",
              justifyItems: "center",
            }}
            title={
              <Typography variant="h1" style={{ color: "#1976D2" }}>
                YOUR REQUESTS
              </Typography>
            }
          />
          <CardContent
            style={{
              display: "flex",
              alignContent: "center",
              alignItems: "center",
              textAlign: "center",
              justifyContent: "center",
              justifyItems: "center",
            }}
          >
            <Typography variant="body2" color="text.secondary">
              <Button variant="outlined" onClick={handleExpandClick}>
                {!expanded ? `Click Here to See User Requests` : `Close`}
              </Button>
            </Typography>
          </CardContent>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            {requests.length === 1 ? (
              requests.map((elem) => {
                return (
                  <Item
                    style={{
                      display: "flex",
                      alignContent: "center",
                      alignItems: "center",
                      justifyContent: "center",
                      justifyItems: "center",
                    }}
                  >
                    <Request
                      id={elem._id}
                      date={elem.Date}
                      reason={elem.reason}
                      status={elem.status}
                      onDelete={removeRequestHandler}
                      style={{ width: "570px" }}
                    />
                  </Item>
                );
              })
            ) : (
              <Grid container>
                {requests.map((elem) => {
                  return (
                    <Grid item xs={12} sm={12} md={6} style={{}}>
                      <Request
                        id={elem._id}
                        date={elem.Date}
                        reason={elem.reason}
                        status={elem.status}
                        onDelete={removeRequestHandler}
                      />
                    </Grid>
                  );
                })}
              </Grid>
            )}
          </Collapse>
        </Card>
      </Grid>
    </Grid>
  );
}
