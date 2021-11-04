import React, { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableContainer, TablePagination, TableRow, Avatar } from "@mui/material"
import ViewCompanyBtn from "../Components/ViewCompanyBtn"
import ViewJobBtn from "../Components/ViewJobBtn"
import ApplyBtn from "../Components/ApplyBtn"

const columns = [
    { id: "jobTitle" },
    {
        id: "viewCompanyBtn",
        align: "center",
    },
    {
        id: "viewJobBtn",
        align: "center",
    },
    {
        id: "applyBtn",
        align: "center",
    },
]

function createJobListing(jobTitle, viewCompanyBtn, viewJobBtn, applyBtn) {
    return { jobTitle, viewCompanyBtn, viewJobBtn, applyBtn }
}

function companyInfo(job, handleOpenViewCompany) {
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Avatar style={{ paddingRight: "1rem" }} alt={`${job.company_name} Logo`} src={job.image_url} sx={{ width: 40, height: 40 }} />
            <ViewCompanyBtn jobID={job.job_id} companyName={job.company_name} handleOpen={handleOpenViewCompany} />
        </div>
    )
}

function JobBoardDisplayJobs(props) {
    const { handleOpenViewCompany } = props.handleViewCompany
    const { handleOpenViewJob } = props.handleViewJob
    const { handleOpenViewApply } = props.handleViewApply
    const [jobs, setJobs] = useState(null)
    const [page, setPage] = React.useState(0)
    const [rowsPerPage, setRowsPerPage] = React.useState(6)

    useEffect(() => {
        async function fetchJobs() {
            const jobsResponse = await fetch("http://localhost:8080/jobs/")
            const jobsData = await jobsResponse.json()
            const jobs = jobsData.reverse().map((job) => {
                return createJobListing(
                    job.job_title,
                    companyInfo(job, handleOpenViewCompany),
                    <ViewJobBtn jobID={job.job_id} handleOpen={handleOpenViewJob} />,
                    <ApplyBtn jobID={job.job_id} handleOpen={handleOpenViewApply} />
                )
            })
            setJobs(jobs)
        }
        fetchJobs()
    }, [handleOpenViewCompany, handleOpenViewJob, handleOpenViewApply])

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    return (
        <main>
            {jobs ? (
                <div>
                    <TableContainer sx={{ maxHeight: 520 }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableBody>
                                {jobs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((job) => {
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
                            //[5, 10, 25, { label: "All", value: -1 }]
                            rowsPerPageOptions={[6]}
                            component="main"
                            count={jobs.length}
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
