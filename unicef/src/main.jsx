
// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import LoginPage from "./components/LoginPage";
import AdminDashboard from "./components/AdminDashboard"; // Crée cette page pour l'admin après connexion
import NutritionChart from "./components/NutritionChart";
import RegionsBouton from './components/RegionsBouton';
import FoodPricesChart from "./components/FoodPricesChart";
import CrenasStatsChart from "./components/CrenasStatsChart";
import "./index.css";
import CreniStatsChart from "./components/creniStatsChart";


ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/LoginPage" element={<LoginPage />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/NutritionChart" element={<NutritionChart />} />
      <Route path="/RegionsBouton" element={<RegionsBouton/>} />
      <Route path="/FoodPricesChart" element={<FoodPricesChart/>} />
      <Route path="/CreniStatsChart" element={<CreniStatsChart/>} />
      <Route path="/CrenasStatsChart" element={<CrenasStatsChart/>} />
    </Routes>
  </Router>
  
);
