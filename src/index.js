import React from "react";
import ReactDOM from "react-dom";
import "./assets/css/index.css";
import App from "./components/App";
import registerServiceWorker from "./registerServiceWorker";

// Use ReactDOM.render for React 16 compatibility
ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
