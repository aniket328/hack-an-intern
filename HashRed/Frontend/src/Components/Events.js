import { Box, Typography, Card } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";

function Events() {
  const headers = {
    accept: "application/json",
    "Content-Type": "application/json",
  };
  const [msgs, setMsgs] = useState([]);
  const getEvents = () => {
    try {
      axios
        .get("http://localhost:5000/notifications/get-all", {
          headers: headers,
        })
        .then((response) => {
          console.log(response);
          setMsgs(response.data.notifications);
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getEvents();
  }, []);
  const events = msgs.map((msg) => (
    <Card
      sx={{
        width: "1500px", 
        p: 2,
        background: "#333",
        m: 1, 
      }}
    >
      <Typography color="white" marginLeft="10px" >{msg.message}</Typography>
    </Card>
  ));
  return (
    <Box sx={{ background: "black",   padding: "7px" ,minHeight: "100vh" }}>
      <Navbar title="Events Log"/>
      <Box sx={{display:"flex", flexDirection: "column-reverse", }}>{events}</Box>
    </Box>
  );
}

export default Events;
