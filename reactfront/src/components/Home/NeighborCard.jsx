import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { useAuthHeader } from "react-auth-kit";
import default_profile_image from "./../../img/default_profile_image.png";

import classes from "./NeighborCard.module.css";

const endpoint = "http://localhost:8000/api";

export const NeighborCard = (props) => {
  const navigate = useNavigate();
  const authHeader = useAuthHeader();
  const { image, name, floor, id } = props.neighborData;

  const fireSwalError = () => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "You don't seem to have permissions to enter this mailbox! ",
    });
  };

  const accessMailboxHandler = async (e) => {
    const auth = { headers: { Authorization: authHeader() } };
    try {
      const response = await axios.get(`${endpoint}/user-profile/`, auth);
      response.data.data.id !== e
        ? fireSwalError()
        : navigate(`/VecinoCartas/${e}`);
    } catch (err) {
      fireSwalError();
      props.setAxiosError("You must be logged in to access the mailbox.");
    }
  };
  return (
    <>
      <div className={classes.card}>
        <img
          src={
            image !== "undefined"
              ? "http://localhost:8000/storage/" + image
              : default_profile_image
          }
          className={classes["card__image"]}
          alt=""
        />
        <div className={classes["card__overlay"]}>
          <div className={classes["card__header"]}>
            <svg className={classes["card__arc"]} xmlns="">
              <path />
            </svg>
            <img
              className={classes["card__thumb"]}
              src={
                image !== "undefined"
                  ? "http://localhost:8000/storage/" + image
                  : default_profile_image
              }
              alt=""
            />
            <div className={classes["card__header-text"]}>
              <h3 className={classes["card__title"]}>{name}</h3>
              <span className={classes["card__status"]}>Floor {floor}</span>
              <Link to={`/createCarta/${id}`}>
                <i
                  className={`fa-regular fa-envelope fa-2x ${classes["card__mailbox"]}`}
                ></i>
              </Link>
            </div>
          </div>
          <div className={classes["containerButt"]}>
            <span
              value={id}
              onClick={() => accessMailboxHandler(id)}
              className={classes["button"]}
            >
              <div className={classes["button__line"]}></div>
              <div className={classes["button__line"]}></div>
              <span className={classes["button__text"]}>ENTER</span>
              <div className={classes["button__drow1"]}></div>
              <div className={classes["button__drow1"]}></div>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
