import { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import {
    Box,
    TextField,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Slider,
    FormControl,
    FormHelperText,
    IconButton,
    Avatar,
    Badge,
    Popover,
} from "@mui/material/"
import { Button, Typography } from "@material-ui/core"
import { Visibility, VisibilityOff, AddPhotoAlternate } from "@material-ui/icons"
import FileUploadIcon from "@mui/icons-material/FileUpload"

const useStyles = makeStyles((theme) => ({
    root: {
        display: "grid",
        justifyItems: "center",
        alignContent: "center",
        padding: "1rem",
    },

    box: {
        display: "grid",
        justifyItems: "end",
        // padding: "1rem",
    },

    row: {
        display: "flex",
        alignItems: "center",
    },

    input: {
        width: "20rem",
        margin: "0.5rem",
    },

    btn: {
        backgroundColor: "#FFBF50",
        color: "white",
        fontWeight: "bold",
        fontFamily: "Lato",
    },
}))

const marks = [
    {
        value: 0,
        label: "<20",
    },
    {
        value: 1,
        label: "20-100",
    },
    {
        value: 2,
        label: "101-300",
    },
    {
        value: 3,
        label: "301-500",
    },
    {
        value: 4,
        label: "501-1000",
    },
    {
        value: 5,
        label: "1,000+",
    },
]

function CompanyProfile() {
    const [disabled, setDisabled] = useState(true)
    const [name, setName] = useState("Google")
    const [img, setImg] = useState(
        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1200px-Google_%22G%22_Logo.svg.png"
    )
    const [location, setLocation] = useState("London")
    const [bio, setBio] = useState("We are Google. Suck it.")
    const [employees, setEmployees] = useState(10000)
    const [retention, setRetention] = useState(78)
    const [ratio, setRatio] = useState(49)
    const [email, setEmail] = useState("google@google.com")
    const [password, setPassword] = useState(null)
    const [showPassword, setShowPassword] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null)

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

    const handleOpenPopover = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const open = Boolean(anchorEl)
    const id = open ? "simple-popover" : undefined

    return (
        <div className={classes.root}>
            <h1 style={{ margin: "0px", fontFamily: "Lato", color: "gray" }}>COMPANY PROFILE</h1>
            <Box className={classes.box} component="form" noValidate autoComplete="off">
                <div className={classes.row}>
                    <InputLabel htmlFor="outlined-name" style={{ paddingRight: "1rem" }}>
                        Company
                    </InputLabel>
                    <Badge
                        aria-describedby={id}
                        size="small"
                        overlap="circular"
                        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                        badgeContent={<AddPhotoAlternate onClick={handleOpenPopover} />}
                        style={disabled ? { color: "transparent", opacity: "70%" } : null}>
                        <Avatar
                            alt={name}
                            src={img ? img : "/broken-image.jpg"}
                            style={{
                                height: "3rem",
                                width: "3rem",
                                padding: "5px",
                                border: "0.1px solid lightgray",
                            }}
                        />
                    </Badge>
                    <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "left",
                        }}>
                        <Typography>
                            <OutlinedInput
                                size="small"
                                id="outlined-img"
                                className={classes.input}
                                style={{ width: "15rem" }}
                                placeholder="Enter the logo URL"
                                //   onChange={handleChange}
                            />
                            <Button size="small" style={{ padding: "none" }} onClick={handleClose}>
                                <FileUploadIcon />
                            </Button>
                        </Typography>
                    </Popover>
                    <OutlinedInput
                        disabled={disabled}
                        id="outlined-name"
                        className={classes.input}
                        placeholder="Enter the company name"
                        value={name}
                        //   onChange={handleChange}
                    />
                </div>
                <div className={classes.row}>
                    <InputLabel htmlFor="outlined-location">Location</InputLabel>
                    <OutlinedInput
                        disabled={disabled}
                        id="outlined-location"
                        className={classes.input}
                        placeholder="Enter the location"
                        value={location}
                        //   onChange={handleChange}
                    />
                </div>
                <div className={classes.row}>
                    <InputLabel htmlFor="outlined-description">Bio </InputLabel>
                    <OutlinedInput
                        disabled={disabled}
                        id="outlined-description"
                        className={classes.input}
                        placeholder="Describe the function of the role and the type of candidate you're looking for"
                        multiline
                        maxRows={4}
                        value={bio}
                        //   onChange={handleChange}
                    />
                </div>
                <div className={classes.row}>
                    <InputLabel htmlFor="slider-employees" style={{ paddingRight: "16px" }}>
                        Number of employees
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
                            id="slider-employees"
                            size="medium"
                            valueLabelFormat={valueLabelFormat}
                            getAriaValueText={valueLabelFormat}
                            step={1}
                            marks
                            valueLabelDisplay="on"
                            min={0}
                            max={5}
                            disabled={disabled}
                            style={disabled ? { color: "#FFBF50", opacity: "70%" } : { color: "#FFBF50" }}
                        />
                    </Box>
                </div>
                <div className={classes.row}>
                    <InputLabel htmlFor="outlined-retention">Company metrics</InputLabel>
                    <FormControl sx={{ m: 1, width: "9.5rem" }} variant="outlined">
                        <OutlinedInput
                            disabled={disabled}
                            id="outlined-retention"
                            value={retention}
                            // onChange={handleChange("weight")}
                            endAdornment={<InputAdornment position="end">%</InputAdornment>}
                            aria-describedby="outlined-retention-helper-text"
                            inputProps={{
                                "aria-label": "retention",
                            }}
                        />
                        <FormHelperText id="outlined-retention-helper-text">Employee retention</FormHelperText>
                    </FormControl>
                    <FormControl sx={{ m: 1, width: "9.5rem" }} variant="outlined">
                        <OutlinedInput
                            disabled={disabled}
                            id="outlined-adornment-gender"
                            value={ratio}
                            // onChange={handleChange("weight")}
                            endAdornment={<InputAdornment position="end">% female</InputAdornment>}
                            aria-describedby="outlined-gender-helper-text"
                            inputProps={{
                                "aria-label": "gender",
                            }}
                        />
                        <FormHelperText id="outlined-gender-helper-text">Gender distribution</FormHelperText>
                    </FormControl>
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
                                id="outlined-confirm"
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
            {disabled ? (
                <Button className={classes.btn} onClick={() => setDisabled(false)}>
                    Edit
                </Button>
            ) : (
                <Button className={classes.btn} onClick={() => setDisabled(true)}>
                    Save
                </Button>
            )}
        </div>
    )
}

export default CompanyProfile
