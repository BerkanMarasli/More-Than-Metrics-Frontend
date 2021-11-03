import { useHistory } from "react-router-dom"
import { makeStyles } from "@material-ui/core/styles"
import { Button, AppBar, Toolbar } from "@material-ui/core"
import Title from "../Components/Title"

const useStyles = makeStyles((theme) => ({
    root: {
        fontFamily: "Lato",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
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

    appbarTitle: { flexGrow: "1" },

    btn: {
        marginTop: "1.2rem",
        margin: "0.2rem",
        fontSize: "12pt",
    },

    exit: {
        margin: "1rem",
        fontSize: "1.5rem",
        "&:hover": {
            backgroundColor: "red!important",
            opacity: 0.3,
        },
    },
}))

function Navbar(props) {
    const classes = useStyles()

    let history = useHistory()

    const handleRedirect = (e) => {
        const target = e.target.innerText.toLowerCase()
        if (target === "exit") {
            history.push(`/dashboard`)
        } else {
            history.push(`/${target}`)
        }
    }

    const handleLogout = async () => {
        const url = "http://localhost:8080/logout"
        try {
            const response = await fetch(url, {
                method: "POST",
                credentials: "include",
            })
            const json = await response.json()

            if (response.status === 200) {
                window.location.href = json.url
            }
        } catch (error) {
            console.log({ error })
        }
    }

    const renderExit = () => {
        return (
            <Button id="exit" className={classes.exit} onClick={(e) => handleRedirect(e)}>
                EXIT
            </Button>
        )
    }

    const renderBtns = () => {
        return (
            <div>
                {props.userType === "company" ? (
                    <Button id="dashboard" className={classes.btn} onClick={(e) => handleRedirect(e)}>
                        DASHBOARD
                    </Button>
                ) : (
                    <Button id="jobs" className={classes.btn} onClick={(e) => handleRedirect(e)}>
                        JOBS
                    </Button>
                )}
                <Button id="profile" className={classes.btn} onClick={(e) => handleRedirect(e)}>
                    PROFILE
                </Button>
                <Button className={classes.btn} onClick={handleLogout}>
                    LOGOUT
                </Button>
            </div>
        )
    }

    return (
        <div className={classes.root}>
            <AppBar className={classes.appbar} elevation={0}>
                <Toolbar className={classes.appbarWrapper}>
                    <Title className={classes.appbarTitle} match={props.match} />
                    {props.match === true ? renderExit() : renderBtns()}
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Navbar
