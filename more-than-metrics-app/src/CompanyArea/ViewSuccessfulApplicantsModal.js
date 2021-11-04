import React from "react"
import { Box, Modal } from "@mui/material"
import { makeStyles } from "@material-ui/core/styles"
import { useState, useEffect } from "react"

//Icons for AMAZING applicants
import CallIcon from "@mui/icons-material/Call"
import EmailIcon from "@mui/icons-material/Email"
import PersonIcon from "@mui/icons-material/Person"
import Paper from "@mui/material/Paper"
import Alert from "@mui/material/Alert"

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        justifyItems: "center",
        alignContent: "center",
    },
    title: {
        ontFamily: "Lato",
        display: "flex",
        justifyContent: "center",
        fontFamily: "Lato",
        color: "gray",
        margin: "4px 0px",
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
    candidateListDisplayBox: {
        display: "flex",
    },
    icons: {
        display: "flex",
        marginRight: "2px",
        position: "relative",
        alignItems: "end",
    },
    candidateList: {
        display: "flex",
        justifyContent: "space-evenly",
        borderRadius: "8px",
        padding: "10px",
        margin: "5px",
        backgroundColor: "#ffeab9",
        width: "100%",
    },
    candidateInfo: {
        display: "flex",
        marginBottom: "0.1em",
        margin: "0",
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
                    {acceptedApplicants.message ? (
                        <Alert severity="info">No Accepted Applicants</Alert>
                    ) : (
                        <div>
                            <h1 className={classes.title}>Accepted Applicants</h1>
                            {acceptedApplicants.map((applicant) => {
                                return (
                                    <div key={applicant.application_id} className={classes.candidateListDisplayBox}>
                                        <Paper label={applicant.candidate_name} className={classes.candidateList}>
                                            <div className={classes.icons}>
                                                <PersonIcon className={classes.icons} />
                                                <p className={classes.candidateInfo}>{applicant.candidate_name}</p>
                                            </div>

                                            <div className={classes.icons}>
                                                <EmailIcon className={classes.icons} />
                                                <p className={classes.candidateInfo}>{applicant.account_email}</p>
                                            </div>

                                            <div className={classes.icons}>
                                                <CallIcon className={classes.icons} />
                                                <p className={classes.candidateInfo}>{applicant.candidate_phone_number}</p>
                                            </div>
                                        </Paper>
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
