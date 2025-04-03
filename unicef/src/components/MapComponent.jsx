// src/components/MapComponent.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { MapContainer, TileLayer, GeoJSON, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Données des districts avec malnutrition
const districts = [
  { region: "Atsimo-Atsinanana", district: "Farafangana", coords: [-22.8, 47.83], malnutrition: 20, category: "CRENI" },
  { region: "Atsimo-Atsinanana", district: "Midongy-Sud", coords: [-23.0, 47.0], malnutrition: 18, category: "CRENAS" },
  { region: "Atsimo-Atsinanana", district: "Vangaindrano", coords: [-23.35, 47.6], malnutrition: 22, category: "CRENAM" },
  { region: "Vatovavy", district: "Mananjary", coords: [-21.2167, 48.3333], malnutrition: 15, category: "CRENI" },
  { region: "Vatovavy", district: "Nosy Varika", coords: [-20.5833, 48.5333], malnutrition: 13, category: "CRENAS" },
  { region: "Vatovavy", district: "Ifanadiana", coords: [-21.3, 47.6333], malnutrition: 14, category: "CRENAM" },
  { region: "Fitovinany", district: "Manakara", coords: [-22.1333, 48.0167], malnutrition: 17, category: "CRENI" },
  { region: "Fitovinany", district: "Vohipeno", coords: [-22.4, 47.7833], malnutrition: 16, category: "CRENAS" },
  { region: "Fitovinany", district: "Ikongo", coords: [-21.8833, 47.4333], malnutrition: 19, category: "CRENAM" },
];

const MapComponent = () => {
  const [geoData, setGeoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://votre-serveur.com/api/regions") // Remplacez par votre URL d'API
      .then((response) => {
        setGeoData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur lors du chargement des données:", err);
        setError("Impossible de récupérer les données");
        setLoading(false);
      });
  }, []);

  // Définition des couleurs par catégorie
  const getCategoryColor = (category) => {
    switch (category) {
      case "CRENI":
        return "red";
      case "CRENAS":
        return "orange";
      case "CRENAM":
        return "green";
      default:
        return "blue";
    }
  };

  // Définition des icônes personnalisées pour les districts
  const createCustomIcon = (color) => {
    return L.divIcon({
      className: "custom-icon",
      html: `<div style="background-color:${color}; width:12px; height:12px; border-radius:50%;"></div>`,
      iconSize: [12, 12],
    });
  };

  // Style des polygones pour les régions
  const regionStyle = {
    color: "blue",
    weight: 2,
    opacity: 1,
    fillOpacity: 0.3,
  };

  // Fonction pour ajouter un popup aux régions
  const onEachRegion = (feature, layer) => {
    if (feature.properties && feature.properties.name) {
      const { name, maladieA, maladieB, maladieC } = feature.properties;
      layer.bindPopup(
        `<strong>${name}</strong><br/>Maladie A: ${maladieA}<br/>Maladie B: ${maladieB}<br/>Maladie C: ${maladieC}`
      );
    }
  };

  if (loading) return <p>Chargement de la carte...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <MapContainer center={[-21.5, 47.5]} zoom={6} style={{ height: "100vh", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* Affichage des polygones des régions */}
      {geoData && <GeoJSON data={geoData} style={regionStyle} onEachFeature={onEachRegion} />}

      {/* Affichage des marqueurs des districts */}
      {districts.map((district, index) => (
        <Marker key={index} position={district.coords} icon={createCustomIcon(getCategoryColor(district.category))}>
          <Popup>
            <strong>{district.district}</strong><br />
            Région: {district.region}<br />
            Malnutrition: {district.malnutrition}%<br />
            Catégorie: {district.category}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
