import React, { useState, useEffect, Fragment } from "react";
// Material UI
import { makeStyles } from "@material-ui/styles";

import Dropdown from "../../Entry/Menu/Dropdown";
import CandidateForm from "./CandidateForm/CandidateForm";

// Yup
const yup = require("yup");

const useStyles = makeStyles((theme) => ({
  center: {
    // display: "flex",
    // flexDirection: "column",
    // justifyContent: "center",
    // alignContent: "center",
  },
  mb4: {
    marginBottom: 4,
  },
  mb1: {
    marginBottom: 1,
  },
  mb3: {
    marginBottom: 3,
  },
  mt2: {
    marginTop: 2,
  },
  mt4: {
    marginTop: 4,
  },
  ml4: {
    marginLeft: 4,
  },
}));

function Registration() {
  const [fetchedYearsCategory, setCategory] = useState(null);

  const signupSchema = yup.object().shape({
    firstName: yup
      .string()
      .required("Enter your first name")
      .min(2, "Must be more then one character"),
    lastName: yup
      .string()
      .required("Enter your last name")
      .min(2, "Must be more than 1 characters"),
    email: yup
      .string()
      .email("Email must be a valid email")
      .required("Enter your email"),

    phoneNumber: yup
      .string()
      .required("Enter your phone number details")
      .min(15, "Please enter a valid phone number"),
    yearsInIndustry: yup.string().required("Please select years in industry"),
    technology: yup.array().required("Please select at least one technology"),
    password: yup
      .string()
      .required("Enter your password")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      ),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  });

  useEffect(() => {
    async function getYearsInIndustryCategory(setCategory) {
      const response = await fetch("http://localhost:8080/years_in_industry");
      const json = await response.json();
      setCategory(json);
    }
    getYearsInIndustryCategory(setCategory);
  }, []);

  return (
    <div>
      <Dropdown />
      <CandidateForm createUser={createUser} signupSchema={signupSchema} />
    </div>
  );
}

async function createUser(values, isCandidate) {
  const url = `http://localhost:8080/candidate/register`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(),
    });
    const json = await response.json();

    if (!json.msg) {
      return "That username is taken. Try another.";
    } else {
      return "";
    }
  } catch (error) {
    console.log(error);
  }
}

export default Registration;
