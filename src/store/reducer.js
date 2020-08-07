import * as actionTypes from "./action";

// import spotifyWebApi from "spotify-web-api-js";

// const spotifyApi = new spotifyWebApi();

// function getHashParams() {
//   var hashParams = {};
//   var e,
//     r = /([^&;=]+)=?([^&;]*)/g,
//     q = window.location.hash.substring(1);
//   while ((e = r.exec(q))) {
//     hashParams[e[1]] = decodeURIComponent(e[2]);
//   }
//   return hashParams;
// }

// const { access_token } = getHashParams();
// console.log(spotifyApi.getAccessToken());

// spotifyApi.setAccessToken(access_token);

const initialState = {
  login: false,
  token: null,
  MusicUIData: {
    src: "https://i.scdn.co/image/ab67616d0000b27350a3147b4edd7701a876c6ce",
    album: "WHEN WE ALL FALL ASLEEP, WHERE DO WE GO",
    song: "bad guy",
    artist: "Billie Eilish",
    uri: "spotify:track:2Fxmhks0bxGSBdJ92vM42m",
    duration_ms: "194087",
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.TOKEN:
      return {
        ...state,
        login: true,
        token: actionTypes.TOKEN,
      };
    case actionTypes.AUTHENTICATE:
      return {
        ...state,
        token: action.token,
      };

    case actionTypes.ADDTOMUSIC:
      return {
        ...state,
        MusicUIData: {
          ...state.MusicUIData,
          src: action.val.album.images[0].url,
          album: action.val.album.name,
          song: action.val.name,
          artist: action.val.artists[0].name,
          uri: action.val.uri,
          duration_ms: action.val.duration_ms,
        },
      };
    default:
      return state;
  }
};

export default reducer;
