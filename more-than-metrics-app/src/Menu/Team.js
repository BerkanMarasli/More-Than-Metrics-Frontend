import Dropdown from "./Dropdown"
import { makeStyles } from "@material-ui/core/styles"
import { Card, CardContent, Typography, CardActions, CardMedia, Chip } from "@mui/material"
import { LinkedIn, GitHub } from "@material-ui/icons"

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
    },

    cards: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
        border: "solid 2pt #FFBF50",
        borderRadius: "8px",
        padding: "1rem",
        margin: "1rem",
    },

    card: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        margin: "0.5rem",
        height: "30rem",
        width: "20rem",
        textAlign: "center",
    },

    actions: {
        border: "solid 2pt #FFBF50",
        borderRadius: "5px",
        maxWidth: "fit-content",
        marginBottom: "2rem",
        paddingTop: "1rem",
    },

    bio: {
        fontSize: "16pt",
    },
}))

function Team() {
    const classes = useStyles()

    return (
        <div id="about" className={classes.root}>
            <Dropdown />
            <h1 style={{ paddingTop: "5rem", fontFamily: "Lato", color: "gray" }}>MEET THE TEAM 🤩</h1>
            <div className={classes.cards}>
                <Card className={classes.card} sx={{ maxWidth: 345 }}>
                    <CardMedia component="img" alt="" height="60%" image="/assets/MTM/Berkan.jpg" />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Berkan Marasli
                        </Typography>
                        <Typography color="text.secondary">Berkan always knew the right thing to say to get the team pumped!</Typography>
                    </CardContent>
                    <CardActions className={classes.actions}>
                        <a href="https://www.linkedin.com/in/berkanmarasli/" style={{ color: "inherit" }}>
                            <LinkedIn style={{ color: "gray", fontSize: "30pt" }} />
                        </a>
                        <a href="https://github.com/BerkanMarasli" style={{ color: "inherit" }}>
                            <GitHub style={{ color: "gray", fontSize: "24pt" }} />
                        </a>
                    </CardActions>
                </Card>
                <Card className={classes.card} sx={{ maxWidth: 345 }}>
                    <CardMedia component="img" alt="" height="60%" image="/assets/MTM/Kasia.jpg" />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Kasia Dutch
                        </Typography>
                        <Typography color="text.secondary">Kasia kept the team on track so we could create something awesome!</Typography>
                    </CardContent>
                    <CardActions className={classes.actions}>
                        <a href="https://www.linkedin.com/in/k-dutch/" style={{ color: "inherit" }}>
                            <LinkedIn style={{ color: "gray", fontSize: "30pt" }} />
                        </a>
                        <a href="https://github.com/kashcoding" style={{ color: "inherit" }}>
                            <GitHub style={{ color: "gray", fontSize: "24pt" }} />
                        </a>
                    </CardActions>
                </Card>
                <Card className={classes.card} sx={{ maxWidth: 345 }}>
                    <CardMedia component="img" alt="" height="60%" image="/assets/MTM/Kobi.jpg" />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Kobi Vasantharajah
                        </Typography>
                        <Typography color="text.secondary">Kobi's positivity motivated the team throughout the project!</Typography>
                    </CardContent>
                    <CardActions className={classes.actions}>
                        <a href="https://github.com/K-Vasantharajah/" style={{ color: "inherit" }}>
                            <LinkedIn style={{ color: "gray", fontSize: "30pt" }} />
                        </a>
                        <a href="https://github.com/BerkanMarasli" style={{ color: "inherit" }}>
                            <GitHub style={{ color: "gray", fontSize: "24pt" }} />
                        </a>
                    </CardActions>
                </Card>
                <Card className={classes.card} sx={{ maxWidth: 345 }}>
                    <CardMedia component="img" alt="" height="60%" image="/assets/MTM/Sang.jpg" />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Sang Ta
                        </Typography>
                        <Typography color="text.secondary">Sang kept our energies level up for coding by bringing delicious snacks!</Typography>
                    </CardContent>
                    <CardActions className={classes.actions}>
                        <a href="https://www.linkedin.com/in/sang-t-080892172/" style={{ color: "inherit" }}>
                            <LinkedIn style={{ color: "gray", fontSize: "30pt" }} />
                        </a>
                        <a href="https://github.com/gSangsterr" style={{ color: "inherit" }}>
                            <GitHub style={{ color: "gray", fontSize: "24pt" }} />
                        </a>
                    </CardActions>
                </Card>
            </div>
        </div>
    )
}

export default Team
