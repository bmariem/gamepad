// Lib
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../config/api";
import { t } from "i18next";

// ICONS
import upload from "../../assets/icons/icon-import.png";
import cancel from "../../assets/icons/icon-cancel.png";

// COMPONENTS
import HowItWorks from "../HowItWorks/HowItWorks";

// SCSS
import "./Signup.scss";

const Signup = ({ setUser, setSignupIsOpen, setLoginIsOpen }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  const [avatar, setAvatar] = useState({});
  const [avatarDisplayed, setAvatarDisplayed] = useState("");

  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();

  const handleSignupSubmit = async (event) => {
    try {
      event.preventDefault();

      // Create an object of formData
      const formData = new FormData();

      // Update the formData object
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("avatar", avatar);

      const response = await axios.post(
        // create a new User
        "/signup",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.token) {
        // save user in cookies
        setUser(response.data);

        // Redirect user to home page
        navigate("/");
      } else {
        alert("An error has occurred. Please try again.");
      }
    } catch (error) {
      console.log("Signup Error => ", error.message);

      // error 409 => conflict
      console.log("Catch Error => ", error.response); //data: {message: 'This email already has an account'}
      if (error.response.status === 409) {
        setErrorMessage("This email already has an account");
      }
    }
    if (password !== confirmPassword) {
      setErrorMessage("The two passwords do not match");
    } else {
      setErrorMessage("");
    }
  };

  return (
    <div className="Signup">
      <div className="container">
        <HowItWorks />
        <div className="Signup-form">
          <h2 className="Signup-title">{t("signup")}</h2>

          <form onSubmit={handleSignupSubmit}>
            <input
              value={username}
              type="text"
              placeholder={t("username")}
              onChange={(event) => {
                setUsername(event.target.value);
              }}
              required
            />

            <input
              value={email}
              type="email"
              placeholder={t("email")}
              onChange={(event) => {
                setEmail(event.target.value);
                setErrorMessage("");
              }}
              required
            />

            <div className="Signup-password">
              <input
                value={password}
                type="password"
                placeholder={t("password")}
                onChange={(event) => {
                  setPassword(event.target.value);
                  setErrorMessage("");
                }}
                required
              />
              <input
                value={confirmPassword}
                type="password"
                placeholder={t("confirm_password")}
                onChange={(event) => {
                  setconfirmPassword(event.target.value);
                  setErrorMessage("");
                }}
                required
              />
            </div>

            <div className="Signup-avatar">
              <label htmlFor="file">
                <span>{t("avatar")}</span>
                <img src={upload} alt="import icon" />
              </label>
              <input
                id="file"
                type="file"
                onChange={(event) => {
                  setAvatar(event.target.files[0]);
                  setAvatarDisplayed(
                    URL.createObjectURL(event.target.files[0])
                  );
                }}
              />

              {avatarDisplayed ? (
                <div className="Signup-avatar--content">
                  <img
                    src={avatarDisplayed}
                    alt="Avatar"
                    className="Signup-avatar--content-img"
                  />
                  <img
                    src={cancel}
                    alt="remove avatar"
                    className="Signup-avatar--content-removeImg"
                    onClick={() => {
                      setAvatarDisplayed("");
                    }}
                  />
                </div>
              ) : (
                <p className="Signup-avatar--no-content">
                  {t("no_avatar_msg")}
                </p>
              )}
            </div>

            {errorMessage && (
              <span className="error-message">{errorMessage}</span>
            )}

            <button className="primary-btn" type="submit">
              {t("connexion")}
            </button>
          </form>

          <p
            className="Signup-link"
            onClick={() => {
              setSignupIsOpen(false); // close Signup Modal

              setLoginIsOpen(true); // Open Login Modal
            }}
          >
            {t("login_link")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
