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

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function SelectTechnologies(props) {
  const [technologies, setTechnologies] = useState(null);

  useEffect(() => {
    const fetchTechnologies = async () => {
      const techResponse = await fetch("http://localhost:8080/technologies");
      console.log("hello");
      const techJson = await techResponse.json();
      console.log(techJson);
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
        multiple
        value={techName}
        onChange={handleChange}
        input={<OutlinedInput id="select-multiple-chip" />}
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((value) => (
              <Chip key={value} label={value} />
            ))}
          </Box>
        )}
        MenuProps={MenuProps}
      >
        {technologies
          ? technologies.map((tech) => (
              <MenuItem
                key={tech.technology_id}
                value={tech.technology_name}
                style={getStyles(tech, techName, theme)}
              >
                {tech.technology_name}
              </MenuItem>
            ))
          : null}
      </Select>
    </FormControl>
  );
}

export default SelectTechnologies;
