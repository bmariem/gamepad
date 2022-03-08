// LIB
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import routes from "./config/routes";
import Cookies from "js-cookie";
import axios from "./config/api";

// containers
import Home from "./containers/Home/Home";
import Game from "./containers/Game/Game";
import Collection from "./containers/Collection/Collection";

// Components
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";

// SCSS
import "./App.scss";

function App() {
  // STATES
  const [token, setToken] = useState(Cookies.get("token") || null); // stay connected if user refresh the page or leave it
  const [modalSignupIsOpen, setSignupIsOpen] = useState(false);
  const [modalLoginIsOpen, setLoginIsOpen] = useState(false);
  const [userData, setUserData] = useState({}); // Return all user's infos from DB

  const setUser = (token) => {
    // if token exists
    if (token) {
      // => save it in the cookies for 10 days (in the browser session)
      Cookies.set("token", token, { expires: 10 });
    } else {
      // delete token in cookies
      Cookies.remove("token");
    }

    // update the state of token
    setToken(token);
  };

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const response = await axios.get(`/user/collections`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUserData(response.data);
        } catch (error) {
          console.log(error.message);
        }
      }
    };
    fetchUser();
  }, [token]);

  return (
    <Router>
      <Header
        token={token}
        setUser={setUser}
        setLoginIsOpen={setLoginIsOpen}
        modalLoginIsOpen={modalLoginIsOpen}
        modalSignupIsOpen={modalSignupIsOpen}
        setSignupIsOpen={setSignupIsOpen}
        userData={userData}
      />
      <Routes>
        <Route path={routes.HOME} element={<Home />} />
        <Route path={routes.GAME} element={<Game token={token} />} />
        <Route
          path={routes.COLLECTION}
          element={<Collection token={token} />}
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
