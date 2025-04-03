import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend,
  PieChart, Pie, Cell
} from "recharts";
import Navbar from "./navbar";
import { FaRegChartBar, FaRegCircle, FaHospitalSymbol } from 'react-icons/fa'; // Importation des icônes

const COLORS = ["#ff6384", "#36a2eb", "#4bc0c0"]; // Palette de couleurs professionnelles

const dataBar = [
  { region: "Atsimo Atsinanana", décès: 10, guéris: 50, abandons: 5 },
  { region: "Atsimo Andrefana", décès: 15, guéris: 55, abandons: 10 },
  { region: "Vatovavy", décès: 8, guéris: 48, abandons: 7 },
  { region: "Fitovinany", décès: 12, guéris: 52, abandons: 9 },
  { region: "Anosy", décès: 9, guéris: 45, abandons: 8 },
  { region: "Androy", décès: 11, guéris: 49, abandons: 6 },
  { region: "Toliara", décès: 13, guéris: 53, abandons: 8 },
];

const regionData = {
  "Atsimo Atsinanana": [{ region: "Farafangana" }, { region: "Vangaindrano" }, { region: "Vondrozo" }],
  "Atsimo Andrefana": [{ region: "Toliara I" }, { region: "Toliara II" }, { region: "Betioky" }, { region: "Ampanihy" }],
  "Vatovavy": [{ region: "Mananjary" }, { region: "Nosy Varika" }, { region: "Ifanadiana" }],
  "Fitovinany": [{ region: "Manakara" }, { region: "Vohipeno" }, { region: "Ikongo" }],
  "Anosy": [{ region: "Tolagnaro" }, { region: "Amboasary Sud" }, { region: "Beloha" }],
  "Androy": [{ region: "Ambovombe" }, { region: "Tsihombe" }, { region: "Bekily" }, { region: "Beloha" }],
  "Toliara": [{ region: "Toliara I" }, { region: "Toliara II" }]
};

const regionPieData = {
  "Atsimo Atsinanana": [
    { name: "Décès", value: 10 },
    { name: "Guéris", value: 50 },
    { name: "Abandons", value: 5 }
  ],
  "Atsimo Andrefana": [
    { name: "Décès", value: 15 },
    { name: "Guéris", value: 55 },
    { name: "Abandons", value: 10 }
  ],
  "Vatovavy": [
    { name: "Décès", value: 8 },
    { name: "Guéris", value: 48 },
    { name: "Abandons", value: 7 }
  ],
  "Fitovinany": [
    { name: "Décès", value: 12 },
    { name: "Guéris", value: 52 },
    { name: "Abandons", value: 9 }
  ],
  "Anosy": [
    { name: "Décès", value: 9 },
    { name: "Guéris", value: 45 },
    { name: "Abandons", value: 8 }
  ],
  "Androy": [
    { name: "Décès", value: 11 },
    { name: "Guéris", value: 49 },
    { name: "Abandons", value: 6 }
  ],
  "Toliara": [
    { name: "Décès", value: 13 },
    { name: "Guéris", value: 53 },
    { name: "Abandons", value: 8 }
  ]
};

