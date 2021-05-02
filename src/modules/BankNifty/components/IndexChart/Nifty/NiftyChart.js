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
import { GenericChart, TableComponent, CandleStickChart } from "../../components";
import IndexTableChart from "../IndexTable/NiftyIndexTableChart";

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
      <IndexTableChart data={niftyData} />
      <CandleStickChart data={niftyData} />

      <GenericChart
        data={niftyData}
        column={["TIMESTAMP", "PCR_0_5_NIFTY_PER", "PCR_1_NIFTY_PER"]}
        title="NO OF PERCENTAGE %"
        type="DOUBLE"
      />

      <GenericChart
        data={niftyData}
        column={["TIMESTAMP", "PCR", "CLOSE"]}
        title="PCR and CLOSE PRICE CHART"
        type="DOUBLE"
      />

      <GenericChart
        data={niftyData}
        column={["TIMESTAMP", "DIFF_PUT_CALL", "CLOSE"]}
        title="DIFF_PUT_CALL CHART"
        type="DOUBLE"
      />

      <GenericChart
        data={niftyData}
        column={["TIMESTAMP", "OPEN_INT", "CLOSE"]}
        title="FUTURE OPEN INTEREST"
        type="DOUBLE"
      />
    </div>
  );
};

export default IndexPercentageChart;
