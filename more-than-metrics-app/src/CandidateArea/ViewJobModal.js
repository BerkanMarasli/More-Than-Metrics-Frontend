import React, { useState, useEffect } from "react"
import { Box, Typography, Modal, Avatar, Chip } from "@mui/material"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet"
import ApplyBtn from "../Components/ApplyBtn"

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
    p: 5,
}

export default function ViewJobModal(props) {
    const { handleOpenViewApply } = props.handleViewApply
    const { openViewJob, handleCloseViewJob } = props.handleViewJob
    const jobIDViewed = props.jobIDViewed
    const [jobData, setJobData] = useState(null)

    useEffect(() => {
        async function fetchJobData() {
            const jobDataResponse = await fetch(`http://localhost:8080/job/${jobIDViewed}`)
            const jobData = await jobDataResponse.json()
            setJobData(jobData[0])
        }
        fetchJobData()
    }, [jobIDViewed])

    return (
        <div>
            <Modal open={openViewJob} onClose={handleCloseViewJob} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={style}>
                    {jobData ? (
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "space-between",
                                height: "75vh",
                            }}>
                            <Typography sx={{ mb: 1, fontSize: 20, fontWeight: "bold" }} id="modal-modal-title" variant="h6" component="h2">
                                {jobData.job_title}
                            </Typography>
                            <Typography sx={{ mb: 1, fontSize: 16 }} id="modal-modal-title" variant="h6" component="h2">
                                {jobData.job_description}
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
                                    component="h2">
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
                                    alignItems: "center",
                                }}>
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        marginBottom: 8,
                                    }}>
                                    <Typography
                                        style={{ width: 180, fontSize: 16, textAlign: "center", paddingTop: 10 }}
                                        variant="h6"
                                        component="div">
                                        Responsibilities:
                                    </Typography>
                                </div>
                                <div style={{ display: "flex", flexDirection: "column" }}>
                                    {jobData.responsibilities.map((responsibility) => {
                                        return <Chip key={responsibility} label={responsibility} style={{ background: "#FFBF50", marginBottom: 2 }} />
                                    })}
                                </div>
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
                                    alignItems: "center",
                                }}>
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        marginBottom: 8,
                                    }}>
                                    <Typography
                                        style={{ width: 180, fontSize: 16, textAlign: "center", paddingTop: 10 }}
                                        variant="h6"
                                        component="div">
                                        Technologies:
                                    </Typography>
                                </div>
                                {jobData.technologies.map((technology) => {
                                    return <Chip key={technology} label={technology} style={{ background: "#FFBF50" }} />
                                })}
                            </div>
                            {/*  */}
                            {/*  */}
                            {/*  */}
                            <hr style={{ width: "100%", border: "1px solid #FFBF50" }} />
                            {/*  */}
                            {/*  */}
                            {/*  */}
                            <Avatar alt={`${jobData.company_name} Logo`} src={jobData.image_url} sx={{ width: 56, height: 56, mb: 1 }} />
                            <Typography sx={{ mb: 1, fontSize: 16 }} id="modal-modal-title" variant="h6" component="h2">
                                {jobData.company_name}
                            </Typography>
                            <Typography sx={{ mb: 1, fontSize: 16 }} id="modal-modal-description" align="center">
                                {jobData.company_bio}
                            </Typography>
                            <ApplyBtn jobID={jobData.job_id} handleOpen={handleOpenViewApply} />
                        </div>
                    ) : null}
                </Box>
            </Modal>
        </div>
    )
}
