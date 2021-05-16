import React, { Component } from "react";
import Content from "./Content";
import { deleteMessageByID } from "../api";

export default class Message extends Component {
  deleteMessage = (id) => {
    deleteMessageByID(id);
    const newMessageList = this.props.allMessages.filter((message) => {
      return message._id !== id;
    });

    this.props.setMessages(newMessageList);
  };

  render() {
    const allMessages = this.props.allMessages.map((message, index) => {
      return (
        <Content
          name={message.name}
          email={message.email}
          mobile={message.mobileNumber}
          location={message.location}
          message={message.message}
          publishedOn={message.publishedOn}
          deleteMessage={this.deleteMessage}
          key={index}
          id={message._id}
        />
      );
    });

    let showMessages =
      this.props.allMessages !== "" ? allMessages : <h4>لايوجد رسائل</h4>;
    return showMessages;
  }
}
