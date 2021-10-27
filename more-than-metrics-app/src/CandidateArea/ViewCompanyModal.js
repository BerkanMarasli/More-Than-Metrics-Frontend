import React from "react"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import Modal from "@mui/material/Modal"
import Avatar from "@mui/material/Avatar"
import PeopleIcon from "@mui/icons-material/People"
import FemaleIcon from "@mui/icons-material/Female"
import FavoriteIcon from "@mui/icons-material/Favorite"
import CompanyJobBoard from "./CompanyJobBoard"

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

export default function ViewCompanyModal(props) {
  const viewCompany = props.viewCompany
  const viewJob = props.viewJob
  const viewApply = props.viewApply
  const { openViewCompany, handleCloseViewCompany } = props.viewCompany
  const companyViewed = props.companyViewed

  return (
    <div>
      <Modal
        open={openViewCompany}
        onClose={handleCloseViewCompany}
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
            <Avatar
              alt="Instagram Logo"
              src="https://cdn-icons-png.flaticon.com/512/5968/5968982.png"
              sx={{ width: 56, height: 56, mb: 1 }}
            />
            <Typography sx={{ mb: 1 }} id="modal-modal-title" variant="h6" component="h2">
              Instagram Co.
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
                <PeopleIcon sx={{ pr: 0.5 }} />
                10-29
              </Typography>
              <Typography
                sx={{ display: "flex", flexDirection: "row", alignItems: "center", p: 0.5 }}
                id="modal-modal-title"
                variant="h5"
                component="h2"
              >
                <FemaleIcon sx={{ pr: 0.5 }} />
                24%
              </Typography>
              <Typography
                sx={{ display: "flex", flexDirection: "row", alignItems: "center", p: 0.5 }}
                id="modal-modal-title"
                variant="h5"
                component="h2"
              >
                <FavoriteIcon sx={{ pr: 0.5 }} />
                89%
              </Typography>
            </div>
            <Typography sx={{ mb: 1 }} id="modal-modal-description" align="center">
              Instagram is an American photo and video sharing social networking service founded by
              Kevin Systrom and Mike Krieger. In April 2012, Facebook acquired the service for
              approximately US$1 billion in cash and stock. The app allows users to upload media
              that can be edited with filters and organized by hashtags and geographical tagging.
              Posts can be shared publicly or with pre-approved followers. Users can browse other
              users' content by tags and locations and view trending content. Users can like photos
              and follow other users to add their content to a personal feed.
            </Typography>
            <CompanyJobBoard
              companyViewed={companyViewed}
              viewCompany={viewCompany}
              viewJob={viewJob}
              viewApply={viewApply}
            />
          </div>
        </Box>
      </Modal>
    </div>
  )
}
