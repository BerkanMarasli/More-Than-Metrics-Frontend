import Dropdown from "./Dropdown"
import { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Accordion from "@mui/material/Accordion"
import AccordionSummary from "@mui/material/AccordionSummary"
import AccordionDetails from "@mui/material/AccordionDetails"
import Typography from "@mui/material/Typography"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
    },
}))

function Companies() {
    const classes = useStyles()
    const [expanded, setExpanded] = useState(false)

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false)
    }

    return (
        <div className={classes.root}>
            <Dropdown />
            <h1 style={{ paddingTop: "5rem", fontFamily: "Lato", color: "gray" }}>COMPANIES </h1>
            <div>
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
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                            eget.
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
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                            eget.
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
