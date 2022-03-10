// LIB
import { t } from "i18next";

// SCSS
import "./Footer.scss";

const footer = () => {
  return (
    <footer className="Footer">
      <div className="container">
        <p>
          {t("footer_text")}
          <a href="https://rawg.io/">Rawg API</a>
        </p>
      </div>
    </footer>
  );
};

export default footer;
