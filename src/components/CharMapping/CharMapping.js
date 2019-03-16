import React, { Component } from "react";
import "./CharMapping.scss";

class CharMapping extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ""
    };
  }

  onChange = (prop, e) => {
    this.setState({ [prop]: e.target.value });
    this.props.onMappingChange(this.props.label, this.state.input.trim());
  };

  render() {
    return (
      <div className="map-container inline-block">
        <div className="map flex justify-between">
          <span className="w-1/2 text-center">{this.props.label + ":"}</span>
          <input
            className="w-1/2 text-center"
            value={this.input}
            onChange={e => this.onChange("input", e)}
            type="text"
            maxLength="1"
          />
        </div>
      </div>
    );
  }
}

export default CharMapping;
