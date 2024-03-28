import { useForm } from "react-hook-form";
import {
  TextField,
  Button,
  Stack,
  Typography,
  Container,
  Box,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { saveQuestionAsync } from "../questions/questionsSlice";
import { selectAuthUser } from "../authUser/authUserSlice";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

const NewQuestion = () => {
  const [dataSubmitted, setDataSubmitted] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  var authedUser = useSelector(selectAuthUser);

  const { handleSubmit, register, formState } = useForm({
    defaultValues: {
      optionOne: "",
      optionTwo: "",
    },
  });

  let errors = formState.errors;

  const onSubmit = (data) => {
    let questionData = {
      author: authedUser.id,
      optionOneText: data.optionOne,
      optionTwoText: data.optionTwo,
    };

    setDataSubmitted(true);

    dispatch(saveQuestionAsync(questionData));
    const timer = setTimeout(() => {
      clearInterval(timer);
      navigate("/home", { state: { previousPath: location.pathname } });
    }, 1100);
  };

  return (
    <Container component="main">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          component="h3"
          sx={{
            marginBottom: 2,
          }}
        >
          Would You Rather Create Your Own Poll
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Stack spacing={2} width={400}>
            <TextField
              label="First Option"
              type="text"
              {...register("optionOne", {
                required: "First Option is required",
              })}
              error={!!errors.optionOne}
              helperText={errors.optionOne?.message}
            />
            <TextField
              label="Second Option"
              type="text"
              {...register("optionTwo", {
                required: "Second Option is required",
              })}
              error={!!errors.optionTwo}
              helperText={errors.optionTwo?.message}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={!formState.isValid || dataSubmitted}
            >
              Submit
            </Button>
          </Stack>
        </form>
      </Box>
    </Container>
  );
};

export default NewQuestion;
