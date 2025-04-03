import React, { useState } from "react";
import { Doughnut, Bar, Line } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend, PointElement, LineElement } from "chart.js";
import "./Dashboard.css";
import diseaseData from "../data/data.json";
import Navbar from "./navbar";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend, PointElement, LineElement);

const Dashboard = () => {
  const [selectedYear, setSelectedYear] = useState("2023");
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  const districts = [
    "Atsimo Atsinanana",
    "Atsimo Andrefana",
    "Vatovavy",
    "Fitovinany",
    "Anosy",
    "Androy",
    "Toliara",
  ];

  const districtCoordinates = {
    "Atsimo Atsinanana": [-23.0661, 47.0371],
    "Atsimo Andrefana": [-23.5501, 43.7756],
    "Vatovavy": [-21.8233, 47.6167],
    "Fitovinany": [-21.0833, 47.45],
    "Anosy": [-25.0505, 46.9249],
    "Androy": [-25.0289, 46.3083],
    "Toliara": [-23.3501, 43.6667],
  };

  const getDistrictRates = (district, year) => {
    const defaultRates = { creni: 10, crenas: 12, crenam: 15 };
    if (!diseaseData[district] || !diseaseData[district][year]) return defaultRates;
    const data = diseaseData[district][year];
    return {
      creni: data.Creni || defaultRates.creni,
      crenas: data.Crenas || defaultRates.crenas,
      crenam: data.Crenam || defaultRates.crenam,
    };
  };

  const getDoughnutChartData = (district) => {
    const data = getDistrictRates(district, selectedYear);
    return {
      labels: ["Creni", "Crenas", "Crenam"],
      datasets: [
        {
          data: [data.creni, data.crenas, data.crenam],
          backgroundColor: ["#94CE9A", "#FFFAB8", "#EB8E90"],
          borderWidth: 1,
        },
      ],
    };
  };
  const labels = ['region1', 'region2', 'region3', 'region4', 'region5', 'region6'];
  const barChartData = {
    labels,
    datasets: [
      
      {
        label: 'CRENIS',
        data: [25, 35, 45, 55, 65, 60, 70],
        backgroundColor: '#90caf9',
        borderRadius: 4,
        barThickness: 10,
      },
      {
        label: 'CRENAM',
        data: [25, 35, 45, 55, 65, 60, 70],
        backgroundColor: '#10caf2',
        borderRadius: 4,
        barThickness: 10,
      },
      {
        label: 'CRENAS',
        data: [30, 20, 50, 40, 60, 70, 80],
        backgroundColor: '#2196f3',
        borderRadius: 4, 
        barThickness: 10,
      },
    ],
  };
   

  
const optionsChartData = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top', // Position de la légende
      labels: {
        color: '#333', // Couleur du texte de la légende
      },
    },
    title: {
      display: true,
      color: '#333',
      font: {
        size: 18,
        weight: 'bold',
      },
    },
  },
  scales: {
    x: {
      grid: {
        display: false, // Masquer la grille verticale de l'axe X
      },
      ticks: {
        color: '#333', // Couleur du texte de l'axe X
        font: {
          size: 12,
        },
      },
    },
    y: {
      grid: {
        display: true,
        color: '#f0f0f0', // Couleur de la grille horizontale
      },
      ticks: {
        color: '#333', // Couleur du texte de l'axe Y
        font: {
          size: 12,
        },
      },
    },
  },
}

  const lineChartData = {
    labels: ["2021", "2022", "2023"],
    datasets: [
      { label: "Creni", data: [10, 12, 14], borderColor: "#ff6384", fill: false },
      { label: "Crenas", data: [15, 18, 20], borderColor: "#36a2eb", fill: false },
      { label: "Crenam", data: [8, 10, 13], borderColor: "#4bc0c0", fill: false },
    ],
  };

  const handleDistrictClick = (district) => {
    setSelectedDistrict(district); // Met à jour le district sélectionné
  };

  return (
    <>
      <Navbar />
      <div className="charts-container">
        <div className="left-container">
          {selectedDistrict ? (
            <>
              <div className="doughnut-charts">
                <div className="doughnuts">
                  <h3>Taux de Creni - {selectedDistrict}</h3>
                  <Doughnut data={getDoughnutChartData(selectedDistrict)} />
                </div>
                <div className="doughnuts">
                  <h3>Taux de Crenas - {selectedDistrict}</h3>
                  <Doughnut data={getDoughnutChartData(selectedDistrict)} />
                </div>
                <div className="doughnuts">
                  <h3>Taux de Crenam - {selectedDistrict}</h3>
                  <Doughnut data={getDoughnutChartData(selectedDistrict)} />
                </div>
              </div>
              
                {/* <Bar data={barChartData} options={{ responsive: true, plugins: { legend: { position: "top" } } }} /> */}
               <div className="bar-containt">
                <div className="chart-header-bar">
                    <h3>Statistique Annuel</h3>
                  <div className="chart-controlls">
                    <select >
                      <option value="">Annee</option>
                      <option value="">2021</option>
                      <option value="">2022</option>
                      <option value="">2023</option>
                    </select>
                  </div>
              </div>
              <Bar data={barChartData} options={optionsChartData} />
              </div>
              
            </>
          ) : (
            <div className="info">
              <h3>Veuillez sélectionner un district sur la carte</h3>
            </div>
          )}
        </div>

        <div className="right-container">
          <MapContainer center={[-18.7669, 46.8691]} zoom={6} style={{ height: "310px", width: "610px", marginBottom: "3%" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {districts.map((district) => {
              const coords = districtCoordinates[district];
              return (
                <Marker position={coords} key={district} eventHandlers={{ click: () => handleDistrictClick(district) }}>
                  <Popup>{district}</Popup>
                </Marker>
              );
            })}
          </MapContainer>

          <div className="line">
            <Line data={lineChartData} options={{ responsive: true, plugins: { legend: { position: "top" } } }} />
            
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
