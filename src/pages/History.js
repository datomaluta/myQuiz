import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ContextItem from "../components/contextmenu/ContextItem";
import classes from "./History.module.css";

const History = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const localStorageRecords =
      JSON.parse(localStorage.getItem("records")) || [];
    setRecords(localStorageRecords);
  }, []);

  const deleteItem = (date) => {
    let newRecords = records;
    newRecords = newRecords.filter((record) => record.date !== date);
    localStorage.setItem("records", JSON.stringify(newRecords));
    setRecords(newRecords);
  };

  const attempts = JSON.parse(localStorage.getItem("records"));
  console.log(attempts);
  const content = attempts.map((attempt, index) => (
    <ContextItem
      date={attempt.date}
      deleteItem={deleteItem}
      id={index}
      key={index}
    >
      score - {attempt.point}, date: {attempt.date}
    </ContextItem>
  ));

  return (
    <div className={classes.wrapper}>
      <h1>Last Results:</h1>
      <ul>{content}</ul>
      <Link className={classes.btn} to="/">
        Home Page
      </Link>
    </div>
  );
};
export default History;
