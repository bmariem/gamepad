// Lib
import React, { useState, useEffect } from "react";
import axios from "../../config/api";
import Select from "react-select";

// Components
import Spinner from "../Spinner/Spinner";

// SCSS
import "./Genres.scss";

const Genres = ({ type, setType }) => {
  // STATES
  const [types, setTypes] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get(`/genres`);
        setTypes(response.data.results); // set Genres <=> 19
        setIsLoading(false); // set spinner on false
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchGenres();
  }, []);

  const handleChangeDropdown = (type) => {
    setType(type);
  };

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? "#ff4655" : "#404040",
      padding: 10,
    }),
    control: () => ({
      width: 200,
      display: "flex",
      color: "#fff",
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = "opacity 300ms";

      return { ...provided, opacity, transition };
    },
  };
  console.log("Type => ", type);

  return isLoading ? (
    <Spinner />
  ) : (
    <Select
      placeholder={<div style={{ color: "#fff" }}>Type</div>}
      className="select-btn"
      styles={customStyles}
      isClearable={true}
      options={types}
      onChange={handleChangeDropdown}
      getOptionValue={(type) => type.id}
      getOptionLabel={(type) => type.name}
    />
  );
};

export default Genres;
