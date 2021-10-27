import React from "react";
import CompanyRegistration from "../CompanyRegistration/CompanyRegistration";
import CandidateRegistration from "../CandidateRegistration/CandidateRegistration";

function Register(props) {

  return (
    <div>
      {props.userType === "candidate" ? (
        <CandidateRegistration />
      ) : (
        <CompanyRegistration />
      )}
    </div>
  );
}

export default Register;
