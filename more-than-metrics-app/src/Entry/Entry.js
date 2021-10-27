import { CssBaseline } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Welcome from "./Welcome";
import ChooseUser from "./ChooseUser";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    backgroundImage: `url(${
      process.env.PUBLIC_URL + "/assets/recruitment2.jpeg"
    })`,
    backgroundSize: "95%",
    backgroundRepeat: "no-repeat",
    backgroundColor: "white",
    fontFamily: "Lato",
  },
}));

function Entry(props) {
  const classes = useStyles();

  return (
    <div
      className={classes.root}
      style={
        props.userType === null
          ? {
              backgroundImage: `url(${
                process.env.PUBLIC_URL + "/assets/recruitment2.jpeg"
              })`,
              backgroundSize: "95%",
              backgroundRepeat: "no-repeat",
            }
          : null
      }
    >
      <CssBaseline />
      <Welcome userType={props.userType} />
      <ChooseUser setUserType={props.setUserType} />
    </div>
  );
}

export default Entry;
