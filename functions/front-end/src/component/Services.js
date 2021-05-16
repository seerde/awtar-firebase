import React, { Component } from "react";
// import Alert from "react-bootstrap/Alert";
// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
// import firebase from "firebase/app";

// // Add the Firebase services that you want to use
// import "firebase/auth";
// import "firebase/firestore";
import { insertOneMessage, getEmailJsData } from "../api";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import swal from "sweetalert";

import { withTranslation } from "react-i18next";
import emailjs from "emailjs-com";
import ReCAPTCHA from "react-google-recaptcha";

class Services extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      mobile: "",
      location: "",
      text: "",
      notification: false,
      show: false,
      error_name: "",
      error_number: "",
      error_location: "",
      error_text: "",
      recaptcha: true,
      validated: false,
    };
  }

  handleNameChange = (e) => {
    this.setState({ name: e.target.value });
    // console.log(e.target.value);
  };

  handleEmailChange = (e) => {
    this.setState({ email: e.target.value });
    // console.log(e.target.value);
  };

  handleMobileChange = (e) => {
    this.setState({ mobile: e.target.value });
    // console.log(e.target.value);
  };

  handelLocationChange = (e) => {
    this.setState({ location: e.target.value });
    // console.log(e.target.value);
  };

  handleMessageChange = (e) => {
    this.setState({ text: e.target.value });
    // console.log(e.target.value);
  };

  insertToDB = () => {
    // console.log("The Message will be insert");
    let body = {
      name: this.state.name,
      email: this.state.email,
      mobileNumber: this.state.mobile,
      location: this.state.location,
      message: this.state.text,
    };
    // console.log(body);

    // insert to database by calling post method in fron-end
    insertOneMessage(body);
  };

  handleSubmit = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    e.preventDefault();
    this.setState({ ...this.state, validated: true });
    // console.log(this.state.text);
    // console.log(this.state.notification);
    // this.setState({ notification: true });
    // console.log(this.state.notification);

    const templateParams = {
      from_name: this.state.name,
      message: this.state.text,
      email: this.state.email,
      mobile: this.state.mobile,
      location: this.state.location,
    };

    // console.log(
    //   "Name:",
    //   this.state.name,
    //   "\nEmail:",
    //   this.state.email,
    //   "\nMobile:",
    //   this.state.mobile,
    //   "\nLocation:",
    //   this.state.location,
    //   "\nText:",
    //   this.state.text
    // );

    if (
      this.state.name !== "" &&
      this.state.mobile.length === 10 &&
      this.state.text !== ""
    ) {
      this.insertToDB();
      let userID = "";
      let serviceID = "";
      let templateID = "";
      getEmailJsData("services").then((res) => {
        userID = res.data.userID;
        serviceID = res.data.serviceID;
        templateID = res.data.templateID;
        emailjs.send(serviceID, templateID, templateParams, userID).then(
          (response) => {
            // console.log("SUCCESS!", response.status, response.text);
            swal("Good job!", "Message Sent", "success").then((ok) => {
              if (ok) {
                this.setState({
                  name: "",
                  email: "",
                  mobile: "",
                  location: "",
                  text: "",
                  notification: false,
                  show: false,
                  error_name: "",
                  error_number: "",
                  error_location: "",
                  error_text: "",
                  validated: false,
                });
                window.location.reload();
              }
            });
          },
          (error) => {
            console.log("FAILED...", error);
          }
        );
      });
    }
    /*
    else {
      let error_name = "";
      if (this.state.name === "") {
        console.log("name error");
        error_name += `${this.props.t("services-alert.name")}\n`;
      }
      console.log(this.state.mobile.length);
      if (this.state.mobile.length !== 10) {
        console.log("mobile error");
        error_name += `${this.props.t("services-alert.number")}\n`;
      }
      if (this.state.location === "" || this.state.location === "Choose...") {
        console.log("location error");
        error_name += `${this.props.t("services-alert.location")}\n`;
      }
      if (this.state.text === "") {
        console.log("text error");
        error_name += `${this.props.t("services-alert.message")}`;
      }
      this.setState({
        show: true,
        error_name,
      });
    }
    */
  };

  // handleNotification = (e) => {
  //   // console.log(this.state.notification);
  //   this.setState({ notification: false });
  //   // console.log(this.State.notification);
  // };

  // AlertDismissibleExample = () => {
  //   return (
  //     <Alert
  //       variant="danger"
  //       onClose={() => this.setState({ ...this.state, show: false })}
  //       dismissible
  //     >
  //       <Alert.Heading>{this.props.t("services-alert.error")}</Alert.Heading>
  //       <pre>{this.state.error_name}</pre>
  //     </Alert>
  //   );
  // };

  /*
  AlertDismissibleExample = () => {
    return (
      <Alert
        variant="danger"
        onClose={() => this.setState({ ...this.state, show: false })}
        dismissible
      >
        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
        <p>
          Change this and that and try again. Duis mollis, est non commodo
          luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
          Cras mattis consectetur purus sit amet fermentum.
        </p>
      </Alert>
    );
  };
*/

  render() {
    // var firebase = require("firebase/app");
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    // const firebaseConfig = {
    //   apiKey: "AIzaSyBFjrbf67sRZgnDR3nFwnbaTXWohWN96VE",
    //   authDomain: "awtar-a5059.firebaseapp.com",
    //   projectId: "awtar-a5059",
    //   storageBucket: "awtar-a5059.appspot.com",
    //   messagingSenderId: "919307705441",
    //   appId: "1:919307705441:web:9b17d79e0b18c5bf025e20",
    //   measurementId: "G-KNYFS6TJM2",
    // };
    // Initialize Firebase
    // firebase.initializeApp(firebaseConfig);

    // const successMessage = (
    //   <Alert key={0} variant={"success"}>
    //     This is a success alert—check it out!{" "}
    //     <button
    //       className="message-button"
    //       onClick={(e) => this.handleNotification(e)}
    //     >
    //       X
    //     </button>
    //   </Alert>
    // );

    return (
      <div className="service-header">
        {/* {this.state.show ? <this.AlertDismissibleExample /> : null} */}

        <div className="services-div bgImage">
          <Form
            noValidate
            validated={this.state.validated}
            className={`Form ${
              this.props.i18n.language === "ar" ? "service-ar" : "service-en"
            }`}
            onSubmit={(e) => this.handleSubmit(e)}
          >
            <Form.Group controlId="validationCustom01">
              <Form.Label className="textLabel">
                {this.props.t("services.input1")}
              </Form.Label>
              <Form.Control
                required
                // id="name"
                type="text"
                name="name"
                placeholder={this.props.t("services.place1")}
                onChange={(e) => this.handleNameChange(e)}
                value={this.state.name}
              />
            </Form.Group>
            <Form.Group controlId="validationCustom02">
              <Form.Label className="textLabel">
                {this.props.t("services.input2")}
              </Form.Label>
              <Form.Control
                required
                type="tel"
                name="phone"
                placeholder={this.props.t("services.place2")}
                onChange={(e) => this.handleMobileChange(e)}
                value={this.state.mobile}
              />
            </Form.Group>
            <Form.Group controlId="validationCustom03">
              <Form.Label className="textLabel">
                {this.props.t("services.input3")}
              </Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder={this.props.t("services.place3")}
                onChange={(e) => this.handleEmailChange(e)}
                value={this.state.email}
              />
            </Form.Group>
            <Form.Group controlId="validationCustom04">
              <Form.Label className="textLabel">
                {this.props.t("services.input4")}
              </Form.Label>
              <Form.Control
                required
                as="select"
                onChange={(e) => this.handelLocationChange(e)}
                value={this.state.location}
                dir={`${this.props.i18n.language === "ar" ? "rtl" : "ltr"}`}
              >
                <option>{this.props.t("services.place4")}</option>
                <option>{this.props.t("services.locations.1")}</option>
                <option>{this.props.t("services.locations.2")}</option>
                <option>{this.props.t("services.locations.3")}</option>
                <option>{this.props.t("services.locations.4")}</option>
                <option>{this.props.t("services.locations.5")}</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlTextarea1 validationCustom05">
              <Form.Label className="textLabel">
                {this.props.t("services.input5")}
              </Form.Label>
              <Form.Control
                required
                as="textarea"
                rows={7}
                onChange={(e) => this.handleMessageChange(e)}
                value={this.state.text}
              />
            </Form.Group>
            {this.state.recaptcha ? (
              <Button className="send-button" variant="primary" type="submit">
                {this.props.t("services.btn")}
              </Button>
            ) : (
              <ReCAPTCHA
                sitekey="6LemhKcaAAAAALwIj1RYYUYt1qHBXvUD7jvJeZgZ"
                onChange={(e) =>
                  this.setState({ ...this.state, recaptcha: true })
                }
              />
            )}
          </Form>
        </div>
      </div>
    );
  }
}

export default withTranslation()(Services);
