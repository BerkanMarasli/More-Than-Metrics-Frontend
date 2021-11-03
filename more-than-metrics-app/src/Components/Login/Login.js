import React from "react"
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
    const { setLoggedIn } = props
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <Dropdown />
            <LoginForm getUser={getUser} setLoggedIn={setLoggedIn} />
        </div>
    )
}

async function getUser(values, setLoggedIn) {
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
