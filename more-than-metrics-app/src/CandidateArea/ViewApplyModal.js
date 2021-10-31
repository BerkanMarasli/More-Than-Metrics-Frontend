import React from "react"
import {
  Box,
  InputLabel,
  OutlinedInput,
  MenuItem,
  FormControl,
  Select,
  Avatar,
  TextField,
  Button,
  Alert,
  Modal,
} from "@mui/material"
import { makeStyles } from "@material-ui/core/styles"
import { useState, useEffect } from "react"

const useStyles = makeStyles(theme => ({
  root: {
    display: "grid",
    justifyItems: "center",
    alignContent: "center",
  },

  box: {
    display: "flex",
    flexDirection: "column",
    alignSelf: "center",
  },

  row: {
    display: "flex",
    alignItems: "center",
  },

  rowTopHalf: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "8px",
  },

  input: {
    width: "25rem",
  },

  select: {
    textAlign: "left",
  },

  company: {
    margin: "0.5rem",
  },
}))

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "78vw",
  height: "75vh",
  bgcolor: "background.paper",
  border: "4px solid #FFBF50",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
}

function ViewApplyModal(props) {
  const jobIDApplied = props.jobIDApplied
  const { openViewApply, handleCloseViewApply } = props.handleViewApply

  const classes = useStyles()
  const [promptsList, setPromptsList] = useState()
  const [prompts, setPrompts] = useState({})
  const [answers, setAnswers] = useState({})
  const [errorMsg, setErrorMsg] = useState(null)
  const [successMsg, setSuccessMsg] = useState(null)
  const [jobInfo, setJobInfo] = useState(null)

  useEffect(() => {
    const fetchPrompts = async () => {
      const promptsResponse = await fetch("http://localhost:8080/prompts")
      const promptsJson = await promptsResponse.json()
      setPromptsList(promptsJson)
    }
    async function fetchJobData() {
      const jobDataResponse = await fetch(`http://localhost:8080/job/${jobIDApplied}`)
      const jobData = await jobDataResponse.json()
      setJobInfo(jobData[0])
    }
    fetchPrompts()
    fetchJobData()
  }, [jobIDApplied])

  const submitApplication = async () => {
    const requestOptions = {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answers }),
    }
    const response = await fetch(`http://localhost:8080/application`, requestOptions)
    const json = await response.json()
    if (!response.ok) {
      setErrorMsg(json.status)
    } else {
      setSuccessMsg("Application successfully submitted. Good luck!")
    }
  }

  const handleSelectPrompt = (e, number) => {
    setPrompts({
      ...prompts,
      [number]: {
        id: e.target.value.prompt_id,
        prompt: e.target.value.prompt,
      },
    })
  }

  const handleSetAnswer = (e, number) => {
    setAnswers({
      ...answers,
      [prompts[number].id]: e.target.value,
    })
  }

  const resetErrorMsg = () => {
    setErrorMsg(null)
  }

  const returnAnswersForm = number => {
    return (
      <div>
        <FormControl sx={{ m: 1, minWidth: "25rem" }}>
          <InputLabel htmlFor={`outlined-prompt${number}`}>Prompt {number}</InputLabel>
          <Select
            labelId={`outlined-prompt${number}`}
            className={classes.select}
            id={`outlined-prompt${number}`}
            placeholder={"Select a prompt"}
            label={`Prompt ${number}`}
            onChange={e => handleSelectPrompt(e, number)}
            onClick={resetErrorMsg}
          >
            <MenuItem value="" disabled className={classes.select}>
              Select a prompt
            </MenuItem>
            {promptsList
              ? promptsList.map(prompt => (
                  <MenuItem key={prompt.prompt_id} value={prompt} className={classes.select}>
                    {prompt.prompt}
                  </MenuItem>
                ))
              : null}
          </Select>
        </FormControl>
        <div className={classes.row}>
          <FormControl sx={{ m: 1, width: "20rem" }}>
            <InputLabel htmlFor={`outlined-answer${number}`}>Answer {number}</InputLabel>
            <OutlinedInput
              labelId={`outlined-answer${number}`}
              id={`outlined-answer${number}`}
              placeholder={"Please type your answer"}
              label={`Answer ${number}`}
              className={classes.input}
              multiline
              maxRows={2}
              value={answers[number.answer]}
              onChange={e => handleSetAnswer(e, number)}
              onClick={resetErrorMsg}
            />
          </FormControl>
        </div>{" "}
      </div>
    )
  }

  return jobInfo ? (
    <Modal
      open={openViewApply}
      onClose={handleCloseViewApply}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className={classes.root}>
        <Box className={classes.box} sx={style}>
          <h1 style={{ margin: "5px auto" }}>
            {jobInfo.job_title} - {jobInfo.company_name} - APPLICATION FORM
          </h1>
          <div className={classes.rowTopHalf}>
            <Avatar
              alt={jobInfo.company_name}
              src={jobInfo ? jobInfo.image_url : "/broken-image.jpg"}
              style={{
                height: "3rem",
                width: "3rem",
                padding: "5px",
                border: "0.1px solid lightgray",
              }}
              className={classes.company}
            />
            <TextField
              id="outlined-read-only-name"
              label="Company name"
              defaultValue={jobInfo.company_name}
              InputProps={{
                readOnly: true,
              }}
              className={classes.company}
            />
          </div>
          <div className={classes.rowTopHalf}>
            <TextField
              id="outlined-read-only-location"
              label="Location"
              defaultValue={jobInfo.location}
              InputProps={{
                readOnly: true,
              }}
              size="small"
              className={classes.company}
            />
            <TextField
              id="outlined-read-only-salary"
              label="Salary"
              defaultValue={jobInfo.salary}
              InputProps={{
                readOnly: true,
              }}
              size="small"
              className={classes.company}
            />
          </div>
          <div className={classes.rowTopHalf}>
            <TextField
              id="outlined-read-only-jd"
              label="Job description"
              defaultValue={jobInfo.job_description}
              InputProps={{
                readOnly: true,
              }}
              className={classes.company}
              style={{ width: "25rem" }}
            />
          </div>
          <Box className={classes.box} component="form" noValidate autoComplete="off">
            {returnAnswersForm(1)}
            {returnAnswersForm(2)}
            {returnAnswersForm(3)}
          </Box>
          <Button onClick={submitApplication}>Submit</Button>
          {errorMsg ? <Alert severity="error">{errorMsg}</Alert> : null}
          {successMsg ? <Alert severity="success">{successMsg}</Alert> : null}
        </Box>
      </div>
    </Modal>
  ) : null
}

export default ViewApplyModal