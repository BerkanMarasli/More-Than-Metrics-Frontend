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

import { getUserID } from "../handleCookie.js"

import SelectTechnologies from "../Components/SelectTechnologies"
import Alert from "@mui/material/Alert"

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
        padding: "1rem",
    },

    box: {
        display: "grid",
        justifyItems: "end",
        // padding: "1rem",
    },

    row: {
        display: "flex",
        alignItems: "center",
    },

    input: {
        width: "20rem",
        margin: "0.5rem",
    },

    btn: {
        backgroundColor: "#FFBF50",
        color: "white",
        fontWeight: "bold",
        fontFamily: "Lato",
        marginBottom: "1rem",
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

const companyID = 1

function PostVacancyForm() {
    const [errorMsg, setErrorMsg] = useState("")
    const [postDetails, setPostDetails] = useState({
        title: "",
        salary: null,
        location: "",
        description: "",
        responsibilities: "",
        technology: [],
    })

    const classes = useStyles()

    const validationSchema = yup.object().shape({
        title: yup.string().required("Please include a title").min(2, "Must be more then one character"),
        salary: yup.number().required("Please include a salary").moreThan(-1, "Salary cannot be negative"),
        location: yup.string().required("Please include company location").min(2, "Must be more than one character"),
        technology: yup.array().min(1, "Please select at least 1 technology").required("Please select at least one technology"),
        responsibilities: yup.string().required("Please include at least one responsibility"),
        description: yup.string().max(600).required("Please include a description < 600 characters"),
    })

    async function postJob(values, setErrorMsg, companyID) {
        const url = `http://localhost:8080/jobs`

        const { title, salary, location, description, responsibilities, technology } = values

        const responsibilitiesArray = responsibilities.split(", ")
        // console.log(responsibilitiesArray)
        console.log(technology)

        const techIDArray = technology.map((tech) => {
            return tech.technology_id
        })
        console.log(techIDArray)
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    companyID: 1,
                    jobTitle: title,
                    salary: salary,
                    location: location,
                    jobDesc: description,
                    keyResponsibilities: responsibilitiesArray,
                    keyTechnologies: techIDArray,
                }),
            })

            const json = await response.json()
            console.log(json)

            if (response.status === 200) {
                setErrorMsg(json.message)
                setPostDetails({
                    title: "",
                    salary: null,
                    location: "",
                    description: "",
                    responsibilities: [],
                    technology: [],
                })
            } else {
                setErrorMsg("")
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className={classes.root}>
            <h1 style={{ margin: "0px", fontFamily: "Lato", color: "gray" }}>Job Title</h1>
            <Formik
                initialValues={postDetails}
                onSubmit={(values, actions) => {
                    postJob(values, setErrorMsg, companyID)
                }}
                validationSchema={validationSchema}>
                {({ values, touched, errors, handleChange, handleBlur, handleSubmit }) => {
                    return (
                        <Form onSubmit={handleSubmit}>
                            <Box container spacing={0} direction="column" alignItems="center" justifyContent="center" style={{ border: "none" }}>
                                <div>
                                    <TextField
                                        fullWidth
                                        label="Title"
                                        type="text"
                                        variant="outlined"
                                        name="title"
                                        value={values.title}
                                        onChange={handleChange("title")}
                                        onBlur={handleBlur}
                                        error={touched && touched.title && errors && errors.title}
                                        helperText={touched && touched.title && errors && errors.title ? errors.title : ""}
                                    />
                                    <TextField
                                        fullWidth
                                        label="Location"
                                        type="text"
                                        variant="outlined"
                                        name="location"
                                        value={values.location}
                                        onChange={handleChange("location")}
                                        onBlur={handleBlur}
                                        error={touched && touched.location && errors && errors.location}
                                        helperText={touched && touched.location && errors && errors.location ? errors.location : ""}
                                    />
                                    <TextField
                                        fullWidth
                                        label="Salary"
                                        type="number"
                                        variant="outlined"
                                        name="salary"
                                        value={values.salary}
                                        onChange={handleChange("salary")}
                                        onBlur={handleBlur}
                                        error={touched && touched.salary && errors && errors.salary}
                                        helperText={touched && touched.salary && errors && errors.salary ? errors.salary : ""}
                                    />
                                    <TextField
                                        fullWidth
                                        placeholder="Describe the function of the role and the type of candidate you're looking for"
                                        label="Description"
                                        type="number"
                                        variant="outlined"
                                        name="description"
                                        multiline
                                        maxRows={4}
                                        value={values.description}
                                        onChange={handleChange("description")}
                                        onBlur={handleBlur}
                                        error={touched && touched.description && errors && errors.description}
                                        helperText={touched && touched.description && errors && errors.description ? errors.description : ""}
                                    />
                                    <TextField
                                        fullWidth
                                        placeholder="Enter responsibilities (comma separated)"
                                        label="Responsibilities"
                                        type="text"
                                        variant="outlined"
                                        name="responsibilities"
                                        value={values.responsibilities}
                                        onChange={handleChange("responsibilities")}
                                        onBlur={handleBlur}
                                        error={touched && touched.responsibilities && errors && errors.responsibilities}
                                        helperText={
                                            touched && touched.responsibilities && errors && errors.responsibilities ? errors.responsibilities : ""
                                        }
                                    />
                                    <SelectTechnologies handleChange={handleChange} techArray={values.technology} />
                                    {errors.technology && touched.technology && <p className={classes.inputFeedback}>{errors.technology}</p>}

                                    <Button type="submit" color="primary" variant="contained">
                                        Post Job
                                    </Button>
                                    {errorMsg === "Added all job details" ? (
                                        <Alert severity="success">{errorMsg}</Alert>
                                    ) : errorMsg !== "" ? (
                                        <Alert severity="error">{errorMsg}</Alert>
                                    ) : null}
                                </div>
                            </Box>
                        </Form>
                    )
                }}
            </Formik>
        </div>
    )
}

export default PostVacancyForm
