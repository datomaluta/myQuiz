import { useHistory } from "react-router-dom";
import classes from "./Popup.module.css";

const Popup = (props) => {
  const history = useHistory();

  const saveAndHome = () => {
    props.onSaveToLocalStorage();
    history.push("/");
  };

  const goToHome = () => {
    history.push("/");
  };

  return (
    <div onClick={props.onCloseModal} className={classes.backdrop}>
      <div className={classes.content}>
        <p>Do you want to save this attempt?</p>
        <div className={classes.btnsDiv}>
          <button onClick={saveAndHome}>Yes</button>
          <button onClick={goToHome}>No</button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
