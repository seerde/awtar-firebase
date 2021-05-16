import React from "react";
import { getDataID, updateProjectToDB } from "../../api";
import Buildings from "./Buildings";
import Images from "./Images";
import "./Buildings.css";
import "./SingleProject.css";
import swal from "sweetalert";
import Form from "react-bootstrap/Form";

export default function SingleProject(props) {
  const [projectsArr, setProjectsArr] = React.useState([]);
  const [check, setCheck] = React.useState(true);
  const [projectNameAr, setProjectNameAr] = React.useState("");
  const [projectNameEn, setProjectNameEn] = React.useState("");
  const [projectStateAr, setProjectStateAr] = React.useState("");
  const [projectStateEn, setProjectStateEn] = React.useState("");
  const [projectLocation, setProjectLocation] = React.useState("");
  const [projectImage, setProjectImage] = React.useState("");
  const [projectOrder, setProjectOrder] = React.useState("");
  const [currentProject, setCurrentProject] = React.useState(null);

  const [projectBuildingNameAr, setProjectBuildingNameAr] = React.useState("");
  const [projectBuildingNameEn, setProjectBuildingNameEn] = React.useState("");
  const [projectBuildingImage, setProjectBuildingImage] = React.useState("");
  const [projectBuildingStateAr, setProjectBuildingStateAr] = React.useState(
    ""
  );
  const [projectBuildingStateEn, setProjectBuildingStateEn] = React.useState(
    ""
  );
  const [projectBuidingOrder, setProjectBuidingOrder] = React.useState("");
  const [projectBuildingImages, setProjectBuildingImages] = React.useState([]);

  const [
    projectBuildingDetailsAr,
    setProjectBuildingDetailsAr,
  ] = React.useState();
  const [
    projectBuildingDetailsEn,
    setProjectBuildingDetailsEn,
  ] = React.useState();
  const [newImage, setNewImage] = React.useState("");
  const [refresh, setRefresh] = React.useState(1);
  const [done, setDone] = React.useState(false);

  React.useEffect(() => {
    if (projectsArr.length === 0) {
      getDataID(props.match.params.id).then((res) => {
        const proj = res[0];
        setProjectsArr(proj);
        setProjectNameAr(proj.name["ar"]);
        setProjectNameEn(proj.name["en"]);
        setProjectStateAr(proj.state["ar"]);
        setProjectStateEn(proj.state["en"]);
        setProjectLocation(proj.location);
        setProjectImage(proj.img);
        setProjectOrder(proj.order);
      });
    }
  }, [props]);

  let buildings = null;
  let allBuildings = null;
  if (projectsArr.length !== 0 && projectsArr.project.length !== 0) {
    buildings = projectsArr.project.map((e, index) => (
      <Buildings building={e} key={index} />
    ));

    const handelChangeProject = (e, projectData) => {
      e.preventDefault();
      // console.log(projectData);
      // setCurrentProject(null);
      setCurrentProject(projectData);
      // console.log(e.target.parentNode.className);
      setCheck(true);
    };

    const deleteBuilding = (e, building) => {
      e.preventDefault();
      let buildings = [...projectsArr.project];
      buildings.splice(building, 1);
      let newProject = projectsArr;
      newProject.project = buildings;
      setProjectsArr(newProject);
      setRefresh(refresh + 1);
    };

    allBuildings = projectsArr.project.map((e, index) => {
      // console.log(e.name["ar"]);
      return (
        <div className="div-building" key={index}>
          <a
            href="#"
            className="each-building"
            onClick={(ee) => handelChangeProject(ee, e)}
          >
            <p>{e.name["ar"]}</p>
          </a>
          <div
            className="deleteBuilding"
            onClick={(ee) => deleteBuilding(ee, index)}
          >
            x
          </div>
        </div>
      );
    });
  }

  const handelImages = (e) => {
    e.preventDefault();
    let images = projectBuildingImages;
    // console.log("before", images);
    images.push(newImage);
    // console.log("after", images);
    setProjectBuildingImages(allImages);
  };

  const handelDeleteImage = (e) => {
    let images = projectBuildingImages;
    images.splice(e - 1, 1);
    // console.log(e);
  };

  let allImages = projectBuildingImages.map((e, index) => (
    <Images
      images={e}
      number={index + 1}
      key={index}
      handelDeleteImage={handelDeleteImage}
    />
  ));

  const addBuilding = (e) => {
    e.preventDefault();

    let buildings = [...projectsArr.project];
    let build = {
      name: {
        ar: "",
        en: "",
      },
      img: "",
      order: "",
      state: {
        ar: "",
        en: "",
      },
      details: {
        ar: [],
        en: [],
      },
      images: [],
    };
    // console.log(projectsArr.project);
    // buildings.push(build);
    let newProjectsArr = projectsArr;
    newProjectsArr.project.push(build);
    setProjectsArr(newProjectsArr);
    setRefresh(refresh + 1);
  };

  const updateProject = () => {
    // e.preventDefault();
    let project = {
      name: {
        ar: projectNameAr,
        en: projectNameEn,
      },
      state: {
        ar: projectStateAr,
        en: projectStateEn,
      },
      location: projectLocation,
      img: projectImage,
      order: projectOrder,
      project: projectsArr.project,
    };
    // console.log(project);
    swal("Done", "Update Successfuly", "success");
    updateProjectToDB(props.match.params.id, project).then((response) => {});
    setDone(false);
  };

  const changeImageBuilding = (image, index) => {
    // console.log(image);
    // console.log(index);
    let newCurrentProject = currentProject;
    newCurrentProject.images[index - 1] = image;
    // console.log(NewCurrentProject);
    setCurrentProject(newCurrentProject);
  };

  const deleteImageBuilding = (index) => {
    let newCurrentProject = currentProject;
    newCurrentProject.images.splice(index - 1, 1);
    setCurrentProject(newCurrentProject);
    setRefresh(refresh + 1);
  };

  const addImageBuilding = (image) => {
    let newCurrentProject = currentProject;
    newCurrentProject.images.push(image);
    setCurrentProject(newCurrentProject);
    setRefresh(refresh + 1);
  };

  const handelNameArChange = (name) => {
    let newCurrentProject = currentProject;
    newCurrentProject.name["ar"] = name;
    setCurrentProject(newCurrentProject);
    setRefresh(refresh + 1);
  };
  const handelNameEnChange = (name) => {
    let newCurrentProject = currentProject;
    newCurrentProject.name["en"] = name;
    setCurrentProject(newCurrentProject);
    setRefresh(refresh + 1);
  };
  const handelDetailsArChange = (index, detail) => {
    let newCurrentProject = currentProject;
    newCurrentProject.details["ar"][index] = detail;
    setCurrentProject(newCurrentProject);
    setRefresh(refresh + 1);
  };
  const handelDetailsEnChange = (index, detail) => {
    let newCurrentProject = currentProject;
    newCurrentProject.details["en"][index] = detail;
    setCurrentProject(newCurrentProject);
    setRefresh(refresh + 1);
  };
  const handelStateArChange = (state) => {
    let newCurrentProject = currentProject;
    newCurrentProject.state["ar"] = state;
    setCurrentProject(newCurrentProject);
    setRefresh(refresh + 1);
  };
  const handelStateEnChange = (state) => {
    let newCurrentProject = currentProject;
    newCurrentProject.state["en"] = state;
    setCurrentProject(newCurrentProject);
    setRefresh(refresh + 1);
  };
  const handelImageChange = (img) => {
    let newCurrentProject = currentProject;
    newCurrentProject.img = img;
    setCurrentProject(newCurrentProject);
    setRefresh(refresh + 1);
  };
  const handelOrderChange = (order) => {
    let newOrder = "";
    switch (order) {
      case "بدا الحجز":
        setProjectStateAr("بدا الحجز");
        setProjectStateEn("Booking");
        newOrder = 2;
        break;
      case "بدا البيع":
        setProjectStateAr("بدا البيع");
        setProjectStateEn("for Sale");
        newOrder = 1;
        break;
      case "قريبا":
        setProjectStateAr("قريبا");
        setProjectStateEn("Soon");
        newOrder = 3;
        break;
      case "مباع":
        setProjectStateAr("مباع");
        setProjectStateEn("Sold");
        newOrder = 4;
    }
    setRefresh(refresh + 1);
    setProjectOrder(newOrder);
  };

  const handelStateBuildingChange = (order) => {
    let newCurrentProject = currentProject;
    let newOrder = "";
    let stateAr = "";
    let stateEn = "";
    switch (order) {
      case "متوفر":
        stateAr = "متوفر";
        stateEn = "Available";
        newOrder = 1;
        break;
      case "مباع":
        stateAr = "مباع";
        stateEn = "Sold";
        newOrder = 2;
    }
    // setRefresh(refresh + 1);
    newCurrentProject.state["ar"] = stateAr;
    newCurrentProject.state["en"] = stateEn;
    newCurrentProject.order = newOrder;
    setCurrentProject(newCurrentProject);
  };

  const handelOrderBuildingChange = (order) => {
    let newCurrentProject = currentProject;
    newCurrentProject.order = order;
    setCurrentProject(newCurrentProject);
  };

  const getProjectOrderValue = (order) => {
    let value = "";
    switch (order) {
      case 1:
        value = "بدا البيع";
        break;
      case 2:
        value = "بدا الحجز";
        break;
      case 3:
        value = "قريبا";
        break;
      case 4:
        value = "مباع";
        break;
    }

    return value;
  };

  const handelAddDetails = () => {
    let newCurrentProject = currentProject;
    newCurrentProject.details["ar"].push("");
    newCurrentProject.details["en"].push("");
    setCurrentProject(newCurrentProject);
    setRefresh(refresh + 1);
  };

  const handelRemoveDetails = (lang, index) => {
    let newCurrentProject = currentProject;
    newCurrentProject.details["ar"].splice(index, 1);
    newCurrentProject.details["en"].splice(index, 1);
    setCurrentProject(newCurrentProject);
    setRefresh(refresh + 1);
  };

  return (
    <div className="dashboard-singleProject">
      <input type="hidden" value={refresh} />
      <div className="dashboard-singleProjectInfo">
        <label>إسم المشروع</label>
        <input
          value={projectNameAr}
          onChange={(e) => setProjectNameAr(e.target.value)}
        ></input>
        <input
          value={projectNameEn}
          onChange={(e) => setProjectNameEn(e.target.value)}
        ></input>
        <br />
        <label>حالة المشروع</label>
        {/* <input
          value={projectStateAr}
          onChange={(e) => setProjectStateAr(e.target.value)}
        ></input>
        <input
          value={projectStateEn}
          onChange={(e) => setProjectStateEn(e.target.value)}
        ></input> */}
        <Form.Control
          required
          as="select"
          onChange={(e) => handelOrderChange(e.target.value)}
          value={getProjectOrderValue(projectOrder)}
          // dir={`${this.props.i18n.language === "ar" ? "rtl" : "ltr"}`}
        >
          <option>بدا الحجز</option>
          <option>بدا البيع</option>
          <option>قريبا</option>
          <option>مباع</option>
        </Form.Control>

        <br />
        <label>موقع المشروع</label>
        <input
          value={projectLocation}
          onChange={(e) => setProjectLocation(e.target.value)}
        ></input>
        <br />
        <label>صورة المشروع</label>
        <input
          value={projectImage}
          onChange={(e) => setProjectImage(e.target.value)}
        ></input>
        <br />
        <img src={projectImage} alt="Project Image" />
      </div>
      <br />
      <div className="div-eachProject">
        {allBuildings}
        <div className="div-addBuilding" onClick={(e) => addBuilding(e)}>
          <p>إضافة</p>
        </div>
      </div>
      {/* <div className="buildings">{buildings}</div> */}
      {/* {currentProject !== null ? <Buildings building={currentProject} /> : null} */}
      <br />
      <br />
      {currentProject ? (
        <Buildings
          building={currentProject}
          updateProject={updateProject}
          done={done}
          setDone={setDone}
          changeImageBuilding={changeImageBuilding}
          deleteImageBuilding={deleteImageBuilding}
          addImageBuilding={addImageBuilding}
          handelNameArChange={handelNameArChange}
          handelNameEnChange={handelNameEnChange}
          handelDetailsArChange={handelDetailsArChange}
          handelDetailsEnChange={handelDetailsEnChange}
          handelStateArChange={handelStateArChange}
          handelStateEnChange={handelStateEnChange}
          handelImageChange={handelImageChange}
          handelStateBuildingChange={handelStateBuildingChange}
          handelOrderBuildingChange={handelOrderBuildingChange}
          handelAddDetails={handelAddDetails}
          handelRemoveDetails={handelRemoveDetails}
          key={projectsArr.project.indexOf(currentProject)}
        />
      ) : (
        <></>
      )}
      <div className="buildingUpdateButton">
        <button
          className="update-button"
          onClick={(e) => {
            setDone(true);
            if (currentProject === null) {
              updateProject();
            }
          }}
        >
          Update
        </button>
      </div>
    </div>
  );
}
