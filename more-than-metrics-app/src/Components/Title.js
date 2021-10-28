import { makeStyles } from "@material-ui/core/";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  title: {
    fontFamily: "Lato",
    color: "gray",
    fontSize: "21pt",
    [theme.breakpoints.down("md")]: {
      fontSize: "15pt",
    },
  },

  greaterThan: {
    fontSize: "32.5pt",
    color: "#FFBF50",
    position: "relative",
    top: "4px",
    [theme.breakpoints.down("md")]: {
      fontSize: "25pt",
    },
  },
}));

function Title(props) {
  const classes = useStyles();

  let history = useHistory();

  function handleClick() {
    history.push("/");
  }

  return (
    <h1
      id="/"
      className={classes.title}
      onClick={handleClick}
      style={{
        "-webkit-user-select": "none",
        "-moz-user-select": "none",
        "-ms-user-select": "none",
        "user-select": "none",
      }}
    >
      {props.match ? (
        <span>
          <span className={classes.greaterThan}>{">"}</span>METRICS
          <span style={{ color: "#FFBF50", fontWeight: "bold" }}> MATCH</span>
        </span>
      ) : (
        <span>
          MORE TH
          <span className={classes.greaterThan}>{">"}</span>N METRICS
        </span>
      )}
    </h1>
  );
}

export default Title;
