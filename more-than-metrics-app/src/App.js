import { useState, useEffect } from "react"
import { Route, Switch, BrowserRouter as Router, Redirect } from "react-router-dom"
import { getAccountType } from "./handleCookie.js"
import Unauthorised from "./Unauthorised"
import Entry from "./Entry/Entry.js"
import About from "./Menu/About.js"
import Companies from "./Menu/Companies.js"
import Candidates from "./Menu/Candidates.js"
import Dashboard from "./CompanyArea/Dashboard.js"
import ReviewCandidates from "./CompanyArea/MatchCandidates.js"
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

    const unauthorisedRedirect = (candidateRedirect, companyRedirect) => {
        if (userType === "company") {
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
                    <Login setLoggedIn={setLoggedIn} />
                </Route>
                <Route exact path="/register">
                    <Register userType={userType} redirectHome={redirectHome} />
                </Route>
                <Route exact path="/profile">
                    <Profile userType={userType} />
                </Route>
                <Route exact path="/dashboard">
                    {unauthorisedRedirect(<Unauthorised />, <Dashboard userType={userType} />)}
                </Route>
                <Route exact path="/match">
                    <ReviewCandidates />
                </Route>
                <Route exact path="/jobs">
                    {unauthorisedRedirect(<JobBoard />, <Unauthorised />)}
                </Route>
            </Switch>
        </Router>
    )
}

export default App
