import React, { useState } from "react"
import Navbar from "../Navbar/Navbar.js"
import Applied from "./Applied.js"
import CandidateProfileForm from "./CandidateProfileForm.js"
import CompanyProfile from "./CompanyProfile.js"
import PostVacancy from "./PostVacancy.js"
import { Paper, Box } from "@mui/material"
import { makeStyles } from "@material-ui/core/styles"
import { styled } from "@mui/material/styles"
import Footer from "../Navbar/Footer.js"
import Alert from "@mui/material/Alert"

const useStyles = makeStyles((theme) => ({
    root: {
        fontFamily: "Lato",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },

    box: {
        display: "flex",
        flexDirection: "row",
        [theme.breakpoints.down("md")]: {
            flexDirection: "column",
        },
        // marginTop: "3rem",
    },

    container: {
        border: "1px solid gray",
        margin: "1rem",
        width: "40vw",
    },
}))

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: "center",
    color: theme.palette.text.secondary,
    // height: "70vh",
    lineHeight: "60px",
}))

function Profile(props) {
    const classes = useStyles()
    const [errorMsg, setErrorMsg] = useState("")

    const renderItems = (props) => {
        if (props.userType === "candidate") {
            return (
                <Box className={classes.box}>
                    <Item className={classes.container}>
                        <CandidateProfileForm setErrorMsg={setErrorMsg} />
                        {errorMsg === "Updated candidate details!" ? <Alert severity="success">{errorMsg}</Alert> : null}
                    </Item>
                    <Item className={classes.container}>
                        <Applied />
                    </Item>
                </Box>
            )
        } else if (props.userType === "company") {
            return (
                <Box className={classes.box}>
                    <Item className={classes.container}>
                        <CompanyProfile />
                    </Item>
                    <Item className={classes.container}>
                        <PostVacancy />
                    </Item>
                </Box>
            )
        }
    }

    return (
        <div className={classes.root}>
            <Navbar userType={props.userType} />
            {renderItems(props)}
            <Footer userType={props.userType} />
        </div>
    )
}

export default Profile
