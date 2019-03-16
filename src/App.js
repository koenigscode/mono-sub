import React, { Component } from "react";
import "./components/FrequencyChart/FrequencyChart.js";
import "./App.scss";
import FrequencyChart from "./components/FrequencyChart/FrequencyChart";
import CharMapping from "./components/CharMapping/CharMapping";
import gerFreq from "./data/frequency-german.json";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      srcText: "",
      tgtText: "",
      mapping: {}
    };
  }

  get srcFreq() {
    let freq = {};
    for (let c of this.chars) {
      let count = this.state.srcText.toUpperCase().split(c).length - 1;
      freq[c] = (count / this.state.srcText.length) * 100;
    }
    const ordered = {};
    Object.values(freq)
      .sort()
      .forEach(function(key) {
        ordered[key] = freq[key];
      });
    return freq;
  }

  get chars() {
    if (this.state.srcText.trim().length === 0) return [];
    let s = new Set();
    for (let c of this.state.srcText.split("")) {
      if (c.match(/^[0-9a-zA-Z]+$/))
        s.add(
          c in this.state.mapping
            ? this.state.mapping[c.toUpperCase()]
            : c.toUpperCase()
        );
    }
    return s;
  }

  get maxTick() {
    if (this.srcFreq !== undefined) {
      let maxVal = Math.max(
        ...Object.values(this.srcFreq),
        ...Object.values(gerFreq)
      );
      return 2 * Math.round(Math.ceil(maxVal) / 2);
    }
  }

  handleMappingChange(key, val) {
    this.state.mapping[key] = val;
    this.updateOutput();
  }

  updateOutput() {
    let s = "";
    for (let c of this.state.srcText) {
      if (c.toUpperCase() in this.state.mapping) {
        s += this.state.mapping[c.toUpperCase()];
      } else {
        s += c;
      }
    }
    this.setState({ tgtText: s });
  }

  loadExample() {
    this.setState({ srcText: "exampleText" });
  }

  onChange = (prop, e) => this.setState({ [prop]: e.target.value });

  render() {
    return (
      <div className="app h-full w-full">
        <div className="container-grid min-h-screen h-full">
          <textarea
            ref="area-src"
            value={this.state.srcText}
            placeholder="Erwarte Eingabe.."
            className="textarea h-full p-4"
            onChange={e => this.onChange("srcText", e)}
          />
          <textarea
            ref="area-tgt"
            value={this.state.tgtText}
            className="textarea h-full p-4"
            placeholder="Hier erscheint der Output.."
            onChange={e => this.onChange("tgtText", e)}
            maxtick={this.state.maxTick}
            disabled
          />
          <div className="mapping-container">
            {Array.from(this.chars)
              .sort()
              .map((c, i) => (
                <CharMapping
                  label={c}
                  key={i}
                  onMappingChange={this.handleMappingChange.bind(this)}
                />
              ))}
          </div>
          <FrequencyChart
            title="Durchschnittliche Buchstabenhäufigkeit in deutschen Texten"
            chartdata={gerFreq}
            maxtick={this.maxTick}
          />
          <FrequencyChart
            title="Zeichenhäufigkeit im eingegebenen Text"
            chartdata={this.srcFreq}
            maxtick={this.maxTick}
          />
        </div>
      </div>
    );
  }
}

export default App;
