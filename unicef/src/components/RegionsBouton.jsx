import React, { useState, useEffect } from "react";
import { Doughnut, Line } from "react-chartjs-2"; 
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
  ArcElement, 
} from "chart.js";
import "./RegionsBoutton.css"; 

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement 
);

// Importation du fichier JSON
import diseaseData from "../data/data.json"; // 📌 Importation du JSON
import Navbar from "./Navbar";

const RegionsButton = () => {
  const [selectedYear, setSelectedYear] = useState("2023");
  const [block, setBlock] = useState({});
  const [general, setGeneral] = useState(null);
  const [palu, setPalu] = useState(null);
  const [diarr, setDiarr] = useState(null);
  const [IRA, setIRA] = useState(null);
  const [dataregion, setDataregion] = useState();

  useEffect(() => {
    fetch(`http://localhost:8000/data/${selectedYear}`)
      .then( (response) => {
          return response.json();
      } )
      .then( (data) => {
          console.log(data);
          setBlock(data);
      })
      .catch( (error) => {
        console.error("Error lors du fetch", error);
      } )
  }, [selectedYear])


  
  
  if (!block.Generale || !Array.isArray(block.tableau)) return <p>Chargement des données...</p>;

  
  const generalData = [
    { name: "Palu", value: block.Generale.Palu || 0 },
    { name: "Diarrhée", value: block.Generale.Diarrhée || 0 },
    { name: "IRA", value: block.Generale.IRA || 0 },
  ];

  generalData.forEach(data => {
    console.log(data.name, ' | ', data.value);
    
  });

  // Données régionales
  const regionalData = block.tableau.map((region) => ({
    region: region.LIBELLE_REGION,
    Palu: region.Palu || 0,
    Diarrhée: region.Diarrhée || 0,
    IRA: region.IRA || 0,
  }));

  
  console.log("generaleData : ", generalData);
  console.log("regionalData : ", regionalData);
  
  const { paludisme, diarrhee, ira } = {
      paludisme: generalData[0].value,
      diarrhee: generalData[1].value,
      ira: generalData[2].value
    };

  
  const doughnutData = {
    labels: ["Paludisme", "Diarrhée", "IRA"],
    datasets: [
      {
        data: [paludisme, diarrhee, ira], // Les taux généraux
        backgroundColor: ["#FF5733", "#00A7E1", "#50C878"],
        borderWidth: 1,
      },
    ],
  };

  function getLabel() {
    var tab = []
    regionalData.forEach(element => {
      tab.push(element.region)
    });
    return tab;
  }

  function getMaladie(maladie) {
    var tab = [];
    regionalData.forEach(element => {
      tab.push(element[maladie]);
    });
    return tab;
  }

  console.log("test kely : ", diseaseData["Toliara"]?.[selectedYear]?.Paludisme);
  
  
  const lineData = {
    labels: getLabel(),
    datasets: [
      {
        label: "Paludisme",
        data: getMaladie('Palu'),
        borderColor: "#FF5733",
        backgroundColor: "rgba(255, 87, 51, 0.2)",
        fill: true,
      },
      {
        label: "IRA",
        data: getMaladie('IRA'),
        borderColor: "#50C878",
        backgroundColor: "rgba(80, 200, 120, 0.2)",
        fill: true,
      },
      {
        label: "Diarrhée",
        data: getMaladie('Diarrhée'),
        borderColor: "#00A7E1",
        backgroundColor: "rgba(0, 167, 225, 0.2)",
        fill: true,
      },
    ],
  };

  return (
    <>
      <Navbar />

       { block && <div className="disease-cards">
        <div className="card">
          <h3>Paludisme</h3>
          <p>Nombre de cas : {paludisme}</p>
        </div>
        <div className="card">
          <h3>Diarrhée</h3>
          <p>Nombre de cas : {diarrhee}</p>
        </div>
        <div className="card">
          <h3>IRA</h3>
          <p>Nombre de cas : {ira}</p>
        </div>
      </div>}

      <div className="charts-containers">
        <div className="line-chart-container">
          <h3>Évolution des Maladies par Région </h3>
          <select onChange={(e) => setSelectedYear(e.target.value)} className="years" value={selectedYear}>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
          </select>
          <Line data={lineData} />
        </div>
        
        <div className="doughnut-chart-container">
          <h3>Répartition des maladies</h3>
          <Doughnut data={doughnutData} />
        </div>
        </div>
    </>
  );
};

export default RegionsButton;
