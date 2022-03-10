// LIB
import { t } from "i18next";

// SCSS
import "./SmallSpinner.scss";

const SmallSpinner = () => {
  return <div className="smallSpinner">{t("loading")}</div>;
};

export default SmallSpinner;
