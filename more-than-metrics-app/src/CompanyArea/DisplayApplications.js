import React, { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableContainer, TablePagination, TableRow } from "@mui/material"
import ViewApplicantsBtn from "../Components/ViewApplicantsBtn.js"
import { getUserID } from "../handleCookie"
import ApplicationBadges from "../Components/ApplicationBadges"
import ViewSuccessBtn from "../Components/ViewSuccessBtn"
import AssignmentIcon from "@mui/icons-material/Assignment"
import CircularProgress from "@mui/material/CircularProgress"

const columns = [
    { id: "jobTitle" },
    {
        id: "applicationBadges",
        align: "center",
    },
    {
        id: "viewApplicantsBtn",
        align: "center",
    },
    {
        id: "viewSuccessBtn",
        align: "center",
    },
]

function createJobListing(jobTitle, applicationBadges, viewApplicantsBtn, viewSuccessBtn) {
    return { jobTitle, applicationBadges, viewApplicantsBtn, viewSuccessBtn }
}

function jobTitle(application) {
    return (
        <div style={{ display: "flex", fontSize: "14pt", textAlign: "left", letterSpacing: "0.5px" }}>
            <AssignmentIcon style={{ paddingRight: "0.5rem", position: "relative", color: "gray" }} />
            {application.job_title.toUpperCase()}
        </div>
    )
}

function DisplayApplications(props) {
    const companyID = getUserID(document.cookie)
    const { handleOpenViewSuccessful } = props.handleViewSuccessful
    const [applications, setApplications] = useState(null)
    const [page, setPage] = React.useState(0)
    const [rowsPerPage, setRowsPerPage] = React.useState(3)

    useEffect(() => {
        async function fetchJobs() {
            const applicationsResponse = await fetch(process.env.REACT_APP_API_URL + `/company/jobStats/${companyID}`)
            const applicationsData = await applicationsResponse.json()
            const applications = applicationsData.reverse().map((application) => {
                return createJobListing(
                    jobTitle(application),
                    <ApplicationBadges jobStats={application.jobStats} />,
                    <ViewApplicantsBtn jobID={application.job_id} />,
                    <ViewSuccessBtn jobID={application.job_id} handleOpen={handleOpenViewSuccessful} />
                )
            })
            setApplications(applications)
        }
        fetchJobs()
    }, [])

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    return (
        <main style={{ overflow: "hidden" }}>
            {applications ? (
                <div>
                    <TableContainer sx={{ maxHeight: 220 }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableBody>
                                {applications.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((application) => {
                                    return (
                                        <TableRow role="checkbox" tabIndex={-1} key={application.job_id}>
                                            {columns.map((column) => {
                                                const value = application[column.id]
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        {value}
                                                    </TableCell>
                                                )
                                            })}
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                        }}>
                        <TablePagination
                            rowsPerPageOptions={[3]}
                            component="main"
                            count={applications.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </div>
                </div>
            ) : (
                <CircularProgress color="inherit" />
            )}
        </main>
    )
}

export default DisplayApplications
