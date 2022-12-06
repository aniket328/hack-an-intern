import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import axios from "axios";

const MarketPriceDisplay = () => {
  const [price,setPrice] = useState('');
  const headers = {
    accept: "application/json",
    "Content-Type": "application/json",
  };

  const getMarketPrice=()=>{
    try {
      axios
        .get("http://localhost:5000/transactions/current-price", {
          headers: headers,
        })
        .then((response) => {
          setPrice(response.data.currentPrice);
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(()=>{
    getMarketPrice();
  })
  return (
    <>
      <Box>
         <span style={{background: "white", color: "black ", padding: "7px"}}> Current Market </span>

        <Box
          sx={{ background:  "linear-gradient(to right, rgba(255,165,0,0.1), rgba(255,165,0, 0.9)) ", width: "500px", height: "150px" }}
          display="flex"
          justifyContent="center"
          flexDirection="column "
          alignItems="center"
        >
          <Typography variant="h3" fontFamily= 'Exo 2 , sans-serif ' >₹ {price} </Typography>
        </Box>
      </Box>
    </>
  );
};

export default MarketPriceDisplay;
