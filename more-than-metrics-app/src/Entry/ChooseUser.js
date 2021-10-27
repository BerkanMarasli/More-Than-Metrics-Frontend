import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "start",
    backgroundImage: `url(${
      process.env.PUBLIC_URL + "/assets/recruitment3.jpeg"
    })`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "bottom",
    backgroundSize: "70%",
  },

  select: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    marginTop: "10rem",
  },

  buttons: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
    },
  },

  btn: {
    margin: "1rem",
    fontSize: "2rem",
    fontFamily: "Lato",
    fontWeight: "bold",
  },
}));

function ChooseUser(props) {
  const classes = useStyles();

  return (
    <div className={classes.root} id="choose-user">
      <div className={classes.select}>
        <h1>Are you a...?</h1>
        <div className={classes.buttons}>
          <Button className={classes.btn} variant="contained" size="large">
            Company
          </Button>
          <Button className={classes.btn} variant="contained" size="large">
            Candidate
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ChooseUser;
