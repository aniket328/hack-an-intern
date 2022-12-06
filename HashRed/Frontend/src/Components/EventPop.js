import { Box, Button, Modal, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

function EventPop(props) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    background: '#D4F1F4',
    border: "2px solid #000",
    boxShadow: 24,
    fontFamily: "Evo 2",
    fontWeight: "bold",
    p: 4,
  };
  return (
    <>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={props.open}
        onClose={props.handleOpen} 
      >
        <Box 
        sx={style}
        >
        
          <Typography   variant="h6" fontWeight="500" component="h2" >
            {props.message}
          </Typography>
          <Box sx={{ display: "flex"  , marginTop: "10px"}}>
            <Button variant="contained" sx={{marginRight:"5px"}}>
              <Link to="/" style={{ textDecoration: "none" }}>
                <Typography color="white" fontFamily="Evo 2" fontSize="14px">Go to Dashboard</Typography>
              </Link>
            </Button>
            <Button variant="contained">
              <Link to="/order-book" style={{ textDecoration: "none" }}>
                <Typography color="white" fontFamily="Evo 2" fontSize="14px">Go to Order book</Typography>
              </Link>
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default EventPop;
