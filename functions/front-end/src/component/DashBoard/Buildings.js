import React from "react";
import Images from "./Images";
import Form from "react-bootstrap/Form";
import BuildingDetails from "./BuildingDetails";

export default function Buildings({
  building,
  done,
  updateProject,
  setDone,
  changeImageBuilding,
  deleteImageBuilding,
  addImageBuilding,
  handelNameArChange,
  handelNameEnChange,
  handelDetailsArChange,
  handelDetailsEnChange,
  handelStateArChange,
  handelStateEnChange,
  handelImageChange,
  handelStateBuildingChange,
  handelOrderBuildingChange,
  handelAddDetails,
  handelRemoveDetails,
}) {
  const [projectBuilding, setProjectBuilding] = React.useState(building);
  const [projectBuildingNameAr, setProjectBuildingNameAr] = React.useState(
    building.name["ar"]
  );
  const [projectBuildingNameEn, setProjectBuildingNameEn] = React.useState(
    building.name["en"]
  );
  const [projectBuildingImage, setProjectBuildingImage] = React.useState(
    building.img
  );
  const [projectBuildingStateAr, setProjectBuildingStateAr] = React.useState(
    building.state["ar"]
  );
  const [projectBuildingStateEn, setProjectBuildingStateEn] = React.useState(
    building.state["en"]
  );
  const [projectBuidingOrder, setProjectBuidingOrder] = React.useState(
    building.order
  );
  const [projectBuildingImages, setProjectBuildingImages] = React.useState(
    building.images
  );
  const [projectDetails, setProjectDetails] = React.useState({});

  // if (projectBuildingImages.length === 0)
  //   setProjectBuildingImages(building.images);
  const [
    projectBuildingDetailsAr,
    setProjectBuildingDetailsAr,
  ] = React.useState(projectBuilding.details["ar"]);
  const [
    projectBuildingDetailsEn,
    setProjectBuildingDetailsEn,
  ] = React.useState(projectBuilding.details["en"]);

  const [newImage, setNewImage] = React.useState("");
  const [refresh, setRefresh] = React.useState(1);
  React.useEffect(() => {
    setProjectBuilding(building);
    setProjectBuildingNameAr(building.name["ar"]);
    setProjectBuildingNameEn(building.name["en"]);
    setProjectBuildingImage(building.img);
    setProjectBuildingStateAr(building.state["ar"]);
    setProjectBuildingStateEn(building.state["en"]);
    setProjectBuidingOrder(building.order);
    setProjectBuildingImages(building.images);
    setProjectBuildingDetailsAr(building.details["ar"]);
    setProjectBuildingDetailsEn(building.details["en"]);
    const details = {
      ar: building.details["ar"],
      en: building.details["en"],
    };
    setProjectDetails(details);
    // setNewImage()
  }, [building]);

  React.useEffect(() => {
    if (done) {
      let building = {
        name: {
          ar: projectBuildingNameAr,
          en: projectBuildingNameEn,
        },
        details: {
          ar: projectBuildingDetailsAr,
          en: projectBuildingDetailsEn,
        },
        state: {
          ar: projectBuildingStateAr,
          en: projectBuildingStateEn,
        },
        img: projectBuildingImage,
        order: projectBuidingOrder,
        images: projectBuildingImages,
      };
      // console.log(building);
      setDone(false);
      updateProject();
    }
  }, [done]);

  const handelImages = (e) => {
    // e.preventDefault();
    // let images = [...projectBuildingImages];
    // images.push(newImage);
    // setProjectBuildingImages(images);

    /*
     add Image in building
     */

    addImageBuilding(newImage);
  };

  const handelDeleteImage = (e) => {
    // let images = [...projectBuildingImages];
    // images.splice(e - 1, 1);
    // setProjectBuildingImages(images);

    /*
    Delete Image in SingleProject 
    */
    deleteImageBuilding(e);
  };

  // const allImages = projectBuildingImages.map((e, index) => (
  //   <Images
  //     images={e}
  //     number={index + 1}
  //     key={index}
  //     handelDeleteImage={handelDeleteImage}
  //   />
  // ));
  // const allImages = building.images.map((e, i) => {
  //   <Images
  //     images={e}
  //     number={i + 1}
  //     key={i}
  //     handelDeleteImage={handelDeleteImage}
  //   />;
  // });

  const changeImage = (image, index) => {
    // console.log(image + " " + index);
    // let newImages = projectBuildingImages;
    // newImages[index - 1] = image;
    // setProjectBuildingImages(newImages);
    /*
    change image in SingleProject
    */
    changeImageBuilding(image, index);
  };

  const addDetails = (e) => {
    // let newProjectDetails = projectDetails;
    // newProjectDetails["ar"].push("");
    // newProjectDetails["en"].push("");
    // setProjectDetails(newProjectDetails);
    /*
      chnage details in SingleProject
    */
    handelAddDetails();
  };
  return (
    <div className="building">
      {/* <input type="hidden" value={refresh} /> */}
      <div className="div-room">
        <label className="center">الغرف</label>
        <br />
        <input
          value={projectBuildingNameAr}
          onChange={(e) => {
            setProjectBuildingNameAr(e.target.value);
            handelNameArChange(e.target.value);
          }}
        ></input>
        <input
          value={projectBuildingNameEn}
          onChange={(e) => {
            setProjectBuildingNameEn(e.target.value);
            handelNameEnChange(e.target.value);
          }}
        ></input>
      </div>
      <br />
      <br />

      <br />
      <div className="div-state">
        <label className="center">الحالة</label>
        <br />
        {/* <input
          value={projectBuildingStateAr}
          onChange={(e) => {
            setProjectBuildingStateAr(e.target.value);
            handelStateArChange(e.target.value);
          }}
        ></input>
        <input
          value={projectBuildingStateEn}
          onChange={(e) => {
            setProjectBuildingStateEn(e.target.value);
            handelStateEnChange(e.target.value);
          }}
        ></input> */}

        <Form.Control
          required
          as="select"
          onChange={(e) => {
            handelStateBuildingChange(e.target.value);
            setProjectBuildingStateAr(e.target.value);
          }}
          value={projectBuildingStateAr}
          // dir={`${this.props.i18n.language === "ar" ? "rtl" : "ltr"}`}
        >
          <option>متوفر</option>
          <option>مباع</option>
        </Form.Control>
      </div>
      <br />
      <div className="div-img">
        <label>الصورة</label>
        <br />
        <input
          value={projectBuildingImage}
          onChange={(e) => {
            setProjectBuildingImage(e.target.value);
            handelImageChange(e.target.value);
          }}
        ></input>
      </div>
      <br />
      <br />
      <div className="div-order">
        <label>الترتيب</label>
        <br />
        <input
          value={projectBuidingOrder}
          onChange={(e) => {
            setProjectBuidingOrder(e.target.value);
            handelOrderBuildingChange(e.target.value);
          }}
        ></input>
      </div>
      <br />
      <div className="div-details">
        <p className="center">التفاصيل</p>
        <br />
        <div className="details">
          <div className="details-ar">
            {Object.keys(projectDetails).length !== 0
              ? projectDetails["ar"].map((e, index) => {
                  return (
                    <BuildingDetails
                      e={e}
                      detailsLang="ar"
                      key={index}
                      index={index}
                      setProjectBuildingDetails={setProjectBuildingDetailsAr}
                      handelDetailsChange={handelDetailsArChange}
                      handelRemoveDetails={handelRemoveDetails}
                    />
                  );
                })
              : null}
          </div>

          <div className="details-en">
            {Object.keys(projectDetails).length !== 0
              ? projectDetails["en"].map((e, index) => {
                  return (
                    <BuildingDetails
                      e={e}
                      detailsLang="en"
                      index={index}
                      key={index}
                      setProjectBuildingDetails={setProjectBuildingDetailsEn}
                      handelDetailsChange={handelDetailsEnChange}
                      handelRemoveDetails={handelRemoveDetails}
                    />
                  );
                })
              : null}
          </div>
        </div>
      </div>
      <p className="addDetailsButton" onClick={(e) => addDetails(e)}>
        إضافة
      </p>

      <div className="div-images">
        <br />
        <p>الصور</p>
        <div className="buildingImages">
          <div className="div-allImage">
            {projectBuildingImages.map((e, index) => {
              return (
                <Images
                  images={e}
                  number={index + 1}
                  key={index}
                  handelDeleteImage={handelDeleteImage}
                  changeImage={changeImage}
                />
              );
            })}

            <div className="div-inputImage">
              <input
                className="inputImage"
                value={newImage}
                onChange={(e) => setNewImage(e.target.value)}
              ></input>
              <button className="addImage" onClick={(e) => handelImages(e)}>
                اضف صورة
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
