import { useState, useEffect } from "react";
import {
  Box,
  OutlinedInput,
  FormControl,
  Select,
  MenuItem,
  Chip,
} from "@mui/material/";
import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@material-ui/core/styles";
import { createStyles, withStyles } from "@material-ui/styles";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(tech, techName, theme) {
  return {
    fontWeight:
      techName.indexOf(tech) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const CustomMenuItem = withStyles((theme) =>
  createStyles({
    root: {
      "&$selected": {
        backgroundColor: "red",
        "&:hover": {
          backgroundColor: "green",
        },
      },
      "&:hover": {
        backgroundColor: "blue",
      },
    },
    selected: { backgroundColor: "green" },
  })
)(MenuItem);

const useStyles = makeStyles((theme) => ({
  selectRoot: {
    "&:focus": {
      backgroundColor: "yellow",
    },
  },
}));

function SelectTechnologies(props) {
  const [technologies, setTechnologies] = useState(null);

  const classes = useStyles();

  useEffect(() => {
    const fetchTechnologies = async () => {
      const techResponse = await fetch("http://localhost:8080/technologies");
      const techJson = await techResponse.json();
      setTechnologies(techJson);
    };
    fetchTechnologies();
  }, []);

  const theme = useTheme();
  const [techName, setTechName] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setTechName(
      // On autofill we get a the stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <FormControl sx={{ m: 1, width: "20rem" }} disabled={props.disabled}>
      <Select
        id="select-technologies"
        className={classes.selectRoot}
        multiple
        value={techName}
        onChange={handleChange}
        input={<OutlinedInput id="select-multiple-chip" />}
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((value) => (
              <Chip
                key={value}
                label={value}
                style={{ backgroundColor: "#ffeab9" }}
              />
            ))}
          </Box>
        )}
        MenuProps={MenuProps}
      >
        <MenuItem value="" disabled>
          Technology
        </MenuItem>
        {technologies
          ? technologies.map((tech) => (
              <CustomMenuItem
                // className={classes.select}
                // sx={{ "&& .Mui-selected": { backgroundColor: "green" } }}
                key={tech.technology_id}
                value={tech.technology_name}
                style={getStyles(tech, techName, theme)}
              >
                {tech.technology_name}
              </CustomMenuItem>
            ))
          : null}
      </Select>
    </FormControl>
  );
}

export default SelectTechnologies;
