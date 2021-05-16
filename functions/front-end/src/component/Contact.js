import React from "react";
import { IoLogoWhatsapp } from "react-icons/io";
import { AiFillInstagram } from "react-icons/ai";
import { MdLocationOn } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import { IoLogoTwitter } from "react-icons/io";

import "./ContactUs.css";
import AOS from "aos";
import { useTranslation } from "react-i18next";

import emailjs from "emailjs-com";
import swal from "sweetalert";
import ReCAPTCHA from "react-google-recaptcha";
import { getEmailJsData } from "../api";

export default function Contact(props) {
  // export default class Contact extends Component {
  //   constructor() {
  //     super();
  //     this.state = {
  //       name: "",
  //       email: "",
  //       mobileNumber: "",
  //       message: "",
  //       nameFocus: false,
  //       emailFocus: false,
  //       phoneFocus: false,
  //       messageFocus: false,
  //     };
  //   }

  AOS.init();

  const { t, i18n } = useTranslation();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [mobileNumber, setMobileNumber] = React.useState("");
  const [message, setMessage] = React.useState("");

  const [nameFocus, setNameFocusState] = React.useState(false);
  const [emailFocus, setEmailFocusState] = React.useState(false);
  const [phoneFocus, setPhoneFocusState] = React.useState(false);
  const [messageFocus, setMessageFocusState] = React.useState(false);
  const [recaptcha, setReacptcha] = React.useState(true);
  const currentLang = i18n.language;

  const setNameFocus = (e) => {
    if (e === true) {
      let nameFocus = e;
      setNameFocusState(nameFocus);
    }
    if (e !== true && e.target.value === "") {
      let nameFocus = false;
      setNameFocusState(nameFocus);
    }
  };

  const setEmailFocus = (e) => {
    if (e === true) {
      let emailFocus = e;
      setEmailFocusState(emailFocus);
    }
    if (e !== true && e.target.value === "") {
      let emailFocus = false;
      setEmailFocusState(emailFocus);
    }
  };

  const setPhoneFocus = (e) => {
    if (e === true) {
      let phoneFocus = e;
      setPhoneFocusState(phoneFocus);
    }
    if (e !== true && e.target.value === "") {
      let phoneFocus = false;
      setPhoneFocusState(phoneFocus);
    }
  };

  const setMessageFocus = (e) => {
    if (e === true) {
      let messageFocus = e;
      setMessageFocusState(messageFocus);
    }
    if (e !== true && e.target.value === "") {
      let messageFocus = false;
      setMessageFocusState(messageFocus);
    }
  };

  const onEmailChange = (e) => {
    setEmail(e.target.value);
    // this.setState({ ...this.state, email: e.target.value });
  };

  const onNameChange = (e) => {
    setName(e.target.value);
    // this.setState({ ...this.state, name: e.target.value });
  };

  const onMobileNumberChange = (e) => {
    setMobileNumber(e.target.value);
    // this.setState({ ...this.state, mobileNumber: e.target.value });
  };

  const onMsgtChange = (e) => {
    setMessage(e.target.value);
    // this.setState({ ...this.state, message: e.target.value });
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    // console.log("Name:", name);
    // console.log("Email:", email);
    // console.log("Mobile Number:", mobileNumber);
    // console.log("Message:", message);

    const templateParams = {
      from_name: name,
      message: message,
      email: email,
      mobile: mobileNumber,
    };

    let userID = "";
    let serviceID = "";
    let templateID = "";

    getEmailJsData("contact")
      .then((res) => {
        userID = res.data.userID;
        serviceID = res.data.serviceID;
        templateID = res.data.templateID;
        emailjs.send(serviceID, templateID, templateParams, userID).then(
          (response) => {
            // console.log("SUCCESS!", response.status, response.text);
            swal("Good job!", "Message Sent", "success").then((ok) => {
              if (ok) {
                setName("");
                setEmail("");
                setMobileNumber("");
                setMessage("");
              }
            });
          },
          (error) => {
            console.log("FAILED...", error);
          }
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // render() {
  return (
    <div className="inside-contact">
      {/* <h5>Contact</h5> */}
      {/* <p>
            Contrary to popular belief, Lorem Ipsum is not simply random text.
          </p> */}

      <div className="contact-container ">
        {/* <form id="contact-form">
                      <div className="form-group">
                        <div className="row">
                          <input
                            placeholder="Name"
                            id="name"
                            type="text"
                            className="form-control"
                            required
                            value={this.state.name}
                            onChange={(e) => this.onNameChange(e)}
                          ></input>

                          <input
                            placeholder="Email"
                            id="email"
                            type="email"
                            className="form-control"
                            aria-describedby="emailHelp"
                            required
                            value={this.state.email}
                            onChange={(e) => this.onEmailChange(e)}
                          ></input>

                          <input
                            placeholder="Subject"
                            id="subject"
                            type="Text"
                            className="form-control"
                            required
                            value={this.state.subject}
                            onChange={(e) => this.onSubjectChange(e)}
                          ></input>

                          <input
                            placeholder="Message"
                            id="message"
                            className="form-control"
                            rows="1"
                            required
                            value={this.state.message}
                            onChange={(e) => this.onMsgtChange(e)}
                          ></input>
                        </div>
                      </div>
                      <hr />
                      <button type="submit" className="primary-btn submit">
                        Submit
                      </button>
                    </form> */}

        <div className="cotactus bColor" data-aos="zoom-in">
          <form
            action="index.html"
            autoComplete="off"
            onSubmit={(e) => handelSubmit(e)}
          >
            <h3 className="title">{t("contactus.formHeader")}</h3>
            <div
              className={
                nameFocus ? "input-container focus" : "input-container"
              }
            >
              <input
                required
                type="text"
                name="name"
                className="input"
                value={name}
                onChange={(e) => onNameChange(e)}
                onFocus={() => {
                  setNameFocus(true);
                }}
                onBlur={(e) => {
                  setNameFocus(e);
                }}
                dir={currentLang === "ar" ? "rtl" : "ltr"}
              />
              <label
                htmlFor=""
                className={currentLang === "ar" ? "label-ar" : "label-en"}
              >
                {t("contactus.input1")}
              </label>
              <span className={currentLang === "ar" ? "span-ar" : "span-en"}>
                {t("contactus.input1")}
              </span>
            </div>
            <div
              className={
                emailFocus ? "input-container focus" : "input-container"
              }
            >
              <input
                type="email"
                name="email"
                className="input"
                value={email}
                onChange={(e) => onEmailChange(e)}
                onFocus={() => {
                  setEmailFocus(true);
                }}
                onBlur={(e) => {
                  setEmailFocus(e);
                }}
                dir={currentLang === "ar" ? "rtl" : "ltr"}
              />
              <label
                htmlFor=""
                className={currentLang === "ar" ? "label-ar" : "label-en"}
              >
                {t("contactus.input2")}
              </label>
              <span className={currentLang === "ar" ? "span-ar" : "span-en"}>
                {t("contactus.input2")}
              </span>
            </div>
            <div
              className={
                phoneFocus ? "input-container focus" : "input-container"
              }
            >
              <input
                required
                type="tel"
                name="phone"
                className="input"
                value={mobileNumber}
                onChange={(e) => onMobileNumberChange(e)}
                onFocus={() => {
                  setPhoneFocus(true);
                }}
                onBlur={(e) => {
                  setPhoneFocus(e);
                }}
                dir={currentLang === "ar" ? "rtl" : "ltr"}
              />
              <label
                htmlFor=""
                className={currentLang === "ar" ? "label-ar" : "label-en"}
              >
                {t("contactus.input3")}
              </label>
              <span className={currentLang === "ar" ? "span-ar" : "span-en"}>
                {t("contactus.input3")}
              </span>
            </div>
            <div
              className={
                messageFocus ? "input-container focus" : "input-container"
              }
            >
              <textarea
                required
                name="message"
                className="input"
                value={message}
                onChange={(e) => onMsgtChange(e)}
                onFocus={() => {
                  setMessageFocus(true);
                }}
                onBlur={(e) => {
                  setMessageFocus(e);
                }}
                dir={currentLang === "ar" ? "rtl" : "ltr"}
              ></textarea>
              <label
                htmlFor=""
                className={currentLang === "ar" ? "label-ar" : "label-en"}
              >
                {t("contactus.input4")}
              </label>
              <span className={currentLang === "ar" ? "span-ar" : "span-en"}>
                {t("contactus.input4")}
              </span>
            </div>
            {recaptcha ? (
              <div className="btnSend">
                <button type="submit" className="btn">
                  {t("contactus.btn")}
                </button>
              </div>
            ) : (
              <ReCAPTCHA
                sitekey="6LemhKcaAAAAALwIj1RYYUYt1qHBXvUD7jvJeZgZ"
                onChange={(e) => setReacptcha(true)}
              />
            )}
          </form>
        </div>

        <div className="contact-logo"></div>
      </div>

      <div className="contact-footer">
        <div className="contact-icons">
          <a
            href="https://api.whatsapp.com/send/?phone=9660544538584&text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%20%D8%AD%D8%A7%D8%A8%20%D8%A7%D8%B9%D8%B1%D9%81%20%D8%B9%D9%86%20%D8%A7%D9%84%D8%B9%D9%82%D8%A7%D8%B1%D8%A7%D8%AA%20%D8%A7%D9%84%D9%85%D9%88%D8%AC%D9%88%D8%AF%D8%A9%20%D8%B9%D9%86%D8%AF%D9%83%D9%85%20%D9%81%D9%8A%20%D8%AC%D8%AF%D8%A9"
            target="_blank"
            rel="noreferrer"
          >
            {" "}
            <IoLogoWhatsapp className="icon" />
          </a>

          <a
            href="https://www.instagram.com/awtar_int/"
            target="_blank"
            rel="noreferrer"
          >
            <AiFillInstagram className="icon" />
          </a>

          <a
            href="https://www.google.com/maps/place/%D8%B4%D8%B1%D9%83%D8%A9+%D8%A7%D9%88%D8%AA%D8%A7%D8%B1+%D8%A7%D9%84%D8%B9%D9%82%D8%A7%D8%B1%D9%8A%D9%87%E2%80%AD/@21.5592089,39.208277,15.53z/data=!4m8!1m2!2m1!1z2KfZiNiq2KfYsQ!3m4!1s0x0:0x457c93ee66322be!8m2!3d21.5635264!4d39.2023623"
            target="_blank"
            rel="noreferrer"
          >
            <MdLocationOn className="icon" />
          </a>

          <a
            href="mailto:almuflehy.abdulaziz@gmail.com"
            target="_blank"
            rel="noreferrer"
          >
            <MdEmail className="icon" />
          </a>

          <a
            href="https://twitter.com/AWTAR_Int"
            target="_blank"
            rel="noreferrer"
          >
            <IoLogoTwitter className="icon" />
          </a>
        </div>
        <div className="copyright-div">
          <p className="copyright">Copyright © 2021 Awtar</p>
          <h5>
            Developed and Designed by{" "}
            <a href="mailto:almuflehy.abdulaziz@gmail.com">
              almuflehi.abdulaziz@gmail.com
            </a>
          </h5>
        </div>
      </div>
    </div>
  );
}
// }
