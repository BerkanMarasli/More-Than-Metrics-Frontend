import React from "react"
import { Box, Modal } from "@mui/material"
import { makeStyles } from "@material-ui/core/styles"
import { useState, useEffect } from "react"

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

    const classes = useStyles()
    // const [jobInfo, setJobInfo] = useState(null)

    // useEffect(() => {
    //     const fetchPrompts = async () => {
    //         const promptsResponse = await fetch("http://localhost:8080/prompts")
    //         const promptsJson = await promptsResponse.json()
    //         setPromptsList(promptsJson)
    //     }
    //     async function fetchJobData() {
    //         const jobDataResponse = await fetch(`http://localhost:8080/job/${jobIDApplied}`)
    //         const jobData = await jobDataResponse.json()
    //         setJobInfo(jobData[0])
    //     }
    //     fetchPrompts()
    //     fetchJobData()
    // }, [jobIDApplied])

    return true ? (
        <Modal
            open={openViewSuccessful}
            onClose={handleCloseViewSuccessful}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <div className={classes.root}>
                <Box className={classes.box} sx={style}>
                    <h1>Accepted Applicants</h1>
                </Box>
            </div>
        </Modal>
    ) : null
}
