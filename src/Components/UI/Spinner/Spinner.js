// LIB
import { t } from "i18next";

// SCSS
import "./Spinner.scss";

const Spinner = () => {
  return <div className="spinner">{t("loading")}</div>;
};

export default Spinner;
