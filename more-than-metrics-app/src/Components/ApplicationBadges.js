import React from "react"
import Badge from "@mui/material/Badge"
import PendingIcon from "@mui/icons-material/Pending"
import CancelIcon from "@mui/icons-material/Cancel"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"

export default function ApplicationBadges() {
    return (
        <div>
            <Badge badgeContent={4} color="primary">
                <PendingIcon sx={{ color: "#FFBF50" }} />
            </Badge>
            <Badge badgeContent={4} color="primary">
                <CancelIcon sx={{ color: "red", opacity: "70%" }} />
            </Badge>
            <Badge badgeContent={4} color="primary">
                <CheckCircleIcon sx={{ color: "green", opacity: "70%" }} />
            </Badge>
        </div>
    )
}
