// LIB
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import routes from "./config/routes";
import Cookies from "js-cookie";

// containers
import Home from "./containers/Home/Home";
import Game from "./containers/Game/Game";
import Collection from "./containers/Collection/Collection";
import NotFoundPage from "./containers/NotFoundPage/NotFoundPage";

// Components
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";

// SCSS
import "./App.scss";

function App() {
  // STATES
  const [connectedUser, setConnectedUser] = useState(
    Cookies.get("gamepad_user_token")
      ? {
          token: Cookies.get("gamepad_user_token"),
          id: Cookies.get("gamepad_user_id"),
          username: Cookies.get("gamepad_user_name"),
          avatar: Cookies.get("gamepad_user_avatar"),
        }
      : null
  ); // stay connected if user refresh the page or leave it
  const [modalSignupIsOpen, setSignupIsOpen] = useState(false);
  const [modalLoginIsOpen, setLoginIsOpen] = useState(false);

  const setUser = (user) => {
    // if user exists
    if (user) {
      // => save it in the cookies for 10 days (in the browser session)
      Cookies.set("gamepad_user_token", user.token, { expires: 10 }); // token
      Cookies.set("gamepad_user_id", user.id, { expires: 10 }); // user id
      Cookies.set("gamepad_user_name", user.username, { expires: 10 }); // user name
      Cookies.set("gamepad_user_avatar", user.avatar, { expires: 10 }); // user avatar
    } else {
      // delete user in cookies
      Cookies.remove("gamepad_user_token");
      Cookies.remove("gamepad_user_id");
      Cookies.remove("gamepad_user_name");
      Cookies.remove("gamepad_user_avatar");
    }

    // update the state of user
    setConnectedUser(user);
  };

  return (
    <Router>
      <Header
        connectedUser={connectedUser}
        setUser={setUser}
        setLoginIsOpen={setLoginIsOpen}
        modalLoginIsOpen={modalLoginIsOpen}
        modalSignupIsOpen={modalSignupIsOpen}
        setSignupIsOpen={setSignupIsOpen}
      />

      <Routes>
        <Route path={routes.HOME} element={<Home />} />
        <Route
          path={routes.GAME}
          element={<Game connectedUser={connectedUser} />}
        />
        <Route
          path={routes.COLLECTION}
          element={<Collection connectedUser={connectedUser} />}
        />
        <Route path={routes.NOTFOUNDPAGE} element={<NotFoundPage />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
