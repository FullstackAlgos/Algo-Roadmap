import React from "react";

const HelpBar = () => {
  const open = () => {
    document.getElementById("helpBarInsideDiv").style.width = "30%";
  };

  const close = () => {
    document.getElementById("helpBarInsideDiv").style.width = "0%";
  };

  return (
    <div className="helpBarFullDiv">
      <input
        className="helpMainBtn"
        onClick={open}
        type="image"
        src="/images/liveSupportIcon.png"
        alt="Help Button"
      />

      <div className="helpBarInsideDiv">
        <h3>Help Bar!</h3>

        <a className="helpCloseBtn" onClick={close}>
          x
        </a>
      </div>
    </div>
  );
};

export default HelpBar;
