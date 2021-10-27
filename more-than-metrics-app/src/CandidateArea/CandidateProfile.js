import Navbar from "../Navbar/Navbar.js";
import { Paper, Box, Container } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { styled } from "@mui/material/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    fontFamily: "Lato",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  box: {
    display: "flex",
    flexDirection: "row",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
    },
    marginTop: "2rem",
  },

  container: {
    border: "1px solid gray",
    margin: "1rem",
    width: "40vw",
  },
}));

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: "70vh",
  lineHeight: "60px",
}));

function Profile() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Navbar userType={"candidate"} />
      <Box className={classes.box}>
        <Item className={classes.container}>
          <h1>YOUR PROFILE</h1>
        </Item>
        <Item className={classes.container}>
          <h1>APPLIED TO</h1>
        </Item>
      </Box>
    </div>
  );
}

export default Profile;
