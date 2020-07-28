import React from "react";
import ReactDOM from "react-dom";
import SeasonDisplay from "./Components/SeasonDisplay/SeasonDisplay/SeasonDisplay";
import Spinner from "./Components/Spinner/Spinner";

class App extends React.Component {
  state = {
    lat: null,
    errorMessage: "",
  };

  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
      (position) => this.setState({ lat: position.coords.latitude }),
      (err) => this.setState({ errorMessage: err.message })
    );
  }

  renderContent() {
    if (this.state.lat && !this.state.errorMessage) {
      return <SeasonDisplay lat={this.state.lat} />;
    }

    if (!this.state.lat && this.state.errorMessage) {
      return <div>{`Error: ${this.state.errorMessage}`}</div>;
    }

    return <Spinner message="Please accept location request." />;
  }

  render() {
    return <div>{this.renderContent()}</div>;
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
