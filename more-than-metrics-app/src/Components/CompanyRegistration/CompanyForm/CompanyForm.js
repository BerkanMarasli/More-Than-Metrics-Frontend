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

import Alert from "@mui/material/Alert"

import clsx from "clsx"

// Formik
import { Formik, Form } from "formik"

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
    inputFeedback: {
        fontFamily: "Roboto, Helvetica, Arial, sans-serif",
        fontWeight: "400",
        fontSize: "0.75rem",
        lineHeight: "1.66",
        letterSpacing: "0.03333em",
        textAlign: "left",
        marginTop: "3px",
        marginRight: "14px",
        color: "#d32f2f",
        marginBottom: "0",
        marginLeft: "14px",
    },
}))

function CompanyForm(props) {
    const classes = useStyles()
    const [fetchedNumOfEmployeesCategory, setNumOfEmployees] = useState(null)
    const { createUser, signupSchema, errorMsg, setErrorMsg } = props

    useEffect(() => {
        async function getNumOfEmployees(setNumOfEmployees) {
            const response = await fetch(process.env.REACT_APP_API_URL + "/number_of_employees")
            const json = await response.json()
            setNumOfEmployees(json)
        }
        getNumOfEmployees(setNumOfEmployees)
    }, [])

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
                    location: "",
                    email: "",
                    password: "",
                    passwordConfirmation: "",
                }}
                onSubmit={(values, actions) => {
                    createUser(values, setErrorMsg)
                }}
                validationSchema={signupSchema}>
                {({ values, touched, errors, handleChange, handleBlur, handleSubmit, setFieldValue }) => {
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
                                                <Grid style={{ justifyContent: "center" }} container spacing={2}>
                                                    <Grid item lg={6} md={6} xs={12}>
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
                                                            error={touched && touched.companyName && errors && errors.companyName}
                                                            helperText={
                                                                touched && touched.companyName && errors && errors.companyName
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
                                                            error={touched && touched.companyBio && errors && errors.companyBio}
                                                            helperText={
                                                                touched && touched.companyBio && errors && errors.companyBio ? errors.companyBio : ""
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
                                                        {errors.numOfEmployees && touched.numOfEmployees && (
                                                            <p className={classes.inputFeedback}>{errors.numOfEmployees}</p>
                                                        )}
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
                                                                endAdornment: <InputAdornment position="end">%</InputAdornment>,
                                                            }}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            error={touched && touched.retentionRate && errors && errors.retentionRate}
                                                            helperText={
                                                                touched && touched.retentionRate && errors && errors.retentionRate
                                                                    ? errors.retentionRate
                                                                    : ""
                                                            }
                                                        />
                                                    </Grid>
                                                    <Grid item lg={6} md={6} xs={12}>
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
                                                            helperText={
                                                                touched && touched.location && errors && errors.location ? errors.location : ""
                                                            }
                                                        />
                                                    </Grid>
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
                                                            error={touched && touched.email && errors && errors.email}
                                                            helperText={touched && touched.email && errors && errors.email ? errors.email : ""}
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
                                                            error={touched && touched.password && errors && errors.password}
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
                                                            error={touched && touched.passwordConfirmation && errors && errors.passwordConfirmation}
                                                            helperText={
                                                                touched && touched.passwordConfirmation && errors && errors.passwordConfirmation
                                                                    ? errors.passwordConfirmation
                                                                    : ""
                                                            }
                                                        />
                                                    </Grid>
                                                    {/* <div style={{ display: "flex", justifyContent: "center" }}> */}
                                                    {errorMsg ? <Alert severity="error">{errorMsg}</Alert> : null}
                                                    {/* </div> */}
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
                                                            // marginTop: "1rem",
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

export default CompanyForm
