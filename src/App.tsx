import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import "./App.css";

import Routes from "./components/routes/Routes";
import Navigation from "./components/navigation/Navigation";
import Layout from "./components/layout/Layout";

// const axios = require("axios");

// axios
//   .get(
//     "https://api.themoviedb.org/3/movie/550?api_key=6507f6186210afe2e01d68be1466a2f7"
//   )
//   .then(function (response: any) {
//     // handle success
//     console.log(response);
//   })
//   .catch(function (error: any) {
//     // handle error
//     console.log(error);
//   })
//   .then(function () {
//     console.log("done");
//   });

function App() {
  return (
    <div className="App">
      <Layout>
        <Router>
          <Routes />
        </Router>
      </Layout>
    </div>
  );
}

export default App;
