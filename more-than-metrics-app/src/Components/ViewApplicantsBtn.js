import { Button } from "@material-ui/core"

export default function ViewApplicantsBtn(props) {
    return (
        <Button style={{ border: "2px solid #FFBF50", borderRadius: "8px" }} onClick={() => handleOnClick(props.jobID)}>
            Review Applicants
        </Button>
    )
}

function handleOnClick(jobID) {
    console.log(jobID)
    document.cookie = `matchJobID=${jobID};max-age=10000`
    window.location.href = "https://morethanmetrics.netlify.app/match"
}
