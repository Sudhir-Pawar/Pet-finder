import React, { Component } from "react";
import { Link, Redirect } from "@reach/router";

class ErrorBoundry extends Component {
  state = { hasError: false, redirect: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    console.log("error boundry caught an error: ", error, info);
  }

  componentDidUpdate() {
    if (this.state.hasError) {
      setTimeout(() => this.setState({ redirect: true }), 5000);
    }
  }
  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    if (this.state.hasError) {
      return (
        <h1>
          There was an error with this listing <Link to="/">Click here</Link>
          to go back to home page or wait for 5 seconds
        </h1>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundry;
