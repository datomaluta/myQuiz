import React, { useRef, useState } from "react";
import ContextMenu from "./ContextMenu";

const ContextItem = ({ children, id, deleteItem, date }, style) => {
  const itemsRef = useRef();
  const [isRightClicked, setIsRightClicked] = useState(false);

  const handleClick = (event) => {
    event.preventDefault();
    setIsRightClicked((prevState) => !prevState);
  };

  const sideHandler = () => {
    setIsRightClicked((prevState) => !prevState);
  };

  return (
    <li ref={itemsRef} onContextMenu={handleClick}>
      <p>{children}</p>
      <ContextMenu
        id={id}
        onRight={sideHandler}
        parent={itemsRef}
        isRightClicked={isRightClicked}
        deleteItem={deleteItem}
        attemptDate={date}
      />
    </li>
  );
};

export default ContextItem;
