import React from "react";
import { FaVirus, FaChild, FaAppleAlt, FaMoneyBillWave } from "react-icons/fa"; // Assurez-vous que ceci est bien importé
import "./admin-dashboard.css";

const AdminDashboard = () => {
  
  const tauxPaludisme = "10%"; // Taux de Paludisme
  const tauxDiarrhee = "5%"; // Taux de Diarrhée
  const tauxIRA = "7%"; // Taux d'IRA
  const tauxCRENI = "30%"; // Taux de CRENI
  const tauxCRENAS = "12%"; // Taux de CRENAS
  const tauxCRENAM = "8%"; // Taux de CRENAM
  const tauxSousNutrition = "15%"; // Taux de Sous-nutrition
  const tauxFamine = "5%"; // Taux de Famine (Kéré)
  const tauxKere = "4%"; // Taux de Kéré
  const tauxNutrition = "10%"; // Taux de nutrition
  const tauxRiz = "3000 MGA"; // Prix du Riz
  const tauxManioc = "2500 MGA"; // Prix du Manioc
  const tauxPatate = "2000 MGA"; // Prix de la Patate

  return (
    <div className="dashboard-container">
      {/* Navbar */}
      <header className="navbar">
        {/* Titre du Navbar avec icône UNICEF */}
        <div className="navbar-title">
          <img src="../../public/u.png" alt="UNICEF" className="navbar-logo" />
        </div>

        {/* Zone des boutons */}
        <nav className="navbar-menu">
          <ul className="navbar-list">
            <li>
              <a href="/Dashboard">
                <span>Acceuil</span>
              </a>
            </li>

            <li>
              <a href="/NutritionChart">
                <span>Statistique</span>
              </a>
            </li>

            <li>
              <a href="/RegionsBouton">
                <span>Utilisateur</span>
              </a>
            </li>

            <li>
              <a href="/Dashboard">
                <span>Déconnexion</span>
              </a>
            </li>
          </ul>
        </nav>
      </header>

      {/* Main content */}
      <div className="main-content">
        {/* 4 Frames Section */}
        <div className="frames-container">
          {/* Cadre Maladies */}
          <div className="frame">
            <FaVirus size={50} color="#ff6347" /> {/* Icône Maladies */}
            <h3>Maladies</h3>
            <p>Paludisme: {tauxPaludisme}</p> {/* Affichage du taux de Paludisme */}
            <p>Diarrhée: {tauxDiarrhee}</p> {/* Affichage du taux de Diarrhée */}
            <p>IRA: {tauxIRA}</p> {/* Affichage du taux d'IRA */}
          </div>
          
          {/* Cadre Malnutrition */}
          <div className="frame">
            <FaChild size={50} color="#f39c12" /> {/* Icône Malnutrition */}
            <h3>Malnutrition</h3>
            <p>CRENI: {tauxCRENI}</p> {/* Affichage du taux de CRENI */}
            <p>CRENAS: {tauxCRENAS}</p> {/* Affichage du taux de CRENAS */}
            <p>CRENAM: {tauxCRENAM}</p> {/* Affichage du taux de CRENAM */}
          </div>
          
          {/* Cadre Nutrition */}
          <div className="frame">
            <FaAppleAlt size={50} color="#2ecc71" /> {/* Icône Nutrition */}
            <h3>Nutrition</h3>
            <p>Famine: {tauxFamine}</p> {/* Affichage du taux de Famine */}
            <p>Sous-nutrition: {tauxSousNutrition}</p> {/* Affichage du taux de Sous-nutrition */}
            <p>Kéré: {tauxKere}</p> {/* Affichage du taux de Kéré */}
          </div>
          
          {/* Cadre Prix général */}
          <div className="frame">
            <FaMoneyBillWave size={50} color="#3498db" /> {/* Icône Prix général */}
            <h3>Prix général</h3>
            <p>Riz: {tauxRiz}</p> {/* Affichage du prix du Riz */}
            <p>Manioc: {tauxManioc}</p> {/* Affichage du prix du Manioc */}
            <p>Patate: {tauxPatate}</p> {/* Affichage du prix de la Patate */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
