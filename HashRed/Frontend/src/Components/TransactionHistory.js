import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Navbar from "./Navbar";
import { Box, Typography } from "@mui/material";
import MarketPriceDisplay from "./MarketPriceDisplay";
import LineGraph from "./LineGraph";
import { useEffect, useState } from "react";
import axios from "axios";
import CryptoCurrencyDisplay from "./CryptoCurrencyDisplay";

function createData(b_user, s_user, quantity, price) {
  return { b_user, s_user, quantity, price };
}

const TransactionHistory = () => {
  const [rows,setRows]=  useState([]);
  const userHash = new Map();
  const headers = {
    accept: "application/json",
    "Content-Type": "application/json",
  };

    const getUsers=()=>{
      try {
        axios
          .get("http://localhost:5000/user/get-all", {
            headers: headers,
          })
          .then((response) => {
            console.log(response);
            response.data.users.forEach((user)=>{
              userHash.set(user.userId,user.userName);
            })
            console.log(userHash.get('a'));
            getTransactions();
          })
          .catch((e) => {
            console.log(e);
          });
      } catch (err) {
        console.log(err);
      }
    }

    const getTransactions = () => {
      try {
        axios
          .get("http://localhost:5000/transactions/get", {
            headers: headers,
          })
          .then((response) => {
            let tempTrans= [];
            console.log(response);
            response.data.transactions.forEach((trans)=>{
              tempTrans.push(createData(userHash.get(trans.buyer),userHash.get(trans.seller),trans.quantity,trans.price));
            })
            setRows(tempTrans);
          })
          .catch((e) => {
            console.log(e);
          });
      } catch (err) {
        console.log(err);
      }
    };

  
  useEffect(()=>{
    getUsers();
  },[]);
  return (
    <Box sx={{ backgroundColor: "#000", padding: "7px", height: '100vh' }}>
      <Navbar title={"Transaction History"} />
      <Box display="flex" justifyContent="center" alignItems="center">
        <Box
          sx={{
            display: "flex",
            width: "600px",
            m: 8, 
            border: "3px solid black",
            justifyContent: "center",
          }}
        >
          <TableContainer
            sx={{
              maxWidth: 650, 
              maxHeight: 350, 
              border: "3px solid white",
              backgroundColor: "#000",
            }}
            component={Box}
          >
            <Typography  variant="h5" color="white" backgroundColor="#0047AB" margin={'6px'} textAlign="center">Transaction History</Typography>
            <Table sx={{ maxWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography style={{ color: "white" }}>Buyer</Typography>{" "}
                  </TableCell>
                  <TableCell align="right">
                    <Typography style={{ color: "white" }}>Seller</Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography style={{ color: "white" }}>quantity.</Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography style={{ color: "white" }}>Price</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.b_user}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <Typography style={{ color: "white" }}>
                        {" "}
                        {row.b_user}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography style={{ color: "white" }}>
                        {row.s_user}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography style={{ color: "white" }}>
                        {row.quantity}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography style={{ color: "white" }}>
                        {row.price}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <LineGraph />
      </Box>
      
      <Box sx={{display : "flex", marginTop:"60px", justifyContent: 'space-between'}}>
        <MarketPriceDisplay />
        <CryptoCurrencyDisplay/>
      </Box>
    </Box>
  );
};

export default TransactionHistory;
