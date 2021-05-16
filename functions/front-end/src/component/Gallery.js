import React from "react";
import ImageGallery from "react-image-gallery";
// import data from "./data";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useHistory } from "react-router-dom";
import { getDataForGallery } from "../api";
import { useTranslation } from "react-i18next";

// export default class Gallery extends Component {
function Gallery(props) {
  // render() {
  // console.log(props.match.params.id1);
  // console.log(props.match.params.id2);

  let history = useHistory();

  const { t, i18n } = useTranslation();
  const [galleryData, setGalleryData] = React.useState(false);
  const [galleryName, setGalleryName] = React.useState(null);
  const [data, setData] = React.useState("");

  if (data === "") {
    getDataForGallery(props.match.params.id1, props.match.params.id2).then(
      (e) => {
        setData(e);
      }
    );
  }

  let imageArray = [];
  // let allimages = "";
  // console.log(props.project);
  if (!galleryData && data !== "") {
    // allimages = props.project.filter((e) => e._id === props.match.params.id);
    data.images.forEach((e) => {
      imageArray.push({
        original: `${e}`,
        thumbnail: `${e}`,
        description: "",
      });
    });

    setGalleryData(imageArray);
  }

  if (data !== "") {
    if (i18n.language === "en" && galleryName !== data.name.en) {
      setGalleryName(data.name.en);
    }
    if (i18n.language === "ar" && galleryName !== data.name.ar) {
      setGalleryName(data.name.ar);
    }
  }
  const handelButtonClicked = () => {
    history.push(`/Projects/${props.match.params.id1}`);
  };

  return (
    <div className="project-main">
      <div className="projectTitleButton">
        <button
          onClick={() => {
            handelButtonClicked();
          }}
        >
          {<AiOutlineArrowLeft />} {t("gallery.btn")}
        </button>
        <h2>{galleryName !== null ? galleryName : null}</h2>
      </div>
      {galleryData !== false ? <ImageGallery items={galleryData} /> : null}
    </div>
  );
}
// }

export default Gallery;
