import React, { Component } from "react";
import "./CharMapping.scss";

class CharMapping extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: ""
        };
    }

    /**
     * Update character mapping
     */
    onChange(prop, e) {
        this.setState({ [prop]: e.target.value }, () => {
            let val = this.state.input.trim() === "" ? null : this.state.input;
            this.props.onMappingChange(this.props.label, val);
        });
    }

    /**
     * Set mapping to null if character is no longer in source text
     */
    componentWillUnmount() {
        this.props.onMappingChange(this.props.label, null);
    }

    render() {
        return (
            <div className="map-container relative inline-block">
                <div className="map-wrapper">
                    <div className="map flex justify-between">
                        <label className="label w-1/2 text-center"
                            for={"input-" + this.props.label}>
                            {this.props.label + ":"}
                        </label>
                        <input
                            id={"input-" + this.props.label}
                            className="w-1/2 text-center"
                            value={this.input}
                            onChange={e => this.onChange("input", e)}
                            type="text"
                            maxLength="1"
                        />
                        {this.state.input.trim() !== "" && (
                            <span className="tickmark">&#10004;</span>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default CharMapping;
