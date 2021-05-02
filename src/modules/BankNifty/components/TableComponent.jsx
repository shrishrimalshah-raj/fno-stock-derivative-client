import React, { useState, useEffect } from "react";
import axios from "axios";
import "./TableComponent.css";

const TableComponent = (props) => {
  const { data: state } = props;
  const [data, setData] = useState({});
  const { twoDayBefore = [], oneDayBefore = [], today = [] } = data;

  const formatDate = (date) => {
    let formatDate = new Date(date);
    return `${formatDate.getDate()}/${
      formatDate.getMonth() + 1
    }/${formatDate.getFullYear()}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      const indexdata = await axios(
        `http://localhost:3001/api/derivatives/indexdata/`
      );

      setData(indexdata.data);
    };

    fetchData();
  }, [state]);

  const skipColumns = [
    "SYMBOL",
    "PCR",
    "OPEN_INT",
    "CHG_IN_OI",
    "CALL_CHG_IN_OI",
    "PUT_CHG_IN_OI",
    "DIFF_PUT_CALL",
    "DAY_PRICE_CHG",
    "CLOSE",
  ];

  const bgColorArray = ["DIFF_PUT_CALL", "DAY_PRICE_CHG"];

  const returnSortedData = (stocks) => {
    const tempArray = [];
    const [BANKNIFTY, FINNIFTY, NIFTY] = stocks;
    tempArray.push(NIFTY);
    tempArray.push(BANKNIFTY);
    tempArray.push(FINNIFTY);

    return tempArray;
  };
  const renderTableHeader = () => {
    return skipColumns.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>;
    });
  };

  const renderTableData = (data) => {
    return returnSortedData(data).map((stock, index) => {
      return (
        <tr key={stock.SYMBOL}>
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
                }`}
              >
                {stock[val]}
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

  const transformDataToTable = (obj) => {
    let arrayOfData = Object.keys(obj).map(function (key) {
      let d = new Date(obj[key][0].TIMESTAMP);
      let dayName = days[d.getDay()];
      return (
        <div key={dayName}>
          <h2 className="center">
            {formatDate(obj[key][0].TIMESTAMP)}{"==>"}(
            {dayName === "Thursday" ? `${dayName}==> Expiry` : dayName})
          </h2>
          <table id="students">
            <tbody>
              <tr>{renderTableHeader()}</tr>
              {renderTableData(obj[key])}
            </tbody>
          </table>
        </div>
      );
    });

    return arrayOfData;
  };

  return (
    <>
      {today.length > 0 ? transformDataToTable(data) : null}
      {/* {twoDayBefore.length > 0 && (
        <div>
          <h2 className="center">{twoDayBefore[0].TIMESTAMP}</h2>
          <table id="students">
            <tbody>
              <tr>{renderTableHeader()}</tr>
              {renderTableData(twoDayBefore)}
            </tbody>
          </table>
        </div>
      )}

      {oneDayBefore.length > 0 && (
        <div>
          <h2 className="center">{oneDayBefore[0].TIMESTAMP}</h2>
          <table id="students">
            <tbody>
              <tr>{renderTableHeader()}</tr>
              {renderTableData(oneDayBefore)}
            </tbody>
          </table>
        </div>
      )}

      {today.length > 0 && (
        <div>
          <h2 className="center">{today[0].TIMESTAMP}</h2>
          <table id="students">
            <tbody>
              <tr>{renderTableHeader()}</tr>
              {renderTableData(today)}
            </tbody>
          </table>
        </div>
      )} */}
    </>
  );
};

export default TableComponent;
