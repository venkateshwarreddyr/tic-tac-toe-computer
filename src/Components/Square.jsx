import React, { Component } from "react";
import "./styles.css";
import { Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle
} from "@fortawesome/free-solid-svg-icons";

class Square extends Component {
  state = { isHover: false, checked: false, firstPlayer: undefined };

  componentWillReceiveProps(props) {
    // const { checked } = this.state;
    console.log("reset:", props.reset, props.id);
    if (props.reset == -1) {
      this.setState({ isHover: false, checked: false, firstPlayer: undefined });
    } else if (props.reset == 1) {
      this.setState({ isHover: false, checked: true, firstPlayer: true });
    } else if (props.reset == 0) {
      this.setState({ isHover: false, checked: true, firstPlayer: false });
    }
  }
  makeHoverTrue = () => {
    // console.log("enter");
    this.setState({ isHover: true });
  };
  makeHoverFalse = () => {
    // console.log("enter");
    this.setState({ isHover: false });
  };
  changeClass = () => {
    // console.log("this.props: ", this.props);
    if (this.props.setBoxes(this.props.id)) {
      // const checked = true;
      // console.log("before: ", this.state);
      this.setState({ checked: true, firstPlayer: this.props.firstPlayer });

      // console.log("before: ", this.state);
      // const isHover = undefined;
    }
    // this.props.compute();
  };
  render() {
    // console.log(this.props);
    const x = <FontAwesomeIcon icon={faCheckCircle} size="3x" color="white" />;
    const o = <FontAwesomeIcon icon={faTimesCircle} size="3x" color="white" />;

    const { checked, firstPlayer, isHover } = this.state;

    var classes = checked
      ? firstPlayer
        ? "checked firstPlayer "
        : "checked secondPlayer "
      : " ";
    // classes += firstPlayer ? "firstPlayer " : "secondPlayer ";
    classes += isHover ? "color-hover " : "color ";
    // console.log("classes: ", classes);
    return (
      <Col
        xs={3}
        md={3}
        sm={3}
        onClick={this.changeClass}
        onMouseEnter={this.makeHoverTrue}
        onMouseLeave={this.makeHoverFalse}
        className={classes}
      >
        <span className={checked ? "icon" : "no-icon"}>
          {checked ? (firstPlayer ? o : x) : null}
        </span>
      </Col>
    );
    //   hello
    // </Col>;
  }
}

export default Square;
