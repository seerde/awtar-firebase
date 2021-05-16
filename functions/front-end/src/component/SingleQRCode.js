import React from "react";
import QRcode from "qrcode";
import { API_URL } from "../api";
export default function SingleQRCode(props) {
  const [img, setImg] = React.useState(null);
  // console.log(`${API_URL}/Projects/${props.name._id}`);
  QRcode.toDataURL(`${API_URL}/Projects/${props.name.name["en"]}`)
    .then((url) => {
      setImg(url);
    })
    .catch((err) => {
      console.error(err);
    });

  const download = (e) => {
    fetch(e.target.src, {
      method: "GET",
      headers: {},
    })
      .then((response) => {
        response.arrayBuffer().then(function (buffer) {
          const url = window.URL.createObjectURL(new Blob([buffer]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", `${props.name.name}.jpg`); //or any other extension
          document.body.appendChild(link);
          link.click();
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="div-singleQRCode">
      <h3>{props.name.name[props.currentLang === "en" ? "en" : "ar"]}</h3>
      <img src={img} download alt="QRCODE" onClick={(e) => download(e)} />
    </div>
  );
}
