import { useState } from "react";
import { useHistory } from "react-router-dom";
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
    [theme.breakpoints.down("md")]: {
      fontSize: "1.5rem",
    },
  },
}));

function ChooseUser(props) {
  const classes = useStyles();

  let history = useHistory();

  async function setUserType(e) {
    await props.setUserType(e.target.innerText.toLowerCase());
  }

  function handleRedirect(e) {
    history.push(`/register`);
  }

  async function handleClick(e) {
    await setUserType(e);
    handleRedirect(e);
  }

  return (
    <div className={classes.root} id="choose-user">
      <div className={classes.select}>
        <h1>Are you a...?</h1>
        <div className={classes.buttons}>
          <Button
            id="company"
            className={classes.btn}
            variant="contained"
            size="large"
            onClick={(e) => handleClick(e)}
          >
            Company
          </Button>
          <Button
            id="candidate"
            className={classes.btn}
            variant="contained"
            size="large"
            onClick={(e) => handleClick(e)}
          >
            Candidate
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ChooseUser;
