import { useState, useEffect } from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Collapse, IconButton, Box } from "@material-ui/core"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import { Link as Scroll } from "react-scroll"
import Dropdown from "../Menu/Dropdown"

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        padding: "3rem",
        [theme.breakpoints.down("md")]: {
            flexDirection: "column",
        },
        FontFamily: "Lato",
        color: "gray",
    },

    appbar: {
        background: "none",
    },

    appbarWrapper: {
        width: "80%",
        margin: "0 auto",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },

    appbarTitle: {
        flexGrow: "1",
    },

    icon: {
        color: "#FFBF50",
        fontSize: "4rem",
        margin: "0",
        padding: "0",
        [theme.breakpoints.down("md")]: {
            alignSelf: "center",
            fontSize: "3rem",
        },
    },

    menu: {
        marginTop: "3rem",
        padding: "1rem",
    },

    list: {
        padding: "0.5rem",
    },

    questions: {
        paddingRight: "1rem",
        paddingBottom: "7.5rem",
        textAlign: "left",

        [theme.breakpoints.down("sm")]: {
            paddingTop: "35%",
            fontSize: "80%",
            paddingBottom: "0",
        },
    },

    humans: {
        paddingLeft: "1rem",
        textAlign: "left",

        [theme.breakpoints.down("sm")]: {
            padding: "0rem",
            fontSize: "80%",
        },
    },
}))

function Welcome(props) {
    const classes = useStyles()
    const [checked, setChecked] = useState(false)

    useEffect(() => {
        setChecked(true)
    }, [])

    return (
        <div className={classes.root}>
            <Dropdown />
            <div className={classes.questions}>
                <h3>Tired of outdated heuristics?</h3>
                <h2>We're reinventing recruitment.</h2>
            </div>
            <div className={classes.humans}>
                <Collapse in={checked} {...(checked ? { timeout: 2000 } : {})} collapsedHeight={10}>
                    <h1>Because humans are more than metrics.</h1>
                    <Scroll to="choose-user" smooth={true}>
                        <IconButton>
                            <ExpandMoreIcon className={classes.icon} />
                        </IconButton>
                    </Scroll>
                </Collapse>
            </div>
        </div>
    )
}

export default Welcome
