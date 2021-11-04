import React, { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableContainer, TablePagination, TableRow } from "@mui/material"
import ViewApplicantsBtn from "../Components/ViewApplicantsBtn.js"
import { getUserID } from "../handleCookie"
import ApplicationBadges from "../Components/ApplicationBadges"
import ViewSuccessBtn from "../Components/ViewSuccessBtn"

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

function DisplayApplications(props) {
    const companyID = getUserID(document.cookie)
    const { handleOpenViewSuccessful } = props.handleViewSuccessful
    const [applications, setApplications] = useState(null)
    const [page, setPage] = React.useState(0)
    const [rowsPerPage, setRowsPerPage] = React.useState(3)

    useEffect(() => {
        async function fetchJobs() {
            const applicationsResponse = await fetch(`http://localhost:8080/company/jobStats/${companyID}`)
            const applicationsData = await applicationsResponse.json()
            const applications = applicationsData.reverse().map((application) => {
                return createJobListing(
                    application.job_title,
                    <ApplicationBadges jobStats={application.jobStats} />,
                    <ViewApplicantsBtn />,
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
        <main>
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
            ) : null}
        </main>
    )
}

export default DisplayApplications
