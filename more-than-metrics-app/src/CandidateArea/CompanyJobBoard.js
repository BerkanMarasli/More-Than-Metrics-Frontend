import React, { useState, useEffect } from "react"
//
// import ViewCompanyBtn from "../Components/ViewCompanyBtn"
import ViewJobBtn from "../Components/ViewJobBtn"
import ApplyBtn from "../Components/ApplyBtn"
//
import Paper from "@mui/material/Paper"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
// import TableHead from "@mui/material/TableHead"
import TablePagination from "@mui/material/TablePagination"
import TableRow from "@mui/material/TableRow"

const columns = [
  { id: "jobTitle", label: "Title", minWidth: 170 },
  //   { id: "jobDescription", label: "Description", minWidth: 100 },
  {
    id: "viewCompanyBtn",
    // label: "View Company",
    minWidth: 170,
    align: "right",
  },
  {
    id: "viewJobBtn",
    // label: "View Job",
    minWidth: 170,
    align: "right",
  },
  {
    id: "applyBtn",
    // label: "Apply",
    minWidth: 170,
    align: "right",
    // format: value => value.toFixed(2),
  },
]

function createData(jobTitle, viewJobBtn, applyBtn) {
  return { jobTitle, viewJobBtn, applyBtn }
}

function CompanyJobBoard(props) {
  // props
  // const { handleOpenViewCompany } = props.viewCompany
  const { handleOpenViewJob } = props.viewJob
  const { handleOpenViewApply } = props.viewApply
  const companyViewed = props.companyViewed
  // Fetch jobs
  const [rows, setRows] = useState(null)
  // Pagination
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(4)

  useEffect(() => {
    async function fetchJobs() {
      const jobsResponse = await fetch(`http://localhost:8080/jobs/company/${companyViewed}`)
      const jobs = await jobsResponse.json()
      const rows = jobs.map(job => {
        return createData(
          job.job_title,
          <ViewJobBtn handleOpen={handleOpenViewJob} />,
          <ApplyBtn handleOpen={handleOpenViewApply} />
        )
      })
      setRows(rows)
    }
    fetchJobs()
  }, [handleOpenViewJob, handleOpenViewApply, companyViewed])

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return rows ? (
    <main>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 270 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableBody>
              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
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
        <TablePagination
          rowsPerPageOptions={[4, 8, 12, { label: "All", value: -1 }]}
          component="main"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </main>
  ) : null
}

export default CompanyJobBoard
