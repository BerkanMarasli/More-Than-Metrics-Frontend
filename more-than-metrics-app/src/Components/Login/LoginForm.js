import React from "react"
import { makeStyles } from "@material-ui/styles"
import { Card, CardContent, Grid, Typography, TextField, Button, ButtonGroup } from "@material-ui/core"
import clsx from "clsx"
import { Formik, Form } from "formik"
import Alert from "@mui/material/Alert"
import { Redirect } from "react-router-dom"

const useStyles = makeStyles(() => ({
    center: {
        // display: "flex",
        // flexDirection: "column",
        // justifyContent: "center",
        // alignContent: "center",
    },
    mb4: {
        marginBottom: 4,
    },
    mb1: {
        marginBottom: 1,
    },
    mb3: {
        marginBottom: 3,
    },
    mt2: {
        marginTop: 2,
    },
    mt4: {
        marginTop: 4,
    },
    ml4: {
        marginLeft: 4,
    },
}))

function LoginForm(props) {
    const classes = useStyles()
    const { getUser, setLoggedIn, errorMsg, setErrorMsg, handleRegisterFromLogin } = props

    return (
        <div>
            <Formik
                initialValues={{
                    email: "",
                    password: "",
                }}
                onSubmit={(values, actions) => {
                    console.log(values)
                    getUser(values, setLoggedIn, setErrorMsg)
                }}>
                {({ values, touched, errors, handleChange, handleBlur, handleSubmit }) => {
                    return (
                        <Form onSubmit={handleSubmit}>
                            <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center">
                                <div>
                                    <Grid item>
                                        <Card
                                            style={{
                                                marginBottom: 20,
                                                maxWidth: 900,
                                                marginTop: 20,
                                            }}>
                                            <CardContent>
                                                <Typography
                                                    variant="h3"
                                                    className={clsx(classes.center, classes.mb4)}
                                                    style={{
                                                        "letter-spacing": "0.01071em",
                                                        color: "rgba(0, 0, 0, 0.6)",
                                                        fontWeight: "bold",
                                                        margin: "4px 0px",
                                                        textAlign: "center",
                                                        fontSize: "2em",
                                                        fontFamily: "Lato",
                                                        marginBottom: "1rem",
                                                    }}>
                                                    LOGIN
                                                </Typography>
                                                <Grid container spacing={2}>
                                                    <Grid item lg={12} md={12} xs={12}>
                                                        <TextField
                                                            fullWidth
                                                            label="Email"
                                                            type="email"
                                                            variant="outlined"
                                                            name="email"
                                                            value={values.email}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            error={Boolean(touched && touched.email && errors && errors.email)}
                                                            helperText={touched && touched.email && errors && errors.email ? errors.email : ""}
                                                        />
                                                    </Grid>
                                                    <Grid item lg={12} md={12} xs={12}>
                                                        <TextField
                                                            fullWidth
                                                            label="Password"
                                                            type="password"
                                                            variant="outlined"
                                                            name="password"
                                                            value={values.password}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            error={Boolean(touched && touched.password && errors && errors.password)}
                                                            helperText={
                                                                touched && touched.password && errors && errors.password ? errors.password : ""
                                                            }
                                                        />
                                                        {errorMsg ? (
                                                            <Alert style={{ marginTop: "1rem" }} severity="error">
                                                                {errorMsg}
                                                            </Alert>
                                                        ) : null}
                                                    </Grid>
                                                </Grid>
                                                <div style={{ display: "flex", justifyContent: "center", margin: "8px 0px" }}>
                                                    <Button
                                                        type="submit"
                                                        color="primary"
                                                        variant="contained"
                                                        className={clsx(classes.mt4, classes.mb3)}
                                                        style={{
                                                            backgroundColor: "#FFBF50",
                                                            color: "white",
                                                            fontSize: "12pt",
                                                            fontFamily: "Lato",
                                                            fontWeight: "bold",
                                                            marginTop: "1rem",
                                                        }}>
                                                        LOG IN
                                                    </Button>
                                                </div>
                                                <hr style={{ margin: "1rem 0rem" }} />
                                                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                                    <p style={{ margin: "0rem", marginBottom: "0.5rem" }}>Forgot to register?</p>
                                                    <div style={{ display: "flex", justifyContent: "center" }}>
                                                        <ButtonGroup variant="text" aria-label="text button group">
                                                            <Button value={"candidate"} onClick={handleRegisterFromLogin}>
                                                                candidate
                                                            </Button>
                                                            <Button value={"company"} onClick={handleRegisterFromLogin}>
                                                                company
                                                            </Button>
                                                        </ButtonGroup>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                </div>
                            </Grid>
                        </Form>
                    )
                }}
            </Formik>
        </div>
    )
}

export default LoginForm
