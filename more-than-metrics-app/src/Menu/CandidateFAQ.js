import Dropdown from "./Dropdown"
import { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Accordion from "@mui/material/Accordion"
import AccordionSummary from "@mui/material/AccordionSummary"
import AccordionDetails from "@mui/material/AccordionDetails"
import Typography from "@mui/material/Typography"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import PendingIcon from "@mui/icons-material/Pending"
import CancelIcon from "@mui/icons-material/Cancel"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import { Link } from "react-router-dom"

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
    },

    fakeBtn: {
        border: "solid 1px grey",
        borderRadius: "4px",
        padding: "3px",
        marginTop: "10px",
    },

    side: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
}))

function CandidateFAQ(props) {
    const classes = useStyles()
    const [expanded, setExpanded] = useState(false)

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false)
    }

    return (
        <div id="can-faq" className={classes.root}>
            <h1 style={{ fontFamily: "Lato", color: "gray" }}>FREQUENTLY ASKED QUESTIONS</h1>
            <div style={{ maxWidth: "70vw" }}>
                <Accordion expanded={expanded === "panel1"} onChange={handleChange("panel1")}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        style={expanded === "panel1" ? { backgroundColor: "#fff4dc" } : null}>
                        <Typography style={expanded === "panel1" ? { fontWeight: "bold" } : null}>
                            How does More Than Metrics work for candidates?
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            More Than Metrics is designed to showcase the real you in all your unique glory 🤩 We believe there's so much more to a
                            person than their grades, or their previous salary, or their appearance and our aim is to showcase the individual beyond
                            those outdated heuristics. In order to get you into a work environment that makes you happy, we think the recruitment
                            process should focus on who you <em>really</em> are: your personality, your values, even your sense of humour. On More
                            Than Metrics, being authentically yourself is what will land you an interview, so keep shining bright, friend! 🌟
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === "panel2"} onChange={handleChange("panel2")}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                        style={expanded === "panel2" ? { backgroundColor: "#fff4dc" } : null}>
                        <Typography style={expanded === "panel2" ? { fontWeight: "bold" } : null}>How do I register as a candidate?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            We're so pleased you're ready to find your dream job with us!{" "}
                            <Link
                                to="/register"
                                onClick={() => props.setUserType("candidate")}
                                style={{ color: "inherit", textDecoration: "underline #FFBF50 2pt" }}>
                                Click here to be taken to the candidate registration form
                            </Link>
                            . You'll be asked to fill out the usual details, such as your name, number, email address and password. You'll also be
                            asked to write a short, attention-grabbing headline about yourself and specify which technologies you have experience
                            working with. In less than five minutes, you're ready to browse the jobs board and apply to roles 🙂 That's when the real
                            fun begins!
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === "panel3"} onChange={handleChange("panel3")}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3a-content"
                        id="panel3a-header"
                        style={expanded === "panel3" ? { backgroundColor: "#fff4dc" } : null}>
                        <Typography style={expanded === "panel3" ? { fontWeight: "bold" } : null}>How do I apply to a vacancy?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div className={classes.side}>
                            <img
                                alt=""
                                height="140px"
                                style={{ padding: "0 3rem", borderRadius: "50%" }}
                                src={process.env.PUBLIC_URL + "/assets/recruitment7.jpg"}
                            />
                            <Typography>
                                When you're{" "}
                                <Link to="/login" style={{ color: "inherit", textDecoration: "underline #FFBF50 2pt" }}>
                                    logged in
                                </Link>
                                , click <span className={classes.fakeBtn}>JOBS</span> to see a list of vacancies being advertised on our Job Board.
                                For each listing, you have the option to read more about the company and the job role in more detail. Make sure you
                                read the vacancy and company information in full and then, if you think it's the right fit for you, go ahead and click{" "}
                                <span className={classes.fakeBtn}>APPLY</span> ! On the application form, you can choose three prompts out of thirty
                                to answer, ranging from classic interview questions to less traditional options that will give you an opportunity to
                                showcase your individuality. Remember - there's no wrong question and no right answer!
                            </Typography>
                        </div>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === "panel4"} onChange={handleChange("panel4")}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel4a-content"
                        id="panel4a-header"
                        style={expanded === "panel4" ? { backgroundColor: "#fff4dc" } : null}>
                        <Typography style={expanded === "panel4" ? { fontWeight: "bold" } : null}>
                            How can I track the progress of my application?
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div className={classes.side}>
                            <Typography style={{ position: "relative" }}>
                                When you're{" "}
                                <Link to="/login" style={{ color: "inherit", textDecoration: "underline #FFBF50 2pt" }}>
                                    logged in
                                </Link>
                                , click <span className={classes.fakeBtn}>PROFILE</span> and on the right side, you'll see a list of roles you've
                                applied to. Next to the job title and company name, there's a status badge that lets you know the status of your
                                application. We use a traffic lights system to make it clear where your application is at: <br />
                                <CancelIcon sx={{ color: "red", opacity: "70%", position: "relative", top: "7px" }} /> a red cross means your
                                application was unsuccessful
                                <br />
                                <PendingIcon sx={{ color: "#FFBF50", position: "relative", top: "7px" }} /> an amber pending icon means your
                                application is still under review <br />
                                <CheckCircleIcon sx={{ color: "green", opacity: "70%", position: "relative", top: "7px" }} /> a green tick means
                                you've landed an interview and the company will reach out to you soon - congrats!
                            </Typography>
                            <img alt="" height="180px" style={{ padding: "0 6rem" }} src={process.env.PUBLIC_URL + "/assets/recruitment6.jpeg"} />
                        </div>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === "panel5"} onChange={handleChange("panel5")}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel5a-content"
                        id="panel5a-header"
                        style={expanded === "panel5" ? { backgroundColor: "#fff4dc" } : null}>
                        <Typography style={expanded === "panel5" ? { fontWeight: "bold" } : null}>
                            How can I update the information on my profile?
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            When you're{" "}
                            <Link to="/login" style={{ color: "inherit", textDecoration: "underline #FFBF50 2pt" }}>
                                logged in
                            </Link>
                            , click <span className={classes.fakeBtn}>PROFILE</span> and on the left side, you'll see your account information. Press
                            the <span className={classes.fakeBtn}>EDIT</span> button to enable editing and make changes to your personal details,
                            headline or technologies. Hit <span className={classes.fakeBtn}>SAVE</span> and you're ready to keep applying for jobs!
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === "panel6"} onChange={handleChange("panel6")}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel6a-content"
                        id="panel6a-header"
                        style={expanded === "panel6" ? { backgroundColor: "#fff4dc" } : null}>
                        <Typography style={expanded === "panel6" ? { fontWeight: "bold" } : null}>
                            Got a question that hasn't been answered here?
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            We're here to help!{" "}
                            <a href="mailto:" style={{ color: "inherit", textDecoration: "underline #FFBF50 2pt" }}>
                                Send us an email
                            </a>{" "}
                            and we'll aim to reply within 5 working days.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </div>
        </div>
    )
}

export default CandidateFAQ
