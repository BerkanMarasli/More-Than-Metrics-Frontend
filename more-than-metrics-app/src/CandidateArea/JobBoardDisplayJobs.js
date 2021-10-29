import React, { useState, useEffect } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
} from "@mui/material"
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

function createData(jobTitle, viewCompanyBtn, viewJobBtn, applyBtn) {
  return { jobTitle, viewCompanyBtn, viewJobBtn, applyBtn }
}

function JobBoardDisplayJobs(props) {
  const { handleOpenViewCompany } = props.viewCompany
  const { handleOpenViewJob } = props.viewJob
  const { handleOpenViewApply } = props.viewApply
  const [rows, setRows] = useState(null)
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(7)

  useEffect(() => {
    async function fetchJobs() {
      const jobsResponse = await fetch("http://localhost:8080/jobs/")
      const jobs = await jobsResponse.json()
      const rows = jobs.reverse().map(job => {
        return createData(
          job.job_title,
          <ViewCompanyBtn companyName={job.company_name} handleOpen={handleOpenViewCompany} />,
          <ViewJobBtn jobID={job.job_id} handleOpen={handleOpenViewJob} />,
          <ApplyBtn handleOpen={handleOpenViewApply} />
        )
      })
      setRows(rows)
    }
    fetchJobs()
  }, [handleOpenViewCompany, handleOpenViewJob, handleOpenViewApply])

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    <main>
      {rows ? (
        <div>
          <TableContainer sx={{ maxHeight: 520 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableBody>
                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                  return (
                    <TableRow role="checkbox" tabIndex={-1} key={row.code}>
                      {columns.map(column => {
                        const value = row[column.id]
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
            }}
          >
            <TablePagination
              //[5, 10, 25, { label: "All", value: -1 }]
              rowsPerPageOptions={[7]}
              component="main"
              count={rows.length}
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
