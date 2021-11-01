import Navbar from "../Navbar/Navbar.js"
import { useState, useEffect } from "react"
import CandidateCard from "../Components/CandidateCard"
import CancelIcon from "@material-ui/icons/Cancel"
import CheckCircleIcon from "@material-ui/icons/CheckCircle"
import { IconButton } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { Zoom, Slide } from "@mui/material"
import ApplicationStatus from "../Components/ApplicationStatus.js"
import JobBoardDisplayJobs from "../CandidateArea/JobBoardDisplayJobs.js"

const useStyles = makeStyles((theme) => ({
    root: {
        fontFamily: "Lato",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        maxHeight: "100vh",
        paddingTop: "2rem",
        backgroundColor: "#fff4dc",
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
        // position: "relative",

        // position: "absolute",
    },

    deck: {
        display: "flex",
        justifyContent: "center",
    },
}))

function ReviewCandidates() {
    const classes = useStyles()
    const [enter, setEnter] = useState(false)
    const [swipeLeft, setSwipeLeft] = useState(false)
    const [swipeRight, setSwipeRight] = useState(false)
    const [candidates, setCandidates] = useState(null)
    const [counter, setCounter] = useState(0)

    const handleEnter = () => {
        setEnter((prev) => !prev)
    }

    const handleSwipeLeft = () => {
        setSwipeLeft((prev) => !prev)
    }

    useEffect(() => {
        async function getCandidates(jobID) {
            const response = await fetch(`http://localhost:8080/applications/review/${jobID}`)
            const json = await response.json()
            setCandidates(json)
        }
        getCandidates(4)
    }, [])

    async function sendCandidateStatus(applicationID) {
        const response = await fetch(`http://localhost:8080/applications/review/${applicationID}`)
    }

    // const makeCandidateDeck = () => {
    //     console.log(candidates)
    //     return candidates.map((candidate, i) => {
    //         return (
    //             <div className={classes.deck}>
    //                 {/* <Slide direction={swipeLeft ? "left" : swipeRight ? "right" : null} in={swipeLeft || swipeRight} mountOnEnter unmountOnExit>
    //                 <CandidateCard key={candidate.app_id} className={classes.card} number={i + 1} candidate={candidate} />
    //                 </Slide> */}
    //             </div>
    //         )
    //     })
    // }

    return (
        <div className={classes.root}>
            <Navbar match={true} />
            <main className={classes.main}>
                <h1>Find your company's perfect match</h1>
                <div className={classes.play}>
                    <IconButton className={classes.iconStyle}>
                        <CancelIcon
                            className={classes.icon}
                            style={{ color: "red" }}
                            onClick={() => {
                                handleSwipeLeft()
                                handleEnter()
                            }}
                        />
                    </IconButton>
                    {/* {candidates ? makeCandidateDeck() : null} */}
                    {candidates ? (
                        // <Zoom in={enter} style={{ transitionDelay: enter ? "2000ms" : "1000ms" }}>
                        <CandidateCard
                            key={candidates[counter].applicant_id}
                            className={classes.card}
                            number={counter + 1}
                            candidate={candidates[counter]}
                        />
                    ) : // </Zoom>
                    null}

                    <IconButton className={classes.iconStyle}>
                        <CheckCircleIcon className={classes.icon} style={{ color: "green" }} onClick={handleEnter} />
                    </IconButton>
                </div>
            </main>
        </div>
    )
}

export default ReviewCandidates
