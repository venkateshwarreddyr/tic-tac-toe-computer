import React, { Component } from "react";
import { Navbar, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./styles.css";
class NavigationBar extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <Navbar bg="light" variant="light" className="navbar-class">
          <Navbar.Brand href="#home">
            <Link to="/">
              <h1>CodeTheHead.</h1>
            </Link>
          </Navbar.Brand>
        </Navbar>
      </React.Fragment>
    );
  }
}

export default NavigationBar;
