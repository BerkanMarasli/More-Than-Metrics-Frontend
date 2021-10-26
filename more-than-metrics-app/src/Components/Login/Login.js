import React, { useState } from "react";
import "./Login.css";
import { Button, makeStyles, TextField } from "@material-ui/core";

const MINIMUMPASSWORDLENGTH = 8;
const useStyles = makeStyles((theme) => ({
  btn: {
    margin: "1rem",
    fontFamily: "Lato",
    fontWeight: "bold",
  },
}));

function Login() {
  const classes = useStyles();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    emailError: "",
    passwordError: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    const { email, password } = values;
    console.log(email, password);

    const emailResponse = isEmailValid(email);
    const passwordResponse = isPasswordValid(password);

    if (!emailResponse.length && !passwordResponse.length) {
      setError((prevState) => ({
        ...prevState,
        emailError: [],
        passwordError: [],
      }));
      const response = getUser(values); //this will set the error returned from the backend in the front end
      setError((prevState) => ({
        ...prevState,
        emailError: response,
      }));
    } else if (emailResponse.length) {
      setError((prevState) => ({
        ...prevState,
        emailError: emailResponse,
      }));
    } else if (passwordResponse.length) {
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
        {error.passwordError ? (
          <p className="error-msg">{error.passwordError}</p>
        ) : null}
        <Button
          className={classes.btn}
          variant="contained"
          size={"small"}
          type="submit"
        >
          Login
        </Button>
      </form>
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

function isPasswordValid(password) {
  const errorMessages = [];
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

async function getUser(values) {
  console.log(`Welcome ${values.email} your password is ${values.password}`);

  const url = "http://localhost:8080/login";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const json = await response.json();

    if (!json.msg) {
      return "Invalid username/password";
    } else {
      return "";
    }
  } catch (error) {
    console.log(error);
  }
}
export default Login;
