import React, { useState, useEffect, Fragment } from "react"
// Material UI
import { makeStyles } from "@material-ui/styles"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import { MenuItem, Select, InputAdornment } from "@material-ui/core"

import Stack from "@mui/material/Stack"
import LinearProgress from "@mui/material/LinearProgress"

import Alert from "@mui/material/Alert"

import clsx from "clsx"

// Formik
import { Formik, Form } from "formik"

const yup = require("yup")

const useStyles = makeStyles(() => ({
    center: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
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

function CompanyProfileForm(props) {
    const [userDetails, setUserDetails] = useState({
        img_url: "",
        companyName: "",
        companyBio: "",
        numOfEmployees: "",
        femalePercentage: "",
        retentionRate: "",
        location: "",
        email: "",
        password: "",
        passwordConfirmation: "",
    })
    const classes = useStyles()
    const [fetchedNumOfEmployeesCategory, setNumOfEmployees] = useState(null)
    const { createUser, errorMsg, setErrorMsg } = props

    const validationSchema = yup.object().shape({
        img_url: yup
            .string()
            .trim() //add regex for image link validation
            .required("Please include a company logo"),
        companyName: yup.string().required("Please include a company name").min(2, "Must be more than one character"),
        companyBio: yup.string().max(500).required("Please include a company bio < 500 characters"),
        numOfEmployees: yup.string().required("Please select number of employees"),
        femalePercentage: yup
            .number()
            .required("Please include the percentage of female employees")
            .moreThan(-1, "Percentage cannot be negative")
            .max(100, "Percentage has to be below 100 "),
        retentionRate: yup
            .number()
            .required("Please include the retention rate")
            .moreThan(-1, "Percentage cannot be negative")
            .max(100, "Percentage has to be below 100 "),
        location: yup.string().required("Please include company location").min(2, "Must be more than one character"),
        email: yup.string().email("Email must be a valid email").required("Please enter a valid email address"),
        password: yup
            .string()
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
            ),
        passwordConfirmation: yup.string().oneOf([yup.ref("password"), null], "Passwords must match"),
    })

    useEffect(() => {
        async function getUserDetails(setUserDetails) {
            const response = await fetch(`http://localhost:8080/company/information/1`)
            const [json] = await response.json()
            console.log(json)
            const {
                company_name,
                company_bio,
                location,
                category,
                company_female_employee_percentage,
                account_email,
                company_retention_rate,
                image_url,
            } = json

            console.log("Name + bio ", company_name, company_bio)
            console.log("Location + Category ", location, category)
            console.log("Female % + Account email ", company_female_employee_percentage, account_email)
            console.log("Image url + company_retention_rate ", company_retention_rate, image_url)

            setUserDetails({
                img_url: image_url,
                companyName: company_name,
                companyBio: company_bio,
                numOfEmployees: category,
                femalePercentage: company_female_employee_percentage,
                retentionRate: company_retention_rate,
                location: location,
                email: account_email,
                password: "",
                passwordConfirmation: "",
            })
        }

        getUserDetails(setUserDetails)
    }, [])

    useEffect(() => {
        async function getNumOfEmployees(setNumOfEmployees) {
            const response = await fetch("http://localhost:8080/number_of_employees")
            const json = await response.json()
            setNumOfEmployees(json)
        }
        getNumOfEmployees(setNumOfEmployees)
    }, [])

    const checkDetails = () => {
        if (userDetails.companyName) {
            return (
                <div>
                    <Formik
                        initialValues={userDetails}
                        onSubmit={(values, actions) => {
                            createUser(values, setErrorMsg)
                        }}
                        validationSchema={validationSchema}>
                        {({ values, touched, errors, handleChange, handleBlur, handleSubmit, setFieldValue }) => {
                            return (
                                <Form onSubmit={handleSubmit}>
                                    <div>
                                        <Card
                                            style={{
                                                marginBottom: 20,
                                                maxWidth: 900,
                                                marginTop: 20,
                                            }}>
                                            <CardContent>
                                                <Typography
                                                    variant="h3"
                                                    className={clsx(classes.center, classes.mb4)}
                                                    style={{
                                                        "letter-spacing": "0.01071em",
                                                        fontWeight: "bold",
                                                        margin: "4px 0px",
                                                        textAlign: "center",
                                                        fontSize: "2em",
                                                        fontFamily: "Lato",
                                                        marginBottom: "1rem",
                                                        color: "gray",
                                                    }}>
                                                    REGISTRATION
                                                </Typography>

                                                <TextField
                                                    fullWidth
                                                    label="Company Logo URL"
                                                    type="text"
                                                    variant="outlined"
                                                    name="img_url"
                                                    value={values.img_url}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    error={touched && touched.img_url && errors && errors.img_url}
                                                    helperText={touched && touched.img_url && errors && errors.img_url ? errors.img_url : ""}
                                                />

                                                <TextField
                                                    fullWidth
                                                    label="Company Name"
                                                    type="text"
                                                    variant="outlined"
                                                    name="companyName"
                                                    value={values.companyName}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    error={touched && touched.companyName && errors && errors.companyName}
                                                    helperText={
                                                        touched && touched.companyName && errors && errors.companyName ? errors.companyName : ""
                                                    }
                                                />

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
                                                    error={touched && touched.companyBio && errors && errors.companyBio}
                                                    helperText={touched && touched.companyBio && errors && errors.companyBio ? errors.companyBio : ""}
                                                />

                                                <Select
                                                    fullWidth
                                                    name="numOfEmployees"
                                                    label="Number of Employees"
                                                    value={values.numOfEmployees}
                                                    onChange={handleChange}
                                                    variant="outlined"
                                                    onBlur={handleBlur}
                                                    style={values.numOfEmployees ? { color: "black" } : { color: "grey" }}
                                                    displayEmpty
                                                    error={touched && touched.numOfEmployees && errors && errors.numOfEmployees}
                                                    helperText={
                                                        touched && touched.numOfEmployees && errors && errors.numOfEmployees
                                                            ? errors.numOfEmployees
                                                            : ""
                                                    }>
                                                    <MenuItem value="" disabled>
                                                        Number of Employees
                                                    </MenuItem>
                                                    {fetchedNumOfEmployeesCategory !== null
                                                        ? fetchedNumOfEmployeesCategory.map((category) => {
                                                              return (
                                                                  <MenuItem
                                                                      key={category.number_of_employees_id}
                                                                      value={category.number_of_employees_id}>
                                                                      {category.category}
                                                                  </MenuItem>
                                                              )
                                                          })
                                                        : null}
                                                </Select>

                                                <TextField
                                                    fullWidth
                                                    label="Female percentage"
                                                    type="number"
                                                    variant="outlined"
                                                    name="femalePercentage"
                                                    value={values.femalePercentage}
                                                    InputProps={{
                                                        endAdornment: <InputAdornment position="end">% Female</InputAdornment>,
                                                    }}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    error={touched && touched.femalePercentage && errors && errors.femalePercentage}
                                                    helperText={
                                                        touched && touched.femalePercentage && errors && errors.femalePercentage
                                                            ? errors.femalePercentage
                                                            : ""
                                                    }
                                                />

                                                <TextField
                                                    fullWidth
                                                    label="Retention Rate"
                                                    type="number"
                                                    variant="outlined"
                                                    name="retentionRate"
                                                    value={values.retentionRate}
                                                    InputProps={{
                                                        endAdornment: <InputAdornment position="end">%</InputAdornment>,
                                                    }}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    error={touched && touched.retentionRate && errors && errors.retentionRate}
                                                    helperText={
                                                        touched && touched.retentionRate && errors && errors.retentionRate ? errors.retentionRate : ""
                                                    }
                                                />

                                                <TextField
                                                    fullWidth
                                                    label="Location"
                                                    type="text"
                                                    variant="outlined"
                                                    name="location"
                                                    value={values.location}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    error={touched && touched.location && errors && errors.location}
                                                    helperText={touched && touched.location && errors && errors.location ? errors.location : ""}
                                                />

                                                <TextField
                                                    fullWidth
                                                    label="Email"
                                                    type="email"
                                                    variant="outlined"
                                                    name="email"
                                                    value={values.email}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    error={touched && touched.email && errors && errors.email}
                                                    helperText={touched && touched.email && errors && errors.email ? errors.email : ""}
                                                />

                                                <TextField
                                                    fullWidth
                                                    label="Password"
                                                    type="password"
                                                    variant="outlined"
                                                    name="password"
                                                    value={values.password}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    error={touched && touched.password && errors && errors.password}
                                                    helperText={touched && touched.password && errors && errors.password ? errors.password : ""}
                                                />

                                                <TextField
                                                    fullWidth
                                                    label="Confirm Password"
                                                    type="password"
                                                    variant="outlined"
                                                    name="passwordConfirmation"
                                                    value={values.passwordConfirmation}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    error={touched && touched.passwordConfirmation && errors && errors.passwordConfirmation}
                                                    helperText={
                                                        touched && touched.passwordConfirmation && errors && errors.passwordConfirmation
                                                            ? errors.passwordConfirmation
                                                            : ""
                                                    }
                                                />

                                                {errorMsg ? <Alert severity="error">{errorMsg}</Alert> : null}

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
                                    </div>
                                </Form>
                            )
                        }}
                    </Formik>
                </div>
            )
        } else {
            return (
                <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
                    <LinearProgress color="success" />
                </Stack>
            )
        }
    }
    return checkDetails()
}

export default CompanyProfileForm
