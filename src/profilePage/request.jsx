import * as React from "react";
import {styled} from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import {Button, Typography} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import {TextField} from "@mui/material";
import {yellow} from "@mui/material/colors";
import axiosInstance from "../util/axiosIntance";
const ExpandMore = styled((props) => {
  const {expand, ...other} = props;
  return <IconButton {...other} />;
})(({theme, expand}) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const textFieldColor = "grey";
const textFieldSX = {
  input: {
    "-webkit-text-fill-color": `${textFieldColor} !important`,
    color: `${textFieldColor} !important`,
  },
};

function request(props) {
  const date = props.date;
  const Reason = props.reason;
  const Status = props.status;
  const requestId = props.id;
  const deleteRequestHandler = async () => {
    props.onDelete(requestId);
    const response = await axiosInstance.get(
      `https://gate-pass-system-iitbbs.herokuapp.com/api/v1/request/delete-request/${requestId}`
    );
    // navigate('/user/profile-page');
  };
  return (
    <Card variant="outlined" style={{margin: "10px" , ...props.style}}>
      {Status && Status === "confirmed" ? (
        <CheckCircleIcon color="success" />
      ) : (
        <PendingActionsIcon sx={{color: yellow[500]}} />
      )}
      <CardHeader
        style={{marginTop: "10px"}}
        title={
          <TextField
            id="outlined-helperText"
            sx={textFieldSX}
            disabled={true}
            label={
              <Typography
                variant="h6a"
                style={{
                  marginRight: "4px",
                  marginLeft: "1.5px",
                }}
              >
                Date
              </Typography>
            }
            defaultValue={date}
            fullWidth="true"
            inputProps={{
              style: {
                color: "grey",
                fontFamily: `'Robot',sans-serif`,
                fontWeight: 700,
                borderColor: "white",
              },
            }}
            InputProps={{
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
        style={{marginTop: "-20px"}}
        title={
          <TextField

            sx={textFieldSX}
            disabled={true}
            id="outlined-basic"
            label={<div style={{marginRight: "12px"}}>Reason</div>}
            defaultValue={Reason}
            fullWidth="true"
            InputLabelProps={{
              style: {
                fontSize: 18,
                fontFamily: `'Robot', sans-serif`,
                fontWeight: 900,
                color: "grey",
              },
            }}
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
            }}
          />
        }
      />
      <CardHeader
        style={{marginTop: "-20px"}}
        title={
          <TextField

            sx={textFieldSX}
            disabled={true}
            id="outlined-helperText"
            label={
              <Typography
                variant="h6a"
                style={{
                  marginRight: "4px",
                  marginLeft: "1.5px",
                }}
              >
                Status
              </Typography>
            }
            value={Status}
            fullWidth="true"
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
            }}
          />
        }
      />
      <div
        style={{
          display: "flex",
          justifyItems: "center",
          justifyContent: "center",
          alignItems: "center",
          paddingBottom: "20px",
        }}
      >
        <Button
          color="error"
          variant="outlined"
          style={{paddingBottom: ""}}
          onClick={deleteRequestHandler}
        >
          Delete Pass Request
        </Button>
      </div>
    </Card>
  );
}

export default request;
