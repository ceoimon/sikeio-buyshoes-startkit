const React = require("react");
const ReactDOM = require("react-dom");
const App = require("./components/App");

// When the window is loaded, render the App component.
window.onload = () => {
  ReactDOM.render(<App/>,document.getElementById("root"));
}