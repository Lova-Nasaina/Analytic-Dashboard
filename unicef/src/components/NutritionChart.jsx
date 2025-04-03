import React, { useEffect, useState } from "react";
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
  Legend,
} from "chart.js";
import "./NutritionPage.css";
import Navbar from "./navbar";
import Sidebar from "./layout/Sidebar";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);




const NutritionPage = () => {
  

  // Génération aléatoire des données nutritionnelles pour chaque district
  const nutritionData = {};
  // Object.keys(regionsWithDistricts).forEach((region) => {
  //   regionsWithDistricts[region].forEach((district) => {
  //     nutritionData[district] = {
  //       "2021": {
  //         "Sous-nutrition": 100,
  //       },
  //       "2022": {
  //         "Sous-nutrition": 129,
  //       },
  //       "2023": {
  //         "Sous-nutrition": 170,
  //       },
  //     };
  //   });
  // });

  // États de sélection
  const [visibleRegion, setVisibleRegion] = useState(null);
  const [visibleDistrict, setVisibleDistrict] = useState('Bekily');
  const [selectedYear, setSelectedYear] = useState("2023");
  const [chartType, setChartType] = useState("line");
  const [regionsWithDistricts, setRegions] = useState("");
  const [districtData, setDistrictData] = useState(null);
  const [districtDataCrenis, setDistrictDataCrenis] = useState(null);

  const handleYearChange = (year) => {
    setSelectedYear(year);
  };

// ici recuperation des données
 // Récupérer la liste des régions et districts au chargement du composant
  useEffect(() => {
    fetch('http://localhost:8000/regionNut')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setRegions(data);
      })
      .catch(error => console.error("Erreur lors de la récupération des régions :", error));
  }, []);

  // Récupérer les données pour le district sélectionné
 
 // Récupérer les données du district sélectionné via FastAPI
 useEffect(() => {
  if (visibleDistrict) {
    fetch(`http://localhost:8000/district/crenas/${visibleDistrict}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Données pour le district :", data);
        setDistrictData(data);
      })
      .catch((error) =>
        console.error(
          "Erreur lors de la récupération des données pour le district :",
          error
        )
      );
  }
}, [visibleDistrict]);

 useEffect(() => {
  if (visibleDistrict) {
    fetch(`http://localhost:8000/district/crenis/${visibleDistrict}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Données pour le district :", data);
        setDistrictDataCrenis(data);
      })
      .catch((error) =>
        console.error(
          "Erreur lors de la récupération des données pour le district :",
          error
        )
      );
  }
}, [visibleDistrict]);




  if (!regionsWithDistricts) return <p>Chargement des données...</p>;

  // Préparation des données pour le graphique
  const getChartData = () => {
    if (!visibleDistrict || !districtData || !districtData[selectedYear] ) return null;


   console.log('visibilDist :', visibleDistrict, ' | selectYear : ', selectedYear);
   
   const monthsOrdered = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
   const dataSet = monthsOrdered.map(
      (m) => districtData[selectedYear][m] || 0
   );
  //  const dataSet2 = monthsOrdered.map(
  //     (m) => districtDataCrenis[selectedYear][m] || 0
  //  );

  const dataSet2 = (districtDataCrenis && districtDataCrenis[selectedYear])
  ? monthsOrdered.map((m) => districtDataCrenis[selectedYear][m] || 0)
  : monthsOrdered.map(() => 0);

  console.log(" dataSet2 :  ",dataSet2);
     

    return {
      labels: [
        "Jan", "Fév", "Mar", "Avr", "Mai", "Juin",
        "Juil", "Août", "Sep", "Oct", "Nov", "Déc"
      ],
      datasets: [
        {
          label: "Total Admission",
          data: dataSet,
          borderColor: "#e74c3c",
          backgroundColor: "rgba(231, 76, 60, 0.3)",
          tension: 0.4,
          fill: true,
          borderWidth: 3,
          pointRadius: 4,
        },
        {
          label: "Obésité",
          data: dataSet2,
          borderColor: "#2980b9",
          backgroundColor: "rgba(41, 128, 185, 0.3)",
          tension: 0.4,
          fill: true,
          borderWidth: 3,
          pointRadius: 4,
        },
      ],
    };
  };

  return (
    <>
    <Navbar/>
    
    <div className="nutrition-container">
      <div className="side-by-side">
        


        <Sidebar regionsWithDistricts={regionsWithDistricts} visibleRegion={visibleRegion} visibleDistrict={visibleDistrict} setVisibleDistrict={setVisibleDistrict} setVisibleRegion={setVisibleRegion}/>

        <div className="chart-panel">
          {visibleDistrict && getChartData() ? (
            <div className="chart-and-card">
              {/* Carte d'informations du district */}
              <div className="district-card">
                <h3>Détails du District</h3>
                <p><strong>Région :</strong> {visibleRegion}</p>
                <p><strong>District :</strong> {visibleDistrict}</p>
                <p>
                  <strong>Total {selectedYear} :</strong> {" "}
                  {districtData &&
                      districtData[selectedYear] &&
                      Object.values(districtData[selectedYear]).reduce(
                        (acc, val) => acc + val,
                        0
                      )}
                </p>
      
              </div>

              <div className="chart-wrapper-container">
                {/* Contrôles bien positionnés au-dessus du graphique */}
                <div className="controls">
                  <div className="year-buttons">
                    {["2021", "2022", "2023"].map((year) => (
                      <button
                        key={year}
                        onClick={() => handleYearChange(year)}
                        className={selectedYear === year ? "selected" : ""}
                      >
                        {year}
                      </button>
                    ))}
                  </div>
                  <div className="chart-type-buttons">
                    <button
                      onClick={() => setChartType("line")}
                      className={chartType === "line" ? "selected" : ""}
                    >
                      Graphique Linéaire
                    </button>
                    <button
                      onClick={() => setChartType("bar")}
                      className={chartType === "bar" ? "selected" : ""}
                    >
                      Graphique à Barres
                    </button>
                  </div>
                </div>

                <div className="chart-wrapper">
                  {chartType === "line" ? (
                    <Line
                      data={getChartData()}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          title: {
                            display: true,
                            text: "Taux de nutrition",
                            font: { size: 18, weight: "bold" },
                          },
                          tooltip: {
                            backgroundColor: "rgba(0, 0, 0, 0.8)",
                            titleFont: { size: 14, weight: "bold" },
                            bodyFont: { size: 12 },
                          },
                        },
                        scales: {
                          x: {
                            ticks: { font: { size: 12 } },
                            title: {
                              display: true,
                              text: "Mois",
                              font: { size: 14, weight: "bold" },
                            },
                          },
                          y: {
                            ticks: { font: { size: 12 }, beginAtZero: true },
                            title: {
                              display: true,
                              text: "Taux (%)",
                              font: { size: 14, weight: "bold" },
                            },
                          },
                        },
                      }}
                    />
                  ) : (
                    <Bar
                      data={getChartData()}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          title: {
                            display: true,
                            text: "Taux de nutrition",
                            font: { size: 18, weight: "bold" },
                          },
                          tooltip: {
                            backgroundColor: "rgba(0, 0, 0, 0.8)",
                            titleFont: { size: 14, weight: "bold" },
                            bodyFont: { size: 12 },
                          },
                        },
                        scales: {
                          x: {
                            ticks: { font: { size: 12 } },
                            title: {
                              display: true,
                              text: "Mois",
                              font: { size: 14, weight: "bold" },
                            },
                          },
                          y: {
                            ticks: { font: { size: 12 }, beginAtZero: true },
                            title: {
                              display: true,
                              text: "Taux (%)",
                              font: { size: 14, weight: "bold" },
                            },
                          },
                        },
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          ) : (
         <div className="regions"></div>
          )}
        </div>
      </div>
    </div>
    </>
  );
};

export default NutritionPage;
