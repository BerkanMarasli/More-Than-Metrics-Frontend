import { useState, useEffect } from "react"
import { Route, Switch, BrowserRouter as Router, Redirect } from "react-router-dom"
import { getAccountType } from "./handleCookie.js"
import Unauthorised from "./Unauthorised"
import Entry from "./Entry/Entry.js"
import About from "./Menu/About.js"
import Companies from "./Menu/Companies.js"
import Candidates from "./Menu/Candidates.js"
import Dashboard from "./CompanyArea/Dashboard.js"
import MatchCandidates from "./CompanyArea/MatchCandidates.js"
import JobBoard from "./CandidateArea/JobBoard.js"
import Profile from "./Profile/Profile.js"
import Register from "./Components/Register/Register"
import Login from "./Components/Login/Login"

function App() {
    const [loggedIn, setLoggedIn] = useState(false)
    const [userType, setUserType] = useState(null)

    useEffect(() => {
        if (document.cookie !== "") {
            setLoggedIn(true)
            setUserType(getAccountType(document.cookie))
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

    const redirectRegister = () => {
        if (!loggedIn) {
            return <Register userType={userType} redirectHome={redirectHome} />
        } else if (loggedIn && userType === "company") {
            return <Dashboard userType={userType} />
        } else {
            return <JobBoard />
        }
    }

    const redirectLogin = () => {
        if (!loggedIn) {
            return <Login setLoggedIn={setLoggedIn} />
        } else if (loggedIn && userType === "company") {
            return <Dashboard userType={userType} />
        } else {
            return <JobBoard />
        }
    }

    const unauthorisedRedirect = (candidateRedirect, companyRedirect) => {
        if (!loggedIn) {
            return <Unauthorised userType={userType} />
        } else if (userType === "company") {
            return companyRedirect
        }
        return candidateRedirect
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
                    <Candidates setUserType={setUserType} />
                </Route>
                <Route exact path="/login">
                    {redirectLogin()}
                </Route>
                <Route exact path="/register">
                    {redirectRegister()}
                </Route>
                <Route exact path="/profile">
                    <Profile userType={userType} />
                </Route>
                <Route exact path="/dashboard">
                    {unauthorisedRedirect(<Unauthorised userType={userType} />, <Dashboard userType={userType} />)}
                </Route>
                <Route exact path="/match">
                    {unauthorisedRedirect(<Unauthorised userType={userType} />, <MatchCandidates />)}
                </Route>
                <Route exact path="/jobs">
                    {unauthorisedRedirect(<JobBoard />, <Unauthorised userType={userType} />)}
                </Route>
            </Switch>
        </Router>
    )
}

export default App
