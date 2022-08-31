import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import "./App.css";

import Routes from "./components/routes/Routes";
import Layout from "./components/layout/Layout";

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
