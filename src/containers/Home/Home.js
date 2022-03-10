// Lib
import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import axios from "../../config/api";
import ReactPaginate from "react-paginate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { t } from "i18next";

// images
import logo from "../../assets/images/logo.png";

// Components
import Spinner from "../../Components/UI/Spinner/Spinner";
import Platforms from "../../Components/Platforms/Platforms";
import Genres from "../../Components/Genres/Genres";
import SortBy from "../../Components/SortBy/SortBy";

// SCSS
import "./Home.scss";

// ICONS
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
library.add(faSearch);
const Home = () => {
  // STATES
  const [games, setgames] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [search, setSearch] = useState("");
  // Filters
  const [platform, setPlatform] = useState("All");
  const [type, setType] = useState("All");
  const [ordering, setOrdering] = useState("Default");

  const initialFetch = useCallback(async () => {
    try {
      const page_size = 100;
      let url = `/games?page=${page}&page_size=${page_size}`;

      if (search) {
        url = `${url}&search=${search}`; // search by name
      }

      if (platform !== null && platform.id) {
        url = `${url}&platforms=${platform.id}`; // search by platform
      }

      if (type !== null && type.id) {
        url = `${url}&genres=${type.id}`; // search by type
      }

      if (ordering !== null && ordering.value) {
        url = `${url}&ordering=${ordering.value}`; // search by ordering
      }

      const response = await axios.get(url);
      setgames(response.data); // update data state with all games
      setPageCount(Math.ceil(Number(response.data.count) / page_size));
      setIsLoading(false); // set spinner on false
    } catch (error) {
      console.log(error);
    }
  }, [page, search, ordering, type, platform]);

  useEffect(() => {
    initialFetch();
  }, [initialFetch]);

  // Pagination
  const handlePageClick = (event) => {
    setPage(event.selected + 1);
  };

  return isLoading ? (
    <Spinner />
  ) : (
    <main className="Home">
      <div className="container">
        {/* Title */}
        <div className="main-title">
          <img src={logo} alt="Gamepad" />
          <h1>{t("title")}</h1>
        </div>

        {/* Search by name */}
        <div className="search-container">
          <input
            placeholder={t("home_search")}
            className="search-input"
            type="text"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setPage(1);
            }}
          />
          <FontAwesomeIcon icon="search" className="search-input-icon" />
        </div>
        {search.length > 0 && (
          <>
            <p className="search-result">
              {t("home_result_search")} <span>" {search} "</span>
            </p>
          </>
        )}
        <p className="nbre-of-game">
          {search.length === 0 ? "Search" : ""} {games.count} {t("home_games")}
        </p>

        {/* Refine search results */}
        {search.length > 0 && (
          <section className="all-filters">
            <div className="filters">
              <Platforms platform={platform} setPlatform={setPlatform} />
              <Genres type={type} setType={setType} />
              <SortBy ordering={ordering} setOrdering={setOrdering} />
            </div>
          </section>
        )}

        {/* Display Games list */}
        {search.length === 0 && (
          <h2 className="sub-title">{t("home_subtitle")}</h2>
        )}
        <section className="cards">
          {games.results.map((game) => {
            return (
              <Link
                to={`/game/${game.id}`}
                key={game.id}
                className="card"
                style={{ backgroundImage: `url(${game.background_image})` }}
              >
                <h3>{game.name}</h3>
              </Link>
            );
          })}
        </section>

        {/* Pagination */}
        <section className="home-pagination">
          <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            pageCount={pageCount}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            activeClassName={"active"}
          />
        </section>
      </div>
    </main>
  );
};

export default Home;
