import React from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import LineGraph from "../Components/LineGraph";
import UserPorfolio from "../Components/UserPortfolio";
import MarketPriceDisplay from "../Components/MarketPriceDisplay";
import CryptoCurrencyDisplay from "../Components/CryptoCurrencyDisplay";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";

const Home = () => {
  const styleButton = { 
    width: 400, 
    fontSize: "14px",
    bgcolor: "#FBCEB1",
    color: "#000",
    border: "3px solid orange",
    p: 1,
    m: "5px",
    borderRadius: 0,
    "&:hover": {
      bgcolor: "#fff",
      color: "#000",
      border: "3px solid #000",
    },
  };

  return (
    <Box sx={{backgroundColor: "#000", padding: "7px", height: "100vh"}}>
      <Navbar title = "DENSITY"/>
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: "40px" }}>
        <UserPorfolio />
        <LineGraph />
      </Box>

      <Box sx={{ display: "flex", justifyContent: "flex-start" ,alignItems: "center" ,marginTop: "40px" }}>
        <MarketPriceDisplay/>
        <Box 
          sx={{ 
            m: "1rem",
            display: "flex",
            width: "400px", height: "150px",
            justifyContent: "center",
            flexDirection: "column",
            alignItems:"center"
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/transaction-history">
            <Box sx={styleButton}>
              <Typography textAlign='center'>
              Transaction History
              </Typography>
              </Box>
          </Link>
          <Link style={{ textDecoration: "none" }} to="/order-book">
            <Box sx={styleButton}>
              <Typography textAlign='center'>
              Order Book
              </Typography>
              </Box>
          </Link>
          <Link style={{ textDecoration: "none" }} to="/place-order">
            <Box sx={styleButton}>
              <Typography textAlign='center'>
              Place Order
              </Typography>
              </Box>
          </Link>
        </Box>
        <CryptoCurrencyDisplay/>
      </Box>
    </Box>

  );
};

export default Home;