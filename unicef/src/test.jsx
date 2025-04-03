import React, { useState } from 'react';

// Exemple de dataset (en réalité vous le chargerez depuis une API ou un fichier)
const dataset = [
  { periode: '2020-01-01', region: 'Anosy', district: 'Amboasary Sud', tot_adm_proj: null, tot_adm: 200, tot_sortie: 43, tot_gueri: 34, tot_deces: 0, tot_abandon: 9, tot_autres_sorties: 8, annee: 2020, moi: 1 },
  { periode: '2020-01-01', region: 'Anosy', district: 'Taolagnaro', tot_adm_proj: null, tot_adm: 73, tot_sortie: 32, tot_gueri: 19, tot_deces: 1, tot_abandon: 12, tot_autres_sorties: 4, annee: 2020, moi: 1 },
  { periode: '2020-01-01', region: 'Anosy', district: 'Amboasary Sud', tot_adm_proj: null, tot_adm: 200, tot_sortie: 43, tot_gueri: 34, tot_deces: 0, tot_abandon: 9, tot_autres_sorties: 8, annee: 2020, moi: 1 },
  { periode: '2020-01-01', region: 'Anosy', district: 'Taolagnaro', tot_adm_proj: null, tot_adm: 73, tot_sortie: 32, tot_gueri: 19, tot_deces: 1, tot_abandon: 12, tot_autres_sorties: 4, annee: 2020, moi: 1 },
  { periode: '2020-01-01', region: 'Anosy', district: 'Amboasary Sud', tot_adm_proj: null, tot_adm: 200, tot_sortie: 43, tot_gueri: 34, tot_deces: 0, tot_abandon: 9, tot_autres_sorties: 8, annee: 2020, moi: 1 },
  { periode: '2020-01-01', region: 'Anosy', district: 'Taolagnaro', tot_adm_proj: null, tot_adm: 73, tot_sortie: 32, tot_gueri: 19, tot_deces: 1, tot_abandon: 12, tot_autres_sorties: 4, annee: 2020, moi: 1 },
  
];

function App2() {
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  // Regroupement des données par région et districts uniques
  const regions = dataset.reduce((acc, curr) => {
    if (!acc[curr.region]) {
      acc[curr.region] = [];
    }
    if (!acc[curr.region].includes(curr.district)) {
      acc[curr.region].push(curr.district);
    }
    return acc;
  }, {});

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar regions={regions} onSelectDistrict={setSelectedDistrict} />
      <Content district={selectedDistrict} data={dataset} />
    </div>
  );
}

function Sidebar({ regions, onSelectDistrict }) {
  return (
    <div style={{ width: '300px', borderRight: '1px solid #ccc', padding: '10px' }}>
      {Object.keys(regions).map(region => (
        <div key={region}>
          <h3>{region}</h3>
          <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
            {regions[region].map(district => (
              <li
                key={district}
                onClick={() => onSelectDistrict(district)}
                style={{ cursor: 'pointer', margin: '5px 0' }}
              >
                {district}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function Content({ district, data }) {
  if (!district) return <div style={{ padding: '20px' }}>Sélectionnez un district dans le menu latéral</div>;

  // Filtrer les données pour le district sélectionné
  const filteredData = data.filter(item => item.district === district);

  // Regrouper les données par année puis par mois
  const groupedData = filteredData.reduce((acc, curr) => {
    const { annee, moi } = curr;
    if (!acc[annee]) {
      acc[annee] = {};
    }
    // Si vous avez plusieurs entrées pour le même mois, vous pouvez les sommer ou les traiter différemment
    acc[annee][moi] = curr;
    return acc;
  }, {});

  return (
    <div style={{ padding: '20px', flex: 1 }}>
      <h2>Données pour le district : {district}</h2>
      {Object.keys(groupedData).map(year => (
        <div key={year}>
          <h3>Année : {year}</h3>
          <table border="1" cellPadding="5" style={{ borderCollapse: 'collapse', width: '100%' }}>
            <thead>
              <tr>
                <th>Mois</th>
                <th>tot_adm_proj</th>
                <th>tot_adm</th>
                <th>tot_sortie</th>
                <th>tot_gueri</th>
                <th>tot_deces</th>
                <th>tot_abandon</th>
                <th>tot_autres_sorties</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(groupedData[year]).map(month => (
                <tr key={month}>
                  <td>{month}</td>
                  <td>{groupedData[year][month].tot_adm_proj}</td>
                  <td>{groupedData[year][month].tot_adm}</td>
                  <td>{groupedData[year][month].tot_sortie}</td>
                  <td>{groupedData[year][month].tot_gueri}</td>
                  <td>{groupedData[year][month].tot_deces}</td>
                  <td>{groupedData[year][month].tot_abandon}</td>
                  <td>{groupedData[year][month].tot_autres_sorties}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

export default App2;
