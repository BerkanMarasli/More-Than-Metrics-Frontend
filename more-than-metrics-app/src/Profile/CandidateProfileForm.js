import React, { useState, useEffect, Fragment } from "react"
// Material UI
import { makeStyles } from "@material-ui/styles"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import MuiPhoneNumber from "material-ui-phone-number"
import { MenuItem, Select } from "@material-ui/core"
import { Box, TextField, InputAdornment, InputLabel, OutlinedInput, Slider, FormControl, IconButton } from "@mui/material/"
import { Visibility, VisibilityOff } from "@material-ui/icons"

import Stack from "@mui/material/Stack"
import LinearProgress from "@mui/material/LinearProgress"

import SelectTechnologies from "../Components/SelectTechnologies"

import clsx from "clsx"
// Formik
import { Formik, FieldArray, Form } from "formik"

// Yup
const yup = require("yup")

const useStyles = makeStyles((theme) => ({
    root: {
        display: "grid",
        justifyItems: "center",
        alignContent: "center",
    },

    box: {
        display: "grid",
        justifyItems: "end",
    },

    row: {
        display: "flex",
        alignItems: "center",
    },

    input: {
        width: "20rem",
        margin: "0.5rem",
    },
}))

const marks = [
    {
        value: 0,
        label: "<1",
    },
    {
        value: 1,
        label: "1",
    },
    {
        value: 2,
        label: "2",
    },
    {
        value: 3,
        label: "3",
    },
    {
        value: 4,
        label: "4",
    },
    {
        value: 5,
        label: "5+",
    },
]

