import React, { useState } from "react";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import "./RegionsBoutton.css";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const ClimatRegions = () => {
  const regionsWithDistricts = {
    "Atsimo-Atsinanana": ["Manakara", "Vohipeno", "Farafangana", "Vangaindrano"],
    "Atsimo-Andrefana": ["Toliara", "Sakaraha", "Betioky", "Ampanihy"],
    "Anosy": ["Tolagnaro", "Amboasary", "Bekily", "Fianarantsoa"],
    "Androy": ["Ambovombe", "Beloha", "Tsihombe", "Bekily"],
    "Ihorombe": ["Ihosy", "Iakora", "Zazafotsy", "Sakapaly"],
    "Toliara": ["Morombe", "Ankazoabo", "Ambatolampy", "Soalara"]
  };

  const climatData = {};
  Object.keys(regionsWithDistricts).forEach(region => {
    regionsWithDistricts[region].forEach(district => {
      climatData[district] = {
        "2021": { Température: Math.random() * 15 + 20, Précipitations: Math.random() * 200 + 800 },
        "2022": { Température: Math.random() * 15 + 20, Précipitations: Math.random() * 200 + 800 },
        "2023": { Température: Math.random() * 15 + 20, Précipitations: Math.random() * 200 + 800 }
      };
    });
  });

  const [visibleRegion, setVisibleRegion] = useState(null);
  const [visibleDistrict, setVisibleDistrict] = useState(null);
  const [selectedYear, setSelectedYear] = useState("2023");
  const [chartType, setChartType] = useState("line");

  const toggleRegion = (region) => {
    setVisibleRegion(visibleRegion === region ? null : region);
    setVisibleDistrict(null);
  };

  const toggleDistrict = (district) => {
    setVisibleDistrict(visibleDistrict === district ? null : district);
  };

  const handleYearChange = (year) => {
    setSelectedYear(year);
  };

  const getChartData = () => {
    if (!visibleDistrict || !climatData[visibleDistrict]) return null;

    return {
      labels: ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sept", "Oct", "Nov", "Déc"],
      datasets: [
        {
          label: "Température (°C)",
          data: Array(12).fill(climatData[visibleDistrict][selectedYear].Température),
          borderColor: "#FF5733",
          backgroundColor: "rgba(255, 87, 51, 0.3)",
          tension: 0.4,
          fill: true,
          borderWidth: 3,
          pointRadius: 4,
        },
        {
          label: "Précipitations (mm)",
          data: Array(12).fill(climatData[visibleDistrict][selectedYear].Précipitations),
          borderColor: "#00A7E1",
          backgroundColor: "rgba(0, 167, 225, 0.3)",
          tension: 0.4,
          fill: true,
          borderWidth: 3,
          pointRadius: 4,
        }
      ]
    };
  };

  return (
    <div className="regions-container">
      <h2>🌍 Sélectionnez une région et un district</h2>
      <div className="region-list">
        {Object.keys(regionsWithDistricts).map((region, index) => (
          <div key={index} className="region-item">
            <button className="region-button" onClick={() => toggleRegion(region)}>
              {visibleRegion === region ? `🔽 Cacher ${region}` : `🔼 Voir ${region}`}
            </button>
            {visibleRegion === region && (
              <ul className="district-list">
                {regionsWithDistricts[region].map((district) => (
                  <li key={district} className="district-item">
                    <button className="district-button" onClick={() => toggleDistrict(district)}>
                      {visibleDistrict === district ? `📉 Cacher ${district}` : `📈 Voir ${district}`}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
      {visibleDistrict && getChartData() && (
        <div className="chart-container">
          <h3>📌 Région: {visibleRegion} | 📍 District: {visibleDistrict}</h3>
          <h4>📊 Climat à {visibleDistrict}</h4>
          <div className="controls">
            <div className="year-buttons">
              {["2021", "2022", "2023"].map((year) => (
                <button key={year} onClick={() => handleYearChange(year)} className={selectedYear === year ? "selected" : ""}>
                  {year}
                </button>
              ))}
            </div>
            <div className="chart-type-buttons">
              <button onClick={() => setChartType("line")} className={chartType === "line" ? "selected" : ""}>
                Graphique Linéaire
              </button>
              <button onClick={() => setChartType("bar")} className={chartType === "bar" ? "selected" : ""}>
                Graphique à Barres
              </button>
            </div>
          </div>
          <div className="chart-wrapper">
            {chartType === "line" ? <Line data={getChartData()} options={{ responsive: true, maintainAspectRatio: false }} /> : <Bar data={getChartData()} options={{ responsive: true, maintainAspectRatio: false }} />}
          </div>
        </div>
      )}
    </div>
  );
};

export default ClimatRegions;
