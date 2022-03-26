import React from "react";
import "./PopUP.css";

const PopUP = (props) => {
  return props.trigger ? (
    <div className="pop-up">
      <div className="popup-inner">
        <button
          className="close-btn"
          onClick={() => {
            props.setTrigger(false);
          }}
        >
          Convert
        </button>
        {props.children}
      </div>
    </div>
  ) : (
    ""
  );
};

export default PopUP;
