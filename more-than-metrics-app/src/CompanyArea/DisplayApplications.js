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
            const applications = applicationsData.reverse().map((job) => {
                return createJobListing(job.job_title, <ViewApplicantsBtn />)
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
                    <TableContainer sx={{ maxHeight: 520 }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableBody>
                                {applications.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((job) => {
                                    return (
                                        <TableRow role="checkbox" tabIndex={-1} key={job.code}>
                                            {columns.map((column) => {
                                                const value = job[column.id]
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
