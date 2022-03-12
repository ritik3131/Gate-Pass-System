import * as React from "react";
import {
  TextField,
  Stack,
  Grid,
  Typography,
  ListItem as Item,
  Card,
  CardHeader,
  Button,
  Alert,
} from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AppBar from "../AppBar/appBar.jsx";
import GarageIcon from "@mui/icons-material/Garage";
import { DatePicker } from "@mui/lab";
import axiosInstance from "../util/axiosIntance";
import { Navigate, useNavigate } from "react-router";
import { AuthContext } from "../context/auth.js";
import { Box } from "@mui/system";

export default function InputForm() {
  const [value, setValue] = React.useState(new Date());
  const authCtx = React.useContext(AuthContext);
  const navigate = useNavigate();
  const [reason, setReason] = React.useState("");
  const [modeOfTracvel, setModeOfTravel] = React.useState("");
  const [checkRequest, setCheckRequest] = React.useState(false);
  const [buttonOscillator, setButtonOscillator] = React.useState(false);
  React.useEffect(() => {
    if (modeOfTracvel && reason && value) setButtonOscillator(false);
    else setButtonOscillator(true);
  });
  async function handleClick(e) {
    setCheckRequest(true);
    const body = {
      modeOfTracvel,
      reason,
      Date: value,
    };
    const ans = await axiosInstance.post(
      "https://gate-pass-system-iitbbs.herokuapp.com/api/v1/request/new-request",
      body
    );
    if (ans.status === 200) navigate("/user/profile-page", { replace: true });
  }

  const { user } = authCtx;
  if (!user) return <Navigate to="/" />;
  if (user && user.isAdmin) return <Navigate to="/Admin/requests" />;
  const sendRequest = localStorage.getItem("requestForm");
  const { requestsPerMonth } = user;

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <AppBar />
      {sendRequest === "false" ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
        >
          <Alert severity="error" container justify="center">
            First fill user details to send request!
          </Alert>
        </Box>
      ) : requestsPerMonth > 1 ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
        >
          <Alert severity="error" container justify="center">
            You have already made 2 confirmed requests in this month.So You are
            not allowed to make another
          </Alert>
        </Box>
      ) : (
        //   <Grid container justify = "center">
        // </Grid>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: "100vh" }}
        >
          <Grid item xs={3}></Grid>
          <Grid item xs={3}>
            <Card
              style={{
                maxWidth: "540px",
                display: "flex",
                justifyContent: "center",
                backgroundColor: "",
                alignItems: "center",
                paddingTop: "20px",
                paddingBottom: "20px",
              }}
            >
              <Stack
                style={{
                  display: "flex",
                  justifyContent: "center",
                  backgroundColor: "",
                  alignItems: "center",
                  justifyItems: "center",
                  paddingLeft: "20px",
                  paddingRight: "20px",
                }}
              >
                <Item style={{}}>
                  <Typography variant="h5a" style={{ color: "#1976D2" }}>
                    Booking For Gate Pass
                  </Typography>
                </Item>
                <Stack>
                  <Item style={{}}>
                    <DatePicker
                      label="Date For Travel"
                      openTo="year"
                      views={["year", "month", "day"]}
                      value={value}
                      onChange={(newValue) => {
                        setValue(newValue);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth={true}
                          InputProps={{
                            style: {
                              color: "grey",
                              fontFamily: `'Robot',sans-serif`,
                              fontWeight: 700,
                            },
                          }}
                        />
                      )}
                    />
                  </Item>
                  <Item>
                    <TextField
                      id="outlined-basic"
                      label="Mode Of Travel"
                      value={modeOfTracvel}
                      error={!modeOfTracvel && checkRequest}
                      helperText={
                        !modeOfTracvel && checkRequest ? (
                          <div style={{ marginLeft: "-10px" }}>
                            Mode Of Travel can't be empty
                          </div>
                        ) : (
                          ``
                        )
                      }
                      onChange={(e) => setModeOfTravel(e.target.value)}
                      variant="outlined"
                      fullWidth={true}
                      multiline={true}
                      inputProps={{
                        style: {
                          color: "grey",
                          fontFamily: `'Robot',sans-serif`,
                          fontWeight: 700,
                        },
                      }}
                      InputProps={{
                        style: {
                          color: "grey",
                          fontFamily: `'Robot',sans-serif`,
                          fontWeight: 700,
                        },

                        endAdornment: (
                          <div style={{ marginLeft: "21px" }}></div>
                        ),
                      }}
                    />
                  </Item>
                  <Item>
                    <TextField
                      id="outlined-basic"
                      label="Reason"
                      variant="outlined"
                      multiline={true}
                      fullWidth={true}
                      value={reason}
                      error={!reason && checkRequest}
                      helperText={
                        !reason && checkRequest ? (
                          <div style={{ marginLeft: "-10px" }}>
                            Reason can't be empty
                          </div>
                        ) : (
                          ``
                        )
                      }
                      onChange={(e) => setReason(e.target.value)}
                      inputProps={{
                        style: {
                          color: "grey",
                          fontFamily: `'Robot',sans-serif`,
                          fontWeight: 700,
                        },
                      }}
                      InputProps={{
                        style: {
                          color: "grey",
                          fontFamily: `'Robot',sans-serif`,
                          fontWeight: 700,
                        },

                        endAdornment: (
                          <div style={{ marginLeft: "21px" }}></div>
                        ),
                      }}
                    />
                  </Item>
                  <Item>
                    <Button
                      variant="outlined"
                      fullWidth={true}
                      onClick={handleClick}
                      disabled={buttonOscillator}
                    >
                      Submit Request
                    </Button>
                  </Item>
                </Stack>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      )}
    </LocalizationProvider>
  );
}
