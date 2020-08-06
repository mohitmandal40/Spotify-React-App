import React, { Component } from "react";
import classes from "./MusicUI.module.css";
import axios from "axios";
import * as actionTypes from "../store/action";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faSearch,
  faEllipsisH,
  faUndo,
  faRandom,
  faStepForward,
  faPlay,
  faBars,
  faPause,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import SpotifyWebApi from "spotify-web-api-js";

const SpotifyApi = new SpotifyWebApi();

export class MusicUI extends Component {
  state = {
    toggleBtn: true,
  };

  play = async () => {
    this.setState(prevState => ({ toggleBtn: !prevState.toggleBtn }));
    // SpotifyApi.play();
    fetch(
      `https://api.spotify.com/v1/me/player/play?device_id=${"4c9cd84f97add09353dfeebf5c86fa571bd18bfc"}`,
      {
        method: "PUT",
        body: JSON.stringify({
          uris: ["spotify:track:7xGfFoTpQ2E7fRF5lN10tr"],
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${"BQBwWyoigJmIynoT_--DeavY4kZz_QDi9l9CpElQJhhgtPIH2NGaTcDSRqz954PhNenBaVYDnOP5PSxTgvNfnOLTYZ3BwntlnIO6jJDoyfKp1nur9eIqk7lzvu_5YpPOR10Wn_3hGgagg_7fI0GyN3pEW9rUw3nPzgyyQXAIkHXeG6fsB02zJqE"}`,
        },
      }
    );
    //   .then(res => res.json())
    //   .then(res => console.log(res));
    // axios.put("");
    // const play = ({
    //   spotify_uri,
    //   playerInstance: {
    //     _options: { getOAuthToken, id },
    //   },
    // }) => {
    //   getOAuthToken(access_token => {
    //     fetch(`https://api.spotify.com/v1/me/player/play?device_id=${id}`, {
    //       method: "PUT",
    //       body: JSON.stringify({ uris: [spotify_uri] }),
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer ${access_token}`,
    //       },
    //     });
    //   });
    // };

    // play({
    //   playerInstance: player({ name: "..." }),
    //   spotify_uri: "spotify:track:7xGfFoTpQ2E7fRF5lN10tr",
    // });

    // const play = ({
    //   spotify_uri,
    //   playerInstance: {
    //     _options: { getOAuthToken, id },
    //   },
    // }) => {
    //   getOAuthToken(access_token => {
    //     fetch(`https://api.spotify.com/v1/me/player/play?device_id=${id}`, {
    //       method: "PUT",
    //       body: JSON.stringify({ uris: [spotify_uri] }),
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer ${access_token}`,
    //       },
    //     });
    //   });
    // };

    // play({
    //   playerInstance: new Spotify.Player({ name: "..." }),
    //   spotify_uri: "spotify:track:7xGfFoTpQ2E7fRF5lN10tr",
    // });
    // const spotifyApi = new spotify();
    // spotifyApi.getMyDevices();
    // spotifyApi.play(spotifyApi.getMyDevices());
  };

  pause = () => {
    this.setState(prevState => ({ toggleBtn: !prevState.toggleBtn }));
  };
  componentDidMount() {
    if (!this.props.token) {
      const token = this.props.location.hash.split("=")[1];
      sessionStorage.setItem("access_token", token);
      this.props.tokenHandler(token);
    }
    return;
  }

  render() {
    return (
      <div className={classes.wrapper}>
        <div className={classes.player__container}>
          <div className={classes.player__body}>
            <div className={classes.body__cover}>
              <ul className={[classes.list, classes.list__cover].join(" ")}>
                <li>
                  <button
                    className={classes.list__link}
                    onClick={() => this.cta()}
                  >
                    <FontAwesomeIcon icon={faBars} />
                  </button>
                </li>

                <li>
                  <NavLink
                    to={this.props.token ? "/search" : "/login"}
                    className={classes.list__link}
                  >
                    <FontAwesomeIcon icon={faSearch} />
                  </NavLink>
                </li>
              </ul>

              <img src={this.props.MusicData.src} alt="Album cover" />

              <div className={classes.range}></div>
            </div>

            <div className={classes.body__info}>
              <div className={classes.info__album}>
                {this.props.MusicData.album}
              </div>

              <div className={classes.info__song}>
                {this.props.MusicData.song}
              </div>

              <div className={classes.info__artist}>
                {this.props.MusicData.artist}
              </div>
            </div>

            <div className={classes.body__buttons}>
              <ul className={[classes.list, classes.list__buttons].join(" ")}>
                <li>
                  <a href="google.com" className={classes.list__link}>
                    <FontAwesomeIcon icon={faStepForward} />
                  </a>
                </li>

                <li>
                  {this.state.toggleBtn ? (
                    <button
                      className={classes.list__link}
                      onClick={() => this.play()}
                    >
                      <FontAwesomeIcon icon={faPlay} />
                    </button>
                  ) : (
                    <button
                      className={classes.list__link}
                      onClick={() => this.pause()}
                    >
                      <FontAwesomeIcon icon={faPause} />
                    </button>
                  )}
                </li>

                <li>
                  <a href="google.com" className={classes.list__link}>
                    <FontAwesomeIcon icon={faStepForward} />
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className={classes.player__footer}>
            <ul className={[classes.list, classes.list__footer].join(" ")}>
              <li>
                <a href="google.com" className={classes.list__link}>
                  <FontAwesomeIcon icon={faHeart} />
                </a>
              </li>

              <li>
                <a href="google.com" className={classes.list__link}>
                  <FontAwesomeIcon icon={faRandom} />
                </a>
              </li>

              <li>
                <a href="google.com" className={classes.list__link}>
                  <FontAwesomeIcon icon={faUndo} />
                </a>
              </li>

              <li>
                <a href="google.com" className={classes.list__link}>
                  <FontAwesomeIcon icon={faEllipsisH} />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    login: state.login,
    token: state.token,
    MusicData: state.MusicUIData,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    tokenHandler: token =>
      dispatch({ type: actionTypes.AUTHENTICATE, token: token }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MusicUI);
