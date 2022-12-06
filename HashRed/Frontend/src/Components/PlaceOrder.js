import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link, useNavigate, useParams } from "react-router-dom";

import axios from "axios";
import Select from "react-select";
import { useEffect, useState } from "react";
import { Box, Input } from "@mui/material";
import Navbar from "./Navbar";
import Notification from "./Notification";
import MarketPriceDisplay from "./MarketPriceDisplay";
import LineGraph from "./LineGraph";
import EventPop from "./EventPop";

const PlaceOrder = () => {
  let navigate = useNavigate();
  const redirect = () => {
    let url = "/order-book";
    navigate(url, { replace: true });
  };
  const [orderType, setOrderType] = useState("");
  const [priceType, setPriceType] = useState("");
  const [user, setUser] = useState("");
  const [price, setPrice] = useState();
  const [quantity, setquantity] = useState();
  const [userOptions, setUserOptions] = useState([]);
  const [currentPrice, setCurrentPrice] = useState('');
  const [modal, setModal] = useState(false);
  const [buttonColor, setButtonColor] =useState('#0047AB');
  const [orderId, setOrderId] = useState();
  const handleOpen =()=>{
    setModal(!modal);
  }
  const orderOptions = [
    { value: "BUY", label: "BUY" },
    { value: "SELL", label: "SELL" },
  ];

  const priceTypeOptions = [
    { value: "MARKET", label: "MARKET" },
    { value: "LIMIT", label: "LIMIT" },
  ];

  let tempOptions = [];
  const headers = {
    accept: "application/json",
    "Content-Type": "application/json",
  };
  const marketOrder=()=>{
    const orderObj={
      price:price,
      quantity : quantity,
      userId : user.value,
      type: orderType.value,
    }
    try {
      axios
        .post("http://localhost:5000/transactions/market-order",orderObj, {
          headers: headers,
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (err) {
      console.log(err);
    }
  }
  const matchOrder=()=>{
    const matchObj = {
      type : orderType.value,
      orderId : orderId
    }
    console.log(matchObj);
    try {
      axios
        .post("http://localhost:5000/transactions/match-order",matchObj, {
          headers: headers,
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (err) {
      console.log(err);
    }
  }

  const getMarketValue = () => {
    try {
      axios
        .get("http://localhost:5000/transactions/current-price", {
          headers: headers,
        })
        .then((response) => {
          setPrice(response.data.currentPrice);
          setCurrentPrice(response.data.currentPrice);
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (err) {
      console.log(err);
    }
  };
  const getUsers = () => {
    try {
      axios
        .get("http://localhost:5000/user/get-all", {
          headers: headers,
        })
        .then((response) => {
          // console.log(response);
          if (tempOptions.length === 0) {
            response.data.users.forEach((user) => {
              tempOptions.push({
                value: user.userId,
                label: user.userName,
              });
            });
          }
          setUserOptions(tempOptions);
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (err) {
      console.log(err);
    }
  };
  const placeOrder = () => {
    if(price === undefined){
      alert("Please enter valid price");
      return;
    }
    if(quantity === undefined){
      alert("Please enter valid quantity");
      return;
    }
    if(orderType === ""){
      alert("Please select valid order type");
      return;
    }
    if(priceType === ""){
      alert("Please select valid price type");
      return;
    }
    
    const orderObj = {
      userId: user.value,
      userName : user.label,
      type: orderType.value,
      price: parseInt(price),
      quantity: parseInt(quantity),
      status : "ACTIVE"
    };
    console.log(orderObj);
    try {
      axios
        .post("http://localhost:5000/order/create", orderObj, {
          headers: headers,
        })
        .then((response) => {
          // console.log(response);
          setModal(true);
          setOrderId(response.data.orderId);
          // redirect();
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUsers();
    getMarketValue();
  }, []);

  useEffect(()=>{
    matchOrder();
  },[orderId]);

  useEffect(()=>{
    if(priceType.value === "MARKET"){
      setPrice(-1);
    }
  },[priceType])

  useEffect(()=>{
    if(orderType.value==="BUY") {
      setButtonColor("green");
    }
    if(orderType.value==="SELL") {
      setButtonColor("red");
    }

  },[orderType.value])
  return (
    <Box sx={{ backgroundColor: "#000", padding: "7px", height: '100vh' }}>
      <EventPop open = {modal} message = "Order placed" handleOpen={handleOpen}/>
      <Navbar title="Place order" />
      <Box display="flex" justifyContent="center" alignItems="center">
        <Box
          sx={{
            justifyContent: "center",
            display: "flex",
            width: "600px",
            m: 8,
            border: "3px solid black",
          }}
        >
          <div>
            <Box>
              <div>
                <FormControl
                  sx={{ m: 1, minWidth: 400, maxWidth: 400, }}
                  size="small"
                >
                  <Select
                    placeholder="Order Type"
                    value={orderType}
                    onChange={setOrderType}
                    options={orderOptions}
                  />
                </FormControl>
              </div>
              <div>
                <FormControl
                  sx={{ m: 1, minWidth: 400, maxWidth: 400, }}
                  size="small"
                >
                  <Select
                    placeholder="User"
                    value={user}
                    onChange={setUser}
                    options={userOptions}
                  />
                </FormControl>
              </div>
              <div>
                <FormControl
                  sx={{ m: 1, minWidth: 400, maxWidth: 400 ,}}
                  size="small"
                >
                  <Select
                    placeholder="Price type"
                    value={priceType}
                    onChange={setPriceType}
                    options={priceTypeOptions}
                  />
                </FormControl>
              </div>
            </Box>
            <Box>
              <div>
                <Input
                  sx={{ m: 1, minWidth: 400, maxWidth: 400, background: "white" , p:1}}
                  size="small"
                  type="number"
                  placeholder="Quantity"
                  value={quantity}
                  onChange={(event) => setquantity(event.target.value)}
                />
              </div>
              <div>
                <Input
                  sx={{ m: 1, minWidth: 400, maxWidth: 400 , background: "white", p:1 }}
                  size="small"
                  type="number"
                  disabled={priceType.value === "MARKET"?true:false}
                  placeholder="Price"
                  value={price}
                  onChange={(event) => setPrice(event.target.value)}
                />
              </div>
            </Box>
            <Box>
              <Button
                sx={{m: 1, minWidth: 400, maxWidth: 400 , background: buttonColor, p:1 }}
                onClick={placeOrder}
                variant="contained"
              >
                Place Order
              </Button>
            </Box>
          </div>
        </Box>

          <LineGraph/>

      </Box>
      <MarketPriceDisplay />
    </Box>
  );
};

export default PlaceOrder;
