import React, { useState } from "react";
import "./Registration.css";
import { Button, makeStyles, TextField } from "@material-ui/core";

const MINIMUMPASSWORDLENGTH = 8;
const useStyles = makeStyles((theme) => ({
  btn: {
    margin: "1rem",
    fontFamily: "Lato",
    fontWeight: "bold",
  },
}));

function Registration(props) {
  const classes = useStyles();
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: null,
    yearsInIndustry: null,
    technologies: [],
    email: "",
    password: "",
    passwordConfirmation: "",
  });
  const [error, setError] = useState({
    emailError: "",
    passwordError: "",
    firstNameError: "",
    lastNameError: "",
  });

  const isCandidate = props.isCandidate;

  async function handleSubmit(e) {
    e.preventDefault();
    const { email, password, passwordConfirmation } = values;
    console.log(email, password, passwordConfirmation);

    const emailResponse = isEmailValid(email);
    const passwordResponse = isPasswordValid(password, passwordConfirmation);

    if (!emailResponse.length && !passwordResponse.length) {
      setError((prevState) => ({
        ...prevState,
        emailError: [],
        passwordError: [],
      }));
      const response = createUser(values, isCandidate); //this will set the error returned from the backend in the front end
      setError((prevState) => ({
        ...prevState,
        emailError: response,
      }));
    } else if (emailResponse.length) {
      setError((prevState) => ({
        ...prevState,
        emailError: emailResponse,
      }));
    } else if (passwordResponse.errorMsg !== "Valid") {
      setError((prevState) => ({
        ...prevState,
        passwordError: passwordResponse,
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
    <div className="registration-form">
      <form onSubmit={handleSubmit}>
        {true
          ? renderCandidateForm(values, error, handleChange)
          : renderCompanyForm(values, error, handleChange)}
        <TextField
          type="email"
          label="Email"
          placeholder="example@hotmail.com"
          name="email"
          value={values.email}
          onChange={handleChange}
          variant="outlined"
        />
        {error.emailError ? (
          <p className="error-msg">{error.emailError}</p>
        ) : null}
        <TextField
          type="password"
          label="Password"
          placeholder="Password"
          name="password"
          value={values.password}
          onChange={handleChange}
          variant="outlined"
        />
        <TextField
          type="password"
          label="Confirm Password"
          placeholder="Password"
          name="passwordConfirmation"
          value={values.passwordConfirmation}
          onChange={handleChange}
          variant="outlined"
        />
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
    </div>
  );
}

function renderCandidateForm(values, error, handleChange) {
  return (
    <div className="candidate-form">
      <TextField
        type="text"
        label="First name"
        placeholder="First name"
        name="First name"
        value={values.firstName}
        onChange={handleChange}
        variant="outlined"
      />
      {error.firstNameError ? (
        <p className="error-msg">{error.firstNameError}</p>
      ) : null}
      <TextField
        type="text"
        label="Last Name"
        placeholder="Last name"
        name="lastName"
        value={values.lastName}
        onChange={handleChange}
        variant="outlined"
      />
      <TextField
        type="number"
        label="Phone number"
        placeholder="Phone Number"
        name="phoneNumber"
        value={values.phoneNumber}
        onChange={handleChange}
        variant="outlined"
      />
      <TextField
        type="number"
        label="Years in Industry"
        placeholder="Years in industry"
        name="yearsInIndustry"
        value={values.yearsInIndustry}
        onChange={handleChange}
        variant="outlined"
      />
      <TextField
        type="text"
        label="Technologies"
        placeholder="Technologies"
        name="technologies"
        value={values.technologies}
        onChange={handleChange}
        variant="outlined"
      />
    </div>
  );
}
function renderCompanyForm(values, error, handleChange) {}

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
  const errorMessages = [];
  if (password !== confirmation) {
    errorMessages.push("Password does not match.");
  }
  if (password.length < MINIMUMPASSWORDLENGTH) {
    errorMessages.push("Password must be 8 characters or longer");
  }
  if (!/\d/.test(password)) {
    errorMessages.push("Password must contain at least one number");
  }
  if (!/[a-z]/.test(password)) {
    errorMessages.push("Password must contain lower case letters");
  }
  if (!/[A-Z]/.test(password)) {
    errorMessages.push("Password must contain upper case letters");
  }
  if (!/[ `£!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(password)) {
    errorMessages.push("Password must contain symbols");
  }
  return errorMessages;
}

async function createUser(values, isCandidate) {
  console.log(
    `Welcome ${values.email} your password is ${values.password} your password confirmation is ${values.passwordConfirmation}`
  );

  const urlTip = isCandidate ? "candidate/register" : "company/register";
  const url = `http://localhost:8080/${urlTip}`;

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
//"http://localhost:8080/candidate/register"
//"http://localhost:8080/candidate/login"
//"http://localhost:8080/company/login"
export default Registration;
