import React from "react";
// import Gallery from "./Gallery";
import Proj from "./Proj";
// import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";

const Projects = ({ projects, currentLang }) => {
  const [projectsArr, setProjectsArr] = React.useState([]);
  React.useEffect(() => {
    if (projects.length > 0) {
      setProjectsArr(projects);
    }
  }, [projects]);

  const projectsMap = projectsArr.map((proj, index) => (
    <Proj
      project={proj}
      key={index}
      location={proj.name}
      currentLang={currentLang}
      id={`Projects/${proj.name["en"]}`}
      details={false}
      // handleGallery={this.handleGallery}
    />
  ));
  return (
    <div className="bgImage">
      {" "}
      <div className="project-main">
        <div className="project-text-header">
          {/* <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p> */}
        </div>
        <div className="Projects">
          <CardDeck className="carddeck-div">{projectsMap}</CardDeck>
        </div>
        {/* {map} */}
      </div>
    </div>
  );
};

export default Projects;
