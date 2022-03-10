// LIB
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "react-modal";

// Components
import Signup from "../Signup/Signup";
import Login from "../Login/Login";

// SCSS
import "./Header.scss";

// images
import logo from "../../assets/images/logo.png";
import userIcon from "../../assets/icons/icon-male-user.png";

const Header = ({
  setUser,
  setLoginIsOpen,
  setSignupIsOpen,
  modalLoginIsOpen,
  modalSignupIsOpen,
  connectedUser,
}) => {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    setUser(null);
    navigate("/"); // Redirection vers home page
  };

  // SignUp Modal
  const openSignupModal = () => {
    setSignupIsOpen(true);
  };

  const closeSignupModal = () => {
    setSignupIsOpen(false);
  };

  // Login Modal
  const openLoginModal = () => {
    setLoginIsOpen(true);
  };

  const closeLoginModal = () => {
    setLoginIsOpen(false);
  };

  const customStyles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgb(23 23 25 / 82%)",
      zIndex: 1001,
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      padding: 0,
      border: "none",
      background: "transparent",
      zIndex: 1001,
    },
  };

  useEffect(() => {
    Modal.setAppElement("Header .container");
  }, []);

  const handleCollectionPageClick = () => {
    if (connectedUser) {
      // user authenticated => navigate to Collection page
      navigate("/collection");
    } else {
      // user not authenticated => set loginModal on true & redirect to targetUrl
      setLoginIsOpen(true);
      navigate("/?target_url=/collection");
    }
  };

  return (
    <header className="Header">
      <div className="container">
        <Link to="/" className="logo" title="Gamepad">
          <img src={logo} alt="Gamepad" />
          <p className="title">Gamepad</p>
        </Link>

        <div className="navigation">
          {/* Show page collection for logged in User <=> else login */}
          <button
            onClick={handleCollectionPageClick}
            className="navigation-link"
          >
            My Collection
          </button>

          {/* handle signUp/login here */}
          {connectedUser ? (
            <div className="navigation-logout">
              <div className="navigation-logout--avatar">
                {/* User Name */}
                <span>{connectedUser.username} </span>
                {/* User avatar */}
                {connectedUser.avatar ? (
                  <img
                    src={connectedUser.avatar}
                    alt={connectedUser.username}
                  />
                ) : (
                  <img src={userIcon} alt="no-avatar" />
                )}
              </div>

              <div
                onClick={handleLogoutClick}
                title="Sign out"
                className="primary-btn"
              >
                <span>Sign out</span>
                <i className="login-icon"></i>
              </div>
            </div>
          ) : (
            <div className="navigation-login-signup">
              {/* open modal to signup */}
              <button className="primary-btn" onClick={openSignupModal}>
                Signup
              </button>

              <Modal
                isOpen={modalSignupIsOpen}
                onRequestClose={closeSignupModal}
                style={customStyles}
                contentLabel="signup Modal"
              >
                <img
                  src={logo}
                  alt="close modal"
                  className="close-modal"
                  onClick={closeSignupModal}
                />
                <Signup
                  setUser={setUser}
                  setSignupIsOpen={setSignupIsOpen}
                  setLoginIsOpen={setLoginIsOpen}
                />
              </Modal>

              {/* open modal to signup */}
              <div className="primary-btn" onClick={openLoginModal}>
                <span>Login</span>
                <i className="login-icon"></i>
              </div>
              <Modal
                isOpen={modalLoginIsOpen}
                onRequestClose={closeLoginModal}
                style={customStyles}
                contentLabel="Login Modal"
              >
                <img
                  src={logo}
                  alt="close modal"
                  className="close-modal"
                  onClick={closeLoginModal}
                />
                <Login
                  setUser={setUser}
                  setSignupIsOpen={setSignupIsOpen}
                  setLoginIsOpen={setLoginIsOpen}
                />
              </Modal>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
