import React, { Component } from "react";
import classes from "./SearchList.module.css";

class SearchList extends Component {
  cta = val => {
    console.log(this.props);
  };
  render() {
    console.log(this.props.list);
    const app = this.props.list.map(val => {
      return (
        <div
          className={classes.card}
          key={val.id}
          onClick={() => this.cta(val)}
        >
          <h4>Artist {val.artists[0].name}</h4>
          <img
            src={val.album.images[0].url}
            alt={val.name}
            style={{ width: "100%", height: "13rem" }}
          />
          <div className={classes.container}>
            <h4>{val.name}</h4>
            {/* <p>{val.desc}</p> */}
          </div>
        </div>
      );
    });
    return <div className={classes.display}>{app}</div>;
  }
}

export default SearchList;
