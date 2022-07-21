import React, { useState, useEffect } from "react";

const ContextMenu = (props) => {
  const [isOpen, setisOpen] = useState(false);

  const itemDelete = () => {
    console.log("delete" + props.id);
    setisOpen(false);
    console.log(props.isRightClicked);
    props.onRight();
    props.deleteItem(props.attemptDate);
  };
  useEffect(() => {
    props.isRightClicked && setisOpen(true);
  }, [props.isRightClicked]);

  useEffect(() => {
    const cancelMenu = (e) => {
      const parent = props.parent.current;
      if (parent && parent.contains(e.target)) {
        e.preventDefault();
      }
      if (parent && !parent.contains(e.target)) {
        setisOpen(false);
      }
      //   const parent = props.parent.current;

      //   if (!parent.contains(element.target)) {
      //     setisOpen(false);
      //   }
    };
    window.addEventListener("click", cancelMenu);

    return () => {
      window.removeEventListener("click", cancelMenu);
    };
  });
  return isOpen ? (
    <div>
      <button className="buttonClass" onClick={itemDelete}>
        Delete
      </button>
    </div>
  ) : null;
};

export default ContextMenu;
