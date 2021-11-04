import React from "react"
import Alert from "@mui/material/Alert"
import Navbar from "./Navbar/Navbar"

export default function Unauthorised(props) {
    return (
        <div>
            <div style={{height: "15rem"}}>
                <Navbar userType={props.userType} />
            </div>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Alert style={{ background: "#FFBF50" }} severity="error">
                    UNAUTHORISED ACCESS!
                </Alert>
            </div>
        </div>
    )
}
