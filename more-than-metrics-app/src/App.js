import { useState, useEffect } from "react"
import Register from "./Components/Register/Register"
import Login from "./Components/Login/Login"
import Entry from "./Entry/Entry.js"
import About from "./Menu/About.js"
import Companies from "./Menu/Companies.js"
import Candidates from "./Menu/Candidates.js"
import Dashboard from "./CompanyArea/Dashboard.js"
import Profile from "./Profile/Profile.js"
import JobBoard from "./CandidateArea/JobBoard.js"

import CandidateProfileForm from "./Profile/CandidateProfileForm"

import { Route, Switch, BrowserRouter as Router, Redirect } from "react-router-dom"
import ReviewCandidates from "./CompanyArea/MatchCandidates.js"
import CandidateProfile from "./Profile/CandidateProfile"
import { Route, Switch, BrowserRouter as Router, Redirect } from "react-router-dom"
import ReviewCandidates from "./CompanyArea/MatchCandidates.js"
import { getAccountType, getUserID } from "./handleCookie.js"

function App() {
    const [loggedIn, setLoggedIn] = useState(false)
    const [userType, setUserType] = useState(null)
    const [userID, setUserID] = useState(null)

    useEffect(() => {
        if (document.cookie !== "") {
            setLoggedIn(true)
            setUserType(getAccountType(document.cookie))
            setUserID(getUserID(document.cookie))
        }
    }, [])

    const redirectHome = () => {
        if (loggedIn && userType === "company") {
            return <Redirect from="/" to="/dashboard" />
        } else if (loggedIn && userType === "candidate") {
            return <Redirect from="/" to="/jobs" />
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
                <Route exact path="/about">
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
                    <Login setLoggedIn={setLoggedIn} setUserType={setUserType} setUserID={setUserID} />
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
                    <Dashboard userType={userType} />
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
