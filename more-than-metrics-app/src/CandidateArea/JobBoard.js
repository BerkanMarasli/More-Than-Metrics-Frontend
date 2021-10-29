import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import JobBoardDisplayJobs from "./JobBoardDisplayJobs.js";
import ViewCompanyModal from "./ViewCompanyModal";
import ViewJobModal from "./ViewJobModal";
import ApplyModal from "./ApplyModal";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    fontFamily: "Lato",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
}));

function JobBoard() {
  const classes = useStyles();
  const [companyViewed, setCompanyViewed] = useState(null);
  const [jobViewed, setJobViewed] = useState(null);
  const [openViewCompany, setOpenViewCompany] = useState(false);
  const handleOpenViewCompany = (e) => {
    if (e.target.childElementCount !== 0) {
      setCompanyViewed(e.target.children[0].innerHTML);
    } else {
      setCompanyViewed(e.target.innerHTML);
    }
    setOpenViewCompany(true);
  };
  const handleCloseViewCompany = () => setOpenViewCompany(false);
  const viewCompany = {
    openViewCompany: openViewCompany,
    handleOpenViewCompany: handleOpenViewCompany,
    handleCloseViewCompany: handleCloseViewCompany,
  };
  const [openViewJob, setOpenViewJob] = useState(false);
  const handleOpenViewJob = (e) => {
    if (e.target.childElementCount !== 0) {
      setCompanyViewed(e.target.value);
    } else {
      setJobViewed(e.target.parentElement.value);
    }
    setOpenViewJob(true);
  };
  const handleCloseViewJob = () => setOpenViewJob(false);
  const viewJob = {
    openViewJob: openViewJob,
    handleOpenViewJob: handleOpenViewJob,
    handleCloseViewJob: handleCloseViewJob,
  };
  const [openViewApply, setOpenViewApply] = useState(false);
  const handleOpenViewApply = () => setOpenViewApply(true);
  const handleCloseViewApply = () => setOpenViewApply(false);
  const viewApply = {
    openViewApply: openViewApply,
    handleOpenViewApply: handleOpenViewApply,
    handleCloseViewApply: handleCloseViewApply,
  };

  return (
    <div className={classes.root}>
      <Navbar userType={"candidate"} />
      <JobBoardDisplayJobs
        viewCompany={viewCompany}
        viewJob={viewJob}
        viewApply={viewApply}
      />
      {openViewCompany ? (
        <ViewCompanyModal
          companyViewed={companyViewed}
          viewCompany={viewCompany}
          viewJob={viewJob}
          viewApply={viewApply}
        />
      ) : null}
      {openViewJob ? (
        <ViewJobModal jobViewed={jobViewed} viewJob={viewJob} />
      ) : null}
      {openViewApply ? <ApplyModal viewApply={viewApply} /> : null}
    </div>
  );
}

export default JobBoard;
