import React, { useState, useEffect, Fragment } from "react";

// Material UI
import { makeStyles } from "@material-ui/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import ClearIcon from "@material-ui/icons/Clear";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import AddIcon from "@material-ui/icons/Add";
import MuiPhoneNumber from "material-ui-phone-number";

import { MenuItem, Select } from "@material-ui/core";

import clsx from "clsx";

// Formik
import { Formik, FieldArray, Form } from "formik";
import Dropdown from "../../Entry/Menu/Dropdown";

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

const Registration = () => {
  const classes = useStyles();
  const [fetchedYearsCategory, setCategory] = useState(null);

  const signupSchema = yup.object().shape({
    data: yup.array().of(
      yup.object().shape({
        firstName: yup.string().required("Enter your first name"),
        lastName: yup.string().required("Enter your last name"),
        email: yup.string().required("Enter your email"),
        phoneNumber: yup
          .string()
          .min(13, "not 13")
          .required("Enter your phone number details"),
      })
    ),
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
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
        }}
        onSubmit={(values, actions) => {
          console.log(values);
        }}
        validationSchema={signupSchema}
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
              <FieldArray name="data">
                {({ insert, remove, push }) => (
                  <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justify="center"
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
                              className={clsx(
                                classes.center,

                                classes.mb4
                              )}
                            >
                              Registration
                            </Typography>

                            <Grid container spacing={2}>
                              <Grid item lg={6} md={6} xs={12}>
                                <TextField
                                  fullWidth
                                  label="First Name"
                                  type="text"
                                  variant="outlined"
                                  name="firstName"
                                  value={values && values.firstName}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  error={Boolean(
                                    touched &&
                                      touched &&
                                      touched.firstName &&
                                      errors &&
                                      errors &&
                                      errors.firstName
                                  )}
                                  helperText={
                                    touched &&
                                    touched &&
                                    touched.firstName &&
                                    errors &&
                                    errors.firstName
                                      ? errors.firstName
                                      : ""
                                  }
                                />
                              </Grid>
                              <Grid item lg={6} md={6} xs={12}>
                                <TextField
                                  fullWidth
                                  label="Last Name"
                                  type="text"
                                  variant="outlined"
                                  name="lastName"
                                  value={values && values.lastName}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  error={Boolean(
                                    touched &&
                                      touched.lastName &&
                                      errors &&
                                      errors.lastName
                                  )}
                                  helperText={
                                    touched &&
                                    touched.lastName &&
                                    errors &&
                                    errors.lastName
                                      ? errors.lastName
                                      : ""
                                  }
                                />
                              </Grid>

                              <Grid item lg={6} md={6} xs={12}>
                                <TextField
                                  fullWidth
                                  label="Email"
                                  type="email"
                                  variant="outlined"
                                  name="email"
                                  value={values && values.email}
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
                              <Grid item lg={6} md={6} xs={12}>
                                <MuiPhoneNumber
                                  name="phoneNumber"
                                  label="Phone number"
                                  data-cy="user-phone"
                                  defaultCountry="gb"
                                  regions={"europe"}
                                  value={values && values.phoneNumber}
                                  onChange={handleChange}
                                  variant="outlined"
                                  onBlur={handleBlur}
                                  error={Boolean(
                                    touched &&
                                      touched.phoneNumber &&
                                      errors &&
                                      errors.phoneNumber
                                  )}
                                  helperText={
                                    touched &&
                                    touched.phoneNumber &&
                                    errors &&
                                    errors.phoneNumber
                                      ? errors.phoneNumber
                                      : ""
                                  }
                                />
                              </Grid>
                              <Grid item lg={6} md={6} xs={12}>
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
                              </Grid>
                              <Grid></Grid>
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
                )}
              </FieldArray>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default Registration;
