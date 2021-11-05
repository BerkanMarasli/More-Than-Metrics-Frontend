import Dropdown from "./Dropdown"
import { makeStyles } from "@material-ui/core/styles"
import { IconButton } from "@material-ui/core"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import { Link as Scroll } from "react-scroll"
import Team from "./Team"

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        "-webkit-user-select": "none",
        "-moz-user-select": "none",
        "-ms-user-select": "none",
        "user-select": "none",
        overflow: "hidden",
    },

    fakeBtn: {
        border: "solid 1px grey",
        borderRadius: "4px",
        padding: "3px",
    },

    side: {
        display: "flex",
    },

    icon: {
        color: "#FFBF50",
        fontSize: "3rem",
        [theme.breakpoints.down("md")]: {
            alignSelf: "center",
        },
    },

    greaterThan: {
        fontSize: "30pt",
        color: "#FFBF50",
        position: "relative",
        top: "5px",
        [theme.breakpoints.down("md")]: {
            fontSize: "25pt",
        },
    },
}))

function About(props) {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <Dropdown />
            <h1 style={{ paddingTop: "4rem", fontFamily: "Lato", color: "gray" }}>ABOUT US</h1>
            <img alt="" style={{ height: "50vh" }} src={process.env.PUBLIC_URL + "/assets/recruitment11.JPG"} />
            <h2 style={{ fontFamily: "Lato", color: "gray", padding: "0", margin: "0" }}>
                Why we created <span className={classes.greaterThan}>{">"}</span>METRICS
            </h2>
            <p style={{ width: "70vw", textAlign: "center", padding: "0", margin: "0" }}>
                We noticed the world of recruitment was not moving with the times. In the 21st century, you can teach yourself any skill under the
                sun, meaning that traditional metrics, such as whether someone went to university or what grades their got should matter less. This is
                particularly true in tech and software engineering. We want to reinvent the recruitment process for the tech world and get people
                hired on the basis of their individuality rather than outdated heuristics. On More Than Metrics, candidates answer prompts of their
                choice to showcase themselves as the unique individuals they are. On the other side of the process, recruiters can quickly view
                candidates via our Match app and assess their suitability in a quick and easily-digestible way. <br />
                <b> Join us on this journey to revolutionise recruitment! 🙂 </b>
            </p>
            <Scroll to="about" smooth={true}>
                <IconButton>
                    <ExpandMoreIcon className={classes.icon} />
                </IconButton>
            </Scroll>
            <Team />
        </div>
    )
}

export default About
