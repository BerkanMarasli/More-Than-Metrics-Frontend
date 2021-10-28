import { Button } from "@material-ui/core"

export default function ViewApplicationBtn(props) {
  return (
    <Button
      style={{ border: "2px solid #FFBF50", borderRadius: "8px" }}
      onClick={() => console.log("view application button clicked")}
    >
      View Application
    </Button>
  )
}
