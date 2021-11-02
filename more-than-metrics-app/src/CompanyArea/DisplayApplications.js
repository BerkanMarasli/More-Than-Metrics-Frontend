import React, { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableContainer, TablePagination, TableRow } from "@mui/material"
// import ViewApplicationBtn from "../Components/ViewApplicationBtn.js"
import ViewApplicantsBtn from "../Components/ViewApplicantsBtn.js"
import { getUserID } from "../handleCookie"

const columns = [
    { id: "jobTitle", align: "center" },
    // {
    //     id: "editApplicationBtn",
    //     align: "center",
    // },
    {
        id: "viewApplicantsBtn",
        align: "center",
    },
]

function createJobListing(jobTitle, viewApplicantsBtn) {
    return { jobTitle, viewApplicantsBtn }
}

function JobBoardDisplayJobs(props) {
    const companyID = getUserID(document.cookie)
    const [applications, setApplications] = useState(null)
    const [page, setPage] = React.useState(0)
    const [rowsPerPage, setRowsPerPage] = React.useState(3)

    useEffect(() => {
        async function fetchJobs() {
            const applicationsResponse = await fetch(`http://localhost:8080/company/jobs/${companyID}`)
            const applicationsData = await applicationsResponse.json()
            console.log(applicationsData)
            const jobsStats = applicationsData.map(async (job) => {
                console.log(job.job_id)
                const stat = await fetchJobStats(job.job_id)
                return stat
            })
            console.log(jobsStats)
            // const jobsStats = await fetchJobStats(16)
            // console.log(jobsStats)
            const applications = applicationsData.reverse().map((application) => {
                return createJobListing(application.job_title, <ViewApplicantsBtn />)
            })
            setApplications(applications)
        }
        async function fetchJobStats(jobID) {
            const jobsStatsResponse = await fetch(`http://localhost:8080/job/stats/${jobID}`)
            const jobStats = await jobsStatsResponse.json()
            console.log(jobStats)
            return jobStats
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
                    <TableContainer sx={{ maxHeight: 520 }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableBody>
                                {applications.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((application) => {
                                    return (
                                        <TableRow role="checkbox" tabIndex={-1} key={application.code}>
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

export default JobBoardDisplayJobs
