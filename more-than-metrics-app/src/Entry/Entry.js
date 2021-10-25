import { CssBaseline } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Header from "./Header";
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

function Entry() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header />
      <ChooseUser />
    </div>
  );
}

export default Entry;
