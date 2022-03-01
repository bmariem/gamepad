// Lib
import React, { useState, useEffect } from "react";
import axios from "../../config/api";
import Select from "react-select";

// Components
import Spinner from "../../Components/Spinner/Spinner";

// CSS
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
      color: state.isSelected ? "#ff4655" : "#404040",
      padding: 10,
    }),
    control: () => ({
      width: "auto",
      display: "flex",
      color: "#fff",
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = "opacity 300ms";

      return { ...provided, opacity, transition };
    },
  };
  console.log("platform => ", platform);

  return isLoading ? (
    <Spinner />
  ) : (
    <Select
      placeholder={<div>Platform</div>}
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
