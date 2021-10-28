import React, { useState, useEffect, Fragment } from "react";
// Material UI
import { makeStyles } from "@material-ui/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { MenuItem, Select, InputAdornment } from "@material-ui/core";

import clsx from "clsx";

// Formik
import { Formik, Form } from "formik";

const useStyles = makeStyles(() => ({
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

function LoginForm(props) {
  const classes = useStyles();
  const { getUser } = props;

  return (
    <div>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={(values, actions) => {
          console.log(values);
          getUser(values);
        }}
      >
        {({
          values,
          touched,
          errors,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
        }) => {
          return (
            <Form onSubmit={handleSubmit}>
              <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
              >
                <div>
                  <Grid item>
                    <Card
                      style={{
                        marginBottom: 20,
                        maxWidth: 900,
                        marginTop: 20,
                      }}
                    >
                      <CardContent>
                        <Typography
                          variant="h3"
                          className={clsx(classes.center, classes.mb4)}
                          styles={{ fontFamily: "Lato" }}
                        >
                          Login
                        </Typography>
                        <Grid container spacing={2}>
                          <Grid item lg={12} md={12} xs={12}>
                            <TextField
                              fullWidth
                              label="Email"
                              type="email"
                              variant="outlined"
                              name="email"
                              value={values.email}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={Boolean(
                                touched &&
                                  touched.email &&
                                  errors &&
                                  errors.email
                              )}
                              helperText={
                                touched &&
                                touched.email &&
                                errors &&
                                errors.email
                                  ? errors.email
                                  : ""
                              }
                            />
                          </Grid>
                          <Grid item lg={12} md={12} xs={12}>
                            <TextField
                              fullWidth
                              label="Password"
                              type="password"
                              variant="outlined"
                              name="password"
                              value={values.password}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={Boolean(
                                touched &&
                                  touched.password &&
                                  errors &&
                                  errors.password
                              )}
                              helperText={
                                touched &&
                                touched.password &&
                                errors &&
                                errors.password
                                  ? errors.password
                                  : ""
                              }
                            />
                          </Grid>
                        </Grid>
                        <Button
                          type="submit"
                          color="primary"
                          variant="contained"
                          className={clsx(classes.mt4, classes.mb3)}
                        >
                          submit
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                </div>
              </Grid>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default LoginForm;
