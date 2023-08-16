import React from "react";
import { Link } from "react-router-dom";
import classes from "./Hero.module.css"
export const Hero = () => {
  return (
    <div className={classes.hero}>
      <div className={classes["hero-text"]}>
        <h1>HOUSING COMMUNITY</h1>
        <h3>EL RUEDO</h3>
        <Link to={`/login`}>
          <i className="text-white">Log in</i>
        </Link>
      </div>
    </div>
  );
};
