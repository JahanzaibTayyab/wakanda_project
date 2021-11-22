import React from "react";
import EspressoContent from "../../components/espresso";
import { FaReact } from "react-icons/fa";
export const Dashboard = (props) => {
  return (
    <>
      <EspressoContent {...props} refreshIcon={<FaReact />} title="Espresso" />
    </>
  );
};

export default Dashboard;
