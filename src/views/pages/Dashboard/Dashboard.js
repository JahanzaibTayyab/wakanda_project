import React from "react";
import { connect } from "react-redux";

export const Dashboard = (props) => {
  return (
    <>
      <div>Dashboard</div>
    </>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
