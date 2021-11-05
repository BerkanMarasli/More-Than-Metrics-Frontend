import React, { useState, useEffect, Fragment } from "react"
// Material UI
import { makeStyles } from "@material-ui/styles"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import MuiPhoneNumber from "material-ui-phone-number"
import { InputLabel, MenuItem, Select } from "@material-ui/core"
import Alert from "@mui/material/Alert"

import SelectTechnologies from "../../SelectTechnologies"

import clsx from "clsx"

// Formik
import { Formik, FieldArray, Form } from "formik"

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
}))

function CandidateForm(props) {
    const classes = useStyles()
    const [fetchedYearsCategory, setCategory] = useState(null)
    const { createUser, signupSchema, errorMsg, setErrorMsg } = props

    useEffect(() => {
        async function getYearsInIndustryCategory(setCategory) {
            const response = await fetch(process.env.REACT_APP_API_URL + "/years_in_industry")
            const json = await response.json()
            setCategory(json)
        }
        getYearsInIndustryCategory(setCategory)
    }, [])

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
                    createUser(values, setErrorMsg)
                }}
                validationSchema={signupSchema}>
                {({ values, touched, errors, handleChange, handleBlur, handleSubmit }) => {
                    return (
                        <Form onSubmit={handleSubmit}>
                            <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center">
                                <div>
                                    <Grid item>
                                        <Card
                                            style={{
                                                // marginBottom: 20,
                                                maxWidth: 900,
                                                marginTop: "3rem",
                                            }}>
                                            <CardContent>
                                                <Typography
                                                    variant="h3"
                                                    className={clsx(
                                                        classes.center,

                                                        classes.mb4
                                                    )}
                                                    style={{
                                                        "letter-spacing": "0.01071em",
                                                        color: "gray",
                                                        fontWeight: "bold",
                                                        margin: "4px 0px",
                                                        textAlign: "center",
                                                        fontSize: "2em",
                                                        fontFamily: "Lato",
                                                        marginBottom: "1rem",
                                                    }}>
                                                    REGISTRATION
                                                </Typography>
                                                <Grid style={{ justifyContent: "center" }} container spacing={2}>
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
                                                            error={Boolean(touched && touched && touched.firstName && errors && errors.firstName)}
                                                            helperText={
                                                                touched && touched.firstName && errors && errors.firstName ? errors.firstName : ""
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
                                                            error={Boolean(touched && touched.lastName && errors && errors.lastName)}
                                                            helperText={
                                                                touched && touched.lastName && errors && errors.lastName ? errors.lastName : ""
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
                                                            error={Boolean(touched && touched.email && errors && errors.email)}
                                                            helperText={touched && touched.email && errors && errors.email ? errors.email : ""}
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
                                                            error={Boolean(touched && touched.phoneNumber && errors && errors.phoneNumber)}
                                                            helperText={
                                                                touched && touched.phoneNumber && errors && errors.phoneNumber
                                                                    ? errors.phoneNumber
                                                                    : ""
                                                            }
                                                        />
                                                    </Grid>
                                                    <Grid item lg={6} md={6} xs={12}>
                                                        <Select
                                                            fullWidth
                                                            name="yearsInIndustry"
                                                            labelId="years-in-industry-dropdown-label"
                                                            value={values.yearsInIndustry}
                                                            onChange={handleChange}
                                                            variant="outlined"
                                                            onBlur={handleBlur}
                                                            style={values.yearsInIndustry ? { color: "black" } : { color: "grey" }}
                                                            displayEmpty>
                                                            <MenuItem value="" disabled>
                                                                Years in industry
                                                            </MenuItem>
                                                            {fetchedYearsCategory !== null
                                                                ? fetchedYearsCategory.map((years) => {
                                                                      return (
                                                                          <MenuItem
                                                                              key={years.years_in_industry_id}
                                                                              value={years.years_in_industry_id}>
                                                                              {years.category}
                                                                          </MenuItem>
                                                                      )
                                                                  })
                                                                : null}
                                                        </Select>
                                                        {errors.yearsInIndustry && touched.yearsInIndustry && (
                                                            <div className="input-feedback" style={{ color: "red" }}>
                                                                {errors.yearsInIndustry}
                                                            </div>
                                                        )}
                                                    </Grid>
                                                    <Grid item lg={6} md={6} xs={12}>
                                                        <SelectTechnologies handleChange={handleChange} techArray={values.technology} />
                                                        {errors.technology && touched.technology && (
                                                            <div className="input-feedback" style={{ color: "red" }}>
                                                                {errors.technology}
                                                            </div>
                                                        )}
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
                                                            error={Boolean(touched && touched.headline && errors && errors.headline)}
                                                            helperText={
                                                                touched && touched.headline && errors && errors.headline ? errors.headline : ""
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
                                                            error={Boolean(touched && touched.password && errors && errors.password)}
                                                            helperText={
                                                                touched && touched.password && errors && errors.password ? errors.password : ""
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
                                                                touched && touched.passwordConfirmation && errors && errors.passwordConfirmation
                                                            )}
                                                            helperText={
                                                                touched && touched.passwordConfirmation && errors && errors.passwordConfirmation
                                                                    ? errors.passwordConfirmation
                                                                    : ""
                                                            }
                                                        />
                                                    </Grid>
                                                    {errorMsg ? <Alert severity="error">{errorMsg}</Alert> : null}
                                                </Grid>
                                                <div style={{ display: "flex", justifyContent: "center", margin: "8px 0px" }}>
                                                    <Button
                                                        type="submit"
                                                        color="primary"
                                                        variant="contained"
                                                        className={clsx(classes.mt4, classes.mb3)}
                                                        style={{
                                                            backgroundColor: "#FFBF50",
                                                            color: "white",
                                                            fontSize: "12pt",
                                                            fontFamily: "Lato",
                                                            fontWeight: "bold",
                                                            marginTop: "1rem",
                                                        }}>
                                                        REGISTER
                                                    </Button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                </div>
                            </Grid>
                        </Form>
                    )
                }}
            </Formik>
        </div>
    )
}

export default CandidateForm
