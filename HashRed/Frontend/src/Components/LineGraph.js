import React, { useEffect } from "react";
import { useState } from "react";
import { Line } from "react-chartjs-2";
import { Box } from "@mui/material";
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

const LineGraph = () => {
  const [priceHistory ,setPriceHistory]= useState([]);
  const [data, setData] = useState({
    labels: ["", "", "", "", "", "", "", "", "", "", "", ""],
    datasets: [
      {
        label: "Density stock price",
        // data: [10, 20, 30, 42, 51, 82, 31, 59, 61, 73, 91, 58],
        data : priceHistory,
        borderColor: "rgb(191, 64, 191)",
        pointStyle: "rect",
        pointBorderColor: "blue",
        pointBackgroundColor: "#fff",
        showLine: true,
        tension: 0.4, 
        fill: true, 
        backgroundColor:  "rgb(191, 64, 191,0.3) ",
      },
    ],
  });
  const headers = {
    accept: "application/json",
    "Content-Type": "application/json",
  };
  const getPriceHistory =()=>{
    try {
      axios
        .get("http://localhost:5000/transactions/price-history", {
          headers: headers,
        })
        .then((response) => {
          console.log(response);
          let labels=[];
          response.data.priceHistory.forEach(()=>labels.push(""))
          setData({
            labels: labels,
            datasets: [
              {
                label: "Density stock price",
                // data: [10, 20, 30, 42, 51, 82, 31, 59, 61, 73, 91, 58],
                data : response.data.priceHistory,
                borderColor: "rgb(191, 64, 191)",
                pointStyle: "rect",
                pointBorderColor: "blue",
                pointBackgroundColor: "#fff",
                showLine: true,
                tension: 0.4, 
                fill: true, 
                backgroundColor:  "rgb(191, 64, 191,0.3)",

              },
            ],
          })
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(()=>{
    getPriceHistory();
  },[])

  return (
    <Box
      sx={{
        width: 0.5,
        marginX: "20px",
        border: "3px solid white",
        padding: "10px",
      }}
    >
      <Line data={data}/>
    </Box>
  );
};

export default LineGraph;
