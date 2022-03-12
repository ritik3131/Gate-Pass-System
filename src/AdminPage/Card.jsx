import * as React from "react";
import {styled} from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import {Button, Typography, ListItem as Item} from "@mui/material";
import {Grid} from "@mui/material";
import Requests from "./request";
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
const textFieldColor = "grey"
const textFieldSX = {
  input: {
    "-webkit-text-fill-color": `${textFieldColor} !important`,
    color: `${textFieldColor} !important`,
  },
};

export default function AdminPage(props) {
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  // const name = props.name;
  // const rollNumber = props.rollNumber;
  // const phoneNumber = props.phoneNumber;
  // const branch = props.Branch;
  const [requests, setRequests] = React.useState([]);

  React.useEffect(() => {
    const getUser = async () => {
      const response = await axiosInstance.get(
        "https://gate-pass-system-iitbbs.herokuapp.com/api/v1/request/admin"
      );
      const req = response.data;
      setRequests(req);
    };
    getUser();
  }, []);

  const removeRequestHandler = (id) => {
    setRequests(requests.filter((req) => req._id !== id));
  };

  return (
    <Grid container>
      <Grid item xs={12} sm={12}>
        <Card style={{margin: "10px"}}>
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
              <Typography variant="h1" style={{color: "#1976D2"}}>
                VARIOUS REQUESTS
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
            {requests.length == 1 ? (
              requests.map((elem) => {
                return (
                  <Item
                    key={elem._id}
                    item
                    style={{
                      display: "flex",
                      alignContent: "center",
                      alignItems: "center",
                      justifyContent: "center",
                      justifyItems: "center",
                    }}
                  >
                    <Requests
                      request={elem}
                      style={{
                        width: "540px",
                        alignContent: "center",
                        alignItems: "center",
                        justifyContent: "center",
                        justifyItems: "center",
                      }}
                      onDelete={removeRequestHandler}
                    />
                  </Item>
                );
              })
            ) : (
              <Grid container>
                {requests.map((elem) => {
                  return (
                    <Grid
                      key={elem._id}
                      item
                      xs={12}
                      sm={12}
                      md={6}
                      lg={6}
                      xl={6}
                      style={{}}
                    >
                      <Requests
                        request={elem}
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
