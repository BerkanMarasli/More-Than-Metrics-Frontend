import React from "react";
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
} from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { useState, useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "grid",
    justifyItems: "center",
    alignContent: "center",
  },

  box: {
    display: "grid",
    justifyItems: "end",
  },

  row: {
    display: "flex",
    alignItems: "center",
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

  modal: {
    // transform: "translate(-50%, -50%)",
    width: "80vw",
    height: "80vh",
    backgroundColor: "background.paper",
    border: "4px solid #FFBF50",
    borderRadius: "10px",
    boxShadow: 24,
    padding: 4,
  },
}));

function ViewApplyModal(props) {
  const { openViewApply, handleCloseViewApply } = props.viewApply;

  const classes = useStyles();
  const [promptsList, setPromptsList] = useState(null);
  const [prompts, setPrompts] = useState({});
  const [answers, setAnswers] = useState({});
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  let img;

  useEffect(() => {
    const fetchPrompts = async () => {
      const promptsResponse = await fetch("http://localhost:8080/prompts");
      const promptsJson = await promptsResponse.json();
      setPromptsList(promptsJson);
    };
    fetchPrompts();
  }, []);

  const submitApplication = async () => {
    const requestOptions = {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answers }),
    };
    const response = await fetch(
      `http://localhost:8080/application`,
      requestOptions
    );
    const json = await response.json();
    if (!response.ok) {
      setErrorMsg(json.status);
    } else {
      setSuccessMsg("Application successfully submitted. Good luck!");
    }
  };

  const handleSelectPrompt = (e, number) => {
    setPrompts({
      ...prompts,
      [number]: {
        id: e.target.value.prompt_id,
        prompt: e.target.value.prompt,
      },
    });
  };

  const handleSetAnswer = (e, number) => {
    setAnswers({
      ...answers,
      [prompts[number].id]: e.target.value,
    });
  };

  const resetErrorMsg = () => {
    setErrorMsg(null);
  };

  const returnAnswersForm = (number) => {
    return (
      <div>
        <FormControl sx={{ m: 1, minWidth: "25rem" }}>
          <InputLabel htmlFor={`outlined-prompt${number}`}>
            Prompt {number}
          </InputLabel>
          <Select
            labelId={`outlined-prompt${number}`}
            className={classes.select}
            id={`outlined-prompt${number}`}
            placeholder={"Select a prompt"}
            label={`Prompt ${number}`}
            onChange={(e) => handleSelectPrompt(e, number)}
            onClick={resetErrorMsg}
          >
            <MenuItem value="" disabled className={classes.select}>
              Select a prompt
            </MenuItem>
            {promptsList
              ? promptsList.map((prompt) => (
                  <MenuItem
                    key={prompt.prompt_id}
                    value={prompt}
                    className={classes.select}
                  >
                    {prompt.prompt}
                  </MenuItem>
                ))
              : null}
          </Select>
        </FormControl>
        <div className={classes.row}>
          <FormControl sx={{ m: 1, width: "20rem" }}>
            <InputLabel htmlFor={`outlined-answer${number}`}>
              Answer {number}
            </InputLabel>
            <OutlinedInput
              labelId={`outlined-answer${number}`}
              id={`outlined-answer${number}`}
              placeholder={"Please type your answer"}
              label={`Answer ${number}`}
              className={classes.input}
              multiline
              maxRows={2}
              value={answers[number.answer]}
              onChange={(e) => handleSetAnswer(e, number)}
              onClick={resetErrorMsg}
            />
          </FormControl>
        </div>
      </div>
    );
  };

  return (
    <Modal
      open={openViewApply}
      onClose={handleCloseViewApply}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className={classes.modal}
    >
      <div className={classes.root}>
        <h1>APPLICATION</h1>

        <Box
          className={classes.box}
          component="form"
          noValidate
          autoComplete="off"
        >
          <div className={classes.row}>
            <Avatar
              alt={"Google"}
              src={img ? img : "/broken-image.jpg"}
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
              defaultValue="Google"
              InputProps={{
                readOnly: true,
              }}
              className={classes.company}
            />
          </div>
          <div className={classes.row}>
            <TextField
              id="outlined-read-only-location"
              label="Location"
              defaultValue="London"
              InputProps={{
                readOnly: true,
              }}
              size="small"
              className={classes.company}
            />
            <TextField
              id="outlined-read-only-salary"
              label="Salary"
              defaultValue="£25,000"
              InputProps={{
                readOnly: true,
              }}
              size="small"
              className={classes.company}
            />
          </div>
          <div className={classes.row}>
            <TextField
              id="outlined-read-only-jd"
              label="Job description"
              defaultValue="Be good at coding"
              InputProps={{
                readOnly: true,
              }}
              className={classes.company}
              style={{ width: "25rem" }}
            />
          </div>
          <Box className={classes.box}>
            {returnAnswersForm(1)}
            {returnAnswersForm(2)}
            {returnAnswersForm(3)}
          </Box>
        </Box>
        <Button onClick={submitApplication}>Submit</Button>
        {errorMsg ? <Alert severity="error">{errorMsg}</Alert> : null}
        {successMsg ? <Alert severity="success">{successMsg}</Alert> : null}
      </div>
    </Modal>
  );
}

export default ViewApplyModal;
