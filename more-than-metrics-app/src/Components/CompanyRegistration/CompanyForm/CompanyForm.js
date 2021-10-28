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
import { Formik, FieldArray, Form } from "formik";

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

function CompanyForm(props) {
  const classes = useStyles();
  const [fetchedNumOfEmployeesCategory, setNumOfEmployees] = useState(null);
  const { createUser, signupSchema } = props;

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
      <Formik
        initialValues={{
          img_url: "",
          companyName: "",
          companyBio: "",
          numOfEmployees: "",
          femalePercentage: "",
          retentionRate: "",
          email: "",
          password: "",
          passwordConfirmation: "",
        }}
        onSubmit={(values, actions) => {
          console.log(values);
          createUser(values);
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
                              className={clsx(
                                classes.center,

                                classes.mb4
                              )}
                              styles={{ fontFamily: "Lato" }}
                            >
                              Registration
                            </Typography>
                            <Grid container spacing={2}>
                              <Grid item lg={6} md={6} xs={12}>
                                <TextField
                                  fullWidth
                                  label="Company Logo"
                                  type="text"
                                  variant="outlined"
                                  name="img_url"
                                  value={values.img_url}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  error={Boolean(
                                    touched &&
                                      touched.img_url &&
                                      errors &&
                                      errors.img_url
                                  )}
                                  helperText={
                                    touched &&
                                    touched.img_url &&
                                    errors &&
                                    errors.img_url
                                      ? errors.img_url
                                      : ""
                                  }
                                />
                              </Grid>
                              <Grid item lg={6} md={6} xs={12}>
                                <TextField
                                  fullWidth
                                  label="Company Name"
                                  type="text"
                                  variant="outlined"
                                  name="companyName"
                                  value={values.companyName}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  error={Boolean(
                                    touched &&
                                      touched.companyName &&
                                      errors &&
                                      errors.companyName
                                  )}
                                  helperText={
                                    touched &&
                                    touched.companyName &&
                                    errors &&
                                    errors.companyName
                                      ? errors.companyName
                                      : ""
                                  }
                                />
                              </Grid>
                              <Grid item lg={12} md={12} xs={12}>
                                <TextField
                                  fullWidth
                                  multiline
                                  rows={5}
                                  label="Company Bio"
                                  type="text"
                                  variant="outlined"
                                  name="companyBio"
                                  value={values.companyBio}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  error={Boolean(
                                    touched &&
                                      touched.companyBio &&
                                      errors &&
                                      errors.companyBio
                                  )}
                                  helperText={
                                    touched &&
                                    touched.companyBio &&
                                    errors &&
                                    errors.companyBio
                                      ? errors.companyBio
                                      : ""
                                  }
                                />
                              </Grid>
                              <Grid item lg={6} md={6} xs={12}>
                                <Select
                                  fullWidth
                                  name="numOfEmployees"
                                  label="Number of Employees"
                                  value={values.numOfEmployees}
                                  onChange={handleChange}
                                  variant="outlined"
                                  onBlur={handleBlur}
                                  displayEmpty
                                  error={Boolean(
                                    touched &&
                                      touched.numOfEmployees &&
                                      errors &&
                                      errors.numOfEmployees
                                  )}
                                  helperText={
                                    touched &&
                                    touched.numOfEmployees &&
                                    errors &&
                                    errors.numOfEmployees
                                      ? errors.numOfEmployees
                                      : ""
                                  }
                                >
                                  <MenuItem value="" disabled>
                                    Number of Employees
                                  </MenuItem>
                                  {fetchedNumOfEmployeesCategory !== null
                                    ? fetchedNumOfEmployeesCategory.map(
                                        (category) => {
                                          return (
                                            <MenuItem
                                              key={
                                                category.years_in_industry_id
                                              }
                                              value={category.category}
                                            >
                                              {category.category}
                                            </MenuItem>
                                          );
                                        }
                                      )
                                    : null}
                                </Select>
                              </Grid>
                              <Grid item lg={6} md={6} xs={12}>
                                <TextField
                                  fullWidth
                                  label="Female percentage"
                                  type="number"
                                  variant="outlined"
                                  name="femalePercentage"
                                  value={values.femalePercentage}
                                  InputProps={{
                                    endAdornment: (
                                      <InputAdornment position="end">
                                        % Female
                                      </InputAdornment>
                                    ),
                                  }}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  error={Boolean(
                                    touched &&
                                      touched.femalePercentage &&
                                      errors &&
                                      errors.femalePercentage
                                  )}
                                  helperText={
                                    touched &&
                                    touched.femalePercentage &&
                                    errors &&
                                    errors.femalePercentage
                                      ? errors.femalePercentage
                                      : ""
                                  }
                                />
                              </Grid>
                              <Grid item lg={6} md={6} xs={12}>
                                <TextField
                                  fullWidth
                                  label="Retention Rate"
                                  type="number"
                                  variant="outlined"
                                  name="retentionRate"
                                  value={values.retentionRate}
                                  InputProps={{
                                    endAdornment: (
                                      <InputAdornment position="end">
                                        %
                                      </InputAdornment>
                                    ),
                                  }}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  error={Boolean(
                                    touched &&
                                      touched.retentionRate &&
                                      errors &&
                                      errors.retentionRate
                                  )}
                                  helperText={
                                    touched &&
                                    touched.retentionRate &&
                                    errors &&
                                    errors.retentionRate
                                      ? errors.retentionRate
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
                              <Grid item lg={6} md={6} xs={12}>
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
                              <Grid item lg={6} md={6} xs={12}>
                                <TextField
                                  fullWidth
                                  label="Confirm Password"
                                  type="password"
                                  variant="outlined"
                                  name="passwordConfirmation"
                                  value={values.passwordConfirmation}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  error={Boolean(
                                    touched &&
                                      touched.passwordConfirmation &&
                                      errors &&
                                      errors.passwordConfirmation
                                  )}
                                  helperText={
                                    touched &&
                                    touched.passwordConfirmation &&
                                    errors &&
                                    errors.passwordConfirmation
                                      ? errors.passwordConfirmation
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
                )}
              </FieldArray>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default CompanyForm;
