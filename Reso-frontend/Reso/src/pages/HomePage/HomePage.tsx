import React, { ReactElement } from "react";
import Analyzer from "../../components/analyzer";
const HomePage: React.FC = (): ReactElement => {
  return (
    <div className="screen">
      <div className="section">
        <h1 className="text-5xl">Scientific Paper Analysis Agent</h1>
        <Analyzer />
      </div>
    </div>
  );
};

export default HomePage;
