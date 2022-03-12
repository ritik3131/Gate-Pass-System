import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import { Button, Typography } from "@mui/material";
import { TextField } from "@mui/material";
import axiosInstance from "../util/axiosIntance";
// const ExpandMore = styled((props) => {
//   const {expand, ...other} = props;
//   return <IconButton {...other} />;
// })(({theme, expand}) => ({
//   transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
//   marginLeft: "auto",
//   transition: theme.transitions.create("transform", {
//     duration: theme.transitions.duration.shortest,
//   }),
// }));
const textFieldColor = "grey";
const textFieldSX = {
  input: {
    "-webkit-text-fill-color": `${textFieldColor} !important`,
    color: `${textFieldColor} !important`,
  },
};

export default function request(props) {
  const { bookedBy, status, reason, Date, _id } = props.request;
  const changeStatusHandler = async (e) => {
    const finalStatus = e.target.value;
    await axiosInstance.get(
      `https://gate-pass-system-iitbbs.herokuapp.com/api/v1/request/admin/${_id}/${finalStatus}`
    );
    props.onDelete(_id);
  };
  return (
    <Card variant="outlined" style={{ margin: "10px", ...props.style }}>
      <CardHeader
        style={{ marginTop: "10px" }}
        title={
          <TextField
            disabled={true}
            sx={textFieldSX}
            id="outlined-helperText"
            label={
              <Typography
                variant="h6a"
                style={{
                  marginRight: "4px",
                  marginLeft: "1.5px",
                }}
              >
                User's Roll no.
              </Typography>
            }
            defaultValue={bookedBy && bookedBy.rollNo}
            fullWidth={true}
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
        style={{ marginTop: "-20px" }}
        title={
          <TextField
            disabled={true}
            sx={textFieldSX}
            id="outlined-helperText"
            label={
              <Typography
                variant="h6a"
                style={{
                  marginRight: "1px",
                  marginLeft: "1.5px",
                }}
              >
                Date
              </Typography>
            }
            defaultValue={Date}
            fullWidth={true}
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
        style={{ marginTop: "-20px" }}
        title={
          <TextField
            disabled={true}
            sx={textFieldSX}
            id="outlined-basic"
            label={<div style={{ marginRight: "12px" }}>Reason</div>}
            defaultValue={reason}
            fullWidth={true}
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
        style={{ marginTop: "-20px" }}
        title={
          <TextField
            disabled={true}
            sx={textFieldSX}
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
            defaultValue={status}
            fullWidth={true}
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
          color="success"
          variant="outlined"
          style={{ paddingBottom: "" }}
          value="confirmed"
          onClick={changeStatusHandler}
        >
          Accept Pass Request
        </Button>
      </div>

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
          style={{ paddingBottom: "" }}
          value="rejected"
          onClick={changeStatusHandler}
        >
          Delete Pass Request
        </Button>
      </div>
    </Card>
  );
}
