//LIB
import { useNavigate } from "react-router-dom";

// CSS
import "./NotFoundPage.scss";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="NotFoundPage">
      <div className="container">
        <div className="NotFoundPage-content">
          <h2>404</h2>
          <p>
            Whoops! <br />
            We couldn't find that page.
          </p>
          <button
            className="primary-btn"
            onClick={() => {
              navigate("/");
            }}
          >
            Main page
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
