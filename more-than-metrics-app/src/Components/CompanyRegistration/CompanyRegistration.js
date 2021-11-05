import React, { useState } from "react"
import CompanyForm from "../CompanyRegistration/CompanyForm/CompanyForm"

// Yup
const yup = require("yup")

function CompanyRegistration() {
    const [errorMsg, setErrorMsg] = useState("")
    const signupSchema = yup.object().shape({
        img_url: yup
            .string()
            .trim()

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
            .required("Please enter a password")
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
            ),
        passwordConfirmation: yup
            .string()
            .required("Please confirm password")
            .oneOf([yup.ref("password"), null], "Passwords must match"),
    })

    return (
        <div>
            <CompanyForm createUser={createUser} signupSchema={signupSchema} errorMsg={errorMsg} setErrorMsg={setErrorMsg} />
        </div>
    )
}

async function createUser(values, setErrorMsg) {
    const url = process.env.REACT_APP_API_URL + `/company/register`

    const { img_url, companyName, companyBio, numOfEmployees, femalePercentage, retentionRate, location, email, password, passwordConfirmation } =
        values

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                companyEmail: email,
                companyPassword: password,
                companyPasswordConfirmation: passwordConfirmation,
                companyName: companyName,
                companyBio: companyBio,
                numberOfEmployeesID: numOfEmployees,
                femalePercentage: femalePercentage,
                retentionRate: retentionRate,
                companyLocation: location,
                imageURL: img_url,
            }),
        })
        const json = await response.json()
        setErrorMsg(json.message)
    } catch (error) {
        console.log(error)
    }
}

export default CompanyRegistration