function Experiment(props) {
    const [userDetails, setUserDetails] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        yearsInIndustry: null,
        technology: [],
        headline: "",
        password: "",
        passwordConfirmation: "",
    })
    const [disabled, setDisabled] = useState(true)
    const [showPassword, setShowPassword] = useState(false)
    const { id } = props
    const classes = useStyles()

    const validationSchema = yup.object().shape({
        firstName: yup.string().required("Please include a first name").min(2, "Must be more then one character"),
        lastName: yup.string().required("Please include a last name").min(2, "Must be more than 1 characters"),
        email: yup.string().email("Email must be a valid email").required("Please enter a valid email address"),
        phoneNumber: yup.string().required("Please include a phone number").min(12, "Please enter a valid phone number"),
        yearsInIndustry: yup.string().required("Please select years in industry"),
        technology: yup.array().required("Please select at least one technology"),
        headline: yup.string().max(100).required("Please include a headline < 70 characters"),
        password: yup
            .string()
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
            ),
        passwordConfirmation: yup.string().oneOf([yup.ref("password"), null], "Passwords must match"),
    })

    function valueLabelFormat(value) {
        return marks.map((mark) => {
            if (mark.value === value) {
                return mark.label
            }
        })
    }
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const handleMouseDownPassword = (event) => {
        event.preventDefault()
    }

    useEffect(() => {
        async function getUserDetails(setUserDetails) {
            const response = await fetch(`http://localhost:8080/candidate/information/2`)
            const [json] = await response.json()
            console.log(json)
            const { candidate_name, headline, technologies, candidate_phone_number, candidate_years_in_industry_id, account_email } = json

            const nameArr = candidate_name.split(" ")

            setUserDetails({
                firstName: nameArr[0],
                lastName: nameArr[1],
                email: account_email,
                phoneNumber: candidate_phone_number,
                yearsInIndustry: candidate_years_in_industry_id,
                technology: technologies,
                headline: headline,
                password: "",
                passwordConfirmation: "",
            })
        }

        getUserDetails(setUserDetails)
    }, [])

    const checkDetails = () => {
        if (userDetails.firstName) {
            return (
                <div>
                    <Formik
                        initialValues={userDetails}
                        onSubmit={(values, actions) => {
                            console.log(values)
                            updateUser(values)
                        }}
                        validationSchema={validationSchema}>
                        {({ values, touched, errors, handleChange, handleBlur, handleSubmit }) => {
                            return (
                                <Form onSubmit={handleSubmit}>
                                    <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center">
                                        <div>
                                            <Grid item>
                                                <Card
                                                    style={{
                                                        marginBottom: 20,
                                                        maxWidth: 900,
                                                        marginTop: 20,
                                                    }}>
                                                    <CardContent>
                                                        <Typography
                                                            variant="h3"
                                                            className={clsx(
                                                                classes.center,

                                                                classes.mb4
                                                            )}>
                                                            Your Profile
                                                        </Typography>
                                                        <Grid container spacing={2}>
                                                            <div>
                                                                {disabled ? (
                                                                    <Grid item lg={6} md={6} xs={12}>
                                                                        <TextField
                                                                            disabled={disabled}
                                                                            id="outlined-name"
                                                                            label="Name"
                                                                            value={userDetails.firstName + " " + userDetails.lastName}
                                                                        />
                                                                    </Grid>
                                                                ) : (
                                                                    <div>
                                                                        <Grid item lg={6} md={6} xs={12}>
                                                                            <TextField
                                                                                fullWidth
                                                                                label="First Name"
                                                                                type="text"
                                                                                variant="outlined"
                                                                                name="firstName"
                                                                                value={values.firstName}
                                                                                onChange={handleChange("firstName")}
                                                                                onBlur={handleBlur}
                                                                                error={errors && errors.firstName}
                                                                                helperText={errors && errors.firstName ? errors.firstName : ""}
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
                                                                                onChange={handleChange("lastName")}
                                                                                onBlur={handleBlur}
                                                                                error={errors && errors.lastName}
                                                                                helperText={errors && errors.lastName ? errors.lastName : ""}
                                                                            />
                                                                        </Grid>
                                                                    </div>
                                                                )}
                                                            </div>

                                                            <Grid item lg={12} md={12} xs={12}>
                                                                <TextField
                                                                    fullWidth
                                                                    disabled={disabled}
                                                                    id="outlined-description"
                                                                    className={classes.input}
                                                                    multiline
                                                                    maxRows={4}
                                                                    label="Candidate headline"
                                                                    type="text"
                                                                    variant="outlined"
                                                                    name="headline"
                                                                    value={values.headline}
                                                                    onChange={handleChange("headline")}
                                                                    onBlur={handleBlur}
                                                                    error={errors && errors.headline}
                                                                    helperText={errors && errors.headline ? errors.headline : ""}
                                                                />
                                                            </Grid>
                                                            <Grid item lg={6} md={6} xs={12}>
                                                                <Slider
                                                                    disabled={disabled}
                                                                    aria-label="Years"
                                                                    id="slider-years"
                                                                    size="medium"
                                                                    name={"yearsInIndustry"}
                                                                    valueLabelFormat={valueLabelFormat}
                                                                    getAriaValueText={valueLabelFormat}
                                                                    step={1}
                                                                    marks
                                                                    defaultValue={values.yearsInIndustry}
                                                                    onChange={handleChange("yearsInIndustry")}
                                                                    valueLabelDisplay="on"
                                                                    min={0}
                                                                    max={5}
                                                                    style={disabled ? { color: "#FFBF50", opacity: "70%" } : { color: "#FFBF50" }}
                                                                />
                                                            </Grid>
                                                            <Grid item lg={6} md={6} xs={12}>
                                                                <SelectTechnologies
                                                                    disabled={disabled}
                                                                    handleChange={handleChange}
                                                                    value={values.technology}
                                                                    onBlur={handleBlur}
                                                                    error={errors && errors.technology}
                                                                    helperText={errors && errors.technology ? errors.technology : ""}
                                                                />
                                                            </Grid>
                                                            <Grid item lg={6} md={6} xs={12}>
                                                                <TextField
                                                                    fullWidth
                                                                    disabled={disabled}
                                                                    id="email"
                                                                    name="email"
                                                                    label="Email"
                                                                    type="email"
                                                                    variant="outlined"
                                                                    value={values.email}
                                                                    onChange={handleChange("email")}
                                                                    onBlur={handleBlur}
                                                                    error={errors && errors.email}
                                                                    helperText={errors && errors.email ? errors.email : ""}
                                                                />
                                                            </Grid>
                                                            <Grid item lg={6} md={6} xs={12}>
                                                                <MuiPhoneNumber
                                                                    fullWidth
                                                                    disabled={disabled}
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
                                                                    error={errors && errors.phoneNumber}
                                                                    helperText={errors && errors.phoneNumber ? errors.phoneNumber : ""}
                                                                />
                                                            </Grid>
                                                            {!disabled ? (
                                                                <div className={classes.row}>
                                                                    <Grid item lg={6} md={6} xs={12}>
                                                                        <TextField
                                                                            fullWidth
                                                                            label="Password"
                                                                            type={showPassword ? "text" : "password"}
                                                                            variant="outlined"
                                                                            name="password"
                                                                            value={values.password}
                                                                            onChange={handleChange("password")}
                                                                            onBlur={handleBlur}
                                                                            error={errors && errors.password}
                                                                            helperText={errors && errors.password ? errors.password : ""}
                                                                        />
                                                                    </Grid>
                                                                    <Grid item lg={6} md={6} xs={12}>
                                                                        <TextField
                                                                            fullWidth
                                                                            label="Confirm Password"
                                                                            type={showPassword ? "text" : "password"}
                                                                            variant="outlined"
                                                                            name="passwordConfirmation"
                                                                            value={values.passwordConfirmation}
                                                                            onChange={handleChange("passwordConfirmation")}
                                                                            onBlur={handleBlur}
                                                                            error={errors && errors.passwordConfirmation}
                                                                            helperText={
                                                                                errors && errors.passwordConfirmation
                                                                                    ? errors.passwordConfirmation
                                                                                    : ""
                                                                            }
                                                                        />
                                                                    </Grid>
                                                                    <InputAdornment position="end">
                                                                        <IconButton
                                                                            aria-label="toggle password visibility"
                                                                            onClick={handleClickShowPassword}
                                                                            onMouseDown={handleMouseDownPassword}
                                                                            edge="end">
                                                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                                                        </IconButton>
                                                                    </InputAdornment>
                                                                </div>
                                                            ) : null}
                                                        </Grid>
                                                        <Button
                                                            type="submit"
                                                            color="primary"
                                                            variant="contained"
                                                            className={clsx(classes.mt4, classes.mb3)}>
                                                            submit
                                                        </Button>
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                        </div>
                                    </Grid>
                                </Form>
                            )
                        }}
                    </Formik>
                    {disabled ? <Button onClick={() => setDisabled(false)}>Edit</Button> : <Button onClick={() => setDisabled(true)}>Save</Button>}
                </div>
            )
        } else
            return (
                <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
                    <LinearProgress color="success" />
                </Stack>
            )
    }

    return checkDetails()
}

function updateUser(values) {
    console.log("Hello")
    console.log("Inside update user. The values are: ", values)
}

export default Experiment
