import React, { useEffect, useState, useRef } from "react";
import { Chart } from "chart.js";
import "chart.js/auto";
import styles from "./BarGraph.module.scss";

const BarGraph: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<string>("2023");
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const [data, setData] = useState<number[]>(
    Array.from({ length: 12 }, () => 0)
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `/api/reports-count-per-month?year=${selectedYear}`
        );
        if (response.ok) {
          const data = await response.json();
          setData(data);
        } else {
          throw new Error("Network response was not ok");
        }
      } catch (error) {
        console.error("API request error:", error);
      }
    };

    fetchData();
  }, [selectedYear]);

  const updatedData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: `Injuries reported in ${selectedYear}`,
        data,
      },
    ],
  };

  if (chartRef.current) {
    const ctx = chartRef.current.getContext("2d");

    if (ctx) {
      Chart.getChart(ctx) && Chart?.getChart(ctx)?.destroy();

      new Chart(ctx, {
        type: "bar",
        data: updatedData,

        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(event.target.value);
  };

  return (
    <div className={styles.container}>
      <div>
        <select
          className={styles.year}
          id="year"
          value={selectedYear}
          onChange={handleYearChange}
        >
          <option value="2023">2023</option>
        </select>
      </div>

      <canvas id="myChart" ref={chartRef}></canvas>
    </div>
  );
};

export default BarGraph;
