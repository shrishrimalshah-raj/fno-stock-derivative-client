import React from "react";

import {
  NiftyIndexTableChart,
  BankNiftyIndexTableChart,
  FinNiftyIndexTableChart
} from "./components/IndexChart/IndexTable";

const GenericIndexTableChart = (props) => {
  const { niftyData, bankNiftyData, finNiftyData } = props;
  return (
    <div>
      <NiftyIndexTableChart data={niftyData} />
      <BankNiftyIndexTableChart data={bankNiftyData} />
      <FinNiftyIndexTableChart data={finNiftyData} />

    </div>
  );
};

export default GenericIndexTableChart;
