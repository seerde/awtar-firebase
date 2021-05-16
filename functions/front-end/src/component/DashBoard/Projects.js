import React from "react";
import Card from "react-bootstrap/Card";
import { deleteProjectByID } from "../../api";

export default function Projects(props) {
  const handelDeleteProject = (e, id, name) => {
    deleteProjectByID(id, name);
    props.deleteProject(e, props.index);
  };

  return (
    <div className="project-div">
      <div className="dashboard-Projects">
        <Card
          className="card-div"
          onClick={(e) => {
            window.location.href = `/ControlPanel/${props.project.name["en"]}`;
          }}
        >
          <p>{props.project.name["ar"]}</p>
        </Card>
      </div>
      <div className="deleteProject">
        <Card className="cardDelete-div">
          <p
            onClick={(e) =>
              handelDeleteProject(
                e,
                props.project._id,
                props.project.name["en"]
              )
            }
          >
            حذف
          </p>
        </Card>
      </div>
    </div>
  );
}
