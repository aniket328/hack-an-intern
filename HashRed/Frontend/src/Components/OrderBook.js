import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Grid,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import LineGraph from "./LineGraph";
import MarketPriceDisplay from "./MarketPriceDisplay";
import CryptoCurrencyDisplay from "./CryptoCurrencyDisplay";

function createData(orderId,userId,userName, quantity, price, status) {
  return { orderId,userId,userName, quantity, price, status };
}

const OrderBook = () => {
  const [rowsBuyer, setRowsBuyer] = useState([]);
  const [rowsSeller, setRowsSeller] = useState([]);
  const headers = {
    accept: "application/json",
    "Content-Type": "application/json",
  };
  const getOrders = () => {
    try {
      axios
        .get("http://localhost:5000/order/get-all", {
          headers: headers,
        })
        .then((response) => {
          console.log(response);
          let tempRowBuyer = [];
          response.data.buyOrders.forEach((order) => {
            tempRowBuyer.push(
              createData(
                order.orderId,
                order.userId,
                order.userName,
                order.quantity,
                order.price,
                order.status
              )
            );
          });
          setRowsBuyer(tempRowBuyer);
          let tempRowSeller = [];
          response.data.sellOrders.forEach((order) => {
            tempRowSeller.push(
              createData(
                order.orderId,
                order.userId,
                order.userName,
                order.quantity,
                order.price,
                order.status
              )
            );
          });
          setRowsSeller(tempRowSeller);
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <Box sx={{ backgroundColor: "#000", padding: "7px" , height: '100vh' }}>
      <Navbar title={"Order Book"} /> 
      <Box 
        container
        display="flex"  
        marginBottom=" 20px"
        marginTop=" 20px"
      > 
        <TableContainer
          sx={{
            maxWidth: 400,
            minHeight: 420,
            border: "3px solid white",
            backgroundColor: "#000",
            m: 2,
          }}
          component={Box}
        >
            <Typography variant="h5" color="white" backgroundColor="green" margin={'6px'} textAlign="center">Buy Orders</Typography>
          <Table sx={{ maxWidth: 400   }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography color="white">User</Typography>{" "}
                </TableCell>
                <TableCell align="right">
                <Typography color="white">Quantity</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography color="white">Price</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography color="white">Status</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rowsBuyer.map((row) => (
                <TableRow
                  key={row.orderId}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                  <Typography color="white">{row.userName}</Typography>
                  </TableCell>
                  <TableCell align="right"><Typography color="white">{row.quantity}</Typography></TableCell>
                  <TableCell align="right"><Typography color="white">{row.price}</Typography></TableCell>     
                  <TableCell align="right"><Typography color={row.status==="ACTIVE"? "green" : "gray"} fontWeight='bold'>{row.status}</Typography></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

       
        <TableContainer
          sx={{
            maxWidth: 400,
            minHeight: 420,
            border: "3px solid white",
            backgroundColor: "#000",
            m: 2,
          }}
          component={Box}
        >
            <Typography  variant="h5" color="white" backgroundColor="red" margin={'6px'} textAlign="center">Sell Orders</Typography>
          <Table sx={{ maxWidth: 400    }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography color="white">User</Typography>{" "}
                </TableCell>
                <TableCell align="right">
                  <Typography color="white">Qty.</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography color="white">Price</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography color="white">Status</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rowsSeller.map((row) => (
                <TableRow
                key={row.userId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                <Typography color="white">
                  {row.userName}
                </Typography>
                  
                </TableCell>
                <TableCell align="right">
                  <Typography color="white">
                    {row.quantity}
                  </Typography>
                  </TableCell>
                <TableCell align="right">
                  <Typography color="white">
                    {row.price}
                  </Typography>
                  </TableCell>
                <TableCell align="right">
                  <Typography color={row.status==="ACTIVE"? "green" : "gray"} fontWeight='bold'>
                    {row.status}
                  </Typography>
                  </TableCell>
              </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <LineGraph />
      </Box>
      <Box sx={{display : "flex", justifyContent: 'space-between'}}>
        <MarketPriceDisplay />
        <CryptoCurrencyDisplay/>
      </Box>
    </Box>
  );
};

export default OrderBook;