import { Button } from "@material-ui/core"

export default function ViewSuccessBtn(props) {
    return (
        <Button value={props.jobID} style={{ border: "2px solid #FFBF50", borderRadius: "8px" }} onClick={props.handleOpen}>
            Accepted Applicants
        </Button>
    )
}
