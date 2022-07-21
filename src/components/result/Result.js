import classes from "./Result.module.css";

const Result = (props) => {
  return (
    <div>
      <h1>Result: {props.correct}/3</h1>
      <button className={classes.btn} onClick={props.onShowModal}>
        Try Again
      </button>
    </div>
  );
};

export default Result;
