// LIB
import { Link } from "react-router-dom";

// SCSS
import "./Header.scss";

// images
import logo from "../../assets/images/logo.png";

const Header = () => {
  return (
    <header className="Header">
      <div className="container">
        <Link to="/" className="logo" title="Gamepad">
          <img src={logo} alt="Gamepad" />
          <p className="title">Gamepad</p>
        </Link>

        <div className="navigation">
          {/* Show page collection for logged in User <=> else login */}
          <Link to="/collection" className="navigation-link">
            My Collection
          </Link>

          {/* handle signUp/login here */}
          <button className="primary-btn">Login</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
