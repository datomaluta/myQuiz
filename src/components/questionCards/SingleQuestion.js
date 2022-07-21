import { useState } from "react";
import classes from "./QuestionCard.module.css";

const SingleQuestion = (props) => {
  // console.log(props);

  const [selectedAnswer, setSelectedAnswer] = useState();
  const [formClasses, setFormClasses] = useState(`${classes.form}`);
  // const [isTouched, setIsTouched] = useState(false);

  const submitHandler = (event) => {
    event.preventDefault();
    if (!selectedAnswer) {
      return;
    }
    setTimeout(() => {
      props.onUpdateCurrentQuestion(1);
      props.onProgressBarHandler();
    }, [1000]);

    // props.onUpdateCurrentQuestion(1);

    // console.log(selectedAnswer.index);
    // console.log(props.answer.answer);

    if (selectedAnswer.index === props.answer.answer) {
      console.log("სწორია");
      // 1 სწორია, 0 არასწორია
      // formClasses = `${classes.form} ${classes.correct}`;
      // console.log(formClasses);
      setFormClasses((prevState) => {
        return prevState + ` ${classes.correct}`;
      });

      props.onUpdateCurrentScoreHandler(1);
    } else {
      props.onUpdateCurrentScoreHandler(0);
      setFormClasses((prevState) => {
        return prevState + ` ${classes.inCorrect}`;
      });
    }
  };

  const valueChangeHandler = (event) => {
    setSelectedAnswer({ title: event.target.value, index: +event.target.id });
  };

  const focusHandler = () => {};

  let content;
  let question;
  if (props.question) {
    question = <h1>{props.question.question}</h1>;
    content = props.question.options.map((option, index) => (
      <div key={index}>
        <input
          onChange={valueChangeHandler}
          id={index + 1}
          type="radio"
          value={option}
          name="single"
        />
        <label>{option}</label>
      </div>
    ));
  }

  return (
    <form
      onFocus={focusHandler}
      className={formClasses}
      onSubmit={submitHandler}
    >
      {question}
      {content}
      {<button className={classes.button}>Confirm</button>}
    </form>
  );
};

export default SingleQuestion;
