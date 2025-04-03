import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <header className="navbar">
      {/* Titre du Navbar avec icône UNICEF */}
      <div className="navbar-title">
        <img src="../../public/u.png" alt="UNICEF" className="navbar-logo"  />
      </div>

      {/* Zone des boutons */}
      <nav className="navbar-menu">
        <ul className="navbar-list">
          <li>
            <a href="/LoginPage">
              <span>Admin</span>
            </a>
          </li>

          <li>
            <a href="/NutritionChart">
              <span>Nutrition</span>
            </a>
          </li>

          <li>
            <a href="/RegionsBouton">
              <span>Maladie</span>
            </a>
          </li>

          <li>
            <a href="/FoodPricesChart">
              <span>Prix</span>
            </a>
          </li>

          <li>
            <a href="/CreniStatsChart">
              <span>Creni</span>
            </a>
          </li>

          <li>
            <a href="/CrenasStatsChart">
              <span>Crenas</span>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
