import { Button } from "@material-ui/core"

export default function ViewSuccessBtn(props) {
    return (
        <Button style={{ border: "2px solid #FFBF50", borderRadius: "8px" }} onClick={() => console.log("view success button clicked")}>
            Accepted Applicants
        </Button>
    )
}
