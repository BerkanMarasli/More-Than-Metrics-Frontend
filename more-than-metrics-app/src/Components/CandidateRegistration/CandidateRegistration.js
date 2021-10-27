import React, { useState, useEffect } from "react";

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

function CandidateRegistration() {
  const classes = useStyles();

  const [fetchedYearsCategory, setCategory] = useState(null);
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

  useEffect(() => {
    console.log("hello");
    async function getYearsInIndustryCategory(setCategory) {
      const response = await fetch("http://localhost:8080/years_in_industry");
      const json = await response.json();
      setCategory(json);
    }
    getYearsInIndustryCategory(setCategory);
  }, []);

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
      `Submitted details: `,
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
              label="First name"
              placeholder="First name"
              name="firstName"
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
              value={values.lastName}
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

          <MuiPhoneNumber
            defaultCountry="gb"
            regions={"europe"}
            label="Phone number"
            placeholder="Phone Number"
            name="phoneNumber"
            sx={{ m: 1, width: "25ch" }}
            variant="outlined"
            value={values.phoneNumber}
            onChange={handleChange}
          />

          <FormControl sx={{ m: 1, width: "25ch" }} variant="filled">
            <Select
              labelId="years-in-industry-label"
              id="years-in-industry"
              name="yearsInIndustry"
              value={values.yearsInIndustry}
              onChange={handleChange}
              sx={{ m: 1, width: "25ch" }}
              variant="outlined"
            >
              {fetchedYearsCategory !== null
                ? fetchedYearsCategory.map((category) => {
                    return (
                      <MenuItem
                        key={category.years_in_industry_id}
                        value={category.category}
                      >
                        {category.category}
                      </MenuItem>
                    );
                  })
                : null}
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
            <OutlinedInput
              type="text"
              label="Technologies"
              placeholder="Technologies"
              name="technologies"
              value={values.technologies}
              onChange={handleChange}
              variant="outlined"
            />
          </FormControl>
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
    `Welcome ${values.firstName} ${values.lastName} ${values.email} your password is ${values.password} your password confirmation is ${values.passwordConfirmation}`
  );
  const url = `http://localhost:8080/candidate/register`;

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

export default CandidateRegistration;
