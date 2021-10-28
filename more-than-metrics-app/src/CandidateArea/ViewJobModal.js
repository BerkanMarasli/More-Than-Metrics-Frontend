import React, { useState, useEffect } from "react"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import Modal from "@mui/material/Modal"
import Avatar from "@mui/material/Avatar"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet"
import Divider from "@mui/material/Divider"
import ListSubheader from "@mui/material/ListSubheader"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import Grid from "@mui/material/Grid"
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd"

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80vw",
  height: "80vh",
  bgcolor: "background.paper",
  border: "4px solid #FFBF50",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
}

// function generate(element) {
//   return [0, 1, 2].map(value =>
//     React.cloneElement(element, {
//       key: value,
//     })
//   )
// }

export default function ViewJobModal(props) {
  const { openViewJob, handleCloseViewJob } = props.viewJob
  const jobViewed = props.jobViewed
  const [jobData, setJobData] = useState(null)

  useEffect(() => {
    async function fetchJobData() {
      const jobDataResponse = await fetch(`http://localhost:8080/job/${jobViewed}`)
      const jobData = await jobDataResponse.json()
      console.log(jobData[0])
      setJobData(jobData[0])
    }
    fetchJobData()
  }, [jobViewed])

  return (
    <div>
      <Modal
        open={openViewJob}
        onClose={handleCloseViewJob}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography sx={{ mb: 1 }} id="modal-modal-title" variant="h6" component="h2">
              {jobData ? jobData.job_title : null}
            </Typography>
            <Typography sx={{ mb: 1 }} id="modal-modal-title" variant="h6" component="h2">
              {jobData ? jobData.job_description : null}
            </Typography>
            <div
              style={{
                width: "80%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
                marginBottom: 8,
              }}
            >
              <Typography
                sx={{ display: "flex", flexDirection: "row", alignItems: "center", p: 0.5 }}
                id="modal-modal-title"
                variant="h5"
                component="h2"
              >
                <LocationOnIcon sx={{ pr: 0.5 }} />
                {jobData ? jobData.location : null}
              </Typography>
              <Typography
                sx={{ display: "flex", flexDirection: "row", alignItems: "center", p: 0.5 }}
                id="modal-modal-title"
                variant="h5"
                component="h2"
              >
                <AccountBalanceWalletIcon sx={{ pr: 0.5 }} />£{jobData ? jobData.salary : null}
              </Typography>
            </div>
            <hr style={{ width: "100%", border: "1px solid #FFBF50" }} />
            {jobData ? (
              <Grid item xs={12} md={6}>
                <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                  Key Responsibilities
                </Typography>
                <List dense={true}>
                  {jobData.responsibilities.map(responsibility => {
                    console.log(responsibility)
                    return (
                      <ListItem>
                        <ListItemIcon>
                          <AssignmentIndIcon />
                        </ListItemIcon>
                        <ListItemText primary={responsibility} />
                      </ListItem>
                    )
                  })}
                </List>
              </Grid>
            ) : null}
            {/* <Avatar
              alt="Instagram Logo"
              src="https://cdn-icons-png.flaticon.com/512/5968/5968982.png" // Needs changing to be company specific
              sx={{ width: 56, height: 56, mb: 1 }}
            />
            <Typography sx={{ mb: 1 }} id="modal-modal-title" variant="h6" component="h2">
              {companyData ? companyData.company_name : null}
            </Typography>
            <div
              style={{
                width: "80%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
                marginBottom: 8,
              }}
            >
            <CompanyJobBoard
              companyViewed={companyViewed}
              viewCompany={viewCompany}
              viewJob={viewJob}
              viewApply={viewApply}
            /> */}
          </div>
        </Box>
      </Modal>
    </div>
  )
}
