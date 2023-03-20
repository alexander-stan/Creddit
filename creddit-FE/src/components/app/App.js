import "./App.css";
import * as React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { NavigationBar } from "../NavigationBar";
import { Dashboard } from "../Dashboard";
import { NoMatch } from "../NoMatch";
import Sidebar from "../Sidebar";

function App() {
  return (
    <React.Fragment>
      <Router>
        <NavigationBar />
        <Sidebar />
        <Routes>
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route path="/settings" />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;
