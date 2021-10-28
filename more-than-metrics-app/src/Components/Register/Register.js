import React from "react";
import CompanyRegistration from "../CompanyRegistration/CompanyRegistration";
import CandidateRegistration from "../CandidateRegistration/CandidateRegistration";
import Dropdown from "../../Entry/Menu/Dropdown";

function Register(props) {
  console.log(props.userType);
  return (
    <div>
      {console.log(props.userType)}
      {/* <Dropdown /> */}
      {props.userType === "candidate" ? (
        <h1>In here</h1>
      ) : (
        // <CandidateRegistration />
        <CompanyRegistration />
      )}
    </div>
  );
}

export default Register;
