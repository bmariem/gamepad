// Lib
import React, { useState, useEffect } from "react";
import axios from "../../config/api";
import Select from "react-select";
import { t } from "i18next";

// Components
import Spinner from "../../Components/UI/SmallSpinner/SmallSpinner";

// SCSS
import "./Platforms.scss";

const Platforms = ({ platform, setPlatform }) => {
  // STATES
  const [platforms, setPlatforms] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPlatforms = async () => {
      try {
        const response = await axios.get(`/platforms`);
        setPlatforms(response.data.results); // set platforms <=> 50
        setIsLoading(false); // set spinner on false
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchPlatforms();
  }, []);

  const handleChangeDropdown = (platform) => {
    setPlatform(platform);
  };

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? "#fff" : "#404040",
      padding: 10,
    }),
    control: () => ({
      width: "auto",
      display: "flex",
      color: "#fff",
    }),
    singleValue: (provided, state) => {
      const color = "#fff";
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = "opacity 300ms";

      return { ...provided, opacity, transition, color };
    },
  };

  return isLoading ? (
    <Spinner />
  ) : (
    <Select
      placeholder={<div style={{ color: "#fff" }}>{t("game_platforms")}</div>}
      styles={customStyles}
      className="select-btn"
      isClearable={true}
      onChange={handleChangeDropdown}
      options={platforms}
      getOptionValue={(platform) => platform.id}
      getOptionLabel={(platform) => platform.name}
    />
  );
};

export default Platforms;
