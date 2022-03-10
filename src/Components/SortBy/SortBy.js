// Lib
import Select from "react-select";
import { t } from "i18next";

// SCSS
import "./SortBy.scss";

const SortBy = ({ ordering, setOrdering }) => {
  const options = [
    { value: "name", label: "Name" },
    { value: "released", label: "Released" },
    { value: "added", label: "Added" },
    { value: "created", label: "Created" },
    { value: "updated", label: "Updated" },
    { value: "rating", label: "Rating" },
    { value: "metacritic", label: "Metacritic" },
  ];

  const handleChangeDropdown = (ordering) => {
    setOrdering(ordering);
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
      const color = "#fff";
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = "opacity 300ms";

      return { ...provided, opacity, transition, color };
    },
  };

  return (
    <Select
      placeholder={<div style={{ color: "#fff" }}>{t("sort_by")}</div>}
      className="select-btn"
      styles={customStyles}
      isClearable={true}
      options={options}
      onChange={handleChangeDropdown}
    />
  );
};

export default SortBy;
