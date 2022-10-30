import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useWebSocket, { ReadyState } from 'react-use-websocket';
import Navbar from "./Navbar";

const CryptoCurrencyDisplay = () => {
  const [socketUrl, setSocketUrl] = useState("wss://stream.binance.com:9443/ws/btcusdt@aggTrade");
  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);
  const [price,setPrice] = useState('');
  useEffect(() => {
    if (lastMessage !== null) { 


               // console.log(lastMessage);
        let temp = JSON.parse(lastMessage.data);
    //   //   console.log(lastMessage.data);
            setPrice(parseFloat(temp.p).toFixed(2));
    //         setTenTimes(...tenTimes,"");
    }
  }, [lastMessage]);
  return (
    <>
      <Box>
        <Link to="/binance">
         <span style={{background: "white", color: "black ", padding: "7px" , marginLeft: "300px"}}> Live Cryptocurrency data </span>
        </Link>

        <Box
          sx={{ background:  "linear-gradient(to right,  rgba(255,165,0, 0.9), rgba(255,165,0,0.1)) ", width: "500px", height: "150px" }}
          display="flex"
          justifyContent="center"
          flexDirection="column "
          alignItems="center"
        >
          <Typography variant="h3" fontFamily= 'Exo 2 , sans-serif ' >{price}</Typography>
        </Box>
      </Box>
    </>
  );
};

export default CryptoCurrencyDisplay;