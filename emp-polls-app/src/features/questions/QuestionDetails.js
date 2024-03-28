import { useState, useEffect } from "react";
import { useParams, Navigate, useLocation } from "react-router-dom";

import { selectAuthUser } from "../authUser/authUserSlice";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllQuestionsAsync } from "../questions/questionsSlice";
import NotAnsweredQuestion from "./NotAnsweredQuestion";
import AnsweredQuestion from "./AnsweredQuestion";
import Login from "../login/Login";

const QuestionDetails = () => {
  const [areQuestionsLoaded, setAreQuestionsLoaded] = useState(false);
  const dispatch = useDispatch();
  const authedUser = useSelector(selectAuthUser);
  const isAllowed = authedUser !== null;
  const location = useLocation();

  let { qid } = useParams();

  useEffect(() => {
    if (!areQuestionsLoaded) {
      dispatch(fetchAllQuestionsAsync());
      setAreQuestionsLoaded(true);
    }
  }, [areQuestionsLoaded, dispatch]);

  let questions = useSelector((state) => state.questions.data);

  const questionNotFound = !questions.hasOwnProperty(qid);

  const question = questionNotFound ? null : questions[qid];

  const isAnswered =
    isAllowed === false || questionNotFound
      ? false
      : question["optionOne"].votes.indexOf(authedUser.id) > -1 ||
        question["optionTwo"].votes.indexOf(authedUser.id) > -1;

  const Details = () => {
    if (!isAllowed) {
      return <Login redirectTo={location.pathname} />;
    } else if (questionNotFound) {
      return <Navigate to={"/404"} state={{ previousPath: location.pathname }} />;
    } else {
      return isAnswered ? <AnsweredQuestion questionId={qid} /> : <NotAnsweredQuestion questionId={qid} />;
    }
  };

  return <Details />;
};

export default QuestionDetails;
