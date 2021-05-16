import React from "react";
import Projects from "./Projects";
import Card from "react-bootstrap/Card";

import { addNewProject } from "../../api";

export default function Home(props) {
  const [projects, setProjects] = React.useState([]);
  const [refresh, setRefresh] = React.useState(1);

  React.useEffect(() => {
    if (Object.keys(props.projects).length !== 0) {
      setProjects(props.projects);
    }
  }, [props.projects]);
  // const allProject = projects.map((e, index) => (
  //   <Projects project={e} key={index} />
  // ));

  const addProject = (e) => {
    e.preventDefault();
    let project = {
      name: {
        ar: "جديد",
        en: "new",
      },
      state: {
        ar: "",
        en: "",
      },
      img: "",
      location: "",
      order: 11,
      project: [],
    };
    let newProject = [...projects];
    newProject.push(project);
    setProjects(newProject);
    setRefresh(refresh + 1);
    addNewProject(project);
  };

  const deleteProject = (e, project) => {
    e.preventDefault();
    let newProject = [...projects];
    newProject.splice(project, 1);
    setProjects(newProject);
    // setRefresh(refresh + 1);
  };

  return (
    <div className="dashboard-home">
      <input type="hidden" value={refresh} />
      {projects.map((e, index) => (
        <Projects
          project={e}
          index={index}
          key={index}
          deleteProject={deleteProject}
        />
      ))}

      <div className="dashboardAddProjects">
        <Card
          className="card-div"
          onClick={(e) => {
            addProject(e);
          }}
        >
          <p>إضافة مشروع جديد</p>
        </Card>
      </div>
    </div>
  );
}
