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
        fontSize: "4rem",
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
            <h1 style={{ paddingTop: "5rem", fontFamily: "Lato", color: "gray" }}>ABOUT US</h1>
            <img alt="" style={{ height: "55vh" }} src={process.env.PUBLIC_URL + "/assets/recruitment11.JPG"} />
            <h2 style={{ fontFamily: "Lato", color: "gray" }}>
                Why we created <span className={classes.greaterThan}>{">"}</span>METRICS
            </h2>
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
