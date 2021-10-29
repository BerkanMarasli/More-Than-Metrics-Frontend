import { PendingIcon, CancelIcon, CheckCircleIcon, HelpIcon } from "@mui/icons-material"

export default function ApplicationStatus(reviewed, accepted) {
  if (!reviewed) {
    return <PendingIcon sx={{ color: "#FFBF50" }} />
  } else if (reviewed && !accepted) {
    return <CancelIcon sx={{ color: "red", opacity: "70%" }} />
  } else if (reviewed && accepted) {
    return <CheckCircleIcon sx={{ color: "green", opacity: "70%" }} />
  } else {
    return <HelpIcon />
  }
}
