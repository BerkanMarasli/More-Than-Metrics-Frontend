import Dropdown from "./Dropdown";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "grid",
    justifyItems: "center",
    alignContent: "center",
  },
}));

function Candidates() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Dropdown />
      <h1>Candidates</h1>
    </div>
  );
}

export default Candidates;
