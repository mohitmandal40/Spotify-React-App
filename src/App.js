import React, { Component } from "react";
import MusicUI from "./MusicUI/MusicUI";
import SearchMusic from "./MusicUI/SearchMusic/SearchMusic";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import Login from "./Login/Login";
// import SearchList from "./MusicUI/SearchMusic/SearchList";

class App extends Component {
  render() {
    return (
      <div className="App">
        {this.props.token ? (
          <Route path="/search" component={SearchMusic} />
        ) : (
          <Route path="/login" render={() => <h2>plz login</h2>} />
        )}
        <Route path="/" exact component={MusicUI} />
        <Route path="/login" component={Login} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    login: state.login,
    token: state.token,
  };
};
// const mapDispatchToProps = state => {};

export default connect(mapStateToProps)(App);
