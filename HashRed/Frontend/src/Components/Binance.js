import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import Navbar from './Navbar';
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    LineElement,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    Filler,
  } from "chart.js";
  import axios from "axios";
  
  ChartJS.register(
    Title,
    Tooltip,
    LineElement,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    Filler
  );


function Binance() {
    const [socketUrl, setSocketUrl] = useState("wss://stream.binance.com:9443/ws/btcusdt@aggTrade");
    const [messageHistory, setMessageHistory] = useState([]);
  
    const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

    const [tenPoints,setTenPoints] = useState([]);
    const [tenTimes,setTenTimes] = useState([]);
    const [price,setPrice] = useState('');
    const [rows,setRows]= useState([]);

    let times = [];

    function unixtoT(uTime){
        let unix_timestamp = 1549312452
        // Create a new JavaScript Date object based on the timestamp
        // multiplied by 1000 so that the argument is in milliseconds, not seconds.
        let date = new Date(uTime * 1000);
        // Hours part from the timestamp
        let hours = date.getHours();
        // Minutes part from the timestamp
        let minutes = "0" + date.getMinutes();
        // Seconds part from the timestamp
        let seconds = "0" + date.getSeconds();
        
        // Will display time in 10:30:23 format
        let formattedTime = hours + ':' + minutes.substring(minutes.length-2) + ':' +  seconds.substring(seconds.length-2);
        return formattedTime;
    }
    useEffect(() => {
        if (lastMessage !== null) {
          const intervalId = setInterval(()=>{
            setMessageHistory((prev) => prev.concat(lastMessage));
            setTenPoints((prev) => prev.concat(JSON.parse(lastMessage.data).p));
            setRows((prev) => prev.concat({
                time :  unixtoT(JSON.parse(lastMessage.data).E) ,
                price : JSON.parse(lastMessage.data).p,
                quantity : JSON.parse(lastMessage.data).q
            }));
            setTenTimes((prev) => prev.concat(''));
            setPrice(parseFloat(JSON.parse(lastMessage.data).p).toFixed(2));
            // console.log(lastMessage);
        //     let temp = JSON.parse(lastMessage.data);
        //   //   console.log(lastMessage.data);
        //         setTenPoints(...tenPoints,temp.p);
        //         setTenTimes(...tenTimes,"");
            console.log(tenPoints)
          },200)
          return () => clearInterval(intervalId);
        }
      }, [lastMessage, setMessageHistory]);

      useEffect(()=>{
        setData({
            labels: tenTimes,
            datasets: [
              {
                label: "Binance",
                data: tenPoints,
                borderColor: "rgb(191, 64, 191)",
                pointStyle: "rect",
                pointBorderColor: "blue",
                pointBackgroundColor: "#fff",
                showLine: true,
                tension: 0.4, 
                fill: true, 
                backgroundColor:   "rgb(191, 64, 191,0.3)",
              },
            ],
          })
      },[tenPoints]);

      const [data, setData] = useState({
        labels: [],
        datasets: [
          {
            label: "Density stock price",
            data: [],
            borderColor: "blue",
            pointStyle: "rect",
            pointBorderColor: "blue",
            pointBackgroundColor: "#fff",
            showLine: true,
            tension: 0.4, 
            fill: true, 
            backgroundColor: "rgb(137, 207, 240)",
          },
        ],
      });
    
    return (
     <Box sx={{ backgroundColor: "#000", padding: "7px", height: '100vh' }}>
        <Navbar/>

        <Box 
        sx={{
            padding: "10px",
            display : 'flex',
            justifyContent : 'center'
          }}
        >


      <Box
      sx={{
        width: 0.5,
        // marginX: "20px",
        marginBottom: "50px",
        border: "3px solid white",
        padding: "10px",
      }}
    >
            
      <Line data={data}/>
      
    </Box>
    <Box>
    <TableContainer
            sx={{
              maxWidth: 650, 
              maxHeight: 388, 
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
                    <Typography style={{ color: "white" }}>Time stamp</Typography>{" "}
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
                    key={row.time}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <Typography style={{ color: "white" }}>
                        {" "}
                        {row.time}
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
    </Box>

    <Box>
         <span style={{background: "white", color: "black ", marginLeft : '500px', padding: "7px"}}> Current Market </span>

        <Box
          sx={{ mx:'500px', background:  "linear-gradient(to right, rgba(255,165,0,0.1), rgba(255,165,0, 0.9)) ", width: "500px", height: "150px" }}
          display="flex"
          justifyContent="center"
          flexDirection="column "
          alignItems="center"
          
        >
          <Typography variant="h3" fontFamily= 'Exo 2 , sans-serif ' > {price} </Typography>
        </Box>
      </Box>

    
    
    </Box>
  )
}

export default Binance
