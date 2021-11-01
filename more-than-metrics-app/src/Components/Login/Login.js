import React, { useState } from "react"
import LoginForm from "./LoginForm"
import Dropdown from "../../Menu/Dropdown"
import { makeStyles } from "@material-ui/styles"

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
    const { setLoggedIn, setUserType, setUserID } = props
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <Dropdown />
            <LoginForm getUser={getUser} setLoggedIn={setLoggedIn} setUserType={setUserType} setUserID={setUserID} />
        </div>
    )
}

async function getUser(values, setLoggedIn, setUserType, setUserID) {
    const url = "http://localhost:8080/login"
    try {
        const response = await fetch(url, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
        })
        const json = await response.json()

        if (response.status === 200) {
            setLoggedIn(true)
            window.location.href = json.url
        }
    } catch (error) {
        console.log({ error })
    }
}

export default Login
