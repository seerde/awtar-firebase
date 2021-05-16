import React, { Component } from "react";
import { BsTrash } from "react-icons/bs";
import { BsPerson } from "react-icons/bs";
import { RiBuilding4Line } from "react-icons/ri";
import { BiPhone } from "react-icons/bi";
import { AiOutlineMail } from "react-icons/ai";
import { RiTimeLine } from "react-icons/ri";
import { MdDateRange } from "react-icons/md";
import { BiMessageSquareDetail } from "react-icons/bi";

export default class Content extends Component {
  deleteMessage = (event) => {
    event.preventDefault();
    this.props.deleteMessage(this.props.id);
  };

  render() {
    const publishedOn = new Date(this.props.publishedOn.seconds);
    const options = {
      // weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    const am_pm = publishedOn.getHours() > 12 ? "PM" : "AM";

    const hours =
      publishedOn.getHours() > 12
        ? publishedOn.getHours() % 12
        : publishedOn.getHours();
    const minutes =
      publishedOn.getMinutes() > 10
        ? publishedOn.getMinutes()
        : `0${publishedOn.getMinutes()}`;

    return (
      <div className="message">
        {/* Title & Content & Author */}
        <p>
          <BsPerson /> {this.props.name}
        </p>
        {this.props.email !== "" ? (
          <p>
            <AiOutlineMail /> {this.props.email}
          </p>
        ) : null}
        <p>
          <BiPhone /> {this.props.mobile}
        </p>
        <p>
          <RiBuilding4Line /> {this.props.location}
        </p>
        <p>
          <BiMessageSquareDetail /> {this.props.message}
        </p>
        <p>
          <MdDateRange />
          En {publishedOn.toLocaleDateString(undefined, options)}
        </p>
        <p>
          <MdDateRange />
          Ar {publishedOn.toLocaleDateString("ar-EG", options)}
        </p>
        <p>
          <RiTimeLine /> {hours + ":" + minutes + " " + am_pm}
        </p>

        <div className="DeleteButton">
          <p className="delete-herf" onClick={(e) => this.deleteMessage(e)}>
            Delete <BsTrash />
          </p>
        </div>
      </div>
    );
  }
}
