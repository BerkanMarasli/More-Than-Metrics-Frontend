import { useState } from "react";
import Entry from "./Entry/Entry.js";
import About from "./Menu/About.js";
import Companies from "./Menu/Companies.js";
import Candidates from "./Menu/Candidates.js";
import Dashboard from "./CompanyArea/Dashboard.js";
import Profile from "./Profile/Profile.js";

import {
  Route,
  Switch,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";
import ReviewCandidates from "./CompanyArea/ReviewCandidates.js";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userType, setUserType] = useState("company");

  const redirectHome = () => {
    if (loggedIn && userType === "company") {
      <Redirect from="/" to="/dashboard" />;
    } else if (loggedIn && userType === "candidate") {
      <Redirect from="/" to="/jobs" />;
    } else if (!loggedIn) {
      return <Entry userType={userType} setUserType={setUserType} />;
    }
  };

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {redirectHome()}
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
        {/* <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/register">
          <Register userType={"userType"} />
        </Route> */}
        <Route exact path="/profile">
          <Profile userType={userType} />
        </Route>
        <Route exact path="/dashboard">
          <Dashboard />
        </Route>
        <Route exact path="/review">
          <ReviewCandidates />
        </Route>
        <Route exact path="/jobs">
          {/* <JobBoard /> */}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
