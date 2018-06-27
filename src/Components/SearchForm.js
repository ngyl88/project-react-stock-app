import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel, HelpBlock } from "react-bootstrap";

class SearchForm extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      value: "",
      submittedValue: "",
      validationState: null
    };
  }

  handleChange = event => {
    const inputText = event.target.value;
    this.setState({
      value: inputText,
      validationState: this.props.validateInput(inputText)
    });
  };

  handleKeyPress = event => {
    if (event.charCode === 13) {
      if (this.state.validationState === "success") this.processSubmission();
      event.preventDefault();
    }
  };

  processSubmission() {
    this.setState({
      submittedValue: this.state.value,
      value: "",
      validationState: null
    });
    this.props.handleSubmitValue(this.state.value);
  }

  render() {
    return (
      <div className="searchDiv">
        <form>
          <FormGroup
            controlId={this.props.controlId}
            validationState={this.state.validationState}
          >
            <ControlLabel>{this.props.inputLabel}</ControlLabel>
            <FormControl
              type="text"
              value={this.state.value}
              placeholder={this.props.placeholder}
              onKeyPress={this.handleKeyPress}
              onChange={this.handleChange}
            />
            <FormControl.Feedback />
            <HelpBlock>{this.props.helpMessage}</HelpBlock>
          </FormGroup>
        </form>
      </div>
    );
  }
}

export default SearchForm;
