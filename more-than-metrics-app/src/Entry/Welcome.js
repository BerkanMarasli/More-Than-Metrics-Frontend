import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Collapse, IconButton } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Link as Scroll } from "react-scroll";
import Dropdown from "../Menu/Dropdown";

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
    [theme.breakpoints.down("md")]: {
      alignSelf: "center",
    },
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
    [theme.breakpoints.down("md")]: {
      paddingRight: "0",
      paddingTop: "4rem",
    },
  },

  humans: {
    paddingTop: "5.6rem",
    paddingRight: "3rem",
    paddingLeft: "1rem",
    [theme.breakpoints.down("md")]: {
      paddingTop: "0",
      paddingRight: "0",
      paddingLeft: "0",
    },
  },
}));

function Welcome(props) {
  const classes = useStyles();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(true);
  }, []);

  return (
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
  );
}

export default Welcome;
