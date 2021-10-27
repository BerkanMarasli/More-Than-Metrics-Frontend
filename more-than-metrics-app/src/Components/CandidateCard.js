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
} from "@mui/material/";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    fontFamily: "Lato",
    width: "30rem",
    height: "max-content",
    maxHeight: "36rem",
  },

  bio: {
    overflow: "scroll",
  },

  stack: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(0.6),
  margin: "0.2rem",
  textAlign: "center",
  color: theme.palette.text.secondary,
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
        avatar={
          <Avatar sx={{ backgroundColor: "#ffe4a7" }} aria-label="number">
            {"1"}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={<h3>Candidate 1</h3>}
        subheader="September 14, 2016"
      />
      <CardContent>
        <Stack className={classes.stack}>
          <Item className={classes.item}>JavaScript</Item>
          <Item>React.js</Item>
          <Item>Node.js</Item>
          <Item>Python</Item>
          <Item>CSS</Item>
          <Item>HTML</Item>
          <Item>Kubernetes</Item>
        </Stack>
        <Typography variant="body2" color="text.secondary">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the
          mussels, if you like.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
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
        <CardContent>
          <div className={classes.bio}>
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
