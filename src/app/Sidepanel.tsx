import React from "react";
import "./Sidepanel.css";
import TourPinsIcon from "../../static/icons/tour-pins-icon.svg";
import StravaIcon from "../../static/icons/strava-icon.svg";
import golfIcon from "../../static/icons/golf-icon.svg";
import resumeIcon from "../../static/icons/resume-icon.svg";
import linkedinIcon from "../../static/icons/linkedin-icon.svg";
import behanceIcon from "../../static/icons/behance-icon.svg";

type Props = {};
function Sidepanel({}: Props) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="sidepanel-container">
      <button className="toggle" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "⬅️" : "➡️"}
      </button>
      <div className={["sidepanel", isOpen ? "open" : "closed"].join(" ")}>
        <div className="content">
          <h1>Hello</h1>
          <h3>
            I'm a creative frontend engineer, previously at{" "}
            <a target="_blank" href="https://scoopcommute.com">
              Scoop
            </a>{" "}
            and the{" "}
            <a target="_blank" href="https://flexindex.com">
              Flex Index
            </a>
            .
          </h3>
          <div className="icons">
            <a
              className="tooltip"
              target="_blank"
              href="https://tour-pins.com"
              title="I built Tour Pins, software to generate professional grade golf tournament pin sheets"
            >
              <img width={32} src={TourPinsIcon} alt="Tour Pins Icon" />
            </a>
            <a
              target="_blank"
              href="https://www.strava.com/athletes/70959606"
              title="In my free time, I foil and ski"
              className="tooltip"
            >
              <img width={32} src={StravaIcon} alt="Strava Icon" />
            </a>
            <a
              target="_blank"
              href="https://www.usga.org/content/usga/home-page/championships/2018/u-s--mid-amateur/articles/belgium_s-echikson-doesnt-come-into-first-mid-am-with-blind-fait.html"
              title="I played professional golf"
              className="tooltip"
            >
              <img width={32} src={golfIcon} alt="Golf Icon" />
            </a>
            <a
              target="_blank"
              href="https://www.linkedin.com/in/samechikson/"
              title="Linkedin"
            >
              <img width={32} src={linkedinIcon} alt="LinkedIn Icon" />
            </a>
            <a target="_blank" href="./Sam_Echikson_resume.pdf" title="Resume">
              <img width={32} src={resumeIcon} alt="Resume Icon" />
            </a>
            <a
              target="_blank"
              href="https://www.behance.net/samechikson"
              title="Visual portfolio"
              className="tooltip"
            >
              <img width={32} src={behanceIcon} alt="Behance Icon" />
            </a>
          </div>
        </div>

        <footer>
          <p>
            Built with{" "}
            <a target="_blank" href="https://threejs.org" title="Three.js">
              Three.js
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}

export default Sidepanel;
