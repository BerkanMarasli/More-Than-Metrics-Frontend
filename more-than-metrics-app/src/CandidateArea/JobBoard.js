import React, { useState } from "react"
import Navbar from "../Navbar/Navbar"
import JobBoardDisplayJobs from "./JobBoardDisplayJobs.js"
import ViewCompanyModal from "./ViewCompanyModal"
import ViewJobModal from "./ViewJobModal"
import ApplyModal from "./ApplyModal"
import { Paper, Box, styled } from "@mui/material"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
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
    marginTop: "6rem",
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
  height: "70vh",
  lineHeight: "60px",
}))

function JobBoard() {
  const classes = useStyles()
  const [companyViewed, setCompanyViewed] = useState(null)
  const [jobViewed, setJobViewed] = useState(null)
  const [openViewCompany, setOpenViewCompany] = useState(false)
  const handleOpenViewCompany = e => {
    if (e.target.childElementCount !== 0) {
      setCompanyViewed(e.target.children[0].innerHTML)
    } else {
      setCompanyViewed(e.target.innerHTML)
    }
    setOpenViewCompany(true)
  }
  const handleCloseViewCompany = () => setOpenViewCompany(false)
  const viewCompany = {
    openViewCompany: openViewCompany,
    handleOpenViewCompany: handleOpenViewCompany,
    handleCloseViewCompany: handleCloseViewCompany,
  }
  const [openViewJob, setOpenViewJob] = useState(false)
  const handleOpenViewJob = e => {
    if (e.target.childElementCount !== 0) {
      setCompanyViewed(e.target.value)
    } else {
      setJobViewed(e.target.parentElement.value)
    }
    setOpenViewJob(true)
  }
  const handleCloseViewJob = () => setOpenViewJob(false)
  const viewJob = {
    openViewJob: openViewJob,
    handleOpenViewJob: handleOpenViewJob,
    handleCloseViewJob: handleCloseViewJob,
  }
  const [openViewApply, setOpenViewApply] = useState(false)
  const handleOpenViewApply = () => setOpenViewApply(true)
  const handleCloseViewApply = () => setOpenViewApply(false)
  const viewApply = {
    openViewApply: openViewApply,
    handleOpenViewApply: handleOpenViewApply,
    handleCloseViewApply: handleCloseViewApply,
  }

  return (
    <div>
      <Navbar userType={"candidate"} />
      <Box className={classes.box}>
        <Item className={classes.container}>
          <h1>JOBS BOARD</h1>
          <JobBoardDisplayJobs viewCompany={viewCompany} viewJob={viewJob} viewApply={viewApply} />
          {openViewCompany ? (
            <ViewCompanyModal
              companyViewed={companyViewed}
              viewCompany={viewCompany}
              viewJob={viewJob}
              viewApply={viewApply}
            />
          ) : null}
          {openViewJob ? <ViewJobModal jobViewed={jobViewed} viewJob={viewJob} /> : null}
          {openViewApply ? <ApplyModal viewApply={viewApply} /> : null}
        </Item>
      </Box>
    </div>
  )
}

export default JobBoard
