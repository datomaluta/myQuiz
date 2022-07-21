import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import classes from "./Home.module.css";

const Home = () => {
  const [records, setRecords] = useState(false);

  useEffect(() => {
    const localRecords = JSON.parse(localStorage.getItem("records")) || [];
    if (localRecords.length > 0) {
      setRecords(localRecords.pop());
    }
  }, []);

  console.log(records);

  return (
    <div className={classes.wrapper}>
      <h1 className={classes.header}>Home Page</h1>
      <Link className={classes.btn} to="/quiz">
        Start Quiz
      </Link>
      <br />
      <div className={classes.latest}>
        {records ? (
          <>
            <h2>Latest Attempt</h2>
            <p>score - {records.point}</p>
            <p>date: {records.date}</p>
          </>
        ) : (
          <p>No record found</p>
        )}
      </div>

      <Link className={classes.btn} to="/history">
        See history
      </Link>
    </div>
  );
};
export default Home;
