import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  title: {
    fontFamily: "Lato",
    color: "gray",
    fontSize: "21pt",
  },

  greaterThan: {
    fontSize: "33pt",
    color: "#FFBF50",
    position: "relative",
    top: "5px",
  },
}));

function Title() {
  const classes = useStyles();

  return (
    <h1 className={classes.title}>
      MORE TH
      <span className={classes.greaterThan}>{">"}</span>N METRICS
    </h1>
  );
}

export default Title;
