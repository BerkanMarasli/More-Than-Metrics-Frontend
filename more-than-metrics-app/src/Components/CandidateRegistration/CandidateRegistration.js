import React, { useState, useEffect } from "react";
import MuiPhoneNumber from "material-ui-phone-number";
import FormControl from "@mui/material/FormControl";

import DevIcon, { iconList, RandomIcon } from "devicon-react-svg";

import {
  Button,
  makeStyles,
  Box,
  MenuItem,
  Select,
  OutlinedInput,
  InputLabel,
} from "@material-ui/core";

const MINIMUMPASSWORDLENGTH = 8;
const devIconStyle = {
  fill: "thistle",
  width: "150px",
};
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
    phoneNumber: "",
    yearsInIndustry: null,
    technology: [],
    email: "",
    password: "",
    passwordConfirmation: "",
  });

  const [error, setError] = useState({
    emailError: "",
    passwordError: "",
    nameError: "",
  });

  useEffect(() => {
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
      technology,
      email,
      password,
      passwordConfirmation,
    } = values;

    console.log("This is the user phone Number: ", phoneNumber);

    console.log(
      `Submitted details: `,
      firstName,
      lastName,
      phoneNumber,
      yearsInIndustry,
      technology,
      email,
      password,
      passwordConfirmation
    );

    const emailResponse = isEmailValid(email);
    const passwordResponse = isPasswordValid(password, passwordConfirmation);
    const nameResponse = isNameValid(firstName, lastName);

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
    console.log(e.target.value);
    const { name, value } = e.target;
    setValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function handlePhoneChange(e) {
    setValues((prevState) => ({
      ...prevState,
      phoneNumber: e,
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
          {error.nameError ? (
            <p className="error-msg">{error.nameError}</p>
          ) : null}
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
            name="phoneNumber"
            label="Phone number"
            data-cy="user-phone"
            defaultCountry="gb"
            regions={"europe"}
            value={values.phoneNumber}
            onChange={handlePhoneChange}
            sx={{ m: 1, width: "25ch" }}
            variant="outlined"
          />
          <FormControl sx={{ m: 1, width: "25ch" }} variant="filled">
            <InputLabel id="years-in-industry-label">
              {values.yearsInIndustry ? null : "Years in industry"}
            </InputLabel>
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
            <Select
              labelId="technology-list"
              id="years-in-industry"
              name="technology"
              value={values.technology}
              onChange={handleChange}
              multiple
              sx={{ m: 1, width: "25ch" }}
              variant="outlined"
            >
              {iconList.length
                ? iconList.map((icon) => {
                    return (
                      <MenuItem key={icon} value={icon}>
                        <DevIcon style={devIconStyle} viewBox="0 0 32 32" />{" "}
                        {icon}
                      </MenuItem>
                    );
                  })
                : null}
            </Select>
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

function isNameValid(firstName, lastName) {
  const nameError = [];
  if (!firstName) {
    nameError.push("First name cannot be empty");
  }
  if (!lastName) {
    nameError.push("Last name cannot be empty");
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

async function createUser(values, isCandidate) {
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
