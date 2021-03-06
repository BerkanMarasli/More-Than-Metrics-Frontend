import React, { useState } from "react"
import Navbar from "../Navbar/Navbar.js"
import DisplayApplications from "./DisplayApplications.js"
import { Paper, Box, styled } from "@mui/material"
import { makeStyles } from "@material-ui/core/styles"
import ApplicationsPie from "./ApplicationsPie.js"
import ViewSuccessfulApplicantsModal from "./ViewSuccessfulApplicantsModal.js"
import Footer from "../Navbar/Footer.js"

const useStyles = makeStyles((theme) => ({
    root: {
        fontFamily: "Lato",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
    },

    box: {
        display: "flex",
        flexDirection: "row",
        [theme.breakpoints.down("md")]: {
            flexDirection: "column",
        },
        // marginTop: "6rem",
    },

    container: {
        border: "1px solid gray",
        margin: "0.5rem",
        width: "80vw",
        padding: "0.5rem",
    },
}))

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: "center",
    color: theme.palette.text.secondary,
    // height: "70vh",
    lineHeight: "60px",
}))

function Dashboard(props) {
    const classes = useStyles()
    const [openViewSuccessful, setOpenViewSuccessful] = useState(false)
    const [jobIDViewed, setJobIDviewed] = useState(null)

    // View Successful
    const handleOpenViewSuccessful = (e) => {
        if (e.target.childElementCount !== 0) {
            setJobIDviewed(e.target.value)
        } else {
            setJobIDviewed(e.target.parentElement.value)
        }
        setOpenViewSuccessful(true)
    }
    const handleCloseViewSuccessful = () => setOpenViewSuccessful(false)

    const handleViewSuccessful = {
        openViewSuccessful: openViewSuccessful,
        handleOpenViewSuccessful: handleOpenViewSuccessful,
        handleCloseViewSuccessful: handleCloseViewSuccessful,
    }

    return (
        <div className={classes.root}>
            <Navbar userType={props.userType} />
            <div>
                <Box className={classes.box}>
                    <Item className={classes.container}>
                        <h1 style={{ margin: "0px", fontFamily: "Lato", color: "gray" }}>OVERVIEW</h1>
                        <ApplicationsPie />
                    </Item>
                </Box>
                <Box className={classes.box}>
                    <Item className={classes.container}>
                        <h1 style={{ margin: "0px", fontFamily: "Lato", color: "gray" }}>OPEN VACANCIES</h1>
                        <DisplayApplications handleViewSuccessful={handleViewSuccessful} />
                    </Item>
                </Box>
                {openViewSuccessful ? <ViewSuccessfulApplicantsModal handleViewSuccessful={handleViewSuccessful} jobIDViewed={jobIDViewed} /> : null}
            </div>
            <Footer userType={"company"} />
        </div>
    )
}

export default Dashboard
