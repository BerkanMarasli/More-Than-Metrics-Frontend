import { makeStyles } from "@material-ui/core/styles"
import Welcome from "./Welcome"
import ChooseUser from "./ChooseUser"

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: "100vh",
        backgroundImage: `url(${process.env.PUBLIC_URL + "/assets/recruitment2.png"})`,
        backgroundPosition: "top",
        backgroundSize: "100%",
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
            <Welcome userType={props.userType} />
            <ChooseUser setUserType={props.setUserType} />
        </div>
    )
}

export default Entry
