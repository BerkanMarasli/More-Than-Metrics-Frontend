import { useState, useEffect } from "react";
import {
  Route,
  Switch,
  BrowserRouter as Router,
  Link,
  Redirect,
} from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Collapse,
  IconButton,
  Toolbar,
  Menu,
  MenuItem,
} from "@material-ui/core";
import SortIcon from "@material-ui/icons/Sort";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Link as Scroll } from "react-scroll";
import Title from "../Components/Title";
import About from "../Menu/About";
import Companies from "../Menu/Companies";
import Candidates from "../Menu/Candidates";
import Dropdown from "../Menu/Dropdown";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    padding: "3rem",
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
    color: "gray",
    fontSize: "2rem",
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

  questions: {
    paddingRight: "3.5rem",
  },

  humans: {
    paddingTop: "5.6rem",
    paddingRight: "3rem",
    paddingLeft: "1rem",
  },
}));

function Welcome(props) {
  const classes = useStyles();
  const [checked, setChecked] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    setChecked(true);
  }, []);

  const handleOpenMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleCloseMenu = (e) => {
    setAnchorEl(null);
  };

  return (
    <Router>
      <div className={classes.root}>
        <Dropdown />
        <div className={classes.questions}>
          <h3>Tired of outdated heuristics?</h3>
          <h2>We're reinventing recruitment.</h2>{" "}
        </div>
        <div className={classes.humans}>
          <Collapse
            in={checked}
            {...(checked ? { timeout: 2000 } : {})}
            collapsedHeight={10}
          >
            <h1>Because humans are more than metrics.</h1>
            <Scroll to="choose-user" smooth={true}>
              <IconButton>
                <ExpandMoreIcon className={classes.icon} />
              </IconButton>
            </Scroll>
          </Collapse>
        </div>
      </div>
    </Router>
  );
}

export default Welcome;
