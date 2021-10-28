import { useState } from "react";
import {
  Box,
  OutlinedInput,
  FormControl,
  Select,
  MenuItem,
  Chip,
} from "@mui/material/";
import { Button } from "@material-ui/core";
import { useTheme } from "@mui/material/styles";

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

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
  const theme = useTheme();
  const [personName, setPersonName] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a the stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <FormControl sx={{ m: 1, width: "20rem" }} disabled={props.disabled}>
      <Select
        id="select-technologies"
        multiple
        value={personName}
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
        {names.map((name) => (
          <MenuItem
            key={name}
            value={name}
            style={getStyles(name, personName, theme)}
          >
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default SelectTechnologies;
