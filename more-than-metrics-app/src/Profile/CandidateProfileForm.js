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

import { getUserID } from "../handleCookie.js"

import clsx from "clsx"
// Formik
import { Formik, FieldArray, Form } from "formik"

// Yup
const yup = require("yup")

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "1rem",
    },

    box: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "1rem",
    },

    row: {
        display: "flex",
        alignContent: "center",
        justifyContent: "center",
    },

    input: {
        width: "15rem",
        margin: "0.5rem",
    },

    btn: {
        backgroundColor: "#FFBF50",
        color: "white",
        fontWeight: "bold",
        fontFamily: "Lato",
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
// const candidateID = getUserID(document.cookie)
const candidateID = 2

function Experiment(props) {
    const { setErrorMsg } = props
    const [userDetails, setUserDetails] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: null,
        yearsInIndustry: null,
        technology: [],
        headline: "",
        password: "",
        passwordConfirmation: "",
    })
    const [disabled, setDisabled] = useState(true)
    const [showPassword, setShowPassword] = useState(false)
    const [loadedTechList, setLoadedTechList] = useState(null)
    const [refreshForUpdate, setRefreshForUpdate] = useState(false)

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
            const response = await fetch(`http://localhost:8080/company/information/4`)
            const [json] = await response.json()
            const { candidate_name, headline, technologies, candidate_phone_number, candidate_years_in_industry_id, account_email } = json
            const nameArr = candidate_name.split(" ")

            setLoadedTechList(technologies)
            setUserDetails({
                firstName: nameArr[0],
                lastName: nameArr[1],
                email: account_email,
                phoneNumber: candidate_phone_number,
                yearsInIndustry: candidate_years_in_industry_id,
                technology: [],
                headline: headline,
                password: "",
                passwordConfirmation: "",
            })
        }

        getUserDetails(setUserDetails)
    }, [])

    async function updateUser(values) {
        const url = `http://localhost:8080/candidate/update`

        const { firstName, lastName, email, phoneNumber, yearsInIndustry, technology, headline, password, passwordConfirmation } = values
        console.log(values)

        const techIDArray = technology.map((tech) => {
            return tech.technology_id
        })
        console.log(yearsInIndustry)
        console.log(techIDArray)

        if (!technology.length) {
            console.log("Didn't update technologies")
        }

        const loadedTechIDArray = loadedTechList.map((tech) => {
            return tech.technology_id
        })
        try {
            const response = await fetch(url, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    candidateID: candidateID,
                    candidateEmail: email,
                    candidatePassword: password,
                    candidatePasswordConfirmation: passwordConfirmation,
                    candidateName: `${firstName} ${lastName}`,
                    technologies: !technology.length ? loadedTechIDArray : techIDArray,
                    headline: headline,
                    candidatePhoneNumber: parseInt(phoneNumber.replaceAll(" ", "").replaceAll("+", "")),
                    yearsInIndustryID: yearsInIndustry,
                }),
            })
            setRefreshForUpdate(true)
            const json = await response.json()
            console.log(json)

            if (response.status === 200) {
                setDisabled(true)
                setErrorMsg(json.message)
            } else {
                setErrorMsg("")
            }

            // if (!json.msg) {
            //     return "That username is taken. Try another."
            // } else {
            //     setDisabled(true)
            //     return ""
            // }
        } catch (error) {
            console.log(error)
        }
    }

    const checkDetails = () => {
        if (userDetails.firstName) {
            return (
                <div className={classes.root}>
                    <h1 style={{ margin: "0px", fontFamily: "Lato", color: "gray" }}>YOUR PROFILE</h1>
                    <Button onClick={() => setDisabled(!disabled)}>Edit</Button>
                    {console.log(loadedTechList)}
                    {/*{console.log(userDetails.technology)} */}
                    <Formik
                        initialValues={userDetails}
                        onSubmit={(values, actions) => {
                            updateUser(values, candidateID)
                        }}
                        validationSchema={validationSchema}>
                        {({ values, touched, errors, handleChange, handleBlur, handleSubmit }) => {
                            return (
                                <Form onSubmit={handleSubmit}>
                                    <Box
                                        container
                                        spacing={0}
                                        direction="column"
                                        alignItems="center"
                                        justifyContent="center"
                                        style={{ border: "none" }}>
                                        <div>
                                            <Grid item>
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
                                                            techArray={values.technology}
                                                            loadedTechList={loadedTechList}
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
                                                                        errors && errors.passwordConfirmation ? errors.passwordConfirmation : ""
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
                                                {!disabled ? (
                                                    <Button
                                                        type="submit"
                                                        color="primary"
                                                        variant="contained"
                                                        className={clsx(classes.mt4, classes.mb3, classes.btn)}>
                                                        submit
                                                    </Button>
                                                ) : // <Button onClick={() => setDisabled(true)}>Save</Button>
                                                null}
                                            </Grid>
                                        </div>
                                    </Box>
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

export default Experiment
