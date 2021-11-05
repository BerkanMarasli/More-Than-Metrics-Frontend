import React, { useState } from "react"
import { makeStyles } from "@material-ui/styles"
import LoginForm from "./LoginForm"
import Dropdown from "../../Menu/Dropdown"

const useStyles = makeStyles((theme) => ({
    root: {
        fontFamily: "Lato",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
    },
}))

function Login(props) {
    const [errorMsg, setErrorMsg] = useState("")
    const { setLoggedIn, handleRegisterFromLogin } = props
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <Dropdown />
            <LoginForm
                getUser={getUser}
                setLoggedIn={setLoggedIn}
                setErrorMsg={setErrorMsg}
                errorMsg={errorMsg}
                handleRegisterFromLogin={handleRegisterFromLogin}
            />
        </div>
    )
}

async function getUser(values, setLoggedIn, setErrorMsg) {
    const url = process.env.REACT_APP_API_URL + "/login"
    try {
        const response = await fetch(url, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
        })
        const json = await response.json()
        setErrorMsg(json.message)

        if (response.status === 200) {
            setLoggedIn(true)
            document.cookie = json.cookieOneToSet
            document.cookie = json.cookieTwoToSet
            window.location.href = json.url
        }
    } catch (error) {
        console.log({ error })
    }
}

export default Login
