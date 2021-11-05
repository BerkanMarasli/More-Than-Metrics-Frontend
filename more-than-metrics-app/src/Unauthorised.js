import React from "react"
import Navbar from "./Navbar/Navbar"
import Unauthorised401Img from "./401_Error_Message.png"

export default function Unauthorised(props) {
    return (
        <div>
            <div style={{ height: "15rem" }}>
                <Navbar userType={props.userType} />
            </div>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <img src={Unauthorised401Img} alt="401 Error Message" />
            </div>
        </div>
    )
}
