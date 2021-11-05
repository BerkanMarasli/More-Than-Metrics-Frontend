import { FormControl, InputLabel } from "@material-ui/core"
import { Box, OutlinedInput, Select, MenuItem, Chip } from "@mui/material/"

import React, { useState, useEffect } from "react"
// Material UI

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
}

function SelectTechnologies(props) {
    const { handleChange, techArray, error, helperText, disabled, loadedTechList } = props
    const [technologies, setTechnologies] = useState(null)

    useEffect(() => {
        const fetchTechnologies = async () => {
            const techResponse = await fetch(process.env.REACT_APP_API_URL + "/technologies")
            const techJson = await techResponse.json()
            setTechnologies(techJson)
        }
        fetchTechnologies()
    }, [])

    return (
        <div className={props.className}>
            {technologies ? (
                <Select
                    disabled={disabled !== undefined ? disabled : false}
                    fullWidth
                    id="select-technologies"
                    multiple
                    name="technology"
                    label="Technology"
                    labelId="techLabel"
                    placeholder="Technology"
                    value={disabled && loadedTechList !== undefined ? loadedTechList : techArray}
                    onChange={handleChange}
                    variant="outlined"
                    input={<OutlinedInput id="select-multiple-chip" />}
                    renderValue={(selected) => (
                        <div>
                            {console.log(selected)}
                            <Box
                                sx={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: 0.5,
                                }}>
                                {selected.length < 1 ? (
                                    <MenuItem value="" disabled>
                                        Technology
                                    </MenuItem>
                                ) : null}
                                {selected.map((singleTechnology) => (
                                    <Chip
                                        key={singleTechnology.technology_id}
                                        label={singleTechnology.technology_name}
                                        style={{ background: "#ffeab9" }}
                                    />
                                ))}
                            </Box>
                        </div>
                    )}
                    MenuProps={MenuProps}
                    displayEmpty>
                    <MenuItem value="" disabled>
                        Technology
                    </MenuItem>
                    {technologies
                        ? technologies.map((tech) => (
                              <MenuItem key={tech.technology_id} value={tech} name={tech.technology_name}>
                                  {tech.technology_name}
                              </MenuItem>
                          ))
                        : null}
                </Select>
            ) : null}
        </div>
    )
}

export default SelectTechnologies
