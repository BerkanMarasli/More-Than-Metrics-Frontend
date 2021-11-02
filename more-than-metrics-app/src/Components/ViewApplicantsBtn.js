import { Button } from "@material-ui/core"

export default function ViewApplicantsBtn(props) {
    return (
        <Button style={{ border: "2px solid #FFBF50", borderRadius: "8px" }} onClick={() => console.log("view applicants button clicked")}>
            View Applicants
        </Button>
    )
}
