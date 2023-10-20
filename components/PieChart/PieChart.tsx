import React, { useEffect, useState, useRef } from "react";
import { Chart } from "chart.js";
import "chart.js/auto";
import styles from "./PieChart.module.scss";

const DonutChart: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<string>("2023");
  const [data, setData] = useState<number[]>([]);
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/body-parts?year=${selectedYear}`);
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

  if (chartRef.current) {
    const ctx = chartRef.current.getContext("2d");

    if (ctx) {
      Chart.getChart(ctx) && Chart?.getChart(ctx)?.destroy();

      new Chart(ctx, {
        type: "doughnut",

        data: {
          labels: Object.keys(data),
          datasets: [
            {
              data: Object.values(data),
            },
          ],
        },

        options: {
          cutout: "70%",
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

export default DonutChart;
