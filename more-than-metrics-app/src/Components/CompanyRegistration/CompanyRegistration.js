import React, { useState, useEffect } from "react";
import FormControl from "@mui/material/FormControl";

import { Button, makeStyles, Box, OutlinedInput } from "@material-ui/core";

const MINIMUMPASSWORDLENGTH = 8;
const useStyles = makeStyles((theme) => ({
  btn: {
    margin: "1rem",
    fontFamily: "Lato",
    fontWeight: "bold",
  },
}));

function CompanyRegistration() {
  const classes = useStyles();

  const [values, setValues] = useState({
    companyName: "",
    numOfEmployees: undefined,
    maleToFemaleRatio: undefined,
    retentionRate: undefined,
    email: "",
    password: "",
    passwordConfirmation: "",
  });

  const [error, setError] = useState({
    emailError: "",
    passwordError: "",
    nameError: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    const {
      companyName,
      numOfEmployees,
      maleToFemaleRatio,
      retentionRate,
      email,
      password,
      passwordConfirmation,
    } = values;

    console.log(
      `Submitted details: `,
      companyName,
      numOfEmployees,
      maleToFemaleRatio,
      retentionRate,
      email,
      password,
      passwordConfirmation
    );

    const emailResponse = isEmailValid(email);
    const passwordResponse = isPasswordValid(password, passwordConfirmation);
    const nameResponse = isNameValid(companyName);

    if (!emailResponse.length && !passwordResponse.length) {
      const response = createUser(values);
      setError((prevState) => ({
        ...prevState,
        emailError: response,
      }));
    }
    if (!emailResponse.length) {
      setError((prevState) => ({
        ...prevState,
        emailError: "",
      }));
    }
    if (!passwordResponse.length) {
      setError((prevState) => ({
        ...prevState,
        passwordError: "",
      }));
    }
    if (emailResponse.length) {
      setError((prevState) => ({
        ...prevState,
        emailError: emailResponse,
      }));
    }
    if (passwordResponse.length) {
      setError((prevState) => ({
        ...prevState,
        passwordError: passwordResponse,
      }));
    }
    if (!nameResponse.length) {
      setError((prevState) => ({
        ...prevState,
        nameError: "",
      }));
    }
    if (nameResponse.length) {
      setError((prevState) => ({
        ...prevState,
        nameError: nameResponse,
      }));
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  return (
    <div className="candidate-registration-form">
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        <form className="registration-form" onSubmit={handleSubmit}>
          <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
            <OutlinedInput
              type="text"
              label="company-name"
              placeholder="Company name"
              name="companyName"
              value={values.companyName}
              onChange={handleChange}
            />
          </FormControl>
          {error.nameError ? (
            <p className="error-msg">{error.nameError}</p>
          ) : null}
          <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
            <OutlinedInput
              type="text"
              label="num-of-employees"
              placeholder="Num Of Employees"
              name="numOfEmployees"
              value={values.numOfEmployees}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
            <OutlinedInput
              type="percentage"
              label="male-to-female-ratio"
              placeholder="Male : Female"
              name="maleToFemaleRatio"
              value={values.maleToFemaleRatio}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
            <OutlinedInput
              type="number"
              label="retentionRate"
              placeholder="Retention Rate"
              name="retentionRate"
              value={values.retentionRate}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
            <OutlinedInput
              type="email"
              label="Email"
              placeholder="example@hotmail.com"
              name="email"
              value={values.email}
              onChange={handleChange}
            />
          </FormControl>
          {error.emailError ? (
            <p className="error-msg">{error.emailError}</p>
          ) : null}
          <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
            <OutlinedInput
              type="password"
              label="Password"
              placeholder="Password"
              name="password"
              value={values.password}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
            <OutlinedInput
              type="password"
              label="Confirm Password"
              placeholder="Confirm Password"
              name="passwordConfirmation"
              value={values.passwordConfirmation}
              onChange={handleChange}
            />
          </FormControl>
          {error.passwordError ? (
            <p className="error-msg">{error.passwordError}</p>
          ) : null}
          <Button
            className={classes.btn}
            variant="contained"
            size={"small"}
            type="submit"
          >
            Register
          </Button>
        </form>
      </Box>
    </div>
  );
}

function isNameValid(companyName) {
  const nameError = [];
  if (!companyName) {
    nameError.push("First name cannot be empty");
  }
  return nameError;
}

function isEmailValid(email) {
  const emailError = [];
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!email) {
    emailError.push("Email address is required");
  }
  if (!re.test(String(email).toLowerCase())) {
    emailError.push("Email address is invalid");
  }
  return emailError;
}

function isPasswordValid(password, confirmation) {
  const passwordError = [];
  if (password !== confirmation) {
    passwordError.push("Password does not match.");
  }
  if (password.length < MINIMUMPASSWORDLENGTH) {
    passwordError.push("Password must be 8 characters or longer");
  }
  if (!/\d/.test(password)) {
    passwordError.push("Password must contain at least one number");
  }
  if (!/[a-z]/.test(password)) {
    passwordError.push("Password must contain lower case letters");
  }
  if (!/[A-Z]/.test(password)) {
    passwordError.push("Password must contain upper case letters");
  }
  if (!/[ `£!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(password)) {
    passwordError.push("Password must contain symbols");
  }
  return passwordError;
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
