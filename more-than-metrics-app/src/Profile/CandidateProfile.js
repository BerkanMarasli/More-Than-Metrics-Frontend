import { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Box, TextField, InputAdornment, InputLabel, OutlinedInput, Slider, FormControl, IconButton } from "@mui/material/"
import { Button } from "@material-ui/core"
import SelectTechnologies from "../Components/SelectTechnologies"
import { Visibility, VisibilityOff } from "@material-ui/icons"

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
}))

const marks = [
    {
        value: 0,
        label: "<1",
    },
    {
        value: 1,
        label: "1",
    },
    {
        value: 2,
        label: "2",
    },
    {
        value: 3,
        label: "3",
    },
    {
        value: 4,
        label: "4",
    },
    {
        value: 5,
        label: "5+",
    },
]

function CandidateProfile() {
    const [disabled, setDisabled] = useState(true)
    const [firstName, setFirstName] = useState("Kasia")
    const [lastName, setLastName] = useState("Dutch")
    const [years, setYears] = useState(null)
    const [technologies, setTechnologies] = useState([])
    const [number, setNumber] = useState("0121 do one")
    const [email, setEmail] = useState("google@google.com")
    const [password, setPassword] = useState(null)
    const [showPassword, setShowPassword] = useState(false)

    const classes = useStyles()

    function valueLabelFormat(value) {
        return marks.map((mark) => {
            if (mark.value === value) {
                return mark.label
            }
        })
    }

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const handleMouseDownPassword = (event) => {
        event.preventDefault()
    }

    return (
        <div className={classes.root}>
            <h1 style={{ margin: "0px" }}>YOUR PROFILE</h1>
            <Box className={classes.box} component="form" noValidate autoComplete="off">
                <div className={classes.row}>
                    <InputLabel htmlFor="outlined-name">Name</InputLabel>
                    {disabled ? (
                        <OutlinedInput
                            disabled={disabled}
                            id="outlined-name"
                            className={classes.input}
                            placeholder="Enter the company name"
                            value={firstName + " " + lastName}
                            //   onChange={handleChange}
                        />
                    ) : (
                        <div>
                            <FormControl sx={{ m: 1, width: "9.5rem" }} variant="outlined">
                                <TextField
                                    id="outlined-first"
                                    value={firstName}
                                    label="Forename"
                                    // onChange={handleChange("weight")}
                                />
                            </FormControl>
                            <FormControl sx={{ m: 1, width: "9.5rem" }} variant="outlined">
                                <TextField
                                    id="outlined-last"
                                    value={lastName}
                                    label="Surname"
                                    // onChange={handleChange("weight")}
                                />
                            </FormControl>
                        </div>
                    )}
                </div>
                <div className={classes.row}>
                    <InputLabel htmlFor="outlined-description">Headline </InputLabel>
                    <OutlinedInput
                        disabled={disabled}
                        id="outlined-description"
                        className={classes.input}
                        placeholder="Describe the function of the role and the type of candidate you're looking for"
                        multiline
                        maxRows={4}
                        // value={bio}
                        //   onChange={handleChange}
                    />
                </div>
                <div className={classes.row}>
                    <InputLabel htmlFor="slider-years" style={{ paddingRight: "15px" }}>
                        Years in Industry
                    </InputLabel>
                    <Box
                        sx={{
                            width: "18rem",
                            paddingRight: "1.5rem",
                            paddingLeft: "1rem",
                            paddingTop: "2.5rem",
                            paddingBottom: "0.5rem",
                            display: "flex",
                            alignContents: "center",
                            justifyContents: "center",
                        }}>
                        <Slider
                            disabled={disabled}
                            id="slider-years"
                            size="medium"
                            valueLabelFormat={valueLabelFormat}
                            getAriaValueText={valueLabelFormat}
                            step={1}
                            marks
                            valueLabelDisplay="on"
                            min={0}
                            max={5}
                            style={disabled ? { color: "#FFBF50", opacity: "70%" } : { color: "#FFBF50" }}
                        />
                    </Box>
                </div>
                <div className={classes.row}>
                    <InputLabel htmlFor="select-technologies">Key technologies</InputLabel>
                    <SelectTechnologies value={[]} className={classes.input} disabled={disabled} />
                </div>
                <div className={classes.row}>
                    <InputLabel htmlFor="outlined-email">Number</InputLabel>
                    <OutlinedInput
                        disabled={disabled}
                        id="outlined-email"
                        className={classes.input}
                        placeholder="Enter a valid email address"
                        value={number}
                        //   onChange={handleChange}
                    />
                </div>
                <div className={classes.row}>
                    <InputLabel htmlFor="outlined-email">Email</InputLabel>
                    <OutlinedInput
                        disabled={disabled}
                        id="outlined-email"
                        className={classes.input}
                        placeholder="Enter a valid email address"
                        value={email}
                        //   onChange={handleChange}
                    />
                </div>
                {!disabled ? (
                    <div className={classes.row}>
                        <InputLabel htmlFor="outlined-password">Password </InputLabel>
                        <FormControl sx={{ m: 1, width: "8.4rem" }} variant="outlined">
                            <TextField
                                id="outlined-password"
                                label="New password"
                                type={showPassword ? "text" : "password"}
                                // onChange={handleChange("weight")}
                            />
                        </FormControl>
                        <FormControl sx={{ m: 1, width: "8.4rem" }} variant="outlined">
                            <TextField
                                id="outlined-password"
                                label="Confirm"
                                type={showPassword ? "text" : "password"}
                                // onChange={handleChange("weight")}
                            />
                        </FormControl>
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end">
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    </div>
                ) : null}
            </Box>
            {disabled ? <Button onClick={() => setDisabled(false)}>Edit</Button> : <Button onClick={() => setDisabled(true)}>Save</Button>}
        </div>
    )
}

export default CandidateProfile
