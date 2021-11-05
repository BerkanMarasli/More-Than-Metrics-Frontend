import React, { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableContainer, TablePagination, TableRow } from "@mui/material"
import ApplicationStatus from "../Components/ApplicationStatus"
import { getUserID } from "../handleCookie.js"

const columns = [
    { id: "jobTitle" },
    {
        id: "companyName",
        align: "center",
    },
    // {
    //     id: "viewApplication",
    //     align: "center",
    // },
    {
        id: "applicationStatus",
        align: "center",
    },
]

// function createData(jobTitle, companyName, viewApplication, applicationStatus) {
//     return { jobTitle, companyName, viewApplication, applicationStatus }
// }

function createData(jobTitle, companyName, applicationStatus) {
    return { jobTitle, companyName, applicationStatus }
}

function Applied() {
    const [appliedApplications, setAppliedApplications] = useState(null)
    const userID = getUserID(document.cookie)
    const [page, setPage] = React.useState(0)
    const [rowsPerPage, setRowsPerPage] = React.useState(7)

    useEffect(() => {
        async function fetchJobs() {
            const applicationsResponse = await fetch(process.env.REACT_APP_API_URL + `/applications/candidate/${userID}`)
            const applications = await applicationsResponse.json()
            const rows = applications.reverse().map((application) => {
                return createData(
                    application.job_title.toUpperCase(),
                    application.company_name.toUpperCase(),
                    // <ViewApplicationBtn />,
                    ApplicationStatus(application.reviewed, application.accepted)
                )
            })
            setAppliedApplications(rows)
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
            {appliedApplications ? (
                <div>
                    <h1 style={{ margin: "0px", fontFamily: "Lato", color: "gray" }}>APPLIED TO</h1>
                    <TableContainer sx={{ maxHeight: 520 }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableBody>
                                {appliedApplications.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                    return (
                                        <TableRow role="checkbox" tabIndex={-1} key={row.code}>
                                            {columns.map((column) => {
                                                const value = row[column.id]
                                                return (
                                                    <TableCell
                                                        key={column.id}
                                                        align={column.align}
                                                        style={{
                                                            fontSize: "12pt",
                                                            textAlign: "left",
                                                            paddingLeft: "2rem",
                                                            // paddingRight: "5rem",
                                                            letterSpacing: "0.5px",
                                                        }}>
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
                            rowsPerPageOptions={[7]}
                            component="main"
                            count={appliedApplications.length}
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

export default Applied
