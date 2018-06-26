import React, { Component } from "react";
import logo from "../logo.svg";
import "../App.css";

class Loading extends Component {
    render() {
        return (
          <div className="loading-container">
            <img src={logo} className="React-logo" alt="logo" />
            <h1 className="loading-message">{this.props.message}</h1>
          </div>
        );
    }
} 

export default Loading;
