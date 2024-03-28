import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { _getQuestions, _saveQuestionAnswer, _saveQuestion } from "../../_DATA";

const initialState = {
  status: "idle",
  data: {},
};

export const fetchAllQuestionsAsync = createAsyncThunk("questions/fetchAll", async () => {
  const questions = await _getQuestions();

  return questions;
});

export const saveQuestionAnswerAsync = createAsyncThunk(
  "questions/saveQuestionAnswer",
  async ({ authedUser, qid, answer }, { dispatch }) => {
    let input = { authedUser, qid, answer };
    const isSaveSucceeded = await _saveQuestionAnswer(input);
    if (isSaveSucceeded) {
      dispatch(fetchAllQuestionsAsync());
    }
    return isSaveSucceeded;
  }
);

export const saveQuestionAsync = createAsyncThunk(
  "questions/saveQuestion",
  async ({ author, optionOneText, optionTwoText }, { dispatch }) => {
    let questionData = { author, optionOneText, optionTwoText };
    const addedQuestion = await _saveQuestion(questionData);

    dispatch(fetchAllQuestionsAsync());

    return addedQuestion;
  }
);

export const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchAllQuestionsAsync.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(fetchAllQuestionsAsync.fulfilled, (state, action) => {
        state.data = Object.assign({}, state.data, { ...action.payload });
        state.status = "loaded";
      });
  },
});

export default questionsSlice.reducer;
