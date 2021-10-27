import Navbar from "../Navbar/Navbar"
import JobBoardDisplayJobs from "./JobBoardDisplayJobs.js"
// import { makeStyles } from "@mui/styles"

// const useStyles = makeStyles({
//   "makeStyles-root-1": {
//     height: "15vh",
//   },
// })

function JobBoard() {
  // const classes = useStyles()
  return (
    <div>
      {/* <Navbar userType={"candidate"} /> */}
      <JobBoardDisplayJobs />
    </div>
  )
}

export default JobBoard
