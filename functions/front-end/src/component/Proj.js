import React, { Component } from "react";
// import { useHistory } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Card from "react-bootstrap/Card";
import AOS from "aos";
import state from "./state.png";
import { BiMap } from "react-icons/bi";
import { withTranslation } from "react-i18next";

class Proj extends Component {
  constructor(props) {
    super(props);
  }
  handleClick = (e, project) => {
    e.preventDefault();
    // console.log("Clicked");
    // console.log(this.props.project._id);
    // console.log(e.target);
    // let history = useHistory();
    // history.push("/");
    // console.log(e);
    // this.props.handleGallery(this.props.location);
    // console.log(e);

    if ("project" in project && project.project.length !== 0)
      window.location.href = this.props.id;
    else if (!("project" in project) && project.images.length !== 0)
      window.location.href = this.props.id;
  };

  // handel location >> open google map location for project
  handelLocationClick = (e, location) => {
    e.preventDefault();
    window.location.href = location;
  };

  render() {
    AOS.init();
    const project = this.props.project;
    // const gallery = <Gallery index={this.props.location} />;
    let animationDirection = this.props.location % 2 === 1 ? true : false;
    let details = [];
    if (this.props.details) {
      project.details[this.props.currentLang === "ar" ? "ar" : "en"].forEach(
        (e) => {
          details.push(e);
        }
      );
    }
    return (
      <Router>
        <div className="Proj">
          <div className="div-image">
            {/* <img src={project.img} />
            <div class="overlay" onClick={(e) => this.handleClick(e)}>
              <div class="text">
                {project.name}{" "}
                <p className="inside-flip-image">click for more</p>
              </div>
            </div> */}

            <Card
              className="card-div"
              data-aos={`zoom-in-${animationDirection ? "left" : "right"}`}
            >
              {/* <Card.Title className="cardTitle">{project.name}</Card.Title> */}
              <Card.Img
                className="project-image"
                variant="top"
                src={project.img}
                onClick={(e) => this.handleClick(e, project)}
              />
              {/* <div className="project-state">{project.state}</div> */}
              <div className="state-div">
                <img className="state-img" src={state} alt="" />

                <p>
                  {" "}
                  {this.props.currentLang === "ar"
                    ? project.state["ar"]
                    : project.state["en"]}
                </p>
              </div>
              <Card.Body>
                <Card.Text
                  className="cardText"
                  dir={this.props.currentLang === "ar" ? "rtl" : "ltr"}
                >
                  {this.props.currentLang === "ar"
                    ? project.name["ar"]
                    : project.name["en"]}
                </Card.Text>
              </Card.Body>
              <small
                className="proj-details"
                dir={this.props.currentLang === "ar" ? "rtl" : "ltr"}
              >
                {this.props.details === false ? (
                  <div
                    className="proj-location"
                    onClick={(e) =>
                      this.handelLocationClick(e, project.location)
                    }
                  >
                    {this.props.t("location")} <BiMap />
                  </div>
                ) : (
                  <>
                    <p>{details[0]}</p>
                    <p>{details[1]}</p>
                    <p>{details[2]}</p>
                  </>
                )}
              </small>
            </Card>
          </div>
        </div>
      </Router>
    );
  }
}

export default withTranslation()(Proj);
