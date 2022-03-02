// LIB
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import routes from "./config/routes";

// containers
import Home from "./containers/Home/Home";
import Game from "./containers/Game/Game";

// Components
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";

// SCSS
import "./App.scss";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path={routes.HOME} element={<Home />} />
        <Route path={routes.GAME} element={<Game />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
