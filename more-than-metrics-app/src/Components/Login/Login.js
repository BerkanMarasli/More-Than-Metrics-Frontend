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
    const { setLoggedIn, setUserType } = props
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <Dropdown />
            <LoginForm getUser={getUser} setLoggedIn={setLoggedIn} setUserType={setUserType} />
        </div>
    )
}

async function getUser(values, setLoggedIn, setUserType) {
    console.log(`Welcome ${values.email} your password is ${values.password}`)

    const url = "http://localhost:8080/login"

    try {
        console.log(values)
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
        })
        const json = await response.json()

        if (response.status === 200) {
            setUserType(json.type)
            setLoggedIn(true)
            window.location.href = json.url
        } else {
            console.log("This is the error from the backend", json.message)
            return
        }
    } catch (error) {
        console.log({ error })
    }
}

export default Login
