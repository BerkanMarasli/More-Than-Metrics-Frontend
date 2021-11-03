import { makeStyles } from "@material-ui/core/styles"
import { useHistory } from "react-router-dom"
import { Link } from "react-router-dom"

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        maxHeight: "4vh",
        backgroundColor: "#ffeab9",
        position: "fixed",
        bottom: "0",
        width: "100vw",
        padding: "0.5rem 4rem",
    },

    title: {
        fontFamily: "Lato",
        color: "gray",
        fontSize: "15pt",
        paddingBottom: "0.5rem",
        paddingRight: "5%",
        [theme.breakpoints.down("md")]: {
            fontSize: "12pt",
        },
    },

    greaterThan: {
        fontSize: "25pt",
        color: "#FFBF50",
        position: "relative",
        top: "4px",
        [theme.breakpoints.down("md")]: {
            fontSize: "25pt",
        },
    },

    links: {
        paddingLeft: "5%",
        display: "flex",
    },

    link: {
        padding: "0.2rem 0.5rem",
        margin: "0.5rem",
        fontWeight: "bold",
        border: "solid 2pt #FFBF50",
        borderRadius: "3px",
        backgroundColor: "white",
        textDecoration: "none",
        color: "gray",
        letterSpacing: "1px",
        textAlign: "center",
    },
}))

function Footer(props) {
    const classes = useStyles()

    let history = useHistory()

    function handleClick() {
        history.push("/")
    }

    return (
        <footer className={classes.root}>
            <div className={classes.links}>
                <Link to="/about" className={classes.link}>
                    ABOUT
                </Link>
                {props.userType === "company" ? (
                    <Link to="/companies" className={classes.link}>
                        FAQ
                    </Link>
                ) : props.userType === "candidate" ? (
                    <Link to="/candidates" className={classes.link}>
                        FAQ
                    </Link>
                ) : null}
            </div>
            <h4
                id="/"
                className={classes.title}
                onClick={handleClick}
                style={{
                    "-webkit-user-select": "none",
                    "-moz-user-select": "none",
                    "-ms-user-select": "none",
                    "user-select": "none",
                }}>
                <span style={{ fontFamily: "Arial" }}>© 2021</span> <span className={classes.greaterThan}>{">"}</span>METRICS
            </h4>
        </footer>
    )
}

export default Footer
