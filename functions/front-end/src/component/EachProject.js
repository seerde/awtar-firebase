import React from "react";
// import Gallery from "./Gallery";
import Proj from "./Proj";
// import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import { getDataID } from "../api";

const Projects = (props) => {
  const [projectsArr, setProjectsArr] = React.useState([]);
  React.useEffect(() => {
    getDataID(props.match.params.id).then((e) => {
      //   console.log(e[0].project);
      setProjectsArr(e[0].project);
    });
  }, [props.projects]);

  const projectsMap = projectsArr.map((proj, index) => (
    <Proj
      project={proj}
      key={index}
      location={proj.name}
      currentLang={props.currentLang}
      id={`${props.match.params.id}/${proj._id}`}
      details={true}
      // handleGallery={this.handleGallery}
    />
  ));
  return (
    <div className="bgImage">
      {" "}
      <div className="project-main">
        <div className="project-text-header"></div>
        <div className="Projects">
          <CardDeck className="carddeck-div">{projectsMap}</CardDeck>
        </div>
        {/* {map} */}
      </div>
    </div>
  );
};

export default Projects;
