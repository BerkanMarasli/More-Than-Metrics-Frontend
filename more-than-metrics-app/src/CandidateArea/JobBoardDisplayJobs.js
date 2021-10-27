import React from "react"
//
import ViewCompanyBtn from "../Components/ViewCompanyBtn"
import ViewJobBtn from "../Components/ViewJobBtn"
import ApplyBtn from "../Components/ApplyBtn"
//
import Paper from "@mui/material/Paper"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TablePagination from "@mui/material/TablePagination"
import TableRow from "@mui/material/TableRow"

const columns = [
  { id: "jobTitle", label: "Title", minWidth: 170 },
  { id: "jobDescription", label: "Description", minWidth: 100 },
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

function createData(jobTitle, jobDescription, viewCompanyBtn, viewJobBtn, applyBtn) {
  return { jobTitle, jobDescription, viewCompanyBtn, viewJobBtn, applyBtn }
}

const rows = [
  createData("Coaching 1", "NA", <ViewCompanyBtn />, <ViewJobBtn />, <ApplyBtn />),
  createData("Coaching 2", "NA", <ViewCompanyBtn />, <ViewJobBtn />, <ApplyBtn />),
  createData("Coaching 3", "NA", <ViewCompanyBtn />, <ViewJobBtn />, <ApplyBtn />),
  //   createData("Coaching 4", "NA", 327167434, 9833520),
  //   createData("Coaching 5", "NA", 37602103, 9984670),
  //   createData("Coaching 6", "NA", 25475400, 7692024),
  //   createData("Coaching 7", "NA", 83019200, 357578),
  //   createData("Coaching 8", "NA", 4857000, 70273),
  //   createData("Coaching 9", "NA", 126577691, 1972550),
  //   createData("Coaching 10", "NA", 126317000, 377973),
  //   createData("Coaching 11", "NA", 67022000, 640679),
  //   createData("Coaching 12", "NA", 67545757, 242495),
  //   createData("Coaching 13", "NA", 146793744, 17098246),
  //   createData("Coaching 14", "NA", 200962417, 923768),
  //   createData("Coaching 15", "NA", 210147125, 8515767),
]

function JobBoardDisplayJobs() {
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    <div>
      <h2>Display Jobs</h2>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map(column => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map(column => {
                      console.log(column)
                      const value = row[column.id]
                      console.log(value)
                      console.log(typeof value)
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {/* {column.format && typeof value === "number"
                            ? column.format(value)
                            : value} */}
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
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  )
}

export default JobBoardDisplayJobs
