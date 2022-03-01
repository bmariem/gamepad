// LIB
import { Link } from "react-router-dom";

// CSS
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
      </div>
    </header>
  );
};

export default Header;
