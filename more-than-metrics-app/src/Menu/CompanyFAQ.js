import Dropdown from "./Dropdown"
import { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Accordion from "@mui/material/Accordion"
import AccordionSummary from "@mui/material/AccordionSummary"
import AccordionDetails from "@mui/material/AccordionDetails"
import Typography from "@mui/material/Typography"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
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
    },

    side: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
}))

function Companies(props) {
    const classes = useStyles()
    const [expanded, setExpanded] = useState(false)

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false)
    }

    return (
        <div id="com-faq" className={classes.root}>
            <Dropdown />
            <h1 style={{ fontFamily: "Lato", color: "gray" }}>FREQUENTLY ASKED QUESTIONS</h1>
            <div style={{ maxWidth: "70vw" }}>
                <Accordion expanded={expanded === "panel1"} onChange={handleChange("panel1")}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        style={expanded === "panel1" ? { backgroundColor: "#fff4dc" } : null}>
                        <Typography style={expanded === "panel1" ? { fontWeight: "bold" } : null}>
                            How does More Than Metrics work for companies?
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            More Than Metrics is designed to find you the best employee for the job ⭐ We believe there's so much more to a person
                            than their grades, or their previous salary, or their appearance and our aim is to showcase the individual beyond those
                            outdated heuristics. In order to find you happy employees who love what they do, we think the recruitment process should
                            focus on who a person <em>really</em> is: their personality, their values, even their sense of humour. On More Than
                            Metrics, we want candidates to land interviews by being authentically themselves so leave your judgement at the door and
                            keep an open mind to get the best hires out of this process.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === "panel2"} onChange={handleChange("panel2")}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                        style={expanded === "panel2" ? { backgroundColor: "#fff4dc" } : null}>
                        <Typography style={expanded === "panel2" ? { fontWeight: "bold" } : null}>How do I register as a company?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            We're going to REVOLUTIONISE recruitment together! 👍{" "}
                            <Link
                                to="/register"
                                onClick={() => props.setUserType("company")}
                                style={{ color: "inherit", textDecoration: "underline #FFBF50 2pt" }}>
                                Click here to be taken to the company registration form
                            </Link>
                            . You'll be asked to fill out details about your company, including interesting statistics that attract candidates, such
                            as employee retention rate and gender ratio. In less than five minutes, you're ready to post vacancies and start hiring
                            awesome people!
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === "panel3"} onChange={handleChange("panel3")}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3a-content"
                        id="panel3a-header"
                        style={expanded === "panel3" ? { backgroundColor: "#fff4dc" } : null}>
                        <Typography style={expanded === "panel3" ? { fontWeight: "bold" } : null}>How do I post a vacancy?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            When you're{" "}
                            <Link to="/login" style={{ color: "inherit", textDecoration: "underline #FFBF50 2pt" }}>
                                logged in
                            </Link>
                            , click <span className={classes.fakeBtn}>PROFILE</span> - this is where you'll find the form for posting new job
                            opportunities. For each vacancy, you have the option to add a job description, key responsibilities and key technologies,
                            as well as the key facts, such as job title, location and salary. The more detail you add, the better quality of candidate
                            you can expect to get!
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === "panel4"} onChange={handleChange("panel4")}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel4a-content"
                        id="panel4a-header"
                        style={expanded === "panel4" ? { backgroundColor: "#fff4dc" } : null}>
                        <Typography style={expanded === "panel4" ? { fontWeight: "bold" } : null}>What is More Than Metrics Match?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div className={classes.side}>
                            <img alt="" height="180px" style={{ padding: "0 1rem" }} src={process.env.PUBLIC_URL + "/assets/recruitment12.png"} />
                            <Typography>
                                More Than Metrics Match is our system for reviewing candidates who have applied to your vacancy. It's super easy to
                                use! When you're{" "}
                                <Link to="/login" style={{ color: "inherit", textDecoration: "underline #FFBF50 2pt" }}>
                                    logged in
                                </Link>
                                , click <span className={classes.fakeBtn}>DASHBOARD</span> and then{" "}
                                <span className={classes.fakeBtn}>REVIEW CANDIDATES</span> for a particular vacancy. Our system will load of a deck of
                                applicants for you to review. You'll see their headline, years in industry, technologies used and three questions
                                they've chosen to answer. That's the fun bit! Based on the job description you've posted, candidates choose three
                                prompts they feel will showcase their individuality and suitability for the role the best. They've put lots of effort
                                into their answers since they want to work for you, so take your time reading their answers. Clicking the red cross
                                will reject the candidate and clicking the green tick will approve them for interview. Be aware, your decision on
                                Match is final and can't be changed.
                            </Typography>
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
                            How can I contact successful applicants?
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div className={classes.side}>
                            <Typography>
                                When you're{" "}
                                <Link to="/login" style={{ color: "inherit", textDecoration: "underline #FFBF50 2pt" }}>
                                    logged in
                                </Link>
                                , click <span className={classes.fakeBtn}>DASHBOARD</span> - this is where you'll find statistics about your
                                recruitment experience so far, as well as vacancies you've posted. For each vacancy, you can view candidates you
                                accepted on Match and their details to contact them for an interview. More Than Match is here to improve the first
                                step of the hiring process - finding quality candidates - after which, the usual hiring process of your company
                                continues.
                            </Typography>
                            <img alt="" height="150px" style={{ padding: "0 4rem" }} src={process.env.PUBLIC_URL + "/assets/recruitment9.jpg"} />
                        </div>
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

export default Companies
