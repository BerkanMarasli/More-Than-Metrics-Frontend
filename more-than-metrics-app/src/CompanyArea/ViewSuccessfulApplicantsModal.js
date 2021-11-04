import React from "react"
import { Box, Modal } from "@mui/material"
import { makeStyles } from "@material-ui/core/styles"
import { useState, useEffect } from "react"

//Icons for AMAZING applicants
import CallIcon from "@mui/icons-material/Call"
import EmailIcon from "@mui/icons-material/Email"
import PersonIcon from "@mui/icons-material/Person"
import Person from "@mui/icons-material/Person"

import Chip from "@mui/material/Chip"

const useStyles = makeStyles((theme) => ({
    root: {
        display: "grid",
        justifyItems: "center",
        alignContent: "center",
    },

    box: {
        display: "flex",
        flexDirection: "column",
        alignSelf: "center",
    },

    row: {
        display: "flex",
        alignItems: "center",
    },

    rowTopHalf: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "8px",
    },

    input: {
        width: "25rem",
    },

    select: {
        textAlign: "left",
    },

    company: {
        margin: "0.5rem",
    },
}))

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "78vw",
    height: "75vh",
    bgcolor: "background.paper",
    border: "4px solid #FFBF50",
    borderRadius: "10px",
    boxShadow: 24,
    p: 5,
}

export default function ViewSuccessfulApplicantsModal(props) {
    const { openViewSuccessful, handleCloseViewSuccessful } = props.handleViewSuccessful
    const jobIDViewed = props.jobIDViewed
    const [acceptedApplicants, setAcceptedApplicants] = useState(null)
    const classes = useStyles()

    useEffect(() => {
        const fetchAcceptedApplicants = async () => {
            const acceptedApplicantsResponse = await fetch(`http://localhost:8080/applications/accepted/${jobIDViewed}`)
            const acceptedApplicantsJson = await acceptedApplicantsResponse.json()
            setAcceptedApplicants(acceptedApplicantsJson)
        }
        fetchAcceptedApplicants()
    }, [jobIDViewed])

    return acceptedApplicants ? (
        <Modal
            open={openViewSuccessful}
            onClose={handleCloseViewSuccessful}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <div className={classes.root}>
                <Box className={classes.box} sx={style}>
                    <h1>Accepted Applicants</h1>
                    {acceptedApplicants.message ? (
                        <h2>No Accepted Applicants</h2>
                    ) : (
                        <div>
                            {acceptedApplicants.map((applicant) => {
                                return (
                                    <div key={applicant.application_id}>
                                        <Chip>
                                            <PersonIcon />
                                            {applicant.candidate_name} - <EmailIcon />
                                            {applicant.account_email} - <CallIcon />
                                            {applicant.candidate_phone_number}
                                        </Chip>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </Box>
            </div>
        </Modal>
    ) : null
}
