import React from "react";

export default function BuildingDetails(props) {
  const handelRemoveDetails = (e) => {
    e.preventDefault();
    props.handelRemoveDetails(props.detailsLang, props.index);
  };
  return (
    <div className="div-buildingDetails">
      <input
        value={props.e}
        onChange={(e) => {
          props.setProjectBuildingDetails(e.target.value);
          props.handelDetailsChange(props.index, e.target.value);
        }}
      ></input>
      {props.detailsLang === "ar" ? (
        <p onClick={(e) => handelRemoveDetails(e)}>x</p>
      ) : null}
    </div>
  );
}
