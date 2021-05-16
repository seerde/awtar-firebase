import React from "react";
import Alert from "react-bootstrap/Alert";
import Cookies from "js-cookie";
import { adminsignIn, refreshToken } from "../../api";
import $ from "jquery";
import app from "../../base.js";

function Login() {
  const [adminName, setAdminName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [show, setShow] = React.useState(false);
  const [showPass, setShowPass] = React.useState(false);

  $(".custom-control-input").click((e) => {
    setShowPass(!showPass);
  });

  const handelAdminNameChange = (e) => {
    // this.setState({ userName: e.target.value });
    setAdminName(e.target.value);
  };

  const handelPassword = (e) => {
    // this.setState({ password: e.target.value });
    setPassword(e.target.value);
  };

  const handelSingIn = async (e) => {
    e.preventDefault();
    // get data from database by calling get method in fron-end
    // adminsignIn(adminName, password)
    //   .then((response) => {
    //     // console.log("res: ", response);
    //     if (response.data.accesstoken) {
    //       console.log("loged in successfully");
    //       localStorage.setItem("token2", response.data.accesstoken);

    //       // console.log("BEFOR CHANGE ROUTE");
    //       window.location.href = `/ControlPanel`;
    //       // history.push("/Messages");
    //       // this.setState({ loginSuccess: true });
    //     } else {
    //       setShow(true);
    //     }
    //   })
    //   .catch((err) => {
    //     console.log("admin name or password are incorrect", err);
    //   });

    try {
      await app.auth().signInWithEmailAndPassword(adminName, password);

      app.auth().onAuthStateChanged((user) => {
        if (user && user.uid === "w2CfurYS5ShWrjhJEQM1aU3F69J3") {
          window.location.href = `/ControlPanel`;
        } else {
          app.auth().signOut();
          setShow(true);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const AlertDismissibleExample = () => {
    return (
      <Alert variant="danger" onClose={() => setShow(false)} dismissible>
        <Alert.Heading>Something is wrong</Alert.Heading>
        <pre>User Name and/or Password are incorrect</pre>
      </Alert>
    );
  };

  /*
  fetch ("http://localhost:4000/refresh_token", {
        method: "POST",
        credentials: "include", // Needed to include the cookie
        headers: {
          "Content-Type": "application/json",
        },
      })

  */

  // render() {
  // First thing, check if a refreshtoken exist
  async function checkRefreshToken() {
    refreshToken();
  }
  checkRefreshToken();

  // console.log(Cookies);
  return (
    <div className="Login-main">
      {Cookies.get("name") ? (
        (window.location.href = `/Messages`)
      ) : show ? (
        <AlertDismissibleExample />
      ) : null}
      <form>
        <h3>Log in</h3>

        <div className="form-group">
          <label>User Name</label>
          <input
            type="name"
            className="form-control"
            placeholder="Enter user name"
            onChange={(e) => handelAdminNameChange(e)}
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type={`${showPass ? "name" : "password"}`}
            className="form-control"
            placeholder="Enter password"
            onChange={(e) => handelPassword(e)}
            required
          />
        </div>

        <div className="form-group">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            <label className="custom-control-label" htmlFor="customCheck1">
              show password
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-dark btn-lg btn-block"
          onClick={(e) => handelSingIn(e)}
        >
          Sign in
        </button>
        {/* <p className="forgot-password text-right">
          Forgot <a href="">password?</a>
        </p> */}
      </form>
    </div>
  );
}
// }

export default Login;
