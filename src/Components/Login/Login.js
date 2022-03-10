// Lib
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../../config/api";
import { t } from "i18next";

// COMPONENTS
import HowItWorks from "../HowItWorks/HowItWorks";

// SCSS
import "./Login.scss";

const Login = ({ setUser, setSignupIsOpen, setLoginIsOpen }) => {
  // STATES
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  let query = useQuery();

  const handleLoginSubmit = async (event) => {
    try {
      event.preventDefault();
      // Find a User
      // axios.post(URL, data)
      const response = await axios.post("/login", {
        email: email,
        password: password,
      });

      if (response.data.token) {
        // save User in cookies
        setUser(response.data);

        // Redirect user to home page
        const target_url = query.get("target_url");
        if (target_url != null) {
          navigate(target_url);
        } else {
          navigate("/");
        }
        setLoginIsOpen(false);
      } else {
        alert("An error has occurred. Please try again.");
      }
    } catch (error) {
      console.log("Login Error => ", error.message);

      // error 400 => login with wrong email <=> data.message: "User not found"
      // error 401 => login with wrong password <=> data.error: "Unauthorized"
      console.log("Catch Error => ", error.response);

      if (error.response.status === 400 || error.response.status === 401) {
        setErrorMessage("Invalid email address or password");
      }
    }
  };

  return (
    <div className="Login">
      <div className="container">
        <HowItWorks />
        <div className="Login-form">
          <h2 className="Login-title">{t("login")}</h2>
          <form onSubmit={handleLoginSubmit}>
            <input
              type="email"
              placeholder={t("email")}
              onChange={(event) => {
                setEmail(event.target.value);
                setErrorMessage("");
              }}
              required
            />

            <input
              type="password"
              placeholder={t("password")}
              onChange={(event) => {
                setPassword(event.target.value);
                setErrorMessage("");
              }}
              required
            />

            {errorMessage && (
              <span className="error-message">{errorMessage}</span>
            )}

            <button className="primary-btn" type="submit">
              {t("connexion")}
            </button>
          </form>

          <p
            className="Login-link"
            onClick={() => {
              setLoginIsOpen(false); // Close Login Modal

              setSignupIsOpen(true); // Open Signup Modal
            }}
          >
            {t("login_link")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