const CreniStatsChart = () => {
  const [selectedRegion, setSelectedRegion] = useState("Atsimo Atsinanana");

  const handleRegionChange = (e) => {
    setSelectedRegion(e.target.value);
  };

  const regionBarData = dataBar.filter(item => item.region === selectedRegion);
  const dataPieForSelectedRegion = regionPieData[selectedRegion] || [
    { name: "Décès", value: 25 },
    { name: "Guéris", value: 60 },
    { name: "Abandons", value: 15 }
  ];

  // Styles personnalisés
  const dropdownStyle = {
    position: 'relative',
    width: '100%',
    padding: '12px',
    fontSize: '18px',
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    cursor: 'pointer',
    borderRadius: '8px',
    backgroundColor: '#e3f2fd',
    border: '1px solid #90caf9',
    transition: 'background-color 0.3s ease',
    color:'#003362',
    textshadow: '0 0 10px rgba(21, 21, 21, 0.6)', 
  };

  const customOptionStyle = {
    padding: '10px 15px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    backgroundColor: '#e3f2fd',
    fontSize: '16px',
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    color:'#003362',
    textshadow: '0 0 10px rgba(21, 21, 21, 0.6)', 
  };

  const sectionStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '20px',
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    color:'#003362',
    textshadow: '0 0 90px rgba(21, 21, 21, 0.6)', 
    cursor: 'pointer',
  };

  const cardStyle = {
    textAlign: 'center',
    flex: 1,
    background: 'white',
    padding: '15px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    margin: '10px',
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    color:'#003362',
    textshadow: '0 0 90px rgba(21, 21, 21, 0.6)', 
  };

  // Icônes avec tailles et effets de survol améliorés
  const iconStyle = {
    fontSize: '2rem',
    color: '#ff6384',
    transition: 'transform 0.3s, color 0.3s',
  };

  const iconHoverStyle = {
    ...iconStyle,
    transform: 'scale(1.2)',
    color: '#36a2eb',
  };

  return (
    <>
      <Navbar />

      {/* Section des statistiques */}
      <div style={sectionStyle}>
        {['Taux d\'admission: 75%', 'Top de guérison: 80%', 'Top décès: 5%', 'Top abandon: 10%'].map((stat, index) => (
          <div key={index} style={cardStyle}>
            <h3>
              {/* Icônes ajoutées avec effets de survol */}
              {index === 0 && <FaHospitalSymbol style={iconStyle} onMouseEnter={(e) => e.target.style = iconHoverStyle} onMouseLeave={(e) => e.target.style = iconStyle} />}
              {index === 1 && <FaRegCircle style={iconStyle} onMouseEnter={(e) => e.target.style = iconHoverStyle} onMouseLeave={(e) => e.target.style = iconStyle} />}
              {index === 2 && <FaRegChartBar style={iconStyle} onMouseEnter={(e) => e.target.style = iconHoverStyle} onMouseLeave={(e) => e.target.style = iconStyle} />}
              {index === 3 && <FaRegChartBar style={iconStyle} onMouseEnter={(e) => e.target.style = iconHoverStyle} onMouseLeave={(e) => e.target.style = iconStyle} />}
              {stat.split(':')[0]}
            </h3>
            <p>{stat.split(':')[1]}</p>
          </div>
        ))}
      </div>

      {/* Section principale */}
      <div style={{ display: 'flex', gap: '20px', padding: '20px' }}>
        {/* Sélecteur de région */}
        <div style={cardStyle}>
          <label htmlFor="region-select">Choisissez une région :</label>
          <div style={dropdownStyle}>
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}>
              <select
                id="region-select"
                value={selectedRegion}
                onChange={handleRegionChange}
                style={{ backgroundColor: 'transparent', border: 'none', width: '70%' }}
              >
                {Object.keys(regionData).map((region) => (
                  <option key={region} value={region} style={customOptionStyle}>
                    {region}
                  </option>
                ))}
              </select>
            </motion.div>
          </div>
          <h4>Districts de {selectedRegion}</h4>
          <ul>
            {regionData[selectedRegion].map((district, index) => (
              <li key={index}>{district.region}</li>
            ))}
          </ul>
        </div>

        {/* Section des graphiques */}
        <div style={{ flex: 2, display: 'flex', gap: '20px' }}>
          {/* Graphique circulaire */}
          <div style={cardStyle}>
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}>
              <h3>Répartition Générale</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={dataPieForSelectedRegion} cx="50%" cy="50%" outerRadius={90} dataKey="value" label>
                    {dataPieForSelectedRegion.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </motion.div>
          </div>

          {/* Graphique en barres */}
          <div style={cardStyle}>
            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <h3>Comparaison par Région</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={regionBarData} margin={{ top: 20, right: 30, left: 50, bottom: 20 }}>
                  <XAxis dataKey="region" tick={{ fill: '#444', fontSize: 14 }} />
                  <YAxis tick={{ fill: '#444', fontSize: 14 }} />
                  <Tooltip contentStyle={{ backgroundColor: '#f9f9f9', borderRadius: '8px' }} />
                  <Legend verticalAlign="top" height={36} />
                  <Bar dataKey="décès" fill={COLORS[0]} radius={[6, 6, 0, 0]} />
                  <Bar dataKey="guéris" fill={COLORS[1]} radius={[6, 6, 0, 0]} />
                  <Bar dataKey="abandons" fill={COLORS[2]} radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreniStatsChart;
