import React, { useState, useEffect } from "react";
import axios from 'axios';


const Sidebar = ({
  regions,
  onSelectDistrict,
  regionsWithDistricts,
  visibleRegion,
  visibleDistrict,
  setVisibleDistrict,
  setVisibleRegion,
}) => {
  console.log("visible dist : ", visibleDistrict);
  console.log("visible reg : ", visibleRegion);

  const toggleRegion = (region) => {
    setVisibleRegion(visibleRegion === region ? null : region);
    setVisibleDistrict(null);
  };

  const toggleDistrict = (district) => {
    //   console.log("diste : ", visibleDistrict);
    setVisibleDistrict(visibleDistrict === district ? null : district);
  };




  return (
    <div className="selection-panel">
      {Object.keys(regionsWithDistricts).map((region, index) => (
        <div key={index} className="region-item">
          <button
            className="region-button"
            onClick={() => toggleRegion(region)}
          >
            {visibleRegion === region
              ? `🔽 Cacher ${region}`
              : `🔼 Voir ${region}`}
          </button>
          {visibleRegion === region && (
            <ul className="district-list">
              {regionsWithDistricts[region].map((district) => (
                <li key={district} className="district-item">
                  <button
                    className="district-button"
                    onClick={() => toggleDistrict(district)}
                  >
                    {visibleDistrict === district
                      ? `📉 Cacher ${district}`
                      : `📈 Voir ${district}`}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
