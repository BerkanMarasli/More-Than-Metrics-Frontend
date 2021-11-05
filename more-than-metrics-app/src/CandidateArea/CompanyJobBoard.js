import React, { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableContainer, TablePagination, TableRow } from "@mui/material"
import ViewJobBtn from "../Components/ViewJobBtn"
import ApplyBtn from "../Components/ApplyBtn"

const columns = [
    { id: "jobTitle" },
    {
        id: "viewCompanyBtn",
        align: "right",
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

function createData(jobTitle, viewJobBtn, applyBtn) {
    return { jobTitle, viewJobBtn, applyBtn }
}

function CompanyJobBoard(props) {
    const companyViewed = props.companyViewed
    console.log(companyViewed)
    const { handleOpenViewJob } = props.handleViewJob
    const { handleOpenViewApply } = props.handleViewApply
    const [jobs, setJobs] = useState(null)
    const [page, setPage] = React.useState(0)
    const [rowsPerPage, setRowsPerPage] = React.useState(4)

    useEffect(() => {
        async function fetchJobs() {
            const jobsResponse = await fetch(process.env.REACT_APP_API_URL + `/jobs/company/${companyViewed}`)
            const jobsData = await jobsResponse.json()
            const jobs = jobsData.map((job) => {
                return createData(
                    job.job_title,
                    <ViewJobBtn jobID={job.job_id} handleOpen={handleOpenViewJob} />,
                    <ApplyBtn jobID={job.job_id} handleOpen={handleOpenViewApply} />
                )
            })
            setJobs(jobs)
        }
        fetchJobs()
    }, [handleOpenViewJob, handleOpenViewApply, companyViewed])

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    return jobs ? (
        <main>
            <TableContainer sx={{ maxHeight: 520 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableBody>
                        {jobs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((job) => {
                            // can add hover as attribute to TableRow
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
                    rowsPerPageOptions={[4]}
                    component="main"
                    count={jobs.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </div>
        </main>
    ) : null
}

export default CompanyJobBoard
