// ICONS
import tag from "../../assets/icons/icon-bookmark.png";
import msg from "../../assets/icons/icon-msg.png";
import user from "../../assets/icons/icon-user.png";

// SCSS
import "./HowItWorks.scss";

const HowItWorks = () => {
  return (
    <div className="howItWorks">
      <h2 className="howItWorks-title">How it works ?</h2>
      <p className="howItWorks-content">
        <img src={user} alt="user icon" className="howItWorks-icon" />
        <span className="howItWorks-text">
          Log in to your free account to be able to get all features of Gamepad
        </span>
      </p>
      <p className="howItWorks-content">
        <img src={tag} alt="tag icon" className="howItWorks-icon" />
        <span className="howItWorks-text">Add a game to your collection</span>
      </p>
      <p className="howItWorks-content">
        <img src={msg} alt="message icon" className="howItWorks-icon" />
        <span className="howItWorks-text">Leave a review for a game</span>
      </p>
    </div>
  );
};

export default HowItWorks;
