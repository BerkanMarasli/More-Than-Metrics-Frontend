import React, { useState, useEffect } from "react"
import Paper from "@mui/material/Paper"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TablePagination from "@mui/material/TablePagination"
import TableRow from "@mui/material/TableRow"
import ViewApplicationBtn from "../Components/ViewApplicationBtn"
import ApplicationStatus from "../Components/ApplicationStatus"

const columns = [
  { id: "jobTitle", minWidth: 170 },
  {
    id: "companyName",
    minWidth: 170,
    align: "center",
  },
  {
    id: "viewApplication",
    minWidth: 170,
    align: "center",
  },
  {
    id: "applicationStatus",
    minWidth: 170,
    align: "center",
  },
]

function createData(jobTitle, companyName, viewApplication, applicationStatus) {
  return { jobTitle, companyName, viewApplication, applicationStatus }
}

function Applied() {
  const [appliedApplications, setAppliedApplications] = useState(null)
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(4)

  useEffect(() => {
    async function fetchJobs() {
      const applicationsResponse = await fetch(
        `http://localhost:8080/applications/candidate/${"1"}`
      )
      const applications = await applicationsResponse.json()
      console.log(applications)
      const rows = applications.map(application => {
        return createData(
          application.job_title,
          application.company_name,
          <ViewApplicationBtn />,
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

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    // <main style={{ padding: "0px 50px" }}>
    <main>
      {appliedApplications ? (
        <div>
          <h1>APPLIED TO</h1>
          {/* <Paper sx={{ width: "100%", overflow: "hidden" }}> */}
          <TableContainer sx={{ maxHeight: 520 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableBody>
                {appliedApplications
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(row => {
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
              count={appliedApplications.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </div>
          {/* </Paper>{" "} */}
        </div>
      ) : null}
    </main>
  )
}

export default Applied
