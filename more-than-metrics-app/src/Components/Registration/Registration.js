import React from "react";
import CompanyRegistration from "../CompanyRegistration/CompanyRegistration";
import CandidateRegistration from "../CandidateRegistration/CandidateRegistration";

function Registration(props) {
  const isCandidate = props.isCandidate;

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

export default Registration;
