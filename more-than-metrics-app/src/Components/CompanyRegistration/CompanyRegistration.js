import React, { useState, useEffect, Fragment } from "react";
// Material UI
import { makeStyles } from "@material-ui/styles";

import Dropdown from "../../Entry/Menu/Dropdown";
import CompanyForm from "../CompanyRegistration/CompanyForm/CompanyForm";

// Yup
const yup = require("yup");

function CompanyRegistration() {
  const [fetchedNumOfEmployeesCategory, setNumOfEmployees] = useState(null);

  const signupSchema = yup.object().shape({
    companyName: yup
      .string()
      .required("Enter your company name")
      .min(2, "Must be more then one character"),
    numOfEmployees: yup.string().required("Please select number of employees"),
    femalePercentage: yup
      .number()
      .required("Please include percentage of female employees")
      .positive("Percentage cannot be negative")
      .max(100, "Percentage has to be below 100 "),
    retentionRate: yup
      .number()
      .required("Please include retention rate")
      .positive("Percentage cannot be negative")
      .max(100, "Percentage has to be below 100 "),
    email: yup
      .string()
      .email("Email must be a valid email")
      .required("Enter your email"),
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
    async function getNumOfEmployees(setNumOfEmployees) {
      const response = await fetch("http://localhost:8080/number_of_employees");
      const json = await response.json();
      setNumOfEmployees(json);
    }
    getNumOfEmployees(setNumOfEmployees);
  }, []);

  return (
    <div>
      <Dropdown />
      <CompanyForm createUser={createUser} signupSchema={signupSchema} />
    </div>
  );
}

async function createUser(values) {
  const url = `http://localhost:8080/company/register`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
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

export default CompanyRegistration;
