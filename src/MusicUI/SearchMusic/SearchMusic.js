import React from "react";
import classes from "./SearchMusic.module.css";
import { Component } from "react";
import spotify from "spotify-web-api-js";

import SearchList from "./SearchList";
import { connect } from "react-redux";
// import ReactPlayer from "react-player";
// import axios from "axios";

const spotifyApi = new spotify();

class SearchMusic extends Component {
  constructor() {
    super();
    this.state = {
      songList: [],
      searchFilter: "",
      params: this.getHashParams(),
    };
    const params = this.getHashParams();
    if (params.access_token) {
      spotifyApi.setAccessToken(params.access_token);
    }
  }

  getHashParams() {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    while ((e = r.exec(q))) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  getNowPlaying = async value => {
    try {
      await spotifyApi.getMyCurrentPlaybackState();

      const searchList = await spotifyApi.searchTracks(value, {
        limit: 45,
      });

      this.setState({ songList: searchList.tracks.items });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <div className={classes.wrapper}>
        <input
          type="search"
          placeholder="Type your Song"
          onChange={e => this.getNowPlaying(e.target.value)}
        />
        {this.state.songList.length > 0 ? (
          <SearchList list={this.state.songList} />
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.token,
  };
};
export default connect(mapStateToProps)(SearchMusic);
