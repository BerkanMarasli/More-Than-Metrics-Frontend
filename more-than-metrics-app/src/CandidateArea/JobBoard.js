import React, { useState } from "react"
import Navbar from "../Navbar/Navbar"
import JobBoardDisplayJobs from "./JobBoardDisplayJobs.js"
import ViewCompanyModal from "./ViewCompanyModal"
import ViewJobModal from "./ViewJobModal"
import ViewApplyModal from "./ViewApplyModal"
import { Paper, Box, styled } from "@mui/material"
import { makeStyles } from "@material-ui/core/styles"
import Footer from "../Navbar/Footer"

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

function JobBoard() {
    const classes = useStyles()
    const [companyViewed, setCompanyViewed] = useState(null)
    const [jobIDViewed, setJobIDViewed] = useState(null)
    const [jobIDApplied, setJobIDApplied] = useState(null)
    const [openViewCompany, setOpenViewCompany] = useState(false)
    const [openViewJob, setOpenViewJob] = useState(false)
    const [openViewApply, setOpenViewApply] = useState(false)

    // View Company
    const handleOpenViewCompany = (e) => {
        if (e.target.childElementCount !== 0) {
            setCompanyViewed(e.target.children[0].innerHTML)
        } else {
            setCompanyViewed(e.target.innerHTML)
        }
        setOpenViewCompany(true)
    }
    const handleCloseViewCompany = () => setOpenViewCompany(false)

    // View Job
    const handleOpenViewJob = (e) => {
        if (e.target.childElementCount !== 0) {
            setCompanyViewed(e.target.value)
        } else {
            setJobIDViewed(e.target.parentElement.value)
        }
        setOpenViewJob(true)
    }
    const handleCloseViewJob = () => setOpenViewJob(false)

    // View Apply
    const handleOpenViewApply = (e) => {
        if (e.target.childElementCount !== 0) {
            setJobIDApplied(e.target.value)
        } else {
            setJobIDApplied(e.target.parentElement.value)
        }
        setOpenViewApply(true)
    }
    const handleCloseViewApply = () => setOpenViewApply(false)

    // handle modals...
    const handleViewCompany = {
        openViewCompany: openViewCompany,
        handleOpenViewCompany: handleOpenViewCompany,
        handleCloseViewCompany: handleCloseViewCompany,
    }
    const handleViewJob = {
        openViewJob: openViewJob,
        handleOpenViewJob: handleOpenViewJob,
        handleCloseViewJob: handleCloseViewJob,
    }
    const handleViewApply = {
        openViewApply: openViewApply,
        handleOpenViewApply: handleOpenViewApply,
        handleCloseViewApply: handleCloseViewApply,
    }

    return (
        <div className={classes.root}>
            <Navbar userType={"candidate"} />
            <Box className={classes.box}>
                <Item className={classes.container}>
                    <h1 style={{ margin: "4px 0px", fontFamily: "Lato" }}>JOB BOARD</h1>
                    <JobBoardDisplayJobs handleViewCompany={handleViewCompany} handleViewJob={handleViewJob} handleViewApply={handleViewApply} />
                    {openViewCompany ? (
                        <ViewCompanyModal
                            companyViewed={companyViewed}
                            handleViewCompany={handleViewCompany}
                            handleViewJob={handleViewJob}
                            handleViewApply={handleViewApply}
                        />
                    ) : null}
                    {openViewJob ? <ViewJobModal jobIDViewed={jobIDViewed} handleViewJob={handleViewJob} handleViewApply={handleViewApply} /> : null}
                    {openViewApply ? <ViewApplyModal jobIDApplied={jobIDApplied} handleViewApply={handleViewApply} /> : null}
                </Item>
            </Box>
            <Footer userType={"candidate"} />
        </div>
    )
}

export default JobBoard
