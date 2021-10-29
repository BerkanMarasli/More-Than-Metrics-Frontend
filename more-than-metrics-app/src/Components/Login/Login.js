import React from "react"
import LoginForm from "./LoginForm"
import Dropdown from "../../Menu/Dropdown"
import { makeStyles } from "@material-ui/styles"

const useStyles = makeStyles(theme => ({
  root: {
    fontFamily: "Lato",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
}))

function Login() {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Dropdown />
      <LoginForm getUser={getUser} />
    </div>
  )
}

async function getUser(values, setError) {
  console.log(`Welcome ${values.email} your password is ${values.password}`)

  const url = "http://localhost:8080/login"

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })
    const json = await response.json()

    if (response.status !== 200) {
      console.log(json.message)
    } else {
      console.log("Logged in")
      return
    }
  } catch (error) {
    console.log(error)
  }
}

export default Login
