import { useState } from "react";
import RegionsButton from "./RegionsButton";
import MaladieChart from "./MaladieChart";

const appR = () => {
  const [selectedRegion, setSelectedRegion] = useState(null);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Statistiques des Maladies</h1>
      <RegionsButton onSelectRegion={setSelectedRegion} />
      <div className="mt-6">
        <MaladieChart regionId={selectedRegion} />
      </div>
    </div>
  );
};

export default appR;
