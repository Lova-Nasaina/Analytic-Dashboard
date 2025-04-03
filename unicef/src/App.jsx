import React from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import "./App.css";

const App = () => {
  return (
    <div className="app">
   
      <div className="main-container">

        <Navbar />
        <Dashboard />
      </div>
    </div>
    
  );
};

export default App;

