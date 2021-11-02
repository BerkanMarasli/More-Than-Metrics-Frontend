import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, InputAdornment, InputLabel, OutlinedInput } from "@mui/material/";
import { Button } from "@material-ui/core";
import SelectTechnologies from "../Components/SelectTechnologies";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "grid",
    justifyItems: "center",
    alignContent: "center",
  },

  box: {
    display: "grid",
    justifyItems: "end",
  },

  row: {
    display: "flex",
    alignItems: "center",
  },

  input: {
    width: "20rem",
    margin: "0.5rem",
  },
}));

function PostVacancy() {
  const [title, setTitle] = useState(null);
  const [location, setLocation] = useState(null);
  const [salary, setSalary] = useState(null);
  const [description, setDescription] = useState(null);
  const [responsibilities, setResponsbilities] = useState([]);
  const [technologies, setTechnologies] = useState([]);

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h1>POST VACANCY</h1>
      <Box
        className={classes.box}
        component="form"
        noValidate
        autoComplete="off"
      >
        <div className={classes.row}>
          <InputLabel htmlFor="outlined-title">Job Title</InputLabel>
          <OutlinedInput
            id="outlined-title"
            className={classes.input}
            placeholder="Enter the job title"
            //   value={name}
            //   onChange={handleChange}
          />
        </div>
        <div className={classes.row}>
          <InputLabel htmlFor="outlined-location">Location</InputLabel>
          <OutlinedInput
            id="outlined-location"
            className={classes.input}
            placeholder="Enter the location"
            //   value={name}
            //   onChange={handleChange}
          />
        </div>
        <div className={classes.row}>
          <InputLabel htmlFor="outlined-salary" style={{ paddingRight: "8px" }}>
            Salary
          </InputLabel>
          <OutlinedInput
            id="outlined-salary"
            className={classes.input}
            //   value={values.amount}
            //   onChange={handleChange("amount")}
            startAdornment={<InputAdornment position="start">£</InputAdornment>}
          />
        </div>
        <div className={classes.row}>
          <InputLabel htmlFor="outlined-description">
            Job description
          </InputLabel>
          <OutlinedInput
            id="outlined-description"
            className={classes.input}
            placeholder="Describe the function of the role and the type of candidate you're looking for"
            multiline
            maxRows={4}
            //   value={value}
            //   onChange={handleChange}
          />
        </div>
        <div className={classes.row}>
          <InputLabel htmlFor="outlined-responsibilities">
            Key responsibilities
          </InputLabel>
          <OutlinedInput
            id="outlined-responsibilities"
            className={classes.input}
            placeholder="Enter the key responsibilities"
            //   value={name}
            //   onChange={handleChange}
          />
        </div>
        <div className={classes.row}>
          <InputLabel htmlFor="select-technologies">
            Key technologies
          </InputLabel>
          <SelectTechnologies value={[]} className={classes.input} />
        </div>
      </Box>
      <Button>Submit</Button>
    </div>
  );
}

export default PostVacancy;
