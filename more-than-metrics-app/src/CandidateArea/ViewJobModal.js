import React, { useState, useEffect } from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Modal from "@mui/material/Modal"
import Avatar from "@mui/material/Avatar"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd"
import SettingsIcon from "@mui/icons-material/Settings"
import Paper from "@mui/material/Paper"
import ApplyBtn from "../Components/ApplyBtn"

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

export default function ViewJobModal(props) {
  const { openViewJob, handleCloseViewJob } = props.viewJob
  const jobViewed = props.jobViewed
  const [jobData, setJobData] = useState(null)

  useEffect(() => {
    async function fetchJobData() {
      const jobDataResponse = await fetch(`http://localhost:8080/job/${jobViewed}`)
      const jobData = await jobDataResponse.json()
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
          {jobData ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                sx={{ mb: 1, fontSize: 20, fontWeight: "bold" }}
                id="modal-modal-title"
                variant="h6"
                component="h2"
              >
                {jobData.job_title}
              </Typography>
              <Typography
                sx={{ mb: 1, fontSize: 16 }}
                id="modal-modal-title"
                variant="h6"
                component="h2"
              >
                {jobData.job_description}
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
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    p: 0.5,
                    fontSize: 16,
                  }}
                  id="modal-modal-title"
                  variant="h5"
                  component="h2"
                >
                  <LocationOnIcon sx={{ pr: 0.5 }} />
                  {jobData.location}
                </Typography>
                <Typography
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    p: 0.5,
                    fontSize: 16,
                  }}
                  id="modal-modal-title"
                  variant="h5"
                  component="h2"
                >
                  <AccountBalanceWalletIcon sx={{ pr: 0.5 }} />
                  {jobData.salary !== "Competitive" ? "£" : null}
                  {jobData.salary}
                </Typography>
              </div>
              {/*  */}
              {/*  */}
              {/*  */}
              <hr style={{ width: "100%", border: "1px solid #FFBF50" }} />
              {/*  */}
              {/*  */}
              {/*  */}
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 8,
                  }}
                >
                  <Typography style={{ width: 180, fontSize: 16 }} variant="h6" component="div">
                    Responsibilities:
                  </Typography>
                </div>
                <Paper style={{ width: 200, maxHeight: 80, overflow: "auto" }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-evenly",
                      marginBottom: 8,
                    }}
                  >
                    <List dense={true}>
                      {jobData.responsibilities.map(responsibility => {
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
                  </div>
                </Paper>
              </div>
              {/*  */}
              <hr />
              {/*  */}
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 8,
                  }}
                >
                  <Typography style={{ width: 180, fontSize: 16 }} variant="h6" component="div">
                    Technologies:
                  </Typography>
                </div>
                <Paper style={{ width: 200, maxHeight: 80, overflow: "auto" }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-evenly",
                      marginBottom: 8,
                    }}
                  >
                    <List dense={true}>
                      {jobData.technologies.map(technology => {
                        return (
                          <ListItem>
                            <ListItemIcon>
                              <SettingsIcon />
                            </ListItemIcon>
                            <ListItemText primary={technology} />
                          </ListItem>
                        )
                      })}
                    </List>
                  </div>
                </Paper>
              </div>
              {/*  */}
              {/*  */}
              {/*  */}
              <hr style={{ width: "100%", border: "1px solid #FFBF50" }} />
              {/*  */}
              {/*  */}
              {/*  */}
              <Avatar
                alt="Instagram Logo"
                src="https://cdn-icons-png.flaticon.com/512/5968/5968982.png" // Needs changing to be company specific
                sx={{ width: 56, height: 56, mb: 1 }}
              />
              <Typography
                sx={{ mb: 1, fontSize: 16 }}
                id="modal-modal-title"
                variant="h6"
                component="h2"
              >
                {jobData.company_name}
              </Typography>
              <Typography sx={{ mb: 1, fontSize: 16 }} id="modal-modal-description" align="center">
                {jobData.company_bio}
              </Typography>
              <ApplyBtn />
            </div>
          ) : null}
        </Box>
      </Modal>
    </div>
  )
}
