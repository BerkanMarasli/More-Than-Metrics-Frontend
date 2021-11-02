import { Box, OutlinedInput, FormControl, Select, MenuItem, Chip } from "@mui/material/"
import { useTheme } from "@mui/material/styles"
import { makeStyles } from "@material-ui/core/styles"
import { createStyles, withStyles } from "@material-ui/styles"
import React, { useState, useEffect } from "react"
// Material UI
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"

// Formik
import { Formik, Form } from "formik"

const yup = require("yup")

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

function getStyles(tech, techName, theme) {
    return {
        fontWeight: techName.indexOf(tech) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
    }
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
)(MenuItem)

const useStyles = makeStyles((theme) => ({
    selectRoot: {
        "&:focus": {
            backgroundColor: "yellow",
        },
    },
}))

function SelectTechnologies(props) {
    const { handleChange, value, error, helperText } = props
    const theme = useTheme()

    // console.log(error)

    const [technologies, setTechnologies] = useState(null)
    const signupSchema = yup.object().shape({
        // technology: yup.string().required("Please select at least one technology"),
    })

    const classes = useStyles()

    useEffect(() => {
        const fetchTechnologies = async () => {
            const techResponse = await fetch("http://localhost:8080/technologies")
            const techJson = await techResponse.json()
            setTechnologies(techJson)
        }
        fetchTechnologies()
    }, [])

    return (
        <div className={props.className}>
            {technologies ? (
                <Select
                    fullWidth
                    id="select-technologies"
                    multiple
                    name="technology"
                    label="Technology"
                    value={value}
                    onChange={handleChange}
                    variant="outlined"
                    // onBlur={handleBlur}
                    displayEmpty
                    input={<OutlinedInput id="select-multiple-chip" />}
                    renderValue={(selected) => (
                        <Box
                            sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 0.5,
                            }}>
                            {selected.map((value) => (
                                <Chip key={value} label={value} style={{ background: "#ffeab9" }} />
                            ))}
                        </Box>
                    )}
                    MenuProps={MenuProps}
                    error={!value.length}
                    //error={!error}
                    helperText={helperText}>
                    <MenuItem value="" disabled>
                        Technology
                    </MenuItem>
                    {technologies
                        ? technologies.map((tech) => (
                              <MenuItem key={tech.technology_id} value={tech.technology_name}>
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
