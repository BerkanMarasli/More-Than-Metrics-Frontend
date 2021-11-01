import React, { useState, useEffect } from "react"
import { Box, Typography, Modal, Avatar } from "@mui/material"
import PeopleIcon from "@mui/icons-material/People"
import FemaleIcon from "@mui/icons-material/Female"
import FavoriteIcon from "@mui/icons-material/Favorite"
import CompanyJobBoard from "./CompanyJobBoard"

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "78vw",
    height: "75vh",
    bgcolor: "background.paper",
    border: "4px solid #FFBF50",
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
}

export default function ViewCompanyModal(props) {
    const companyViewed = props.companyViewed
    const handleViewCompany = props.handleViewCompany
    const handleViewJob = props.handleViewJob
    const handleViewApply = props.handleViewApply
    const { openViewCompany, handleCloseViewCompany } = props.handleViewCompany
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
                aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                        }}>
                        {/* <Avatar alt={`${companyData.company_name} Logo`} src={companyData.image_url} sx={{ width: 56, height: 56, mb: 1 }} /> */}
                        <Avatar
                            alt="Instagram Logo"
                            src="https://cdn-icons-png.flaticon.com/512/5968/5968982.png" // Needs changing to be company specific
                            sx={{ width: 56, height: 56, mb: 1 }}
                        />
                        <Typography sx={{ mb: 1, fontSize: 16, fontWeight: "bold" }} id="modal-modal-title" variant="h6" component="h2">
                            {companyData ? companyData.company_name : null}
                        </Typography>
                        <div
                            style={{
                                width: "80%",
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-evenly",
                                marginBottom: 8,
                            }}>
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
                                component="h2">
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
                                component="h2">
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
                                component="h2">
                                <FavoriteIcon sx={{ pr: 0.5 }} />
                                {companyData ? companyData.company_retention_rate : null}%
                            </Typography>
                        </div>
                        <Typography sx={{ mb: 1, fontSize: 16 }} id="modal-modal-description" align="center">
                            {companyData ? companyData.company_bio : null}
                        </Typography>
                        <CompanyJobBoard
                            companyViewed={companyViewed}
                            handleViewCompany={handleViewCompany}
                            handleViewJob={handleViewJob}
                            handleViewApply={handleViewApply}
                        />
                    </div>
                </Box>
            </Modal>
        </div>
    )
}
