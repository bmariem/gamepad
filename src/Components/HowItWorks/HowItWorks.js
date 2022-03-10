// LIB
import { t } from "i18next";

// ICONS
import tag from "../../assets/icons/icon-bookmark.png";
import msg from "../../assets/icons/icon-msg.png";
import user from "../../assets/icons/icon-user.png";

// SCSS
import "./HowItWorks.scss";

const HowItWorks = () => {
  return (
    <div className="howItWorks">
      <h2 className="howItWorks-title">{t("how_it_works_title")}</h2>
      <p className="howItWorks-content">
        <img src={user} alt="user icon" className="howItWorks-icon" />
        <span className="howItWorks-text">{t("how_it_works_step_1")}</span>
      </p>
      <p className="howItWorks-content">
        <img src={tag} alt="tag icon" className="howItWorks-icon" />
        <span className="howItWorks-text">{t("how_it_works_step_2")}</span>
      </p>
      <p className="howItWorks-content">
        <img src={msg} alt="message icon" className="howItWorks-icon" />
        <span className="howItWorks-text">{t("how_it_works_step_3")}</span>
      </p>
    </div>
  );
};

export default HowItWorks;
