import React, { useState } from "react";

import "./App.css";

import { stockList } from "./stockList";
import Nifty50 from "./modules/Nifty-50";
// import BankNifty, { FutureOpenInterest } from "./modules/BankNifty";
import { FutureOpenInterest, IndexPercentageChart, NiftyPCRChart } from "./modules/BankNifty";
import { SideMenu } from "./components";
// import {
//   BankNiftyOptionChain,
//   BankNiftyStrikePrices,
// } from "./modules/BankNifty";

import Test from "../src/modules/Test";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
function App() {
  const [selectedValue, setSelectedValue] = useState(stockList[0]);

  const handleChange = (e) => {
    setSelectedValue(e);
  };
  // s-p-cnx-nifty-chart
  let investingStockUrl = "https://in.investing.com/equities";
  let investingIndicesUrl = "https://in.investing.com/indices";

  // console.log(`${investingUrl}/${selectedValue.value}`);
  return (
    <div className="main">
      <Router>
        <SideMenu />
        <Switch>
          {/* <Route path="/FutureOpenInterest" component={FutureOpenInterest} /> */}
          {/* <Route
            path="/BankNiftyOptionChain"
            component={BankNiftyOptionChain}
          /> */}
          {/* <Route path="/strikePrices" component={BankNiftyStrikePrices} /> */}
          <Route path="/FutureOpenInterest" component={FutureOpenInterest} />
          <Route
            path="/NiftyPCRChart"
            component={NiftyPCRChart}
          />
          <Route path="/" component={FutureOpenInterest} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
