import React, { useState } from "react"
import Navbar from "../Navbar/Navbar.js"
import { Paper, Box, styled } from "@mui/material"
import { makeStyles } from "@material-ui/core/styles"

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
        // marginTop: "6rem",
    },

    container: {
        border: "1px solid gray",
        margin: "1rem",
        width: "80vw",
    },
}))

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: "center",
    color: theme.palette.text.secondary,
    // height: "70vh",
    lineHeight: "60px",
}))

function Dashboard() {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <Navbar userType={"candidate"} />
            <div>
                <Box className={classes.box}>
                    <Item className={classes.container}>
                        <h1 style={{ margin: "4px 0px" }}>Overview</h1>
                        {/* <JobBoardDisplayJobs handleViewCompany={handleViewCompany} handleViewJob={handleViewJob} handleViewApply={handleViewApply} /> */}
                    </Item>
                </Box>
                <Box className={classes.box}>
                    <Item className={classes.container}>
                        <h1 style={{ margin: "4px 0px" }}>Applications</h1>
                        {/* <JobBoardDisplayJobs handleViewCompany={handleViewCompany} handleViewJob={handleViewJob} handleViewApply={handleViewApply} /> */}
                    </Item>
                </Box>
            </div>
        </div>
    )
}

export default Dashboard
