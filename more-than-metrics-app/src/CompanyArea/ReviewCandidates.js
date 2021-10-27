import Navbar from "../Navbar/Navbar.js";
import CandidateCard from "../Components/CandidateCard";
import CancelIcon from "@material-ui/icons/Cancel";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    fontFamily: "Lato",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "90vh",
    paddingTop: "4rem",
  },

  main: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  icon: {
    background: "none",
    fontSize: "5rem",
  },

  iconStyle: {
    margin: "5rem",
  },

  card: {
    width: "5rem",
  },
}));

function ReviewCandidates() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Navbar exit={true} />
      <main className={classes.main}>
        <IconButton className={classes.iconStyle}>
          <CancelIcon className={classes.icon} style={{ color: "red" }} />
        </IconButton>
        <CandidateCard className={classes.card} />
        <IconButton className={classes.iconStyle}>
          <CheckCircleIcon
            className={classes.icon}
            style={{ color: "green" }}
          />
        </IconButton>
      </main>
    </div>
  );
}

export default ReviewCandidates;
