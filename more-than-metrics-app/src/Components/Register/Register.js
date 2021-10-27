import React from "react";
import CompanyRegistration from "../CompanyRegistration/CompanyRegistration";
import CandidateRegistration from "../CandidateRegistration/CandidateRegistration";
import Dropdown from "../../Entry/Menu/Dropdown";

function Register(props) {
  return (
    <div>
      {/* <Dropdown /> */}
      {props.userType === "candidate" ? (
        <CandidateRegistration />
      ) : (
        <CompanyRegistration />
      )}
    </div>
  );
}

export default Register;
