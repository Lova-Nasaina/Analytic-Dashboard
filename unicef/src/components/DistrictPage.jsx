import React from 'react';

const DistrictPage = () => {
  return (
    <div className="district-list">
    <h3>Districts par catégorie</h3>
    <ul>
      {districts.filter(d => !selectedCategory || d.category === selectedCategory).map((district, index) => (
        <li key={index} style={{ color: getCategoryColor(district.category) }}>
          <strong>{district.district}</strong> - {district.category} - {district.malnutrition}% de malnutrition
        </li>
      ))}
    </ul>
  </div>
    
  );
};

export default DistrictPage;
