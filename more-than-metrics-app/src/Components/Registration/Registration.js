import React, { useState } from "react";
import "./Registration.css";

import MuiPhoneNumber from "material-ui-phone-number";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";

import {
  Button,
  makeStyles,
  TextField,
  Box,
  MenuItem,
  Select,
} from "@material-ui/core";

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

  const isCandidate = props.isCandidate;

  const userDetails = false
    ? {
        firstName: "",
        lastName: "",
        phoneNumber: null,
        yearsInIndustry: null,
        technologies: [],
        email: "",
        password: "",
        passwordConfirmation: "",
      }
    : {
        companyName: "",
        numOfEmployees: null,
        maleToFemaleRatio: null,
        retentionRate: null,
        email: "",
        password: "",
        passwordConfirmation: "",
      };

  const [values, setValues] = useState(userDetails);
  const [error, setError] = useState({
    emailError: "",
    passwordError: "",
    firstNameError: "",
    lastNameError: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    const {
      firstName,
      lastName,
      phoneNumber,
      yearsInIndustry,
      technologies,
      email,
      password,
      passwordConfirmation,
    } = values;

    console.log(
      firstName,
      lastName,
      phoneNumber,
      yearsInIndustry,
      technologies,
      email,
      password,
      passwordConfirmation
    );

    const emailResponse = isEmailValid(email);
    const passwordResponse = isPasswordValid(password, passwordConfirmation);

    if (!emailResponse.length && !passwordResponse.length) {
      const response = createUser(values, isCandidate); //this will set the error returned from the backend in the front end
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
  }

  function handleChange(e) {
    const { name, value } = e.target;
    if (isCandidate) {
      setValues((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else {
      setValues((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  }

  return (
    <div className="registration-form">
      {/* {console.log(
        values.firstName,
        values.lastName,
        values.phoneNumber,
        values.yearsInIndustry,
        values.technologies,
        values.email,
        values.password,
        values.passwordConfirmation
      )} */}
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        <form className="registration-form" onSubmit={handleSubmit}>
          {true
            ? renderCandidateForm(values, error, handleChange)
            : renderCompanyForm(values, error, handleChange)}
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
              placeholder="Password"
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

function renderCandidateForm(values, error, handleChange) {
  return (
    <div>
      <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
        <OutlinedInput
          type="text"
          label="First name"
          placeholder="First name"
          name="firstName"
          sx={{ m: 1, width: "25ch" }}
          value={values.firstName}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
        <OutlinedInput
          type="text"
          label="Last Name"
          placeholder="Last name"
          name="lastName"
          sx={{ m: 1, width: "25ch" }}
          value={values.lastName}
          onChange={handleChange}
        />
      </FormControl>
      {/* <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
        <MuiPhoneNumber
          defaultCountry="gb"
          regions={"europe"}
          label="Phone number"
          placeholder="Phone Number"
          name="phoneNumber"
          sx={{ m: 1, width: "25ch" }}
          value={values.phoneNumber}
          onChange={handleChange}
        />
      </FormControl> */}
      <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
        <InputLabel id="years-in-industry-label">Years in industry</InputLabel>
        <Select
          labelId="years-in-industry-label"
          id="years-in-industry"
          value={values.yearsInIndustry}
          label="yearsInIndustry"
          onChange={handleChange}
        >
          <MenuItem value={values.yearsInIndustry}>Less than 5</MenuItem>
          <MenuItem value="5<10">5 to 10</MenuItem>
          <MenuItem value="10<">10+</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
        <OutlinedInput
          type="text"
          label="Technologies"
          placeholder="Technologies"
          name="technologies"
          sx={{ m: 1, width: "25ch" }}
          value={values.technologies}
          onChange={handleChange}
          variant="outlined"
        />
      </FormControl>
    </div>
  );
}

function renderCompanyForm(values, error, handleChange) {
  return (
    <div className="company-form">
      <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
        <OutlinedInput
          type="text"
          label="Company name"
          placeholder="Company name"
          name="companyName"
          value={values.companyName}
          onChange={handleChange}
          variant="outlined"
        />
      </FormControl>
      {error.firstNameError ? (
        <p className="error-msg">{error.firstNameError}</p>
      ) : null}
      <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
        <OutlinedInput
          type="number"
          label="No. Of Employees"
          placeholder="No. of Employees"
          name="numOfEmployees"
          value={values.numOfEmployees}
          onChange={handleChange}
          variant="outlined"
        />
      </FormControl>
      <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
        <OutlinedInput
          type="number"
          label="Male to Female ratio"
          placeholder="Male to Female ratio"
          name="maleToFemaleRatio"
          value={values.maleToFemaleRatio}
          onChange={handleChange}
          variant="outlined"
        />
      </FormControl>
      <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
        <OutlinedInput
          type="number"
          label="Retention Rate"
          placeholder="Retention Rate"
          name="retentionRate"
          value={values.retentionRate}
          onChange={handleChange}
          variant="outlined"
        />
      </FormControl>
    </div>
  );
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
