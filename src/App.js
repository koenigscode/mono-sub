import React, { Component } from "react";
import "./App.scss";

class App extends Component {
  render() {
    return (
      <div className="app h-full w-full">
        <div className="container-grid min-h-screen h-full">
          <textarea />
          <textarea />
          <div className="mapping-container" />
        </div>
      </div>
    );
  }
}

export default App;
