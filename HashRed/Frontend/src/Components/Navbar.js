import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import { Button, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
const Navbar = (props) => {
  let navigate = useNavigate();
  const redirect = () => {
    let url = "/";
    navigate(url, { replace: true });
  };
  return (
    <Box sx={{ flexGrow: 1, marginBottom: "20px" }}>
      <AppBar position="static" style={{ background: '#D4F1F4' , color: 'black'  }}>
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu" 
            onClick={redirect} 
          >
            <KeyboardDoubleArrowLeftIcon />
          </IconButton> */}
          
          {/* <Typography variant="h6" sx={{textTransform: "uppercase", mr : '450px'}}>DENSITY</Typography> */}
          <Typography variant="h6" sx={{textTransform: "uppercase", mr : '450px'}}>{props.title}</Typography>
            <Link style={{ textDecoration: 'none' , color: 'black',marginLeft : '50px'  }}  to="/"> <Typography>Dashboard</Typography></Link>
            <Link style={{ textDecoration: 'none' , color: 'black',marginLeft : '50px'  }} to="/order-book"> <Typography>Order Book</Typography></Link>
            <Link style={{ textDecoration: 'none' , color: 'black',marginLeft : '50px'  }} to="/transaction-history"> <Typography>Transaction History</Typography></Link>
            <Link style={{ textDecoration: 'none' , color: 'black',marginLeft : '50px'  }}  to="/place-order"> <Typography>Place Order</Typography></Link>
            <Link style={{ textDecoration: 'none' , color: 'black',marginLeft : '50px'  }}  to="/events"> <Typography>Event log</Typography></Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;