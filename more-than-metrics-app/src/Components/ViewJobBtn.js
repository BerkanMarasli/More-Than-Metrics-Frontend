import { Button } from "@material-ui/core"

export default function ViewJobBtn(props) {
  return (
    <Button
      value={props.jobID}
      style={{ border: "2px solid #FFBF50", borderRadius: "8px" }}
      onClick={props.handleOpen}
    >
      View Job
    </Button>
  )
}
