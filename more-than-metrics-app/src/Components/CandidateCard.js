import { useState } from "react"
import { styled } from "@mui/material/styles"
import { Card, CardHeader, CardContent, Stack, Avatar, Typography, Paper, Box } from "@mui/material/"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import { makeStyles } from "@material-ui/core/styles"
import MuiAccordion from "@mui/material/Accordion"
import MuiAccordionSummary from "@mui/material/AccordionSummary"
import MuiAccordionDetails from "@mui/material/AccordionDetails"
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp"
import { borderRadius } from "@mui/system"

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Lato",
        width: "30rem",
        maxHeight: "max-content",
        // maxHeight: "50rem",
        padding: "1rem",
    },

    header: {
        display: "flex",
        flexDirection: "row-reverse",
        justifyContent: "center",
        alignContent: "center",
    },

    bio: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        overflow: "scroll",
        maxHeight: "50%",
        padding: "0rem",
    },

    stack: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
    },

    box: {
        padding: "0rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },

    container: {
        border: "1px solid gray",
        borderRadius: "5px",
        width: "25rem",
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: "1rem",
        textAlign: "center",
    },
}))

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(0.6),
    margin: "0.2rem",
    textAlign: "center",
    color: theme.palette.text.secondary,
    backgroundColor: "#ffeab9",
}))

const Accordion = styled((props) => <MuiAccordion disableGutters elevation={0} round {...props} />)(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: "4px",
    "&:not(:last-child)": {},
    "&:before": {
        display: "none",
    },
}))

const AccordionSummary = styled((props) => <MuiAccordionSummary expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />} {...props} />)(
    ({ theme }) => ({
        backgroundColor: theme.palette.mode === "dark" ? "rgba(255, 255, 255, .05)" : "rgba(0, 0, 0, .03)",
        flexDirection: "row-reverse",
        "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
            transform: "rotate(-180deg)",
        },
        "& .MuiAccordionSummary-content": {
            marginLeft: theme.spacing(1),
        },
    })
)

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: "1px solid rgba(0, 0, 0, .125)",
}))

function CandidateCard({ candidate, number }) {
    const [expanded, setExpanded] = useState(false)

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false)
    }

    const classes = useStyles()

    return (
        <Card className={classes.root}>
            <CardHeader
                className={classes.header}
                style={{ padding: "0rem" }}
                title={<h2>CANDIDATE</h2>}
                avatar={
                    <Avatar sx={{ backgroundColor: "#FFBF50", margin: "0.4rem" }} aria-label="number">
                        {number}
                    </Avatar>
                }
            />
            <Typography variant="body2" color="text.secondary">
                {candidate.headline}
            </Typography>
            <CardContent className={classes.box}>
                <Box className={classes.container}>
                    <h3>Years in industry:</h3>
                    <Item className={classes.item} style={{ padding: "0.5rem 1rem" }}>
                        {candidate.years_in_industry}
                    </Item>
                    <h3>Known technologies:</h3>
                    <Stack direction="row" className={classes.stack}>
                        {candidate.technologies.map((tech) => {
                            return <Item className={classes.item}>{tech}</Item>
                        })}
                    </Stack>
                </Box>
            </CardContent>
            <CardContent className={classes.bio}>
                <div style={{ width: "28rem", overflow: "scroll" }}>
                    <Accordion
                        expanded={expanded === "panel1"}
                        onChange={handleChange("panel1")}
                        style={expanded === "panel1" || !expanded ? null : { display: "none" }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            style={expanded === "panel1" ? { backgroundColor: "#fff4dc" } : null}>
                            <Typography style={expanded === "panel1" ? { fontWeight: "bold" } : null}>{candidate.prompt1}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>{candidate.answer1}</Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion
                        expanded={expanded === "panel2"}
                        onChange={handleChange("panel2")}
                        style={expanded === "panel2" || !expanded ? null : { display: "none" }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                            style={expanded === "panel2" ? { backgroundColor: "#fff4dc" } : null}>
                            <Typography style={expanded === "panel2" ? { fontWeight: "bold" } : null}>{candidate.prompt2}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>{candidate.answer2}</Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion
                        expanded={expanded === "panel3"}
                        onChange={handleChange("panel3")}
                        style={expanded === "panel3" || !expanded ? null : { display: "none" }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel3a-content"
                            id="panel3a-header"
                            style={expanded === "panel3" ? { backgroundColor: "#fff4dc" } : null}>
                            <Typography style={expanded === "panel3" ? { fontWeight: "bold" } : null}>{candidate.prompt3}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>{candidate.answer3} </Typography>
                        </AccordionDetails>
                    </Accordion>
                </div>
            </CardContent>
        </Card>
    )
}

export default CandidateCard
