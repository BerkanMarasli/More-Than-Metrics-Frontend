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
import { Slider, Box, InputLabel, OutlinedInput, IconButton, Avatar, Badge, Popover } from "@mui/material/"
import { Visibility, VisibilityOff, AddPhotoAlternate } from "@material-ui/icons"
import FileUploadIcon from "@mui/icons-material/FileUpload"
import { getUserID } from "../handleCookie.js"
import { Formik, Form } from "formik"

const yup = require("yup")

const useStyles = makeStyles(() => ({
    root: {
        padding: "4px",
    },
    center: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
    },
    row: {
        display: "flex",
        alignContent: "center",
        justifyContent: "center",
        margin: "4px 0px",
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
    btn: {
        backgroundColor: "#FFBF50",
        color: "white",
        fontWeight: "bold",
        fontFamily: "Lato",
    },
}))

function CompanyProfileForm(props) {
    const companyID = getUserID(document.cookie)
    const { setErrorMsg } = props
    const [userDetails, setUserDetails] = useState({
        img_url: "",
        companyName: "",
        companyBio: "",
        numOfEmployees: null,
        femalePercentage: "",
        retentionRate: "",
        location: "",
        email: "",
        password: "",
        passwordConfirmation: "",
    })
    const classes = useStyles()
    const [fetchedNumOfEmployeesCategory, setNumOfEmployees] = useState(null)

    const [disabled, setDisabled] = useState(true)
    const [showPassword, setShowPassword] = useState(false)
    const [refreshForUpdate, setRefreshForUpdate] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null)

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
            const response = await fetch(process.env.REACT_APP_API_URL + `/company/information/${companyID}`)
            const [json] = await response.json()
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
    }, [refreshForUpdate])

    useEffect(() => {
        async function getNumOfEmployees(setNumOfEmployees) {
            const response = await fetch(process.env.REACT_APP_API_URL + "/number_of_employees")
            const json = await response.json()
            setNumOfEmployees(json)
        }
        getNumOfEmployees(setNumOfEmployees)
    }, [])

    function valueLabelFormat(value) {
        return fetchedNumOfEmployeesCategory.map((yearRange) => {
            if (yearRange.value === value) {
                return yearRange.category
            }
        })
    }
    async function updateUser(values, setErrorMsg) {
        const url = process.env.REACT_APP_API_URL + `/company/update/`

        const { img_url, companyName, companyBio, location, numOfEmployees, femalePercentage, retentionRate, email, password, passwordConfirmation } =
            values

        console.log(numOfEmployees)
        try {
            const response = await fetch(url, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    companyID: companyID,
                    companyEmail: email,
                    companyPassword: password,
                    companyPasswordConfirmation: passwordConfirmation,
                    companyName: companyName,
                    companyBio: companyBio,
                    companyLocation: location,
                    numberOfEmployeesID: numOfEmployees,
                    femalePercentage: femalePercentage,
                    retentionRate: retentionRate,
                    imageURL: img_url,
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
        } catch (error) {
            console.log(error)
        }
    }

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const handleMouseDownPassword = (event) => {
        event.preventDefault()
    }
    const handleOpenPopover = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }
    const open = Boolean(anchorEl)
    const id = open ? "simple-popover" : undefined

    const checkDetails = () => {
        if (userDetails.companyName) {
            return (
                <div className={classes.root}>
                    <Formik
                        initialValues={userDetails}
                        onSubmit={(values, actions) => {
                            updateUser(values, setErrorMsg)
                        }}
                        validationSchema={validationSchema}>
                        {({ values, touched, errors, handleChange, handleBlur, handleSubmit, setFieldValue }) => {
                            return (
                                <Form onSubmit={handleSubmit}>
                                    <div>
                                        <Box
                                            style={{
                                                marginBottom: 5,
                                                maxWidth: 900,
                                                marginTop: 5,
                                            }}>
                                            <h1 style={{ margin: "0px", fontFamily: "Lato", color: "gray" }}>YOUR PROFILE</h1>
                                            <CardContent>
                                                <div className={classes.row}>
                                                    <Button onClick={() => setDisabled(!disabled)}>Edit</Button>
                                                    <Badge
                                                        aria-describedby={id}
                                                        size="small"
                                                        overlap="circular"
                                                        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                                                        badgeContent={<AddPhotoAlternate onClick={handleOpenPopover} />}
                                                        style={disabled ? { color: "transparent", opacity: "70%" } : null}>
                                                        <Avatar
                                                            // alt={name}
                                                            src={values.img_url ? values.img_url : "/broken-image.jpg"}
                                                            style={{
                                                                height: "3rem",
                                                                width: "3rem",
                                                                padding: "5px",
                                                                border: "0.1px solid lightgray",
                                                                marginRight: "5px",
                                                            }}
                                                        />
                                                    </Badge>
                                                    <Popover
                                                        id={id}
                                                        open={open}
                                                        anchorEl={anchorEl}
                                                        onClose={handleClose}
                                                        anchorOrigin={{
                                                            vertical: "bottom",
                                                            horizontal: "left",
                                                        }}>
                                                        <Typography>
                                                            <OutlinedInput
                                                                size="small"
                                                                id="outlined-img"
                                                                className={classes.input}
                                                                style={{ width: "15rem" }}
                                                                placeholder="Enter the logo URL"
                                                                label="Company Logo URL"
                                                                type="text"
                                                                variant="outlined"
                                                                name="img_url"
                                                                value={values.img_url}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                error={touched && touched.img_url && errors && errors.img_url}
                                                                helperText={
                                                                    touched && touched.img_url && errors && errors.img_url ? errors.img_url : ""
                                                                }
                                                            />
                                                            <Button size="small" style={{ padding: "none" }} onClick={handleClose}>
                                                                <FileUploadIcon />
                                                            </Button>
                                                        </Typography>
                                                    </Popover>
                                                    <TextField
                                                        disabled={disabled}
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
                                                </div>
                                                <div className={classes.row}>
                                                    <TextField
                                                        fullWidth
                                                        disabled={disabled}
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
                                                </div>
                                                <InputLabel> Number of employees</InputLabel>
                                                {fetchedNumOfEmployeesCategory ? (
                                                    <Slider
                                                        disabled={disabled}
                                                        aria-label="NumOfEmployees"
                                                        id="slider-employees"
                                                        size="medium"
                                                        name={"numOfEmployees"}
                                                        valueLabelDisplay="auto"
                                                        valueLabelFormat={valueLabelFormat}
                                                        getAriaValueText={valueLabelFormat}
                                                        step={1}
                                                        marks
                                                        defaultValue={values.numOfEmployees}
                                                        onChange={handleChange("numOfEmployees")}
                                                        min={1}
                                                        max={6}
                                                        style={disabled ? { color: "#FFBF50", opacity: "70%" } : { color: "#FFBF50" }}
                                                    />
                                                ) : null}
                                                <div className={classes.row}>
                                                    <TextField
                                                        disabled={disabled}
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
                                                        disabled={disabled}
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
                                                </div>
                                                <TextField
                                                    fullWidth
                                                    disabled={disabled}
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
                                                    disabled={disabled}
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
                                                {!disabled ? (
                                                    <div className={classes.row}>
                                                        <Grid style={{ marginRight: "1rem" }} item lg={6} md={6} xs={12}>
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
                                                        <Grid style={{ marginRight: "1rem" }} item lg={6} md={6} xs={12}>
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
                                                                helperText={errors && errors.passwordConfirmation ? errors.passwordConfirmation : ""}
                                                            />
                                                        </Grid>
                                                        <InputAdornment>
                                                            <IconButton
                                                                style={{ marginTop: "3rem" }}
                                                                aria-label="toggle password visibility"
                                                                onClick={handleClickShowPassword}
                                                                onMouseDown={handleMouseDownPassword}>
                                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    </div>
                                                ) : null}
                                                {!disabled ? (
                                                    <Button type="submit" className={classes.btn}>
                                                        submit
                                                    </Button>
                                                ) : // <Button onClick={() => setDisabled(true)}>Save</Button>
                                                null}
                                            </CardContent>
                                        </Box>
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
