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
    maxHeight: "100vh",
    paddingTop: "2rem",
    backgroundColor: "#fff4dc",
  },

  main: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  play: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  icon: {
    background: "none",
    fontSize: "5rem",
    opacity: "70%",
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
      <Navbar match={true} />
      <main className={classes.main}>
        <h1>Find your company's perfect match</h1>
        <div className={classes.play}>
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
        </div>
      </main>
    </div>
  );
}

export default ReviewCandidates;
