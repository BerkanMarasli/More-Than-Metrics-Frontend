import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Collapse, IconButton, Toolbar } from "@material-ui/core";
import SortIcon from "@material-ui/icons/Sort";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Link as Scroll } from "react-scroll";

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
  },

  appbarTitle: {
    color: "gray",
    flexGrow: "1",
  },

  icon: {
    color: "gray",
    fontSize: "2rem",
  },

  questions: {
    paddingRight: "3rem",
  },

  humans: {
    paddingTop: "5.6rem",
  },
}));

function Header() {
  const classes = useStyles();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(true);
  }, []);

  return (
    <div className={classes.root}>
      <AppBar className={classes.appbar} elevation={0}>
        <Toolbar className={classes.appbarWrapper}>
          <h1 className={classes.appbarTitle}>More Than Metrics</h1>
          <IconButton>
            <SortIcon className={classes.icon} />
          </IconButton>
        </Toolbar>
      </AppBar>
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

export default Header;
