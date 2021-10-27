import React, { useState } from "react";

import FormControl from "@mui/material/FormControl";
import { Button, makeStyles, Box, OutlinedInput } from "@material-ui/core";

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

    const response = getUser(values, setError); //this will set the error returned from the backend in the front end
    setError((prevState) => ({
      ...prevState,
      emailError: response,
    }));
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  return (
    <div className="login-form">
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        <form onSubmit={handleSubmit}>
          <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
            <OutlinedInput
              type="email"
              label="Email"
              placeholder="example@hotmail.com"
              name="email"
              value={values.email}
              onChange={handleChange}
              variant="outlined"
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
      </Box>
    </div>
  );
}

async function getUser(values, setError) {
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
      setError("Invalid username/password");
    } else {
      setError("");
    }
  } catch (error) {
    console.log(error);
  }
}
export default Login;
