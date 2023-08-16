import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box } from "@mui/material";
import { NeighborCard } from "./NeighborCard";
import { FilterByName } from "../UI/FilterByName";
import { Hero } from "../UI/Hero";

import classes from './Home.module.css'

const endpoint = "http://localhost:8000/api";

const Home = () => {
  const [neighbors, setNeighbors] = useState([]);
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const getAllNeighbors = async () => {
      const response = await axios.get(`${endpoint}/index`);
      setNeighbors(response.data);
    };
    getAllNeighbors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filterByNameHandler = (queryProp) => {
    setQuery(queryProp);
  };
  const setErrorHandler = (errorProp) => {
    setError(errorProp);
  };
  return (
    <div>
      <Hero />
      <FilterByName setQuery={filterByNameHandler} width={"70%"}/>
      <ul className={classes.cards}>
        {neighbors
          .filter((neighbor) => neighbor.name.toLowerCase().includes(query))
          .map((neighbor) => (
            <NeighborCard
              key={neighbor.id}
              neighborData={neighbor}
              setAxiosError={setErrorHandler}
            />
          ))}
      </ul>
    </div>
  );
};

export default Home;
