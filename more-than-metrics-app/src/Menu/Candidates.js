import Dropdown from "./Dropdown"
import { makeStyles } from "@material-ui/core/styles"
import { IconButton, Typography } from "@material-ui/core"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import { Link as Scroll } from "react-scroll"
import CandidateFAQ from "./CandidateFAQ"

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

    side: {
        display: "flex",
        paddingTop: "10vh",
        justifyContent: "center",
        alignItems: "center",
        paddingRight: "8rem",
    },

    img: {
        [theme.breakpoints.down("md")]: {
            height: "20vh",
        },
        padding: "2rem 4rem",
    },

    icon: {
        color: "#FFBF50",
        fontSize: "4rem",
        [theme.breakpoints.down("md")]: {
            alignSelf: "center",
        },
        padding: "0",
    },

    scroll: {
        display: "flex",
        marginTop: "4rem",
    },

    text: {
        display: "flex",
        flexDirection: "column",
    },
}))

function Companies(props) {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <Dropdown />
            <div className={classes.side}>
                <img className={classes.img} alt="" style={{ height: "55vh" }} src={process.env.PUBLIC_URL + "/assets/recruitment4.jpg"} />
                <div className={classes.text}>
                    <h2 style={{ fontFamily: "Lato", color: "gray" }}>Tired of an inbox full of rejections?</h2>
                    <h3 style={{ fontFamily: "Lato", color: "gray" }}>Stop measuring yourself against outdated heuristics.</h3>
                    <h1 style={{ fontFamily: "Lato", color: "gray" }}>Show off the real you.</h1>
                    <h1 style={{ fontFamily: "Lato", color: "gray" }}>
                        The <span style={{ color: "#FFBF50" }}>unique</span> you.
                    </h1>
                </div>{" "}
            </div>
            <Scroll to="can-faq" smooth={true}>
                <div className={classes.scroll}>
                    <Typography
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            fontFamily: "Lato",
                            fontWeight: "bold",
                            color: "gray",
                        }}>
                        <span>FIND</span>
                        <span>OUT</span>
                        <span>MORE</span>
                    </Typography>
                    <IconButton>
                        <ExpandMoreIcon className={classes.icon} />
                    </IconButton>
                </div>
            </Scroll>

            <CandidateFAQ />
        </div>
    )
}

export default Companies
