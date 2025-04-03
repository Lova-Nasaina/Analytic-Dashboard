import React from "react";
import { Bar, Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement } from "chart.js";
import { FaSeedling, FaLeaf, FaCarrot, FaTint } from "react-icons/fa"; // ✅ Icônes modernes
import "./FoodPricesChart.css";
import Navbar from "./navbar";

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

const priceData = {
  "2021": { Riz: 3000, Manioc: 1500, Patate: 2000, Huile: 5000 },
  "2022": { Riz: 3200, Manioc: 1700, Patate: 2200, Huile: 5200 },
  "2023": { Riz: 3500, Manioc: 1800, Patate: 2500, Huile: 5400 },
};

const getPercentage = (year) => {
  const total = Object.values(priceData[year]).reduce((acc, val) => acc + val, 0);
  return Object.keys(priceData[year]).reduce((acc, key) => {
    acc[key] = ((priceData[year][key] / total) * 100).toFixed(1);
    return acc;
  }, {});
};

const icons = {
  Riz: <FaSeedling className="icon" />,
  Manioc: <FaLeaf className="icon" />,
  Patate: <FaCarrot className="icon" />,
  Huile: <FaTint className="icon" />,
};

const FoodPricesChart = () => {
  return (
    <>
      <Navbar />
      <div className="food-prices-container">
        <div className="years-container">
          {Object.keys(priceData).map((year) => {
            const percentages = getPercentage(year);
            return (
              <div key={year} className="year-box">
                <h3 className="year-title">{year}</h3>
                <ul className="year-stats">
                  {Object.keys(priceData[year]).map((product) => (
                    <li key={product}>
                      {icons[product]} <strong>{product}</strong>: {percentages[product]}%
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="charts-container">
          <div className="chart-box">
            <h2 className="chart-title">Prix des produits par année</h2>
            <Bar
              data={{
                labels: ["2021", "2022", "2023"],
                datasets: [
                  { label: "Riz", data: [3000, 3200, 3500], backgroundColor: "rgba(255, 99, 132, 0.7)" },
                  { label: "Manioc", data: [1500, 1700, 1800], backgroundColor: "rgba(54, 162, 235, 0.7)" },
                  { label: "Patate", data: [2000, 2200, 2500], backgroundColor: "rgba(255, 206, 86, 0.7)" },
                  { label: "Huile", data: [5000, 5200, 5400], backgroundColor: "rgba(75, 192, 192, 0.7)" },
                ],
              }}
              options={{ responsive: true, plugins: { legend: { position: "top" } } }}
            />
          </div>

          <div className="chart-box">
            <h2 className="chart-title">Prix des produits par région</h2>
            <Line
              data={{
                labels: ["Atsimo Atsinanana", "Atsimo Andrefana", "Vatovavy", "Fitovinany", "Anosy", "Androy", "Toliara"],
                datasets: [
                  { label: "Riz", data: [3000, 3200, 3100, 3300, 3400, 3600, 3500], borderColor: "rgba(255, 99, 132, 1)", fill: false },
                  { label: "Manioc", data: [1500, 1600, 1550, 1650, 1700, 1750, 1800], borderColor: "rgba(54, 162, 235, 1)", fill: false },
                  { label: "Patate", data: [2000, 2100, 2050, 2150, 2200, 2300, 2500], borderColor: "rgba(255, 206, 86, 1)", fill: false },
                  { label: "Huile", data: [5000, 5100, 5200, 5300, 5400, 5500, 5600], borderColor: "rgba(75, 192, 192, 1)", fill: false },
                ],
              }}
              options={{ responsive: true, plugins: { legend: { position: "top" } } }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default FoodPricesChart;
