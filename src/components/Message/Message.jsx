import React from "react";
import "./Message.css";

const Message = (props) => {
  return (
    <div className="pop-up">
      {/* <p>Reason for Declining the claim?</p>
      <textarea />
      <button>Submit Reason</button> */}
      <div className="popup-inner">{props.children}</div>
    </div>
  );
};

export default Message;
