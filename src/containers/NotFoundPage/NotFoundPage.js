//LIB
import { useNavigate } from "react-router-dom";
import { t } from "i18next";

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
            {t("NotFoundPage_msg")} <br />
            {t("NotFoundPage_title")}
          </p>
          <button
            className="primary-btn"
            onClick={() => {
              navigate("/");
            }}
          >
            {t("NotFoundPage_CTA")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
