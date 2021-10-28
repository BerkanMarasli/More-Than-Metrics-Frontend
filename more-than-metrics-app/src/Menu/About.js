import Dropdown from "./Dropdown";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyItems: "center",
    alignContent: "center",
  },
}));

function About() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Dropdown />
      <h1 style={{ paddingTop: "5rem" }}>About us</h1>
    </div>
  );
}

export default About;
