import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";

import { useState } from "react";
import Entry from "./Entry/Entry.js";
import About from "./Entry/Menu/About.js";
import Companies from "./Entry/Menu/Companies.js";
import Candidates from "./Entry/Menu/Candidates.js";
import CompanyApp from "./CompanyArea/CompanyApp.js";
import CandidateApp from "./CandidateArea/CandidateApp.js";
import JobBoard from "./CandidateArea/JobBoard";

import {
  Route,
  Switch,
  BrowserRouter as Router,
  Link,
  Redirect,
} from "react-router-dom";
import Dashboard from "./CompanyArea/Dashboard.js";
import ReviewCandidates from "./CompanyArea/ReviewCandidates.js";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Entry />
        </Route>
        <Route exact path="/about-us">
          <About />
        </Route>
        <Route exact path="/companies">
          <Companies />
        </Route>
        <Route exact path="/candidates">
          <Candidates />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/register">
          <Register userType={"user"} />
        </Route>
        {/* <Route exact path="/profile">
          <Profile userType={"userType"} />
        </Route> */}
        <Route exact path="/dashboard">
          <Dashboard />
        </Route>
        <Route exact path="/review">
          <ReviewCandidates />
        </Route>
        <Route exact path="/jobs">
          <JobBoard />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
