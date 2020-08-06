import React from "react";
import classes from "./SearchMusic.module.css";
import { Component } from "react";
import spotify from "spotify-web-api-js";

import SearchList from "./SearchList";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
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
      const res = await spotifyApi.getMyCurrentPlaybackState();
      // console.log(res.item.name, res.item.album.images[0].url);
      console.log(res);
      const play = ({
        spotify_uri,
        playerInstance: {
          _options: { getOAuthToken, id },
        },
      }) => {
        getOAuthToken(access_token => {
          fetch(`https://api.spotify.com/v1/me/player/play?device_id=${id}`, {
            method: "PUT",
            body: JSON.stringify({ uris: [spotify_uri] }),
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${access_token}`,
            },
          })
            .then(res => res.json())
            .then(res => console.log(res));
        });
      };
      // const token = spotifyApi.getAccessToken();
      // fetch("https://api.spotify.com/v1/me/player/play", {
      //   method: "PUT",
      //   body: JSON.stringify({ uris: ["75lo8VozcCLRG9WGG674iD"] }),
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: `Bearer ${token}`,
      //   },
      // });
      // const oldPlaying = [...this.state.nowPlaying];
      // const currentSongDetail = [];
      // currentSongDetail.push({
      //   name: res.item.name,
      //   image: res.item.album.images[0].url,
      // });
      // this.setState({ nowPlaying: currentSongDetail });
      // const res2 = await spotifyApi.search("girls like you", ["track"]);
      const searchList = await spotifyApi.searchTracks(value, {
        limit: 9,
      });

      this.setState({ songList: searchList.tracks.items });
      console.log(searchList.tracks.items);
      // const play = await spotifyApi.getTrack("2Fxmhks0bxGSBdJ92vM42m");
      // console.log(play);
      // const play = await spotifyApi.play();
      // const pause = await spotifyApi.pause();
      // "a87cc6e2be7033e069aa2f0ab8847abc90a7ac3d"
      // console.log(play);
      // console.log(searchList.tracks.items);
      // this.setState({ songList: searchList.tracks.items });
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
        <button onClick={this.getNowPlaying}>check current song</button>
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

// filterHandler = e => {
//   const fakeSong = [...this.state.song];
//   if (e.length === 0) {
//     this.setState({ song: fakeSong });
//     console.log(this.state.song);
//   } else {
//     const filtered = fakeSong.filter(val => {
//       return val ? e === val.alt : null;
//     });
//     this.setState({ song: filtered });
//     console.log(this.state.song);
//   }

//   // e.preventDefault();
//   // setTimeout(() => {
//   //   console.log(ev.target.value);
//   // }, 3000);
// };

// spotifyWebApi.Constr.prototype.play = function (options, callback) {
//   options = options || {};
//   var params =
//     "device_id" in options ? { device_id: options.device_id } : null;
//   var postData = {};
//   ["context_uri", "uris", "offset", "position_ms"].forEach(function (
//     field
//   ) {
//     if (field in options) {
//       postData[field] = options[field];
//     }
//   });
//   var requestData = {
//     type: "PUT",
//     url: _baseUri + "/me/player/play",
//     params: params,
//     postData: postData,
//   };

//   // need to clear options so it doesn't add all of them to the query params
//   var newOptions = typeof options === "function" ? options : {};
//   return _checkParamsAndPerformRequest(requestData, newOptions, callback);
// };

// state = {
//   song: [
//     {
//       src:
//         "https://image.shutterstock.com/image-photo/butterfly-grass-on-meadow-night-260nw-1111729556.jpg",
//       alt: "Avatar",
//       name: "John Doe",
//       desc: "Architect Engineer",
//     },
//     {
//       src:
//         "https://image.shutterstock.com/image-photo/butterfly-grass-on-meadow-night-260nw-1111729556.jpg",
//       alt: "random",
//       name: "Mohit",
//       desc: "Architect Engineer",
//     },
//     {
//       src:
//         "https://image.shutterstock.com/image-photo/butterfly-grass-on-meadow-night-260nw-1111729556.jpg",
//       alt: "some",
//       name: "Psycho",
//       desc: "Architect Engineer",
//     },
//   ],
