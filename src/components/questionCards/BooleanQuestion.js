import { useState } from "react";
import classes from "./QuestionCard.module.css";

const BooleanQuestion = (props) => {
  const [selectedAnswer, setSelectedAnswer] = useState();
  const [formClasses, setFormClasses] = useState(`${classes.form}`);
  const valueChangeHandler = (event) => {
    setSelectedAnswer(event.target.value);
  };
  const submitHandler = (event) => {
    event.preventDefault();
    if (!selectedAnswer) {
      return;
    }
    setTimeout(() => {
      props.onUpdateCurrentQuestion(1);
      props.onShowResult();
    }, [1000]);

    if (selectedAnswer === "true") {
      console.log("mesame sworia");
      setFormClasses((prevState) => {
        return prevState + ` ${classes.correct}`;
      });
      props.onUpdateCurrentScoreHandler(1);
    } else {
      console.log("mesame arasworia");
      setFormClasses((prevState) => {
        return prevState + ` ${classes.inCorrect}`;
      });
      props.onUpdateCurrentScoreHandler(0);
    }
  };
  let question;
  if (props.question) {
    question = <h1>{props.question.question}</h1>;
  }

  return (
    <form onSubmit={submitHandler} className={formClasses}>
      {question}
      <div>
        <input
          onChange={valueChangeHandler}
          type="radio"
          value="true"
          name="boolean"
        />
        <label>True</label>
      </div>
      <div>
        <input
          onChange={valueChangeHandler}
          type="radio"
          value="false"
          name="boolean"
        />
        <label>False</label>
      </div>
      <button className={classes.button}>Confirm</button>
    </form>
  );
};

export default BooleanQuestion;
