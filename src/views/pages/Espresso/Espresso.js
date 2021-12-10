import React from "react";
import EspressoContent from "../../components/espresso";
import { RepeatIcon } from '@chakra-ui/icons'

export const Dashboard = (props) => {
  return (
    <>
      <EspressoContent {...props} refreshIcon={<RepeatIcon />} title="Espresso" />
    </>
  );
};

export default Dashboard;
