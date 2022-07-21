import classes from "./ProgressBar.module.css";

const Progress = (props) => {
  return (
    <div className={classes.wrapper}>
      <div
        style={{
          backgroundColor: "green",
          height: "30px",
          width: `${props.width}%`,
        }}
      ></div>
    </div>
  );
};

export default Progress;
