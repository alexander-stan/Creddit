// import "./App.css";
import * as React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { NavigationBar } from "../NavigationBar";
import Sidebar from "../Sidebar";
import { Dashboard } from "../pages/Dashboard"
import { NoMatch } from "../pages/NoMatch";
import { Transfers } from "../pages/Transfers";
import { PayBills } from "../pages/PayBills";
import { Accounts } from "../pages/Accounts";
import { AddAccounts } from "../pages/AddAccounts";
import { Settings } from "../pages/Settings";
import { LandingPage } from "../pages/LandingPage"

function App() {
  return (
    <React.Fragment>
      <Router>
        <NavigationBar />
        <Sidebar />
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/accounts" element={<Accounts/>}/>
          <Route path="/pay-bills" element={<PayBills/>}/>
          <Route path="/transfers" element={<Transfers/>}/>
          <Route path="/add-accounts" element={<AddAccounts/>}/>
          <Route path="/settings" element={<Settings/>}/>
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;
