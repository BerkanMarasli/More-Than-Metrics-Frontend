import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, AppBar, Toolbar } from "@material-ui/core";
import Title from "../Components/Title";

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
    margin: "0.2rem",
  },

  exit: {
    margin: "1rem",
    fontSize: "1.5rem",
    "&:hover": {
      backgroundColor: "red!important",
      opacity: 0.3,
    },
  },
}));

function Navbar(props) {
  const classes = useStyles();

  const renderExit = () => {
    return <Button className={classes.exit}>EXIT</Button>;
  };

  const renderBtns = () => {
    return (
      <div>
        {props.userType === "company" ? (
          <Button className={classes.btn}>DASHBOARD</Button>
        ) : (
          <Button className={classes.btn}>JOBS</Button>
        )}
        <Button className={classes.btn}>PROFILE</Button>
        <Button className={classes.btn}>LOGOUT</Button>
      </div>
    );
  };

  return (
    <div className={classes.root}>
      <AppBar className={classes.appbar} elevation={0}>
        <Toolbar className={classes.appbarWrapper}>
          <Title className={classes.appbarTitle} />
          {props.exit === true ? renderExit() : renderBtns()}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
