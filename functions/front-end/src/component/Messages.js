import React, { Component } from "react";
import Message from "./Message";

import { deleteMessageByID, getAllMessage, API_URL } from "../api";

// import { useRedirect } from "hookrouter";

import axios from "axios";

export default class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      check: false,
      first: true,
      token:
        this.props.user !== ""
          ? this.props.user.accesstoken
          : localStorage.getItem("token"),
      user: "",
    };
  }
  getAllMessages = () => {
    getAllMessage()
      .then((response) => {
        this.setState({ data: response.data });
      })
      .catch((err) => {
        console.log("ERR: ", err);
      });
  };

  deleteAllMessages = () => {
    this.state.data.forEach((e) => {
      deleteMessageByID(e._id);
    });
  };

  funcSetMessages = (newMessages) => {
    this.setState({ data: newMessages });
  };

  // fetch = async () => {
  //   let headers = {
  //     "Content-Type": "application/json",
  //     authorization: `Bearer ${this.state.token}`,
  //   };
  //   const result = await axios.post(`${API_URL}/api/protected`, headers);

  //   if (result.data.data === true) {
  //     this.setState({ ...this.state, check: true, user: result.data.userName });
  //     return true;
  //   }
  //   return false;
  // };

  // checkRefreshToken = async () => {
  //   const result = refreshToken();
  // };
  // checkRefreshToken;

  componentDidMount() {
    // this.fetch();
    this.getAllMessages();
    // this.setState({ ...this.state, check: check });
  }

  // needToLogin = () => {
  //   // console.log("inside neet to login");
  //   return (
  //     <button
  //       className="goToLogin"
  //       onClick={(e) => {
  //         window.location.href = `/Login`;
  //       }}
  //     >
  //       go to login site
  //     </button>
  //   );
  // };

  render() {
    // const checkFetch = this.fetch();
    // console.log(checkFetch);
    // if (checkFetch == true) {
    //   console.log(checkFetch);
    //   this.changeCheck(true);
    // }
    // console.log(this.state.check);
    // console.log(check);
    // console.log(this.props);
    // console.log(Cookies.get());
    // if (localStorage.getItem("token") && this.state.first) {

    //   this.setState({ first: false });
    // }

    // await (
    //   await fetch("http://localhost:5000/api/protected", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       authorization: `Bearer ${localStorage.getItem("token")}`,
    //     },
    //   })
    // ).json();

    // console.log(result.data);
    // if (result.data) {
    //   this.changeCheck(true);
    // }
    // console.log(result);

    // const data = this.state.data;
    // const { check } = this.state;
    return (
      <div className="message-main-div">
        <div className="messages-div">
          {/* <h1>{this.state.user}</h1> */}
          {/* <button className="get-messages-button" onClick={this.getAllMessages}>
            اضغط لتحديث الرسائل
          </button> */}

          {/* <button
            className="delAll-messages-button"
            onClick={this.deleteAllMessages}
          >
            لحذف جميع الرسائل
          </button> */}

          {/* {this.state.data.length == 0 ? this.getAllMessages() : null}
            {this.state.data.length != 0 ? this.getAllMessages() : null} */}
          {/* <hr /> */}
          {/* <h3>All Messages</h3> */}
          <div className="messages">
            <Message
              allMessages={this.state.data}
              setMessages={this.funcSetMessages}
            />
          </div>
        </div>
      </div>
    );
  }
}
