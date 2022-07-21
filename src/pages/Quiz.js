import { useEffect, useState } from "react";
import Popup from "../components/popup/PopUp";
import BooleanQuestion from "../components/questionCards/BooleanQuestion";
import MultipleQuestion from "../components/questionCards/MultipleQuestion";
import SingleQuestion from "../components/questionCards/SingleQuestion";
import Result from "../components/result/Result";
import ProgressBar from "../UI/ProgressBar";
import classes from "./Quiz.module.css";
import DateFunction from "../utils/DateFunction";
import { Link } from "react-router-dom";

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [currentScore, setCurrentScore] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [singleQuestion, setSingleQuestion] = useState();
  const [singleAnswer, setSingleAnswer] = useState();
  const [multipleQuestion, setMultipleQuestion] = useState("");
  const [multipleAnswers, setMultipleAnswers] = useState("");
  const [booleanQuestion, setBooleanQuestion] = useState("");
  const [booleanAnswer, setBooleanAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [progressBarWidth, setProgressBarWidth] = useState(33.3);
  const [showModal, setShowModal] = useState(false);

  const nowDate = DateFunction();

  useEffect(() => {
    const fetchQuestions = async () => {
      setIsLoading(true);
      const response = await fetch(
        "https://my-json-server.typicode.com/DanielBarbakadze/Advanced-JS-and-React-Basics/db"
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();
      console.log("data loaded");
      setQuestions(data.questions);
      setAnswers(data.answers);
      setIsLoading(false);
    };
    fetchQuestions().catch((error) => {
      console.log(error.message);
      setError(error.message);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    if (questions.length === 0) {
      return;
    }

    // SINGLE QUESTION LOGIC
    setSingleQuestion(questions.find((question) => question.type === "single"));
    const singleQuestionId = questions.find(
      (question) => question.type === "single"
    ).id;
    setSingleAnswer(answers.find((answer) => answer.id === singleQuestionId));

    // MULTI QUESTION LOGIC
    setMultipleQuestion(
      questions.find((question) => question.type === "multiple")
    );
    const multipleQuestionid = questions.find(
      (question) => question.type === "multiple"
    ).id;
    setMultipleAnswers(
      answers.find((answer) => answer.id === multipleQuestionid)
    );

    // BOOLEAN QEUSTION LOGIC
    setBooleanQuestion(
      questions.find((question) => question.type === "boolean")
    );
    const booleanQuestionId = questions.find(
      (question) => question.type === "boolean"
    ).id;
    setBooleanAnswer(answers.find((answer) => answer.id === booleanQuestionId));
  }, [questions, answers]);

  const saveToLocalStorage = () => {
    let records = JSON.parse(localStorage.getItem("records")) || [];
    records = [...records, { point: currentScore, date: nowDate }];
    localStorage.setItem("records", JSON.stringify(records));
  };

  const updateCurrentScoreHandler = (param) => {
    if (param === 1) {
      setCurrentScore((prevScore) => {
        return prevScore + 1;
      });
    } else {
      setCurrentScore((prevScore) => {
        return prevScore;
      });
    }
  };

  const updateCurrentQuestion = (param) => {
    setCurrentQuestion((prevQuestion) => {
      return prevQuestion + 1;
    });
  };

  const showResultHandler = () => {
    setShowResult(true);
  };

  const progressBarHandler = () => {
    setProgressBarWidth((prevState) => {
      return +prevState + 33.3;
    });
  };

  const showModalHandler = () => {
    setShowModal(true);
  };
  const closeModalHandler = () => {
    setShowModal(false);
  };

  return (
    <div className={classes.quizWrapper}>
      {error && (
        <div className={classes.errorWrapper}>
          {error && <h2>{error}</h2>}
          <Link className={classes.btn} to="/">
            Back To Home
          </Link>
        </div>
      )}
      {!error && !isLoading && <ProgressBar width={progressBarWidth} />}

      {!error && !isLoading && !showResult && (
        <h1>current score: {currentScore}</h1>
      )}
      {!error && isLoading && <h1>Loading...</h1>}
      {!error && !isLoading && currentQuestion === 1 && (
        <SingleQuestion
          question={singleQuestion}
          answer={singleAnswer}
          onUpdateCurrentScoreHandler={updateCurrentScoreHandler}
          onUpdateCurrentQuestion={updateCurrentQuestion}
          onProgressBarHandler={progressBarHandler}
        />
      )}
      {currentQuestion === 2 && (
        <MultipleQuestion
          question={multipleQuestion}
          answers={multipleAnswers}
          onUpdateCurrentScoreHandler={updateCurrentScoreHandler}
          onUpdateCurrentQuestion={updateCurrentQuestion}
          onProgressBarHandler={progressBarHandler}
        />
      )}
      {currentQuestion === 3 && (
        <BooleanQuestion
          question={booleanQuestion}
          answer={booleanAnswer}
          onUpdateCurrentScoreHandler={updateCurrentScoreHandler}
          onUpdateCurrentQuestion={updateCurrentQuestion}
          onShowResult={showResultHandler}
        />
      )}
      {showResult && (
        <Result correct={currentScore} onShowModal={showModalHandler} />
      )}
      {showModal && (
        <Popup
          onSaveToLocalStorage={saveToLocalStorage}
          onCloseModal={closeModalHandler}
          currentScore={currentScore}
        />
      )}
    </div>
  );
};
export default Quiz;
