// src/pages/LoginPage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Utilisation de React Router pour la navigation
import "./LoginPage.css";
import Navbar from "./navbar";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Permet de rediriger après la connexion

  const handleLogin = (e) => {
    e.preventDefault();

    // Ajouter la logique de connexion ici (pour la démo, on va faire une vérification simple)
    if (username === "admin" && password === "admin123") {
      navigate("/admin-dashboard"); // Rediriger vers le tableau de bord admin
    } else {
      setError("Nom d'utilisateur ou mot de passe incorrect");
    }
  };

  return (
    <>
      <Navbar/>
    <div className="login-container">
      <h2>LOGIN</h2>
      <form onSubmit={handleLogin} className="login-form">
        <div className="form-group">
          <label htmlFor="username">Nom d'utilisateur</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div><br />
        {error && <p className="error">{error}</p>}
        <button type="submit">Se connecter</button>
      </form><br />
    </div>
    </>
  );
};

export default LoginPage;
