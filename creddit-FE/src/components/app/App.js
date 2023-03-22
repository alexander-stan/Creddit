// import "./App.css";
import * as React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { NavigationBar } from "../NavigationBar";
// import Sidebar from "../Sidebar";
import { Dashboard } from "../pages/Dashboard"
import { NoMatch } from "../pages/NoMatch";
import { Transfers } from "../pages/Transfers";
import { Accounts } from "../pages/Accounts";
import { AddAccounts } from "../pages/AddAccounts";
import { Settings } from "../pages/Settings";
import { Login } from "../pages/Login";
import { Redirect } from "../pages/Redirect";
import { Signup } from "../pages/Signup";

function App() {
  return (
    <React.Fragment>
      <Router>
        <NavigationBar />
        <Routes>
          <Route exact path="/" element={<Login/>}/>
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/accounts" element={<Accounts/>}/>
          <Route path="/transfers" element={<Transfers/>}/>
          <Route path="/add-accounts" element={<AddAccounts/>}/>
          <Route path="/settings" element={<Settings/>}/>
          <Route path="/redirect" element={<Redirect/>} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;
