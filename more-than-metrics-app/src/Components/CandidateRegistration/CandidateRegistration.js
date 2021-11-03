import React from "react"
import CandidateForm from "./CandidateForm/CandidateForm"

const yup = require("yup")

function CandidateRegistration() {
    const signupSchema = yup.object().shape({
        firstName: yup.string().required("Please include a first name").min(2, "Must be more then one character"),
        lastName: yup.string().required("Please include a last name").min(2, "Must be more than 1 characters"),
        email: yup.string().email("Email must be a valid email").required("Please enter a valid email address"),
        phoneNumber: yup.number().required("Please include a phone number").min(15, "Please enter a valid phone number"),
        yearsInIndustry: yup.string().required("Please select years in industry"),
        technology: yup.array().required("Please select at least one technology"),
        headline: yup.string().max(100).required("Please include a headline < 70 characters"),
        password: yup
            .string()
            .required("Please enter a password")
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
            ),
        passwordConfirmation: yup.string().oneOf([yup.ref("password"), null], "Passwords must match"),
    })

    return (
        <div>
            <CandidateForm createUser={createUser} signupSchema={signupSchema} />
        </div>
    )
}

async function createUser(values) {
    console.log("Candidate details")
    const { firstName, lastName, email, phoneNumber, yearsInIndustry, technology, headline, password, passwordConfirmation } = values

    console.log(technology)

    console.log(`User details: `, firstName, lastName, email, phoneNumber, yearsInIndustry, technology, headline, password, passwordConfirmation)

    const url = `http://localhost:8080/candidate/register`

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                candidateName: `${firstName} ${lastName}`,
                candidateEmail: email,
                candidateNumber: phoneNumber,
                candidatePassword: password,
                yearsInIndustryID: yearsInIndustry,
                technologies: technology,
                headline: headline,
            }),
        })
        const json = await response.json()
        console.log(json)
        if (!json.msg) {
            return "That username is taken. Try another."
        } else {
            return ""
        }
    } catch (error) {
        console.log(error)
    }
}

export default CandidateRegistration
