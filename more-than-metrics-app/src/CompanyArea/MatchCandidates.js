import Navbar from "../Navbar/Navbar.js"
import { useState, useEffect } from "react"
import CandidateCard from "../Components/CandidateCard"
import CancelIcon from "@material-ui/icons/Cancel"
import CheckCircleIcon from "@material-ui/icons/CheckCircle"
import { IconButton } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { Alert } from "@mui/material"

const useStyles = makeStyles((theme) => ({
    root: {
        fontFamily: "Lato",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        maxHeight: "100vh",
        paddingTop: "2rem",
        backgroundColor: "#fff4dc",
        overflow: "hidden",
    },

    main: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },

    play: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: "5rem",
    },

    icon: {
        background: "none",
        fontSize: "5rem",
        opacity: "70%",
    },

    iconStyle: {
        margin: "5rem",
    },

    card: {
        width: "5rem",
    },

    deck: {
        display: "flex",
        justifyContent: "center",
    },
}))

function MatchCandidates() {
    const classes = useStyles()
    const [candidates, setCandidates] = useState(null)
    const [counter, setCounter] = useState(0)
    const [msg, setMsg] = useState({
        error: "",
        success: "All pending applicants have been reviewed",
    })

    const handleSwipeRight = () => {
        sendCandidateStatus(candidates[counter].application_id, true)
        setCounter(counter + 1)
    }

    const handleSwipeLeft = () => {
        sendCandidateStatus(candidates[counter].application_id, false)
        setCounter(counter + 1)
    }

    useEffect(() => {
        async function getCandidates(jobID) {
            const response = await fetch(process.env.REACT_APP_API_URL + `/applications/review/${jobID}`)
            const json = await response.json()
            setCandidates(json)
            console.log(json)
            if (!response.ok) {
                setMsg({ error: json.message })
            }
        }
        if (candidates === null) getCandidates(1)
    }, [candidates])

    async function sendCandidateStatus(id, result) {
        console.log(id)
        const response = await fetch(process.env.REACT_APP_API_URL + `/applications/assess/`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                applicationID: id,
                accepted: result,
            }),
        })
        const json = await response.json()
        console.log(json)
    }

    const renderCandidate = () => {
        if (counter >= candidates.length) {
            return (
                <Alert size="large" variant="filled" severity="success">
                    {msg.success}
                </Alert>
            )
        } else {
            if (candidates.length >= counter) {
                return (
                    <div className={classes.play}>
                        <IconButton className={classes.iconStyle}>
                            <CancelIcon className={classes.icon} style={{ color: "red" }} onClick={handleSwipeLeft} />
                        </IconButton>
                        <CandidateCard
                            key={candidates[counter].application_id}
                            className={classes.card}
                            number={counter + 1}
                            candidate={candidates[counter]}
                        />
                        <IconButton className={classes.iconStyle}>
                            <CheckCircleIcon className={classes.icon} style={{ color: "green" }} onClick={handleSwipeRight} />
                        </IconButton>
                    </div>
                )
            }
        }
    }
    return (
        <div className={classes.root}>
            <Navbar match={true} />
            <main className={classes.main}>
                <h1
                    style={{
                        color: "gray",
                        border: "solid 3pt #ffdf96",
                        borderRadius: "8px",
                        padding: "1rem",
                        position: "absolute",
                        top: "8%",
                    }}>
                    Find your company's perfect match 💛
                </h1>
                {candidates ? renderCandidate() : null}
                {msg.error ? (
                    <Alert size="large" variant="filled" severity="error">
                        {msg.error}
                    </Alert>
                ) : null}
            </main>
        </div>
    )
}

export default MatchCandidates
