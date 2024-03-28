import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAuthUser } from "../authUser/authUserSlice";
import { saveQuestionAnswerAsync } from "../questions/questionsSlice";
import { Avatar } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const NotAnsweredQuestion = ({ questionId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [answered, setAnswered] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  var questions = useSelector((state) => state.questions.data);
  const question = questions[questionId];
  const authedUser = useSelector(selectAuthUser);
  var users = useSelector((state) => state.users.data);
  var author = users[question.author];

  const selectOptionOne = (e) => {
    e.preventDefault();
    dispatch(
      saveQuestionAnswerAsync({
        authedUser: authedUser.id,
        qid: questionId,
        answer: "optionOne",
      })
    );
    setAnswered(true);
    setSelectedOption("optionOne");
  };

  const selectOptionTwo = (e) => {
    e.preventDefault();

    setAnswered(true);
    setSelectedOption("optionTwo");
  };

  useEffect(() => {
    if (answered) {
      dispatch(
        saveQuestionAnswerAsync({
          authedUser: authedUser.id,
          qid: questionId,
          answer: selectedOption,
        })
      );
      const timer = setTimeout(() => {
        clearInterval(timer);
        navigate(`/questions/${questionId}`, {
          state: { previousPath: location.pathname },
        });
      }, 1200);
    }
  }, [answered, selectedOption, authedUser.id, questionId, dispatch, navigate, location.pathname]);

  return (
    <Grid container spacing={2}>
      <Grid xs={12}>
        <Stack>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="h4">Poll By {author.name}</Typography>

            <Avatar src={author.avatarURL} sx={{ width: 64, height: 64 }} />
          </Box>
          <Typography variant="h4">Would You Rather</Typography>
        </Stack>
      </Grid>
      <Grid xs={6}>
        <Stack>
          <TextField
            id="optionOne"
            label="First Option"
            variant="outlined"
            value={question["optionOne"]["text"]}
            disabled={true}
          />
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={answered}
            onClick={selectOptionOne}
          >
            Choose
          </Button>
        </Stack>
      </Grid>
      <Grid xs={6}>
        <Stack>
          <TextField
            id="optionTwo"
            label="Second Option"
            variant="outlined"
            value={question["optionTwo"]["text"]}
            disabled={true}
          />
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={answered}
            onClick={selectOptionTwo}
          >
            Choose
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default NotAnsweredQuestion;
