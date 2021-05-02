import React, { useState, useEffect } from "react";
import "../../../components/TableComponent.css";

const NiftyIndexTableChart = (props) => {
  const { data } = props;

  const formatDate = (date) => {
    let formatDate = new Date(date);
    return `${formatDate.getDate()}/${
      formatDate.getMonth() + 1
    }/${formatDate.getFullYear()}`;
  };

  const skipColumns = [
    "SYMBOL",
    "TIMESTAMP",
    "PCR",
    "OPEN_INT",
    "CHG_IN_OI",
    "CALL_CHG_IN_OI",
    "PUT_CHG_IN_OI",
    "DIFF_PUT_CALL",
    "DAY_PRICE_CHG",
    "CLOSE",
    // "PCR_0_5_NIFTY_PER",
    // "PCR_1_NIFTY_PER",
  ];

  const returnKey = (key) => {
    if (key === "PCR_0_5_NIFTY_PER") {
      return "PCR 0.5 NIFTY";
    } else if (key === "PCR_1_NIFTY_PER") {
      return "PCR 1 NIFTY";
    } else {
      return key.toUpperCase();
    }
  };

  const bgColorArray = ["DIFF_PUT_CALL", "DAY_PRICE_CHG", "CHG_IN_OI"];
  const addPercentage = ["PCR_0_5_NIFTY_PER"];
  const pcr1Percentage = ["PCR_1_NIFTY_PER"];
  const chgInOi = ["CHG_IN_OI"]

  const renderTableHeader = () => {
    return skipColumns.map((key, index) => {
      return <th key={index}>{returnKey(key)}</th>;
    });
  };

  const renderTableData = (data) => {
    return data.map((stock, index) => {
      return (
        <tr key={stock._id}>
          {skipColumns.map((val, index) => {
            return (
              <td
                key={index}
                className={`${
                  bgColorArray.includes(val)
                    ? stock[val] > 0
                      ? "buy"
                      : "sell"
                    : ""
                }${
                  addPercentage.includes(val)
                    ? stock[val] > 50
                      ? "sell"
                      : ""
                    : ""
                }
                ${
                  pcr1Percentage.includes(val)
                    ? stock[val] > 50
                      ? "buy"
                      : ""
                    : ""
                }
              `}
              >
                {stock[val]}
                {addPercentage.includes(val) ? "%" : ""}
              </td>
            );
          })}
        </tr>
      );
    });
  };

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const returnReverseArray = (array) => {
    let tempArray = [...array]

    return tempArray.sort(function(a,b){
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      return new Date(b.TIMESTAMP) - new Date(a.TIMESTAMP);
    });
  }


  const transformDataToTable = (paramsData) => {
    let data = returnReverseArray(paramsData)
    let lastRecord = data[data.length - 1];

    let d = new Date(lastRecord.TIMESTAMP);
    let dayName = days[d.getDay()];
    return (
      <div>
        <h2 className="center">
          {formatDate(data[data.length - 1].TIMESTAMP)}
          {"==>"}({dayName === "Thursday" ? `${dayName}==> Expiry` : dayName})
        </h2>
        <div className="flex-between">
          <div>
            Total Stocks: {lastRecord["PCR_0_5_STOCKS_COUNT"]}
            <br />
            PCR_0_5_NIFTY_PERCENTAGE:{" "}
            <span
              className={`${
                lastRecord["PCR_0_5_NIFTY_PER"] > 50 ? "sell" : "sell"
              }`}
            >
              {lastRecord["PCR_0_5_NIFTY_PER"]}%
            </span>
          </div>
          <div>SYMBOL: {lastRecord["SYMBOL"]}</div>
          <div>
            Total Stocks: {lastRecord["PCR_1_STOCKS_COUNT"]}
            <br />
            PCR_1_0_NIFTY_PERCENTAGE:
            <span
              className={`${
                lastRecord["PCR_1_NIFTY_PER"] > 50 ? "buy" : "sell"
              }`}
            >
              {lastRecord["PCR_1_NIFTY_PER"]}%
            </span>
          </div>
        </div>

        <table id="students">
          <tbody>
            <tr>{renderTableHeader()}</tr>
            {renderTableData(data)}
          </tbody>
        </table>
      </div>
    );
  };

  return <>{data.length > 0 ? transformDataToTable(data) : null}</>;
};

export default NiftyIndexTableChart;
