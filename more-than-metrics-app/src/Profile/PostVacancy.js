import { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Box, InputAdornment, InputLabel, OutlinedInput } from "@mui/material/"
import { Button } from "@material-ui/core"
import SelectTechnologies from "../Components/SelectTechnologies"

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
        marginBottom: "1rem",
    },
}))

function PostVacancy() {
    const [title, setTitle] = useState(null)
    const [location, setLocation] = useState(null)
    const [salary, setSalary] = useState(null)
    const [description, setDescription] = useState(null)
    const [responsibilities, setResponsbilities] = useState([])
    const [technologies, setTechnologies] = useState([])

    const classes = useStyles()

    function handleSummit() {
        console.log(responsibilities)
        console.log(technologies)
    }

    return (
        <div className={classes.root}>
            <h1 style={{ margin: "0px", fontFamily: "Lato", color: "gray" }}>POST VACANCY</h1>
            <Box className={classes.box} component="form" noValidate autoComplete="off">
                <div className={classes.row}>
                    <InputLabel htmlFor="outlined-title">Job Title</InputLabel>
                    <OutlinedInput
                        id="outlined-title"
                        className={classes.input}
                        placeholder="Enter the job title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className={classes.row}>
                    <InputLabel htmlFor="outlined-location">Location</InputLabel>
                    <OutlinedInput
                        id="outlined-location"
                        className={classes.input}
                        placeholder="Enter the location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                </div>
                <div className={classes.row}>
                    <InputLabel htmlFor="outlined-salary" style={{ paddingRight: "8px" }}>
                        Salary
                    </InputLabel>
                    <OutlinedInput
                        id="outlined-salary"
                        className={classes.input}
                        value={salary}
                        onChange={(e) => setSalary(e.target.value)}
                        startAdornment={<InputAdornment position="start">£</InputAdornment>}
                    />
                </div>
                <div className={classes.row}>
                    <InputLabel htmlFor="outlined-description">Job description</InputLabel>
                    <OutlinedInput
                        id="outlined-description"
                        className={classes.input}
                        placeholder="Describe the function of the role and the type of candidate you're looking for"
                        multiline
                        maxRows={4}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className={classes.row}>
                    <InputLabel htmlFor="outlined-responsibilities">Key responsibilities</InputLabel>
                    <OutlinedInput
                        id="outlined-responsibilities"
                        className={classes.input}
                        placeholder="Enter responsibilities (comma separated)"
                        value={responsibilities}
                        onChange={(e) => setResponsbilities(e.target.value.split(","))}
                    />
                </div>
                <div className={classes.row}>
                    <InputLabel htmlFor="select-technologies">Key technologies</InputLabel>
                    <SelectTechnologies techArray={technologies} className={classes.input} />
                </div>
            </Box>
            <Button onClick={handleSummit} className={classes.btn}>
                Submit
            </Button>
        </div>
    )
}

export default PostVacancy
