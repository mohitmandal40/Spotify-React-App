import React, { Component } from "react";
import MusicUI from "./MusicUI/MusicUI";
import SearchMusic from "./MusicUI/SearchMusic/SearchMusic";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import Login from "./Login/Login";
// import SearchList from "./MusicUI/SearchMusic/SearchList";

class App extends Component {
  render() {
    console.log(this.props.login);
    return (
      <div className="App">
        <Switch>
          <Route path="/search" component={SearchMusic} />
          <Route path="/login" component={Login} />
          <Route path="/" component={MusicUI} />
        </Switch>
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
