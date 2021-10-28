import React, { useState, useEffect } from "react"
import Box from "@mui/material/Box"
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
  const [companyData, setCompanyData] = useState(null)

  useEffect(() => {
    async function fetchCompanyData() {
      const companyDataResponse = await fetch(`http://localhost:8080/company/${companyViewed}`)
      const companyData = await companyDataResponse.json()
      setCompanyData(companyData[0])
    }
    fetchCompanyData()
  }, [companyViewed])

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
              src="https://cdn-icons-png.flaticon.com/512/5968/5968982.png" // Needs changing to be company specific
              sx={{ width: 56, height: 56, mb: 1 }}
            />
            <Typography
              sx={{ mb: 1, fontSize: 16, fontWeight: "bold" }}
              id="modal-modal-title"
              variant="h6"
              component="h2"
            >
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
                <PeopleIcon sx={{ pr: 0.5 }} />
                {companyData ? companyData.category : null}
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
                <FemaleIcon sx={{ pr: 0.5 }} />
                {companyData ? companyData.company_female_employee_percentage : null}%
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
                <FavoriteIcon sx={{ pr: 0.5 }} />
                {companyData ? companyData.company_retention_rate : null}%
              </Typography>
            </div>
            <Typography sx={{ mb: 1, fontSize: 16 }} id="modal-modal-description" align="center">
              {companyData ? companyData.company_bio : null}
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
