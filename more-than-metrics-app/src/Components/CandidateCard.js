import { useState } from "react"
import { styled } from "@mui/material/styles"
import { Card, CardHeader, CardContent, Stack, CardActions, Collapse, Avatar, IconButton, Typography, Paper, Box } from "@mui/material/"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import { makeStyles } from "@material-ui/core/styles"
import CandidateProfile from "../Profile/CandidateProfile"
import { CalendarViewDayTwoTone } from "@material-ui/icons"

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Lato",
        width: "30rem",
        height: "max-content",
        maxHeight: "50rem",
        padding: "1rem",
        overflow: "hidden",
    },

    header: {
        display: "flex",
        flexDirection: "row-reverse",
        justifyContent: "center",
        alignContent: "center",
    },

    bio: {
        display: "flex",
        justifyContent: "center",
    },

    stack: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
    },

    container: {
        border: "1px solid gray",
        borderRadius: "5px",
        width: "80%",
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: "1rem",
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

    const classes = useStyles()

    const handleExpandClick = () => {
        setExpanded(!expanded)
    }

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
            <CardContent style={{ padding: "0rem" }}>
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
                <Typography variant="body2" color="text.secondary">
                    {candidate.headline}
                </Typography>
            </CardContent>
            <CardActions disableSpacing style={{ padding: "0rem" }}>
                <ExpandMore expand={expanded} onClick={handleExpandClick} aria-expanded={expanded} aria-label="show-more">
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent className={classes.bio} style={{ height: "max-content", padding: "0rem", overflow: "scroll" }}>
                    <div>
                        <Typography paragraph>
                            <h4>{candidate.prompt1}</h4>
                        </Typography>
                        <Typography paragraph></Typography>
                        <Typography paragraph>{candidate.answer1}</Typography>
                        <Typography paragraph>
                            <h4>{candidate.prompt2}</h4>
                        </Typography>
                        <Typography paragraph>{candidate.answer2}</Typography>
                        <Typography paragraph>
                            <h4>{candidate.prompt3}</h4>
                        </Typography>
                        <Typography>{candidate.answer3}</Typography>
                    </div>
                </CardContent>
            </Collapse>
        </Card>
    )
}

export default CandidateCard
