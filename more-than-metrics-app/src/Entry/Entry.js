import { CssBaseline } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import Welcome from "./Welcome"
import ChooseUser from "./ChooseUser"

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: "100vh",
        backgroundImage: `url(${process.env.PUBLIC_URL + "/assets/recruitment2.jpeg"})`,
        backgroundPosition: "top",
        backgroundSize: "85%",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#FFFFFF",
        fontFamily: "Lato",
        [theme.breakpoints.down("md")]: {
            backgroundSize: "150%",
        },
    },
}))

function Entry(props) {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <CssBaseline />
            <Welcome userType={props.userType} />
            <ChooseUser setUserType={props.setUserType} />
        </div>
    )
}

export default Entry
