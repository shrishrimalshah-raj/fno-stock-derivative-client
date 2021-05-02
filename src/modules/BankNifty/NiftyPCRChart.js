import React, { useState, useEffect } from "react";
import Chart from "react-google-charts";
import axios from "axios";

import {
  stockList,
  BankNiftyList,
  NiftyList,
  finNiftyList,
  filterOptions,
} from "./StockList";
import { GenericChart, TableComponent, CandleStickChart } from "./components";
import GenericIndexTableChart from "./GenericIndexTableChart";

const IndexPercentageChart = () => {
  const [state, setState] = useState({});
  const [filterBy, setFilterBy] = useState({
    value: "All Stocks",
    label: "All",
  });
  const [niftyData, setNiftyData] = useState([]);
  const [bankNiftyData, setBankNiftyData] = useState([]);
  const [finNiftyData, setFinNiftyData] = useState([]);

  const [stockListOption, setStockListOption] = useState([]);
  const [message, setMessage] = useState("");

  const fetchData = async () => {
    const indexData = await axios("http://localhost:3001/api/pcr/indexdata/");

    const { NIFTY, BANKNIFTY, FINNIFTY } = indexData.data;
    setNiftyData(NIFTY);
    setBankNiftyData(BANKNIFTY);
    setFinNiftyData(FINNIFTY);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {/* <GenericIndexTableChart
        niftyData={niftyData}
        bankNiftyData={bankNiftyData}
        finNiftyData={finNiftyData}
      />
       */}
      <CandleStickChart data={niftyData} />
      <CandleStickChart data={bankNiftyData} />
      <CandleStickChart data={finNiftyData} />

      <GenericIndexTableChart
        niftyData={niftyData}
        bankNiftyData={bankNiftyData}
        finNiftyData={finNiftyData}
      />
    </div>
  );
};

export default IndexPercentageChart;
