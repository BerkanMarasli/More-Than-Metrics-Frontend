import React from "react"
import Badge from "@mui/material/Badge"
import PendingIcon from "@mui/icons-material/Pending"
import CancelIcon from "@mui/icons-material/Cancel"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"

export default function ApplicationBadges(props) {
    const { job_pending, job_rejected, job_accepted } = props.jobStats
    return (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Badge badgeContent={job_pending} color="primary" max={9}>
                <PendingIcon fontSize="large" sx={{ color: "#FFBF50" }} />
            </Badge>
            <Badge badgeContent={job_rejected} color="primary" max={9}>
                <CancelIcon fontSize="large" sx={{ color: "red", opacity: "70%" }} />
            </Badge>
            <Badge badgeContent={job_accepted} color="primary" max={9}>
                <CheckCircleIcon fontSize="large" sx={{ color: "green", opacity: "70%" }} />
            </Badge>
        </div>
    )
}
