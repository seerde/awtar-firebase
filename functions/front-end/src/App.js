import "./App.css";
import "./AOS.css";
import React, { Component } from "react";
import Menu from "./component/Menu";
import Home from "./component/Home";
import Projects from "./component/Projects";
import Services from "./component/Services";
// import projects from "./component/data";

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Gallery from "./component/Gallery";
import Messages from "./component/Messages";
import Login from "./component/login/Login";
import AdminLogin from "./component/DashBoard/Login";

import { withTranslation } from "react-i18next";
import { refreshToken, getData, API_URL } from "./api";
import axios from "axios";
import PrivateRoute from "./PrivateRoute";
import QRCode from "./component/QRCode";
import EachProject from "./component/EachProject";
import $ from "jquery";

// import files for dashboard
import dashboardHome from "./component/DashBoard/Home";
import SingleProject from "./component/DashBoard/SingleProject";

import { AuthProvider } from "./Auth";

// function App() {
class App extends Component {
  constructor() {
    super();
    this.state = {
      user: "",
      currentLang:
        (navigator.language || navigator.userLanguage)[0] +
        (navigator.language || navigator.userLanguage)[1],
      data: {},
      isAuth: null,
      waiting: false,
      isAdmin: null,
    };
  }

  // const [gallery, setGallery] = React.useState("j");

  // const handleGallery = (gallery) => {
  //   console.log(gallery);
  //   this.setState({ gallery });
  // };

  // const [user, setUser] = React.useState("");

  handelSetUser = (e) => {
    // console.log("change user :", e);
    this.setState({ ...this.state, user: e });
  };

  // const { i18n } = useTranslation();
  // const [currentLang, setCurrentLang] = React.useState(i18n.language);
  /* change Language to i18n */
  handelLang = (lang) => {
    this.setState({ ...this.state, currentLang: lang });
  };

  // First thing, check if a refreshtoken exist
  // useEffect(() => {}, []);
  async getStream() {
    const allData = await getData();
    const res = Promise.resolve(allData);
    return res;
  }

  fetch = async () => {
    let headers = {
      "Content-Type": "application/json",
      authorization: `Bearer ${
        this.state.user !== ""
          ? this.state.user.accesstoken
          : localStorage.getItem("token")
      }`,
    };

    let headers2 = {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("token2")}`,
    };
    // const result = await axios.post(`${API_URL}/api/protected`, headers);
    // const result2 = await axios.post(
    //   `${API_URL}/api/dashboard/protected`,
    //   headers2
    // );
    // console.log("INSIDE FETCH", result.data);
    // if (result.data.data === true) {
    //   this.setState({ ...this.state, isAuth: true, waiting: true });
    //   return true;
    // }

    // if (result2.data.data === true) {
    //   this.setState({ ...this.state, isAdmin: true });
    //   return false;
    // }

    this.setState({ ...this.state, isAuth: false, isAdmin: false });
    return false;
  };

  componentDidMount() {
    // this.fetch();
    refreshToken();
    this.setState({ ...this.props, currentLang: this.props.i18n.language });
    const allData = this.getStream();
    allData.then((e) => {
      this.setState({ ...this.state, data: e });
    });
  }

  hideMenu = async () => {
    if (document.querySelector(".show") != null) {
      $(".navbar-collapse").removeClass("show");
      $(".navbar-collapse").removeClass("collapse");
      await $(".navbar-collapse").addClass("collapsing");
      $(".navbar-collapse").removeClass("collapsing");
      $(".navbar-collapse").addClass("collapse");

      $(".navbar-expand-lg button").addClass("collapsed");
    }
  };

  render() {
    // const result = getData().then((response) => {
    //   console.log(response.data.allData);
    //   return response.data.allData;
    // });
    // console.log("Result:", result);
    // const data = projects;
    // if (this.state.data == "") {
    //   this.getAllData();
    //   console.log(projects);
    // }
    // console.log(data);

    // const allDataDB = result.then((value) => {
    //   let data = value.data.allData;
    //   console.log("data:", data);
    //   arr.push({ data });
    //   return data;
    // });

    // console.log(data);

    const lang = this.state.currentLang === "ar" ? "ar" : "en";

    return (
      <div className={`main-div ${lang}`}>
        <AuthProvider>
          <Router>
            <div className="App">
              <Menu
                handelLang={this.handelLang}
                handelSetUser={this.handelSetUser}
                currentLang={this.state.currentLang}
                user={this.state.user}
              />
            </div>

            <div className="component bgImage" onClick={(e) => this.hideMenu()}>
              <Route
                exact
                path="/"
                render={(props) => (
                  <Home component={Home} currentLang={this.state.currentLang} />
                )}
              />

              <Route
                exact
                path="/Projects"
                render={(props) => (
                  <Projects
                    component={Projects}
                    projects={this.state.data}
                    currentLang={this.state.currentLang}
                  />
                )}
              />

              <Route exact path="/Services" component={Services} />

              <Route
                exact
                path="/Projects/:id"
                render={(props) => (
                  <EachProject
                    projects={this.state.data}
                    currentLang={this.state.currentLang}
                    {...props}
                  />
                )}
              />

              <Route
                exact
                path="/Projects/:id1/:id2"
                render={(props) => (
                  <Gallery
                    project={this.state.data}
                    currentLang={this.state.currentLang}
                    {...props}
                  />
                )}
              />

              {this.state.isAuth != null ? (
                <PrivateRoute
                  exact
                  path="/Messages"
                  isLogin={this.state.isAuth}
                  user={this.state.user}
                  redirectTo="/Login"
                  component={Messages}
                />
              ) : null}

              <Route
                exact
                path="/login"
                render={(props) => <Login handelSetUser={this.handelSetUser} />}
              />

              <Route
                exact
                path="/barcodes"
                render={(props) => (
                  <QRCode
                    project={this.state.data}
                    currentLang={this.state.currentLang}
                  />
                )}
              />

              {
                // dashborad side
              }

              <Route
                exact
                path="/dashboard/login"
                render={(props) => <AdminLogin />}
              />

              {this.state.isAdmin != null ? (
                <PrivateRoute
                  exact
                  path="/ControlPanel"
                  isLogin={this.state.isAdmin}
                  redirectTo="/dashboard/Login"
                  projects={this.state.data}
                  currentLang={this.state.currentLang}
                  component={dashboardHome}
                />
              ) : null}

              {this.state.isAdmin != null ? (
                <PrivateRoute
                  exact
                  path="/ControlPanel/:id"
                  isLogin={this.state.isAdmin}
                  redirectTo="/dashboard/Login"
                  projects={this.state.data}
                  currentLang={this.state.currentLang}
                  component={SingleProject}
                />
              ) : null}

              {/* <Redirect from="*" to="/" /> */}
            </div>
          </Router>
        </AuthProvider>
      </div>
    );
  }
}

export default withTranslation()(App);
