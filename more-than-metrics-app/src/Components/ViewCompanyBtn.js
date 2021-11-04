import { Button } from "@material-ui/core"

export default function ViewCompanyBtn(props) {
  return (
    <Button style={{ border: "2px solid #FFBF50", borderRadius: "8px", width: "150px" }} onClick={props.handleOpen}>
      {props.companyName}
    </Button>
  )
}
