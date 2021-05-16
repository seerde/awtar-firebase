import React from "react";
// import Cookies from "js-cookie";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "./awtarlogo.png";
import { logOutCallback, API_URL } from "../api";
import { useTranslation } from "react-i18next";
import axios from "axios";
import app from "../base.js";

function Menu(props) {
  // class Menu extends Component {
  //   constructor(props) {
  //     super(props);
  //     this.state = {
  //       currentLang: "",
  //     };
  //   }

  const { t, i18n } = useTranslation();
  // const [currentLang, setCurrentLang] = React.useState(i18n.language);

  const [token] = React.useState(
    props.user !== "" ? props.user.accesstoken : localStorage.getItem("token")
  );

  const [isAuth, setAuth] = React.useState(false);

  const fetch = async () => {
    let headers = {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    };
    const result = await axios.post(`${API_URL}/api/protected`, headers);
    // console.log("INSIDE FETCH", result.data);
    if (result.data.data === true && !isAuth) {
      setAuth(true);
      return true;
    }
    return false;
  };

  // fetch();

  // console.log(t);
  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    props.handelLang(lang);
    // setCurrentLang(lang);
  };

  const logout = () => {
    // logOutCallback();
    app.auth().signOut();
  };

  app.auth().onAuthStateChanged((user) => {
    if (user) {
      setAuth(true);
    } else {
      setAuth(false);
    }
  });

  return (
    <Navbar className="nav-bar bColor " expand="lg" fixed="top">
      <img className="logo" src={logo} alt="" />
      <Navbar.Toggle aria-controls="basic-navbar-nav " />
      <Navbar.Collapse id="basic-navbar-nav menu">
        <Nav className="mr-auto menu-nav">
          {i18n.language === "en" ? (
            <>
              <Nav.Link as={Link} className="menu-button" to="/">
                {t("nav.btn1")}
              </Nav.Link>
              <Nav.Link as={Link} className="menu-button" to="/Projects">
                {t("nav.btn2")}
              </Nav.Link>
              <Nav.Link className="menu-button" to="" href="/#contact-section">
                {t("nav.btn3")}
              </Nav.Link>
              <Nav.Link as={Link} className="menu-button" to="/services">
                {t("nav.btn4")}
              </Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link as={Link} className="menu-button" to="/services">
                {t("nav.btn4")}
              </Nav.Link>

              <Nav.Link className="menu-button" to="" href="/#contact-section">
                {t("nav.btn3")}
              </Nav.Link>
              <Nav.Link as={Link} className="menu-button" to="/Projects">
                {t("nav.btn2")}
              </Nav.Link>
              <Nav.Link as={Link} className="menu-button" to="/">
                {t("nav.btn1")}
              </Nav.Link>
            </>
          )}

          <div className="languages-div">
            <Nav.Link
              as={Link}
              className="menu-button"
              onClick={() => changeLanguage("en")}
              style={
                props.currentLang === "en"
                  ? { backgroundColor: "rgba(83, 87, 90, 0.7)" }
                  : { backgroundColor: "transparent" }
              }
              to="#"
            >
              EN
            </Nav.Link>
            <Nav.Link
              as={Link}
              className="menu-button"
              onClick={() => changeLanguage("ar")}
              style={
                props.currentLang === "ar"
                  ? { backgroundColor: "rgba(83, 87, 90, 0.7)" }
                  : { backgroundColor: "transparent" }
              }
              to="#"
            >
              عربي
            </Nav.Link>
          </div>

          {isAuth ? (
            <>
              <Nav.Link
                className="Logout"
                onClick={() => {
                  logout();
                  props.handelSetUser("");
                  // history.push("/Login");
                  window.location.href = "/Login";
                  localStorage.removeItem("token");
                }}
              >
                Logout
              </Nav.Link>
            </>
          ) : null}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Menu;
