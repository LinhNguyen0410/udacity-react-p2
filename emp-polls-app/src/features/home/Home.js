import { useDispatch, useSelector } from "react-redux";
import { fetchAllQuestionsAsync } from "../questions/questionsSlice";
import { selectAuthUser } from "../authUser/authUserSlice";
import QuestionList from "../questions/QuestionList";
import { useEffect, useState } from "react";
import { Button, Stack } from "@mui/material";
import Box from "@mui/material/Box";

const Home = () => {
  const dispatch = useDispatch();
  const loggedInUser = useSelector(selectAuthUser);
  const [questionsLoaded, setQuestionsLoaded] = useState(false);
  const [displayNewQuestions, setDisplayNewQuestions] = useState(true);

  useEffect(() => {
    if (!questionsLoaded) {
      dispatch(fetchAllQuestionsAsync());
      setQuestionsLoaded(true);
    }
  }, [questionsLoaded, dispatch]);

  const questionsState = useSelector((state) => state.questions.data);
  const questionIds = Object.keys(questionsState);

  const sortQuestionsDescending = (a, b) => {
    const timestampA = a.timestamp;
    const timestampB = b.timestamp;
    if (timestampA < timestampB) {
      return 1;
    }
    if (timestampA > timestampB) {
      return -1;
    }
    return 0;
  };

  const filterQuestions = () => {
    const answered = [];
    const newQuestions = [];
    questionIds.forEach((id) => {
      const question = questionsState[id];
      const isAnswered =
        question["optionOne"].votes.indexOf(loggedInUser.id) > -1 ||
        question["optionTwo"].votes.indexOf(loggedInUser.id) > -1;
      if (isAnswered) {
        answered.push(question);
      } else {
        newQuestions.push(question);
      }
    });
    return {
      answered: answered.sort(sortQuestionsDescending),
      newQuestions: newQuestions.sort(sortQuestionsDescending),
    };
  };

  const { answered, newQuestions } = filterQuestions();

  const AnsweredQuestions = () => !displayNewQuestions && <QuestionList title="Answered Polls" questions={answered} />;

  const UnansweredQuestions = () =>
    displayNewQuestions && <QuestionList title="Unanswered Polls" questions={newQuestions} />;

  const handleChange = (event) => {
    event.preventDefault();
    setDisplayNewQuestions(!displayNewQuestions);
  };

  return (
    <Stack spacing={2}>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
        <Button variant="contained" onClick={handleChange}>
          {displayNewQuestions ? "Display Answered Polls" : "Display Unanswered Polls"}
        </Button>
      </Box>
      <UnansweredQuestions />
      <AnsweredQuestions />
    </Stack>
  );
};

export default Home;
