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
    src: "http://ecx.images-amazon.com/images/I/51XSHShbPiL.jpg",
    album: "The Mohit Party",
    song: "Final Masquerade",
    artist: "Linkin Park",
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
      if (state.token) {
        return {
          ...state,
          login: true,
        };
      }
      return state;
    default:
      return state;
  }
};

export default reducer;