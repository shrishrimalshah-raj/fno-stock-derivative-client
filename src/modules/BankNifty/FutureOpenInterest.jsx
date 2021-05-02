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
import Select from "react-select";
import { GenericChart, TableComponent, CandleStickChart } from "./components";
import { NiftyIndexTableChart } from "./components/IndexChart/IndexTable";

const FutureOpenInterest = () => {
  const [state, setState] = useState({});
  const [filterBy, setFilterBy] = useState({
    value: "All Stocks",
    label: "All",
  });
  const [futureOIData, setFutureOIData] = useState([]);
  const [stockListOption, setStockListOption] = useState([]);
  const [message, setMessage] = useState("");
  const [EMAArray, setEMAArray] = useState([]);
  const [RSIArray, setRSIArray] = useState([]);
  const [ADXArray, setADXArray] = useState([]);

  const formatDataForSelect = (data) => {
    return data.map((item) => ({ label: item, value: item }));
  };

  const fetchData = async () => {
    const stocklist = await axios(
      "http://localhost:3001/api/derivatives/stocklist/"
    );

    setStockListOption(formatDataForSelect(stocklist.data.data));
  };

  const sumStockPercentage = (IndexStockList, AllStocksList) => {
    if (AllStocksList === false) {
      return "0";
    }

    let total = 0;
    IndexStockList.forEach((stock) => {
      AllStocksList.forEach((item) => {
        if (item.value === stock.symbol) {
          total += stock.weightage;
        }
      });
    });
    return Math.round(total);
  };

  // seed pcr data in database
  const handlePCRData = async () => {
    //index url
    let niftyURL = `http://localhost:3001/api/derivatives/NIFTY`;
    let bankNiftyURL = `http://localhost:3001/api/derivatives/BANKNIFTY`;
    let finNiftyURL = `http://localhost:3001/api/derivatives/FINNIFTY`;
    let pcrLessThanURL = `http://localhost:3001/api/derivatives/stocklist/pcrLessThan`;
    let pcrMoreThanURL = `http://localhost:3001/api/derivatives/stocklist/pcrMoreThan`;

    const niftyPromise = axios.get(niftyURL);
    const bankNiftyPromise = axios.get(bankNiftyURL);
    const finNiftyPromise = axios.get(finNiftyURL);
    const pcrLessThanPromise = axios.get(pcrLessThanURL);
    const pcrMoreThanPromise = axios.get(pcrMoreThanURL);

    let [
      niftyData,
      bankNiftyData,
      finNiftyData,
      pcrLessThanData,
      pcrMoreThanData,
    ] = await Promise.all([
      niftyPromise,
      bankNiftyPromise,
      finNiftyPromise,
      pcrLessThanPromise,
      pcrMoreThanPromise,
    ]);

    niftyData = niftyData.data.data;
    bankNiftyData = bankNiftyData.data.data;
    finNiftyData = finNiftyData.data.data;
    pcrLessThanData = pcrLessThanData.data;
    pcrMoreThanData = pcrMoreThanData.data;

    const latestNifty = niftyData[niftyData.length - 1];
    const latestBankNifty = bankNiftyData[bankNiftyData.length - 1];
    const latestFinNifty = finNiftyData[finNiftyData.length - 1];
    let TIMESTAMP = latestNifty.TIMESTAMP;

    console.log("TIMESTAMP", TIMESTAMP);

    let pcrLessThanArray = [];
    let pcrMoreThanArray = [];

    pcrLessThanArray =
      pcrLessThanData.length > 0 &&
      pcrLessThanData.map((item) => ({
        label: item.SYMBOL,
        value: item.SYMBOL,
      }));

    pcrMoreThanArray =
      pcrMoreThanData.length > 0 &&
      pcrMoreThanData.map((item) => ({
        label: item.SYMBOL,
        value: item.SYMBOL,
      }));

    const transformData = {
      NIFTY: {
        ...latestNifty,
        PCR_0_5_STOCKS_COUNT: pcrLessThanArray.length,
        PCR_0_5_NIFTY_PER: sumStockPercentage(NiftyList, pcrLessThanArray),
        PCR_0_5_BANKNIFTY_PER: sumStockPercentage(
          BankNiftyList,
          pcrLessThanArray
        ),
        PCR_0_5_FINNIFTY_PER: sumStockPercentage(
          finNiftyList,
          pcrLessThanArray
        ),
        PCR_1_STOCKS_COUNT: pcrMoreThanArray.length,
        PCR_1_NIFTY_PER: sumStockPercentage(NiftyList, pcrMoreThanArray),
        PCR_1_BANKNIFTY_PER: sumStockPercentage(
          BankNiftyList,
          pcrMoreThanArray
        ),
        PCR_1_FINNIFTY_PER: sumStockPercentage(finNiftyList, pcrMoreThanArray),
      },
      BANKNIFTY: {
        ...latestBankNifty,
        PCR_0_5_STOCKS_COUNT: pcrLessThanArray.length,
        PCR_0_5_NIFTY_PER: sumStockPercentage(NiftyList, pcrLessThanArray),
        PCR_0_5_BANKNIFTY_PER: sumStockPercentage(
          BankNiftyList,
          pcrLessThanArray
        ),
        PCR_0_5_FINNIFTY_PER: sumStockPercentage(
          finNiftyList,
          pcrLessThanArray
        ),
        PCR_1_STOCKS_COUNT: pcrMoreThanArray.length,
        PCR_1_NIFTY_PER: sumStockPercentage(NiftyList, pcrMoreThanArray),
        PCR_1_BANKNIFTY_PER: sumStockPercentage(
          BankNiftyList,
          pcrMoreThanArray
        ),
        PCR_1_FINNIFTY_PER: sumStockPercentage(finNiftyList, pcrMoreThanArray),
      },
      FINNIFTY: {
        ...latestFinNifty,
        PCR_0_5_STOCKS_COUNT: pcrLessThanArray.length,
        PCR_0_5_NIFTY_PER: sumStockPercentage(NiftyList, pcrLessThanArray),
        PCR_0_5_BANKNIFTY_PER: sumStockPercentage(
          BankNiftyList,
          pcrLessThanArray
        ),
        PCR_0_5_FINNIFTY_PER: sumStockPercentage(
          finNiftyList,
          pcrLessThanArray
        ),
        PCR_1_STOCKS_COUNT: pcrMoreThanArray.length,
        PCR_1_NIFTY_PER: sumStockPercentage(NiftyList, pcrMoreThanArray),
        PCR_1_BANKNIFTY_PER: sumStockPercentage(
          BankNiftyList,
          pcrMoreThanArray
        ),
        PCR_1_FINNIFTY_PER: sumStockPercentage(finNiftyList, pcrMoreThanArray),
      },
      TIMESTAMP,
    };

    const insertData = await axios.post(
      `http://localhost:3001/api/pcr/create`,
      {
        data: transformData,
      }
    );

    // console.log("latestBankNifty", latestBankNifty);
    // console.log("latestFinNifty", latestFinNifty);
    // console.log("pcrLessThanArray", pcrLessThanArray.length);
  };

  useEffect(() => {
    fetchData();
    handlePCRData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const stockdata = await axios(
        `http://localhost:3001/api/derivatives/${state.value}/`
      );

      setFutureOIData(stockdata.data.data);
      setEMAArray(stockdata.data.EMAArray);
      setRSIArray(stockdata.data.RSIArray);
      setADXArray(stockdata.data.ADXArray);
    };

    fetchData();
  }, [state]);

  const handleChange = (selectedOption) => {
    setState(selectedOption);
  };

  const handleFilterBy = async (selectedOption) => {
    const { value } = selectedOption;

    if (value === "All" || value === "Select") {
      fetchData();
    } else {
      const stocklist = await axios(
        `http://localhost:3001/api/derivatives/stocklist/${value}`
      );
      let data = [];

      data =
        stocklist.data.length > 0 &&
        stocklist.data.map((item) => ({
          label: item.SYMBOL,
          value: item.SYMBOL,
        }));
      setStockListOption(data);
    }

    setFilterBy(selectedOption);
  };

  const returnReverseArray = (array) => {

    return array.sort(function(a,b){
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      return new Date(b.TIMESTAMP) - new Date(a.TIMESTAMP);
    });
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ width: "400px", marginRight: "50px" }}>
          <div>Filter Stock List</div>
          <Select
            value={filterBy}
            onChange={handleFilterBy}
            options={filterOptions}
          />
        </div>
        {/* stockListOption */}
        <div style={{ width: "400px", marginRight: "50px" }}>
          <div>Select Stock</div>
          <Select
            value={state}
            onChange={handleChange}
            options={stockListOption}
          />
        </div>
        <div style={{ width: "300px", fontSize: "20px" }}>
          <div>Total Stocks</div>
          <div style={{ marginTop: "15px", marginLeft: "15px" }}>
            <b>{stockListOption.length}</b>
          </div>
        </div>
        <div style={{ width: "300px", fontSize: "20px" }}>
          <div>NF Percentage</div>
          <div style={{ marginTop: "15px", marginLeft: "15px" }}>
            <b>{sumStockPercentage(NiftyList, stockListOption)}</b>
          </div>
        </div>
        <div style={{ width: "300px", fontSize: "20px" }}>
          <div>BNF Percentage</div>
          <div style={{ marginTop: "15px", marginLeft: "15px" }}>
            <b>{sumStockPercentage(BankNiftyList, stockListOption)}</b>
          </div>
        </div>
        <div style={{ width: "300px", fontSize: "20px" }}>
          <div>FNF Percentage</div>
          <div style={{ marginTop: "15px", marginLeft: "15px" }}>
            <b>{sumStockPercentage(finNiftyList, stockListOption)}</b>
          </div>
        </div>
      </div>

      <div style={{ textAlign: "center", marginTop: "50px" }}>
        {/* <h3>{message ? message : "NO DECISION FOUND"}</h3> */}
      </div>

      <div>
        <CandleStickChart data={futureOIData} />
      </div>

      <GenericChart
        data={futureOIData}
        column={["TIMESTAMP", "DIFF_PUT_CALL", "CLOSE", "OPEN_INT"]}
        title="MULTIPLE CHART"
        type="MULTIPLE"
      />

      <GenericChart
        data={ADXArray}
        column={["TIMESTAMP", "+DI", "ADX", "-DI"]}
        title="ADX INDICATOR CHART"
        type="MULTIPLE"
      />

      <GenericChart
        data={EMAArray}
        column={["TIMESTAMP", "DIFF_PUT_CALL", "CLOSE"]}
        title="EMA 9 INDICATOR CHART"
        type="DOUBLE"
      />

      <GenericChart
        data={RSIArray}
        column={["TIMESTAMP", "RSI", "CLOSE"]}
        title="RSI 14 INDICATOR CHART"
        type="DOUBLE"
      />

      <GenericChart
        data={futureOIData}
        column={["TIMESTAMP", "PCR", "CLOSE"]}
        title="PCR and CLOSE PRICE CHART"
        type="DOUBLE"
      />

      {/* <GenericChart
        data={futureOIData}
        column={["TIMESTAMP", "DIFF_PUT_CALL", "CLOSE"]}
        title="DIFF_PUT_CALL CHART"
        type="DOUBLE"
      /> */}

      {/* <GenericChart
        data={futureOIData}
        column={["TIMESTAMP", "OPEN_INT", "CLOSE"]}
        title="FUTURE OPEN INTEREST"
        type="DOUBLE"
      /> */}


      {/* <NiftyIndexTableChart data={returnReverseArray(futureOIData)} /> */}
      <NiftyIndexTableChart data={futureOIData} />

      <div style={{ marginBottom: "40px", width: "" }}>
        <TableComponent data={futureOIData} />
      </div>

    </div>
  );
};

export default FutureOpenInterest;
