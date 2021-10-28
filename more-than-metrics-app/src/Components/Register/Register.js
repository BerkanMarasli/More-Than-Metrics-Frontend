import React from "react";
import CompanyRegistration from "../CompanyRegistration/CompanyRegistration";
import CandidateRegistration from "../CandidateRegistration/CandidateRegistration";
import Dropdown from "../../Menu/Dropdown";
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

function Register(props) {
  console.log(props.userType);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Dropdown />
      {props.userType === "candidate" ? (
        <CandidateRegistration />
      ) : props.userType === "company" ? (
        <CompanyRegistration />
      ) : (
        props.redirectHome()
      )}
    </div>
  );
}

export default Register;
