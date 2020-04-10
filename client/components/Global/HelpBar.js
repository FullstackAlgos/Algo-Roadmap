import React from "react";

const HelpBar = () => {
  const open = () => {
    document.getElementById("helpBar").style.width = "30%";
  };

  const close = () => {
    document.getElementById("helpBar").style.width = "0%";
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

      <div id="helpBar">
        <div className="helpBarInsideDiv">
          <div className="helpHeadDiv">
            <h3>Welcome to Algo Roadmap!</h3>

            <a className="helpCloseX" onClick={close}>
              &#10008;
            </a>
          </div>

          <div className="helpTextDiv">
            <h4 className="helpTextHead">Overview</h4>

            <p className="helpTextPara">
              Do the thousands of question on LeetCode, CodeWars, and other
              coding practice sites seem daunting? Do you ever feel lost and not
              know what to focus on? While these sites have amazing resources to
              help candidates prepare, it is tough to understand how to actually
              approach them and study. That's where{" "}
              <strong>Algo Roadmap (AR)</strong> steps in.
              <br /> <br />
              <strong>Algo Roadmap</strong> leverages LeetCode questions to
              derive a curated roadmap based on simple principles. It wants the
              user to master a technique / data structure before progressing,
              focus only on the most effective questions, and ultimately have a
              clean and concise progress tracker.
              <br /> <br />
              Additionally, one of Algo Roadmap's main values is community. So
              users are able to provide feedback for the administrators to flush
              out and integrate into the application. This way, Algo Roadmap
              will always be up-to-date with latest practice and opinions to
              ensure optimal learning for the entire community.
            </p>

            <h4 className="helpTextHead">About Us</h4>

            <p className="helpTextPara">
              <strong>Algo Roadmap</strong> was founded by{" "}
              <span className="helpSpanName">James</span> and{" "}
              <span className="helpSpanName">Jasen</span>, both members of the
              1911 NY FSA cohort at Fullstack Academy. Having successfully gone
              through the post-bootcamp recruitment process (multiple offers
              under a month from graduation) and completed close to an aggregate
              of 1,000 algorithms, James and Jasen wanted to create and share a
              platform that consolidates and highlights the algorithms that made
              them successful in their journey, hoping to facilitate a similar
              experience for AR users.
            </p>

            <div className="helpFounderFullDiv">
              <div className="helpFounderDiv">
                <h2 className="helpFounderText">James</h2>
                <a
                  href="https://github.com/jjss886"
                  target="_blank"
                  className="helpLinks"
                >
                  <img
                    className="helpImg"
                    alt="github"
                    src="/images/github.png"
                  />
                </a>
                <a
                  href="https://www.linkedin.com/in/jamesshen11/"
                  target="_blank"
                  className="helpLinks"
                >
                  <img
                    className="helpImg"
                    alt="linkedin"
                    src="/images/linkedin.png"
                  />
                </a>
              </div>

              <div className="helpFounderDiv">
                <h2 className="helpFounderText">Jasen</h2>
                <a
                  href="https://github.com/jasenvchan"
                  target="_blank"
                  className="helpLinks"
                >
                  <img
                    className="helpImg"
                    alt="github"
                    src="/images/github.png"
                  />
                </a>
                <a
                  href="https://www.linkedin.com/in/jasenvchan/"
                  target="_blank"
                  className="helpLinks"
                >
                  <img
                    className="helpImg"
                    alt="linkedin"
                    src="/images/linkedin.png"
                  />
                </a>
              </div>

              <div className="helpFounderDiv helpARDiv">
                <h2 className="helpFounderText">AR</h2>
                <a
                  href="https://github.com/FullstackAlgos/AlgoRoadmap"
                  target="_blank"
                  className="helpLinks"
                >
                  <img
                    className="helpImg"
                    alt="github"
                    src="/images/github.png"
                  />
                </a>
              </div>
            </div>

            <div className="helpCloseDiv">
              <button
                type="button"
                className="helpCloseBtn gBtn"
                onClick={close}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpBar;
