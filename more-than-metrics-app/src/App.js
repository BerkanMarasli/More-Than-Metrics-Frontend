import Register from "./Components/Register/Register"
import Login from "./Components/Login/Login"

import { useState } from "react"
import Entry from "./Entry/Entry.js"
import About from "./Menu/About.js"
import Companies from "./Menu/Companies.js"
import Candidates from "./Menu/Candidates.js"
import Dashboard from "./CompanyArea/Dashboard.js"
import Profile from "./Profile/Profile.js"

import CandidateProfileForm from "./Profile/CandidateProfileForm"

import { Route, Switch, BrowserRouter as Router, Redirect } from "react-router-dom"
import ReviewCandidates from "./CompanyArea/MatchCandidates.js"
import CandidateProfile from "./Profile/CandidateProfile"

function App() {
    const [loggedIn, setLoggedIn] = useState(false)
    const [userType, setUserType] = useState("candidate")

    const redirectHome = () => {
        if (loggedIn && userType === "company") {
            ;<Redirect from="/" to="/dashboard" />
        } else if (loggedIn && userType === "candidate") {
            ;<Redirect from="/" to="/jobs" />
        } else if (!loggedIn) {
            return <Entry userType={userType} setUserType={setUserType} />
        }
    }

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
                <Route exact path="/experiment">
                    <CandidateProfileForm id={2} />
                </Route>
                <Route exact path="/login">
                    <Login setLoggedIn={setLoggedIn} setUserType={setUserType} />
                </Route>
                <Route exact path="/register">
                    <Register userType={userType} redirectHome={redirectHome} />
                </Route>
                {/* <Route exact path="/profile">
          <Profile userType={"userType"} />
          <Register userType={"userType"} />
        </Route> */}
                <Route exact path="/profile">
                    <Profile userType={userType} />
                </Route>
                <Route exact path="/dashboard">
                    <Dashboard />
                </Route>
                <Route exact path="/match">
                    <ReviewCandidates />
                </Route>
                {/* <Route exact path="/jobs">
                    <JobBoard />
                </Route> */}
            </Switch>
        </Router>
    )
}

export default App
