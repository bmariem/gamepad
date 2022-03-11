// Lib
import { useTranslation } from "react-i18next";

// SCSS
import "./Lang.scss";

const Lang = ({ language, setLanguage }) => {
  const { i18n } = useTranslation();

  const handleChangeDropdown = (evt) => {
    const lang = evt.target.value;
    setLanguage(lang);
    i18n.changeLanguage(lang);
  };

  return (
    <select onChange={handleChangeDropdown} value={language} className="Lang">
      <option value="fr">fr</option>
      <option value="en">en</option>
    </select>
  );
};

export default Lang;
