import Dropdown from "./Dropdown"
import { makeStyles } from "@material-ui/core/styles"
import { Card, CardContent, Typography, CardActions, CardMedia, Button } from "@mui/material"
import { LinkedIn, GitHub } from "@material-ui/icons"

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
    },
}))

function About() {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <Dropdown />
            <h1 style={{ paddingTop: "5rem" }}>About us</h1>
            <Card sx={{ maxWidth: 345 }}>
                <CardMedia component="img" alt="" height="140" image="/assets/MTM/Berkan.jpg" />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Lizard
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica
                    </Typography>
                </CardContent>
                <CardActions>
                    <LinkedIn />
                    <GitHub />
                </CardActions>
            </Card>
            <Card sx={{ maxWidth: 345 }}>
                <CardMedia component="img" alt="" height="140" image="/assets/MTM/Kasia.jpg" />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Lizard
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica
                    </Typography>
                </CardContent>
                <CardActions>
                    <LinkedIn />
                    <GitHub />
                </CardActions>
            </Card>
            <Card sx={{ maxWidth: 345 }}>
                <CardMedia component="img" alt="" height="140" image="/assets/MTM/Kobi.jpg" />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Lizard
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica
                    </Typography>
                </CardContent>
                <CardActions>
                    <LinkedIn />
                    <GitHub />
                </CardActions>
            </Card>
            <Card sx={{ maxWidth: 345 }}>
                <CardMedia component="img" alt="" height="140" image="/assets/MTM/Sang.jpg" />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Lizard
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica
                    </Typography>
                </CardContent>
                <CardActions>
                    <LinkedIn />
                    <GitHub />
                </CardActions>
            </Card>
        </div>
    )
}

export default About
