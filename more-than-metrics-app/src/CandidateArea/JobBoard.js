import React, { useState } from "react"
import Navbar from "../Navbar/Navbar"
import JobBoardDisplayJobs from "./JobBoardDisplayJobs.js"
import ViewCompanyModal from "./ViewCompanyModal"
import ViewJobModal from "./ViewJobModal"
import ApplyModal from "./ApplyModal"
// import { makeStyles } from "@mui/styles"

// const useStyles = makeStyles({
//   "makeStyles-root-1": {
//     height: "15vh",
//   },
// })

function JobBoard() {
  // const classes = useStyles()
  const [openViewCompany, setOpenViewCompany] = useState(false)
  const handleOpenViewCompany = () => setOpenViewCompany(true)
  const handleCloseViewCompany = () => setOpenViewCompany(false)
  const viewCompany = {
    openViewCompany: openViewCompany,
    handleOpenViewCompany: handleOpenViewCompany,
    handleCloseViewCompany: handleCloseViewCompany,
  }
  const [openViewJob, setOpenViewJob] = useState(false)
  const handleOpenViewJob = () => setOpenViewJob(true)
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
      <JobBoardDisplayJobs viewCompany={viewCompany} viewJob={viewJob} viewApply={viewApply} />
      {openViewCompany ? (
        <ViewCompanyModal viewCompany={viewCompany} viewJob={viewJob} viewApply={viewApply} />
      ) : null}
      {/* {openViewCompany ? <ViewCompanyModal viewCompany={viewCompany} viewJob={viewJob} /> : null} */}
      {openViewJob ? <ViewJobModal viewJob={viewJob} /> : null}
      {openViewApply ? <ApplyModal viewApply={viewApply} /> : null}
    </div>
  )
}

export default JobBoard
