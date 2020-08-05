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
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

export class MusicUI extends Component {
  state = {
    songs: [
      {
        song1: "http://streaming.tdiradio.com:8000/house.mp3",
        desc: "01. Clouds In The Forest",
        time: "3:20",
      },
      {
        song1: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        desc: "02. Rat In The River",
        time: "2:48",
      },
      {
        song1: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
        desc: "03. Giants And Companions",
        time: "2:27",
      },
      {
        song1: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
        desc: "04. Ashamed Of Light",
        time: "3:32",
      },
      {
        song1: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
        desc: "05. Doubting The Forest",
        time: "2:40",
      },
      {
        song1: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
        desc: "06. Criminals Of The Lake",
        time: "2:55",
      },
    ],
  };

  render() {
    // const token = this.props.location.hash.split("=")[1];
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
                    to="/search"
                    className={classes.list__link}
                    // onClick={() => this.props.tokenHandler()}
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
                  <a href="google.com" className={classes.list__link}>
                    <FontAwesomeIcon icon={faPlay} />
                  </a>
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
// const mapDispatchToProps = dispatch => {
//   return {
//     tokenHandler: token =>
//       dispatch({ type: actionTypes.AUTHENTICATE, token: token }),
//   };
// };

export default connect(mapStateToProps, null)(MusicUI);
