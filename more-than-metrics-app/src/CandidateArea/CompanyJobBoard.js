import React, { useState, useEffect } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
} from "@mui/material"
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
  const { handleOpenViewJob } = props.viewJob
  const { handleOpenViewApply } = props.viewApply
  const companyViewed = props.companyViewed
  const [rows, setRows] = useState(null)
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
      <TableContainer sx={{ maxHeight: 270 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
              // can add hover as attribute to TableRow
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
          rowsPerPageOptions={[4, 8, 12, { label: "All", value: -1 }]}
          component="main"
          count={rows.length}
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
