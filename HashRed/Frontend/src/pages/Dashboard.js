import React, { useEffect } from "react";
import Grid from "@mui/material/Grid";
import { Box, Button } from "@mui/material";
import MarketPriceDisplay from "../Components/MarketPriceDisplay";
import UserPorfolio from "../Components/UserPortfolio";
import LineGraph from "../Components/LineGraph";
import { Link } from "react-router-dom";


const styleButton = { 
  width: 400,
  fontSize: '14px',
  bgcolor: '#000',
  color: '#fff',
  border: 'none', 
  boxShadow: 5,
  p: 1,
}; 

const Dashboard = () => {
  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "100vh", 
          //   "&:hover": {
          //     backgroundColor: "red",
          //     opacity: [0.9, 0.8, 0.7],
          //   },
        }}
      >
        <Grid container spacing={3} display="flex" flexDirection="row">
          <Grid item sx={{ height: "100vh" }} xs={6}>
            <Grid
              container
              spacing={3}
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              <Grid item>
                <MarketPriceDisplay />
              </Grid>
              <Grid item>
                <UserPorfolio />
              </Grid>
            </Grid>
          </Grid>

          <Grid item   sx={{ height: "100vh" }} xs={6}>
            <Grid
              container
              spacing={3}
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              <Grid item>
                <LineGraph />
              </Grid>
              <Grid item>
              <Link style={{ textDecoration: 'none' }} to="/transaction-history">
                <Button sx={styleButton}>Transaction History</Button>
              </Link>
              </Grid>
              <Grid item>
                <Link style={{ textDecoration: 'none' }} to='/order-book'>
                  <Button sx={styleButton}>Order Book</Button>
                </Link>
              </Grid>
              <Grid item>
                <Link style={{ textDecoration: 'none' }} to ='/place-order'>
                <Button  sx={styleButton}>Place Order</Button>
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Dashboard;
