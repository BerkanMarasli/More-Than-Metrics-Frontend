import React, { useState, useEffect, Fragment } from "react";
// Material UI
import { makeStyles } from "@material-ui/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import MuiPhoneNumber from "material-ui-phone-number";
import { MenuItem, Select } from "@material-ui/core";

import SelectTechnologies from "../../SelectTechnologies";

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

function CandidateForm(props) {
  const classes = useStyles();
  const [fetchedYearsCategory, setCategory] = useState(null);
  const { createUser, signupSchema } = props;

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
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          yearsInIndustry: "",
          technology: [],
          headline: "",
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
                              value={values.firstName}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={Boolean(
                                touched &&
                                  touched &&
                                  touched.firstName &&
                                  errors &&
                                  errors.firstName
                              )}
                              helperText={
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
                              value={values.lastName}
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
                            <MuiPhoneNumber
                              fullWidth
                              id="phoneNumber"
                              name="phoneNumber"
                              label="Phone number"
                              data-cy="user-phone"
                              defaultCountry="gb"
                              regions={"europe"}
                              value={values.phoneNumber}
                              onChange={handleChange("phoneNumber")}
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
                              fullWidth
                              name="yearsInIndustry"
                              label="Years in industry"
                              value={values.yearsInIndustry}
                              onChange={handleChange}
                              variant="outlined"
                              onBlur={handleBlur}
                              displayEmpty
                              error={Boolean(
                                touched &&
                                  touched.yearsInIndustry &&
                                  errors &&
                                  errors.yearsInIndustry
                              )}
                              helperText={
                                touched &&
                                touched.yearsInIndustry &&
                                errors &&
                                errors.yearsInIndustry
                                  ? errors.yearsInIndustry
                                  : ""
                              }
                            >
                              <MenuItem value="" disabled>
                                Years in industry
                              </MenuItem>
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
                          <Grid item lg={6} md={6} xs={12}>
                            <SelectTechnologies />
                          </Grid>
                          <Grid item lg={12} md={12} xs={12}>
                            <TextField
                              fullWidth
                              multiline
                              rows={2}
                              label="Candidate headline"
                              type="text"
                              variant="outlined"
                              name="headline"
                              value={values.headline}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={Boolean(
                                touched &&
                                  touched.headline &&
                                  errors &&
                                  errors.headline
                              )}
                              helperText={
                                touched &&
                                touched.headline &&
                                errors &&
                                errors.headline
                                  ? errors.headline
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
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default CandidateForm;