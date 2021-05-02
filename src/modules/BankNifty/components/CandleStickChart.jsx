import React from "react";
import Chart from "react-google-charts";

const formatDate = (date) => {
  let formatDate = new Date(date);
  return `${formatDate.getDate()}/${
    formatDate.getMonth() + 1
  }/${formatDate.getFullYear()}`;
};

const CandleStickChart = (props) => {
  const { data } = props;
  let lastRecord = data[data.length - 1];

  const changeData = (data) => {
    if (data.length === 0) {
      return [];
    }
    // formatDate(res[filterColumn[0]], res["netChange"]),
    const filterColumn = ["TIMESTAMP", "LOW", "OPEN", "CLOSE", "HIGH"];
    let newArray = [];
    newArray.push(filterColumn);

    data.forEach((res, idx) => {
      let temp = [
        `${formatDate(res[filterColumn[0]])} => ${res["DAY_PRICE_CHG"]}`,
        res[filterColumn[1]],
        res[filterColumn[2]],
        res[filterColumn[3]],
        res[filterColumn[4]],
      ];

      newArray.push(temp);
    });

    return newArray;
  };

  return (
    <div>
      {data.length > 0 ? (
        <>
          <div className="flex-center">
            <div>SYMBOL: {lastRecord["SYMBOL"]}</div>
          </div>

          <Chart
            width={"100%"}
            height={650}
            chartType="CandlestickChart"
            loader={<div>Loading Chart</div>}
            data={changeData(data)}
            options={{
              legend: "none",
              candlestick: {
                fallingColor: { strokeWidth: 0, fill: "#a52714" }, // red
                risingColor: { strokeWidth: 0, fill: "#0f9d58" }, // green
              },
            }}
            rootProps={{ "data-testid": "1" }}
          />
        </>
      ) : null}
    </div>
  );
};

export default CandleStickChart;

// import React, { useState, useEffect } from "react";
// import moment from 'moment'
// import { Box } from '@material-ui/core';

// import { ChipComponent } from '../../../components/Chip'

// const formatDate = (date, netChange) => {
//   const dateFormat = moment(date).subtract(1, "days").format("MMM Do YYYY");
//   return `${dateFormat}, NetChange: ${netChange}`;
// };

// const NiftyChart = ({ name, data }) => {
//   return (
//     <Box mt="50px">
//       <ChipComponent name={name} />

//     </Box>

//   )
// }

// export default NiftyChart
