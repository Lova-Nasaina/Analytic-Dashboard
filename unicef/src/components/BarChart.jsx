import { useEffect, useState } from "react";
import MapComponent from "./MapComponent";

const BarChart = () => {
  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/districts") 
      .then((response) => response.json())
      .then((data) => setDistricts(data))
      .catch((error) => console.error("Erreur de chargement des données:", error));
  }, []);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div style={{ width: "35%", padding: "20px", backgroundColor: "#f8f9fa" }}>
        <h2 style={{ textAlign: "center" }}>Taux de Malnutrition par Région</h2>
        <BarChart data={districts} />
      </div>
      <div style={{ flex: 1 }}>
        <MapComponent />
      </div>
    </div>
  );
};

export default BarChart;
