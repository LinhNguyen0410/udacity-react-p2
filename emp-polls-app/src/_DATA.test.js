import { _saveQuestion, _saveQuestionAnswer, _getQuestions } from "./_DATA";

describe("_saveQuestion", () => {
  it("should save question with valid params", async () => {
    let input = {
      optionOneText: "first option",
      optionTwoText: "second option",
      author: "me",
    };
    var actual = await _saveQuestion(input);
    expect(actual.author).toEqual("me");
    expect(actual.optionOne).toEqual({
      votes: [],
      text: input.optionOneText,
    });
    expect(actual.optionTwo).toEqual({
      votes: [],
      text: input.optionTwoText,
    });
    expect(actual.hasOwnProperty("timestamp")).toEqual(true);
    expect(actual.hasOwnProperty("id")).toEqual(true);
  });

  it("will return an error if input is missing", async () => {
    let input = {
      optionOneText: "first option",
      optionTwoText: "second option",
    };

    await expect(_saveQuestion(input)).rejects.toEqual(
      "Please provide optionOneText, optionTwoText, and author"
    );
  });
});

describe("_saveQuestionAnswer", () => {
  it("should save answer with valid params", async () => {
    let input = {
      authedUser: "sarahedo",
      qid: "vthrdm985a262al8qx3do",
      answer: "optionOne",
    };
    var actual = await _saveQuestionAnswer(input);
    var questions = await _getQuestions();

    expect(actual).toEqual(true);
    expect(
      questions[input.qid][input.answer].votes.indexOf(input.authedUser)
    ).not.toEqual(-1);
  });

  it("will return an error if input is missing", async () => {
    let input = {
      authedUser: "sarahedo",
      qid: "vthrdm985a262al8qx3do",
    };

    await expect(_saveQuestionAnswer(input)).rejects.toEqual(
      "Please provide authedUser, qid, and answer"
    );
  });
});
