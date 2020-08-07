import React, { Component } from "react";
import classes from "./MusicUI.module.css";
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
  faStepBackward,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

// import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Slider from "@material-ui/core/Slider";

export class MusicUI extends Component {
  state = {
    toggleBtn: true,
    toggleRepeat: false,
  };
  device_id;
  WEB_PLAYBACK_SDK_TOKEN = localStorage.getItem("access_token");
  play = async () => {
    this.setState(prevState => ({ toggleBtn: !prevState.toggleBtn }));
    // SpotifyApi.play();
    fetch(
      `https://api.spotify.com/v1/me/player/play?device_id=${this.device_id}`,
      {
        method: "PUT",
        body: JSON.stringify({
          uris: [this.props.MusicData.uri],
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.WEB_PLAYBACK_SDK_TOKEN}`,
        },
      }
    )
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });

    // if (localStorage.getItem("state")) {
    //   fetch(
    //     `https://api.spotify.com/v1/me/player/seek?device_id=${
    //       this.device_id
    //     }&position_ms=${localStorage.getItem("state")}`,
    //     {
    //       method: "PUT",
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer ${this.WEB_PLAYBACK_SDK_TOKEN}`,
    //       },
    //     }
    //   );
    // }

    // spotifyApi.seek(7000);
  };

  pause = () => {
    this.setState(prevState => ({ toggleBtn: !prevState.toggleBtn }));

    fetch(
      `https://api.spotify.com/v1/me/player/pause?device_id=${this.device_id}`,
      {
        method: "PUT",
        body: JSON.stringify({
          uris: [this.props.MusicData.uri],
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.WEB_PLAYBACK_SDK_TOKEN}`,
        },
      }
    )
      .then(res => console.log(res))
      .catch(err => {
        console.log(err);
      });
    // .then(res => console.log(res));
  };
  nextSong = () => {
    // this.setState(prevState => ({ toggleBtn: !prevState.toggleBtn }));

    fetch(
      `https://api.spotify.com/v1/me/player/next?device_id=${this.device_id}`,
      {
        method: "POST",
        // body: JSON.stringify({
        //   uris: [this.props.MusicData.uri],
        // }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.WEB_PLAYBACK_SDK_TOKEN}`,
        },
      }
    );
  };

  toggleRepeat = () => {
    this.setState(prevState => ({ toggleRepeat: !prevState.toggleRepeat }));
    if (!this.state.toggleRepeat) {
      fetch(
        `https://api.spotify.com/v1/me/player/repeat?device_id=${this.device_id}&state=track`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.WEB_PLAYBACK_SDK_TOKEN}`,
          },
        }
      );
    } else {
      fetch(
        `https://api.spotify.com/v1/me/player/repeat?device_id=${this.device_id}&state=off`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.WEB_PLAYBACK_SDK_TOKEN}`,
          },
        }
      );
    }
  };

  componentDidMount() {
    this.device_id = localStorage.getItem("_spharmony_device_id");
    //  set Device id to then pass as a query to perform operations.
    // set token so that we can conditionally show some text and use in routes
    if (!this.props.token) {
      const token = this.props.location.hash.split("=")[1];
      this.props.tokenHandler(token);
    }
    return;
  }

  handleChange = e => {
    // fetch(
    //   `https://api.spotify.com/v1/me/player/volume?volume_percent=${e.target.value}`,
    //   {
    //     method: "PUT",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${this.WEB_PLAYBACK_SDK_TOKEN}`,
    //     },
    //   }
    // );
    const value = e.target.value;
    const duration = () => {
      fetch(`https://api.spotify.com/v1/me/player/seek?position_ms=${value}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.WEB_PLAYBACK_SDK_TOKEN}`,
        },
      });
    };
    setTimeout(duration, 0);
  };

  render() {
    let musicUi = (
      <div className={classes.wrapper} style={{ textAlign: "center" }}>
        {!this.props.token ? (
          <h2>
            first click on the search button to login only after you can search
            and play song
          </h2>
        ) : null}
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

              <div>
                -{" "}
                <input
                  type="range"
                  id="points"
                  name="points"
                  min="0"
                  step="1000"
                  max={this.props.MusicData.duration_ms}
                  onChange={this.handleChange}
                />{" "}
                +
                {/* <Grid container spacing={2}>
                  <Grid item xs>
                    <Slider
                      value={this.state.barValue}
                      onChange={this.handleChange}
                      aria-labelledby="continuous-slider"
                    />
                  </Grid>
                </Grid> */}
              </div>
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
                  <button className={classes.list__link}>
                    <FontAwesomeIcon icon={faStepBackward} />
                  </button>
                </li>

                <li>
                  {this.state.toggleBtn ? (
                    <button className={classes.list__link} onClick={this.play}>
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
                  <button
                    onClick={this.nextSong}
                    className={classes.list__link}
                  >
                    <FontAwesomeIcon icon={faStepForward} />
                  </button>
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
                {!this.state.toggleBtn ? (
                  <button
                    onClick={this.toggleRepeat}
                    style={{ color: this.state.toggleRepeat ? "red" : "gray" }}
                    className={classes.list__link}
                  >
                    <FontAwesomeIcon icon={faUndo} />
                  </button>
                ) : (
                  <button disabled>
                    <FontAwesomeIcon icon={faUndo} />
                  </button>
                )}
              </li>

              <li>
                <button className={classes.list__link}>
                  <FontAwesomeIcon icon={faEllipsisH} />
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );

    // if (!this.state.device_id) {
    //   musicUi = <h2>loading</h2>;
    // }

    return musicUi;
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
