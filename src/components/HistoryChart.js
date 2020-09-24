import React, { useRef, useEffect, useState } from "react";
import Chartjs from "chart.js";
import { historyOptions } from "./chatConfig";

function HistoryChart({ data }) {
    const chartRef = useRef();
    const { day, week, year, detail } = data;
    const [timeFormat, setTimeFormat] = useState("24h");
    const determineTimeFormat = () => {
        switch (timeFormat) {
          case "24h":
            return day;
          case "7d":
            return week;
          case "1y":
            return year;
          default:
            return day;
        }
      };
      useEffect(() => {
        if (chartRef && chartRef.current && detail) {
          console.log("yeah");
          const chartInstance = new Chartjs(chartRef.current, {
            type: "line",
            data: {
              datasets: [
                {
                  label: `${detail.name} price`,
                  data: determineTimeFormat(),
                  backgroundColor: "rgba(174, 305, 194, 0.5)",
                  borderColor: "rgba(174, 305, 194, 0.4",
                  pointRadius: 0,
                },
              ],
            },
            options: {
              ...historyOptions,
            },
          });
        }
      });
    return (
        <div>
        <canvas ref={chartRef} id="myChart" width={250} height={250}></canvas>
      </div>
    )
}

export default HistoryChart
