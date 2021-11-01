import Dropdown from "./Dropdown"
import { makeStyles } from "@material-ui/core/styles"
import { Card, CardContent, Typography, CardActions, CardMedia, Button, Chip } from "@mui/material"
import { LinkedIn, GitHub } from "@material-ui/icons"

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
    },

    cards: {
        display: "flex",
        flexDirection: "row",
    },

    card: {
        margin: "0.5rem",
        height: "30rem",
        width: "20rem",
    },
}))

function About() {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <Dropdown />
            <h1 style={{ paddingTop: "5rem" }}>About us</h1>
            <div className={classes.cards}>
                <Card className={classes.card} sx={{ maxWidth: 345 }}>
                    <CardMedia component="img" alt="" height="60%" image="/assets/MTM/Berkan.jpg" />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Berky boi <Chip label="Chip Filled" style={{ backgroundColor: "#FFBF50" }} />
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except
                            Antarctica
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <a href="https://www.linkedin.com/in/berkan-m-3777a9ba/" style={{ color: "inherit" }}>
                            <LinkedIn style={{ color: "#FFBF50" }} />
                        </a>
                        <GitHub style={{ color: "#FFBF50" }} />
                    </CardActions>
                </Card>
                <Card className={classes.card} sx={{ maxWidth: 345 }}>
                    <CardMedia component="img" alt="" height="60%" image="/assets/MTM/Kasia.jpg" />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Kasia <Chip label="Chip Outlined" variant="outlined" />
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except
                            Antarctica
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <LinkedIn style={{ color: "#FFBF50" }} />
                        <GitHub style={{ color: "#FFBF50" }} />
                    </CardActions>
                </Card>
                <Card className={classes.card} sx={{ maxWidth: 345 }}>
                    <CardMedia component="img" alt="" height="60%" image="/assets/MTM/Kobi.jpg" />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Kobi <Chip label="Chip Filled" style={{ backgroundColor: "#FFBF50" }} />
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except
                            Antarctica
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <LinkedIn style={{ color: "#FFBF50" }} />
                        <GitHub style={{ color: "#FFBF50" }} />
                    </CardActions>
                </Card>
                <Card className={classes.card} sx={{ maxWidth: 345 }}>
                    <CardMedia component="img" alt="" height="60%" image="/assets/MTM/Sang.jpg" />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Sang <Chip label="Chip Filled" style={{ backgroundColor: "#FFBF50" }} />
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except
                            Antarctica
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <GitHub />
                    </CardActions>
                </Card>
            </div>
        </div>
    )
}

export default About
