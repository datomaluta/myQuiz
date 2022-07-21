import { useState } from "react";
import classes from "./QuestionCard.module.css";

const MultipleQuestion = (props) => {
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [formClasses, setFormClasses] = useState(`${classes.form}`);

  const checkedHandler = (event) => {
    console.log(event.target.checked);
    setSelectedAnswers((prevState) => {
      if (!event.target.checked) {
        const newState = prevState.filter(
          (answer) => answer.title !== event.target.value
        );
        return newState;
      }
      return [
        ...prevState,
        { title: event.target.value, index: event.target.id },
      ];
    });
  };

  const submitHanlder = (event) => {
    event.preventDefault();
    if (selectedAnswers.length === 0) {
      return;
    }
    setTimeout(() => {
      props.onUpdateCurrentQuestion(1);
      props.onProgressBarHandler();
    }, [1000]);
    console.log(selectedAnswers);

    console.log(props.answers.answer);

    const boloebi = selectedAnswers.map(
      (answer) => +answer.title.split(" ")[2]
    );
    console.log(boloebi.sort());

    if (
      JSON.stringify(props.answers.answer) === JSON.stringify(boloebi.sort())
    ) {
      console.log("ertnairia");
      setFormClasses((prevState) => {
        return prevState + ` ${classes.correct}`;
      });
      props.onUpdateCurrentScoreHandler(1);
    } else {
      console.log("ar aris ertnairi");
      setFormClasses((prevState) => {
        return prevState + ` ${classes.inCorrect}`;
      });
      props.onUpdateCurrentScoreHandler(0);
    }
  };

  let content;
  let question;
  if (props.question) {
    question = <h1>{props.question.question}</h1>;
    content = props.question.options.map((option, index) => (
      <div key={index}>
        <input
          onChange={checkedHandler}
          id={index + 1}
          type="checkbox"
          value={option}
          name="multiple"
        />
        <label>{option}</label>
      </div>
    ));
  }

  return (
    <form onSubmit={submitHanlder} className={formClasses}>
      {question}
      {content}
      <button className={classes.button}>Confirm</button>
    </form>
  );
};

export default MultipleQuestion;
