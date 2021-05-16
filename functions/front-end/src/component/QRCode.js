import React from "react";
import QRcode from "qrcode";
import SingleQRCode from "./SingleQRCode";

export default function QRCode(props) {
  //   let qrCode = "";
  //   const Barcode = QRcode.toDataURL("I am a pony!")
  //     .then((url) => {
  //       qrCode = url;
  //       console.log(url);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });

  //   const nameArr = [];
  //   const barcodeArr = [];

  let singleCode = "";
  if (Object.keys(props.project).length > 0) {
    // const nameArr = [];
    // const barcodeArr = [];

    singleCode = props.project.map((e, index) => (
      <SingleQRCode name={e} key={index} currentLang={props.currentLang} />
    ));

    // console.log(nameArr);
    // console.log(barcodeArr);
  }

  // const singleQR = projectsArr.map((proj, index) => (
  //     <Proj
  //       project={proj}
  //       key={index}
  //       location={proj.name}
  //     />
  //   ));

  return <div className="div-QRCode">{singleCode}</div>;
}
