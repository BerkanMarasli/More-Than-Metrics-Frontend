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
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                            eget.
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
                        <Typography style={expanded === "panel4" ? { fontWeight: "bold" } : null}>How do I review applicants?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                            eget.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === "panel5"} onChange={handleChange("panel5")}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel5a-content"
                        id="panel5a-header"
                        style={expanded === "panel5" ? { backgroundColor: "#fff4dc" } : null}>
                        <Typography style={expanded === "panel5" ? { fontWeight: "bold" } : null}>Accordion 5</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                            eget.
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

export default Companies
