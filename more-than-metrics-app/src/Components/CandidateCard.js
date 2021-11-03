import { useState } from "react"
import { styled } from "@mui/material/styles"
import {
    Card,
    CardHeader,
    CardContent,
    Stack,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Avatar,
    IconButton,
    Typography,
    Paper,
    Box,
} from "@mui/material/"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import { makeStyles } from "@material-ui/core/styles"

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
        width: "95%",
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

const ExpandMore = styled((props) => {
    const { expand, ...other } = props
    return <IconButton {...other} />
})(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
    }),
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
                title={<h2>Candidate</h2>}
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
                    <h4>Years in industry:</h4>
                    <Item className={classes.item} style={{ padding: "0.5rem 1rem" }}>
                        {candidate.years_in_industry}
                    </Item>
                    <h4>Known technologies:</h4>
                    <Stack direction="row" className={classes.stack}>
                        <Item className={classes.item}>JavaScript</Item>
                        <Item className={classes.item}>React.js</Item>
                        <Item className={classes.item}>Node.js</Item>
                        <Item className={classes.item}>Python</Item>
                        <Item className={classes.item}>CSS</Item>
                        <Item className={classes.item}>HTML</Item>
                        <Item className={classes.item}>Kubernetes</Item>
                    </Stack>
                </Box>
            </CardContent>
            <CardContent className={classes.bio}>
                <div>
                    <Accordion expanded={expanded === "panel1"} onChange={handleChange("panel1")}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            style={expanded === "panel1" ? { backgroundColor: "#fff4dc" } : null}>
                            <Typography style={expanded === "panel1" ? { fontWeight: "bold" } : null}>
                                <h4>{candidate.prompt1}</h4>
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>{candidate.answer1}</Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === "panel2"} onChange={handleChange("panel2")}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                            style={expanded === "panel2" ? { backgroundColor: "#fff4dc" } : null}>
                            <Typography style={expanded === "panel2" ? { fontWeight: "bold" } : null}>
                                <h4>{candidate.prompt2}</h4>
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>{candidate.answer2}</Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === "panel3"} onChange={handleChange("panel3")}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel3a-content"
                            id="panel3a-header"
                            style={expanded === "panel3" ? { backgroundColor: "#fff4dc" } : null}>
                            <Typography style={expanded === "panel3" ? { fontWeight: "bold" } : null}>
                                <h4>{candidate.prompt3}</h4>
                            </Typography>
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
