import React from "react"
import CompanyRegistration from "../CompanyRegistration/CompanyRegistration"
import CandidateRegistration from "../CandidateRegistration/CandidateRegistration"
import Dropdown from "../../Menu/Dropdown"
import { makeStyles } from "@material-ui/core/styles"
import { useHistory } from "react-router-dom"
import { getRegisterUserType } from "../../handleCookie.js"

const useStyles = makeStyles((theme) => ({
    root: {
        fontFamily: "Lato",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
    },
}))

function Register(props) {
    let userType
    if (props.userType !== null) {
        userType = props.userType
    } else {
        userType = getRegisterUserType(document.cookie)
    }
    const classes = useStyles()
    let history = useHistory()

    return (
        <div className={classes.root}>
            <Dropdown />
            {userType === "candidate" ? <CandidateRegistration /> : userType === "company" ? <CompanyRegistration /> : history.push(`/`)}
        </div>
    )
}

export default Register
