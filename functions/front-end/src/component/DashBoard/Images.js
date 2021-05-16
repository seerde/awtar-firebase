import React from "react";

export default function Images(props) {
  const [images, setImages] = React.useState(props.images);

  const handelDeleteImage = (e) => {
    e.preventDefault();
    // console.log(props.number);
    props.handelDeleteImage(props.number);
  };

  React.useEffect(() => {
    setImages(props.images);
  }, [props.images]);
  return (
    <div className="eachImage">
      <p>{props.number}</p>
      <input
        value={images}
        onChange={(e) => {
          setImages(e.target.value);
          props.changeImage(e.target.value, props.number);
        }}
      ></input>
      <div className="deleteImage" onClick={(e) => handelDeleteImage(e)}>
        X
      </div>
    </div>
  );
}
