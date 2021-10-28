import { useState } from "react";
import { styled } from "@mui/material/styles";
import {
  Card,
  CardHeader,
  CardContent,
  Stack,
  CardActions,
  Collapse,
  Avatar,
  IconButton,
  Typography,
  Paper,
  Box,
} from "@mui/material/";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Lato",
    width: "30rem",
    height: "max-content",
    maxHeight: "45rem",
    padding: "1rem",
  },

  header: {
    display: "flex",
    flexDirection: "row-reverse",
    justifyContent: "center",
    alignContent: "center",
  },

  bio: {
    display: "flex",
    justifyContent: "center",
    overflow: "scroll",
    width: "80%",
  },

  stack: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },

  container: {
    border: "1px solid gray",
    margin: "1rem",
    borderRadius: "5px",
    width: "80%",
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: "1rem",
  },
}));

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(0.6),
  margin: "0.2rem",
  textAlign: "center",
  color: theme.palette.text.secondary,
  backgroundColor: "#ffeab9",
}));

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

function CandidateCard() {
  const [expanded, setExpanded] = useState(false);

  const classes = useStyles();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        className={classes.header}
        title={<h2>Candidate</h2>}
        avatar={
          <Avatar
            sx={{ backgroundColor: "#FFBF50", margin: "0.4rem" }}
            aria-label="number"
          >
            {"1"}
          </Avatar>
        }
      />
      <CardContent>
        <Box className={classes.container}>
          <h4>Years in industry:</h4>
          <Item className={classes.item} style={{ padding: "0.5rem 1rem" }}>
            2
          </Item>
          <h4>Known technologies:</h4>
          <Stack direction="row" className={classes.stack}>
            <Item className={classes.item}>JavaScript</Item>
            <Item className={classes.item}>React.js</Item>
            <Item className={classes.item}>Node.js</Item>
            <Item className={classes.item}>Python</Item>
            <Item className={classes.item}>CSS</Item>
            <Item className={classes.item}>HTML</Item>
            <Item className={classes.item}>Kubernetes</Item>
          </Stack>
        </Box>

        <Typography variant="body2" color="text.secondary">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the
          mussels, if you like.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show-more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent style={{ height: "max-content" }} className={classes.bio}>
          <div>
            <Typography paragraph>
              <h4>Describe yourself in 3 words:</h4>
            </Typography>
            <Typography paragraph></Typography>
            <Typography paragraph>Curious, fast-learner, adaptable</Typography>
            <Typography paragraph>
              <h4>Why do you want to work for us?</h4>
            </Typography>
            <Typography paragraph>
              Add rice and stir very gently to distribute. Top with artichokes
              and peppers, and cook without stirring, until most of the liquid
              is absorbed, 15 to 18 minutes. Reduce heat to medium-low, add
              reserved shrimp and mussels, tucking them down into the rice, and
              cook again without stirring, until mussels have opened and rice is
              just tender, 5 to 7 minutes more. (Discard any mussels that don’t
              open.)
            </Typography>
            <Typography paragraph>
              <h4>What's the best project you've worked on to date?</h4>
            </Typography>
            <Typography>
              Set aside off of the heat to let rest for 10 minutes, and then
              serve.
            </Typography>
          </div>
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default CandidateCard;
