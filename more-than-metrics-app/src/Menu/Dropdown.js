import { useState } from "react"
import { useHistory } from "react-router-dom"
import { makeStyles } from "@material-ui/core/styles"
import { AppBar, IconButton, Toolbar, Menu, MenuItem } from "@material-ui/core"
import SortIcon from "@material-ui/icons/Sort"
import Title from "../Components/Title"

const useStyles = makeStyles((theme) => ({
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
        color: "gray",
        fontSize: "2.5rem",
    },

    menu: {
        marginTop: "3rem",
        padding: "1rem",
    },

    list: {
        padding: "0.5rem",
        // "& .MuiTouchRipple-root span": {
        //   backgroundColor: "red!important",
        //   opacity: 0.3,
        // },
    },
}))

function Dropdown(props) {
    const classes = useStyles()
    const [anchorEl, setAnchorEl] = useState(null)

    const handleOpenMenu = (e) => {
        setAnchorEl(e.currentTarget)
    }

    const handleCloseMenu = (e) => {
        setAnchorEl(null)
    }

    let history = useHistory()

    function handleRedirect(e) {
        history.push(`/${e.target.id}`)
    }

    return (
        <div>
            <AppBar className={classes.appbar} elevation={0}>
                <Toolbar className={classes.appbarWrapper}>
                    <Title className={classes.appbarTitle} />
                    <IconButton aria-controls={"menu"} onMouseMove={handleOpenMenu}>
                        <SortIcon className={classes.icon} />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Menu id="menu" className={classes.menu} onClick={handleCloseMenu} anchorEl={anchorEl} open={Boolean(anchorEl)}>
                <MenuItem
                    id="about"
                    className={classes.list}
                    onClick={(e) => {
                        handleCloseMenu()
                        handleRedirect(e)
                    }}>
                    About us
                </MenuItem>
                <MenuItem
                    id="companies"
                    className={classes.list}
                    onClick={(e) => {
                        handleCloseMenu()
                        handleRedirect(e)
                    }}>
                    For Companies
                </MenuItem>
                <MenuItem
                    id="candidates"
                    className={classes.list}
                    onClick={(e) => {
                        handleCloseMenu()
                        handleRedirect(e)
                    }}>
                    For Candidates
                </MenuItem>
                <MenuItem
                    id="login"
                    className={classes.list}
                    onClick={(e) => {
                        handleCloseMenu()
                        handleRedirect(e)
                    }}>
                    Login
                </MenuItem>
            </Menu>
        </div>
    )
}

export default Dropdown
