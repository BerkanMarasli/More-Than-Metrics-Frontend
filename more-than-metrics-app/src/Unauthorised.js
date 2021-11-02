import React from "react"
import Alert from "@mui/material/Alert"

export default function Unauthorised() {
    return (
        <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Alert severity="error">Unauthorised Access!</Alert>
        </div>
    )
}
