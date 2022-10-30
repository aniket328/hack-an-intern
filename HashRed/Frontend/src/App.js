import { createTheme, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom"; 
import './App.css'; 
import Binance from "./Components/Binance";
import Events from "./Components/Events";
import Notification from "./Components/Notification";
import OrderBook from './Components/OrderBook';
import PlaceOrder from './Components/PlaceOrder';
import TransactionHistory from './Components/TransactionHistory'; 
import Home from "./pages/Home";

const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: 'Exo 2', 
    },
  },
});

function App() {
  return (
     <>  
      <ThemeProvider theme={theme}>
       <Routes>
        <Route path="/" element={<Home/> } />
        <Route path="/transaction-history" element={<TransactionHistory/>} />
        <Route path="/order-book" element={<OrderBook/>} />
        <Route path="/place-order" element={<PlaceOrder/>} /> 
        {/* <Route path="/notification" element={<Notification/>}/> */}
        <Route path="/events" element={<Events/>}/>
        <Route path="/binance" element={<Binance/>}/>
      </Routes>
      </ThemeProvider>
     </>
  );
}

export default App;
