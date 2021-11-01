import React, { useState, useEffect } from "react"
import ReactDOM from "react-dom"
import { useFormik } from "formik"
import * as yup from "yup"
import Button from "@material-ui/core/Button"
import { makeStyles } from "@material-ui/core/styles"

import { Box, TextField, InputAdornment, InputLabel, OutlinedInput, Slider, FormControl, IconButton } from "@mui/material/"
import SelectTechnologies from "../Components/SelectTechnologies"
import { Visibility, VisibilityOff } from "@material-ui/icons"

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

function CandidateProfileForm(props) {
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
            const response = await fetch(`http://localhost:8080/candidate/information/${id}`)
            const [json] = await response.json()
            const { candidate_name, headline, candidate_phone_number, candidate_years_in_industry_id, account_email } = json

            const nameArr = candidate_name.split(" ")
            console.log(nameArr)

            setUserDetails({
                firstName: nameArr[0],
                lastName: nameArr[1],
                email: account_email,
                phoneNumber: candidate_phone_number,
                yearsInIndustry: candidate_years_in_industry_id,
                technology: null,
                headline: headline,
                password: "",
                passwordConfirmation: "",
            })
        }
        getUserDetails(setUserDetails)
    }, [])

    console.log(userDetails)
    const validationSchema = yup.object({
        firstName: yup.string().required("Enter your first name").min(2, "Must be more then one character"),
        lastName: yup.string().required("Enter your last name").min(2, "Must be more than 1 characters"),
        email: yup.string().email("Email must be a valid email").required("Enter your email"),
        phoneNumber: yup.string().required("Enter your phone number details").min(15, "Please enter a valid phone number"),
        yearsInIndustry: yup.string().required("Please select years in industry"),
        technology: yup.array().required("Please select at least one technology"),
        headline: yup.string().max(100).required("Please enter your headline < 70 characters"),
        password: yup
            .string()
            .required("Enter your password")
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
            ),
        passwordConfirmation: yup.string().oneOf([yup.ref("password"), null], "Passwords must match"),
    })

    const formik = useFormik({
        initialValues: userDetails,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2))
        },
    })

    return (
        <div className={classes.root}>
            <h1>YOUR PROFILE</h1>
            <Box className={classes.box} component="form" noValidate autoComplete="off">
                <div className={classes.row}>
                    <InputLabel htmlFor="outlined-name">Name</InputLabel>
                    {disabled ? (
                        <OutlinedInput
                            disabled={disabled}
                            id="outlined-name"
                            className={classes.input}
                            placeholder="Enter the company name"
                            value={`${userDetails.firstName} ${userDetails.lastName}`}
                        />
                    ) : (
                        <div>
                            <FormControl sx={{ m: 1, width: "9.5rem" }} variant="outlined">
                                <TextField id="outlined-first" value={userDetails.firstName} label="First Name" onChange={formik.handleChange} />
                            </FormControl>
                            <FormControl sx={{ m: 1, width: "9.5rem" }} variant="outlined">
                                <TextField id="outlined-last" value={userDetails.lastName} label="Last Name" onChange={formik.handleChange} />
                            </FormControl>
                        </div>
                    )}
                </div>
                <div className={classes.row}>
                    <InputLabel htmlFor="outlined-description">Headline </InputLabel>
                    <OutlinedInput
                        disabled={disabled}
                        id="outlined-description"
                        className={classes.input}
                        placeholder="Describe the function of the role and the type of candidate you're looking for"
                        multiline
                        maxRows={4}
                        value={userDetails.headline}
                        onChange={formik.handleChange}
                    />
                </div>
                <div className={classes.row}>
                    <InputLabel htmlFor="slider-years" style={{ paddingRight: "15px" }}>
                        Years in Industry
                    </InputLabel>
                    {console.log(userDetails.yearsInIndustry)}
                    <Box
                        sx={{
                            width: "18rem",
                            paddingRight: "1.5rem",
                            paddingLeft: "1rem",
                            paddingTop: "2.5rem",
                            paddingBottom: "0.5rem",
                            display: "flex",
                            alignContents: "center",
                            justifyContents: "center",
                        }}>
                        <Slider
                            controlled
                            disabled={disabled}
                            id="slider-years"
                            size="medium"
                            valueLabelFormat={valueLabelFormat}
                            getAriaValueText={valueLabelFormat}
                            step={1}
                            value={userDetails.yearsInIndustry}
                            onChange={formik.handleChange}
                            marks
                            valueLabelDisplay="on"
                            min={0}
                            max={5}
                            style={disabled ? { color: "#FFBF50", opacity: "70%" } : { color: "#FFBF50" }}
                        />
                    </Box>
                </div>
                <div className={classes.row}>
                    <InputLabel htmlFor="select-technologies">Key technologies</InputLabel>
                    <SelectTechnologies className={classes.input} disabled={disabled} value={["JavaScript"]} />
                </div>
                <div className={classes.row}>
                    <InputLabel htmlFor="outlined-email">Number</InputLabel>
                    <OutlinedInput
                        disabled={disabled}
                        id="outlined-email"
                        className={classes.input}
                        placeholder="Enter a valid email address"
                        value={userDetails.phoneNumber}
                        onChange={formik.handleChange}
                    />
                </div>
                <div className={classes.row}>
                    <InputLabel htmlFor="outlined-email">Email</InputLabel>
                    <OutlinedInput
                        disabled={disabled}
                        id="outlined-email"
                        className={classes.input}
                        placeholder="Enter a valid email address"
                        value={userDetails.email}
                        onChange={formik.handleChange}
                    />
                </div>
                {!disabled ? (
                    <div className={classes.row}>
                        <InputLabel htmlFor="outlined-password">Password </InputLabel>
                        <FormControl sx={{ m: 1, width: "8.4rem" }} variant="outlined">
                            <TextField
                                id="outlined-password"
                                label="New password"
                                type={showPassword ? "text" : "password"}
                                value={userDetails.password}
                                onChange={formik.handleChange}
                            />
                        </FormControl>
                        <FormControl sx={{ m: 1, width: "8.4rem" }} variant="outlined">
                            <TextField
                                id="outlined-password"
                                label="Confirm"
                                type={showPassword ? "text" : "password"}
                                value={userDetails.passwordConfirmation}
                                onChange={formik.handleChange}
                            />
                        </FormControl>
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
            </Box>
            {disabled ? <Button onClick={() => setDisabled(false)}>Edit</Button> : <Button onClick={() => setDisabled(true)}>Save</Button>}
        </div>
    )

    // return (
    //     <div>
    //         <form onSubmit={formik.handleSubmit}>
    //             <TextField
    //                 fullWidth
    //                 id="email"
    //                 name="email"
    //                 label="Email"
    //                 value={formik.values.email}
    //                 onChange={formik.handleChange}
    //                 error={formik.touched.email && Boolean(formik.errors.email)}
    //                 helperText={formik.touched.email && formik.errors.email}
    //             />
    //             <TextField
    //                 fullWidth
    //                 id="password"
    //                 name="password"
    //                 label="Password"
    //                 type="password"
    //                 value={formik.values.password}
    //                 onChange={formik.handleChange}
    //                 error={formik.touched.password && Boolean(formik.errors.password)}
    //                 helperText={formik.touched.password && formik.errors.password}
    //             />
    //             <Button color="primary" variant="contained" fullWidth type="submit">
    //                 Submit
    //             </Button>
    //         </form>
    //     </div>
    // )
}

export default CandidateProfileForm
