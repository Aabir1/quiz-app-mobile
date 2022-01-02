import configurations from "./env";

const URL = {
  BASE_URL: configurations.BASE_URL,

  QUIZ_GET_ALL: "quiz/get-all",
  QUESTION_GET_BY_QUIZ: "quiz/questions/get-by-quiz",
  SAVE_ANSWER: "quiz/answers/save",
  GET_BY_QUESTIONS: "quiz/answers/get-by-question",
};
export default URL;
