import React, { Component } from "react";
import "./App.scss";
import FrequencyChart from "./components/FrequencyChart/FrequencyChart";
import CharMapping from "./components/CharMapping/CharMapping";
import gerFreq from "./data/frequency-german.json";
// eslint-disable-next-line import/no-webpack-loader-syntax
import exampleText from "!!raw-loader!./data/esel.txt";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            srcText: "",
            tgtText: "",
            mapping: {}
        };
    }

    /**
     * Format the target text
     * Highlights changed words
     */
    get formattedTgtText() {
        let items = [];

        for (let [i, c] of this.state.srcText.split("").entries()) {
            if (c === "\n") {
                items.push(<br key={i} />);
            } else if (
                c.toUpperCase() in this.state.mapping &&
                this.state.mapping[c.toUpperCase()] != null
            ) {
                items.push(
                    <span key={i} className="highlighted">
                        {this.state.mapping[c.toUpperCase()]}
                    </span>
                );
            } else {
                items.push(c);
            }
        }

        if (items.length > 0) {
            return items;
        } else {
            return <span className="placeholder">Hier erscheint die Ausgabe..</span>;
        }
    }

    /**
     * Analyse frequency of characters in source text
     */
    get srcFreq() {
        let freq = {}; // frequency of each character in the source text

        for (let c of this.chars) {
            let count = this.state.srcText.toUpperCase().split(c).length - 1;
            freq[c] = (count / this.state.srcText.length) * 100;
        }

        const ordered = {};
        Object.values(freq)
            .sort()
            .forEach(function (key) {
                ordered[key] = freq[key];
            });
        return freq;
    }

    /**
     * Filter characters in source text and return them
     */
    get chars() {
        if (this.state.srcText.trim().length === 0) return []; // empty text

        let s = new Set();
        for (let c of this.state.srcText.split("")) {
            if (c.match(/^[0-9a-zA-Z]+$/)) s.add(c.toUpperCase());
        }
        return s;
    }

    /**
     * Calculate max y-tick for frequency chart
     */
    get maxTick() {
        if (this.srcFreq !== undefined) {
            let maxVal = Math.max(
                ...Object.values(this.srcFreq),
                ...Object.values(gerFreq)
            );
            return 2 * Math.round(Math.ceil(maxVal) / 2);
        }
        return Math.max(Object.values(gerFreq));
    }

    /**
     * set key in state to val
     */
    handleMappingChange(key, val) {
        this.setState({ mapping: { ...this.state.mapping, [key]: val } });
    }

    /**
     * load example text
     */
    loadExample() {
        this.setState({ srcText: exampleText });
    }

    componentDidMount() {
        this.loadExample();
    }

    onChange = (prop, e, callback) => {
        // set state source text value to current input
        this.setState({ [prop]: e.target.value }, callback);
    };

    render() {
        return (
            <div className="app h-full w-full">
                <div className="container-grid min-h-screen h-full">
                    <textarea
                        value={this.state.srcText}
                        placeholder="Erwarte Eingabe.."
                        className="textarea h-full p-4"
                        onChange={e => {
                            this.onChange("srcText", e);
                        }}
                    />
                    <div className="textarea textarea-output text-left h-full p-4">
                        {this.formattedTgtText}
                    </div>
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
                    {this.state.srcText.trim() !== "" && (
                        <FrequencyChart
                            title="Zeichenhäufigkeit im eingegebenen Text"
                            chartdata={this.srcFreq}
                            maxtick={this.maxTick}
                        />
                    )}
                    <FrequencyChart
                        title="Durchschnittliche Buchstabenhäufigkeit in deutschen Texten"
                        chartdata={gerFreq}
                        maxtick={this.maxTick}
                    />
                </div>
            </div>
        );
    }
}

export default App;
