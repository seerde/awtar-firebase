import React from "react";
import Contact from "./Contact";
import AOS from "aos";

import { useTranslation } from "react-i18next";

export default function Home(props) {
  // export default class Home extends Component {
  //   render() {

  AOS.init();

  const { t } = useTranslation();
  const lang = props.currentLang;
  // const [lang, setLang] = React.useState(props.currentLang);
  // console.log(lang);

  let dir = lang === "en" ? "ltr" : "rtl";
  // const [dir, setDir] = React.useState(lang === "en" ? "ltr" : "rtl");
  // console.log("lang is", props.currentLang);
  // console.log("direction is", dir);

  return (
    <div className="Home" id="Home">
      <div className="big-image"></div>
      <div className="left-image" data-aos="fade-right"></div>
      <div className="right-image"></div>
      <div className="bgImage">
        <div className="about">
          {/* <h5>About</h5> */}
          <div className="container">
            <div className="row" data-aos="fade-right">
              <div className="col one">
                <img
                  src="https://roadmap2050.report/static/files/photo-building.jpg"
                  alt=""
                />
              </div>
              <div className="col two" dir={dir}>
                <p>{t("home.text1")}</p>
              </div>
            </div>

            <div className="row " data-aos="fade-left">
              <div className="col two" dir={dir}>
                <p>{t("home.text2")}</p>
              </div>
              <div className="col one">
                <img
                  src="https://www.sustainableplaces.eu/wp-content/uploads/2017/02/SmartBuilding.jpg"
                  alt=""
                />
              </div>
            </div>

            <div className="row" data-aos="fade-right">
              <div className="col one">
                <img
                  src="https://www.ubm-development.com/magazin/wp-content/uploads/2020/03/kl-main-building-d-Kopie.jpg"
                  alt=""
                />
              </div>
              <div className="col two" dir={dir}>
                <p>{t("home.text3")}</p>
              </div>
            </div>

            <div className="row" data-aos="fade-left">
              <div className="col two" dir={dir}>
                <p>{t("home.text4")}</p>
              </div>
              <div className="col one">
                <img
                  src="https://www.ccc.net/wp-content/uploads/2018/06/erwda-building-al-mamoura-new-office-building-overview-500_500.jpg"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>

        <div id="contact-section">
          <Contact currentLang={props.currentLang} />
        </div>
      </div>
    </div>
  );
}
// }
