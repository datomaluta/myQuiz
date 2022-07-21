import { Fragment, useEffect, useState } from "react";
import BooleanQuestion from "../components/questionCards/BooleanQuestion";
import MultipleQuestion from "../components/questionCards/MultipleQuestion";
import SingleQuestion from "../components/questionCards/SingleQuestion";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [singleQuestion, setSingleQuestion] = useState("");
  const [singleAnswer, setSingleAnswer] = useState("");
  const [multipleQuestion, setMultipleQuestion] = useState("");
  const [multipleAnswers, setMultipleAnswers] = useState("");
  const [booleanQuestion, setBooleanQuestion] = useState("");
  const [booleanAnswer, setBooleanAnswer] = useState("");
  //   let singleQuestion;
  //   let singleAnswer;

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await fetch(
        "http://my-json-server.typicode.com/DanielBarbakadze/Advanced-JS-and-React-Basics/db"
      );
      const data = await response.json();
      console.log("data loaded");
      setQuestions(data.questions);
      setAnswers(data.answers);
      setSingleQuestion(
        data.questions.find((question) => question.type === "single")
      );

      const singleQuestionId = data.questions.find(
        (question) => question.type === "single"
      ).id;

      setSingleAnswer(
        data.answers.find((answer) => answer.id === singleQuestionId)
      );

      setMultipleQuestion(
        data.questions.find((question) => question.type === "multiple")
      );
      const multipleQuestionid = data.questions.find(
        (question) => question.type === "multiple"
      ).id;
      setMultipleAnswers(
        data.answers.find((answer) => answer.id === multipleQuestionid)
      );

      setBooleanQuestion(
        data.questions.find((question) => question.type === "boolean")
      );
      const booleanQuestionId = data.questions.find(
        (question) => question.type === "boolean"
      ).id;
      setBooleanAnswer(
        data.answers.find((answer) => answer.id === booleanQuestionId)
      );
    };
    fetchQuestions();
  }, []);

  console.log("rendered");

  console.log(singleQuestion);
  console.log(singleAnswer);
  // console.log(multipleQuestion);
  // console.log(multipleAnswers);
  // console.log(booleanQuestion);
  // console.log(booleanAnswer);

  return (
    <Fragment>
      <h1>Quiz Page</h1>
      <SingleQuestion question={singleQuestion} answer={singleAnswer} />
      {/* <MultipleQuestion question={multipleQuestion} answers={multipleAnswers} /> */}
      {/* <BooleanQuestion question={booleanQuestion} answer={booleanAnswer} /> */}
    </Fragment>
  );
};
export default Quiz;
