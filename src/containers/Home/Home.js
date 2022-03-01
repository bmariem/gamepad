// Lib
import React, { useState, useEffect } from "react";
import axios from "../../config/api";
import ReactPaginate from "react-paginate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// images
import logo from "../../assets/images/logo.png";

// Components
import Spinner from "../../Components/Spinner/Spinner";
import Platforms from "../../Components/Platforms/Platforms";
import Genres from "../../Components/Genres/Genres";
import SortBy from "../../Components/SortBy/SortBy";

// CSS
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
  // filters
  const [platform, setPlatform] = useState("All");
  const [type, setType] = useState("All");
  const [ordering, setOrdering] = useState("Default");
  const [filters, setFilters] = useState(false);

  let fetchGames = async () => {
    try {
      const page_size = 100;
      let url = `/games?page=${page}&page_size=${page_size}`;

      if (search) {
        url = `${url}&search=${search}`;
      }

      if (platform.id) {
        url = `${url}&platforms=${platform.id}`;
      }

      if (type.id) {
        url = `${url}&genres=${type.id}`;
      }

      if (ordering.value) {
        url = `${url}&ordering=${ordering.value}`;
      }

      const response = await axios.get(url);
      setgames(response.data); // update data state with all games
      setPageCount(Math.ceil(Number(response.data.count) / page_size));
      setIsLoading(false); // set spinner on false
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    fetchGames();
  }, [page, search]);

  const handlePageClick = (event) => {
    setPage(event.selected + 1);
  };

  const handleFilters = () => {
    fetchGames();
  };

  return isLoading ? (
    <Spinner />
  ) : (
    <main className="Home">
      <div className="container">
        {/* Title */}
        <div className="main-title">
          <img src={logo} alt="Gamepad" />
          <h1>Gamepad</h1>
        </div>

        {/* Search */}
        <div className="search-container">
          <input
            placeholder="Search for a game..."
            className="search-input"
            type="text"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setPage(1);
              setFilters(true);
            }}
          />
          <FontAwesomeIcon icon="search" className="search-input-icon" />
        </div>
        {filters && (
          <>
            <p className="search-result">
              Search result for <span>" {search} "</span>
            </p>
          </>
        )}
        <p className="nbre-of-game">
          {!filters ? "Search" : ""} {games.count} games
        </p>

        {/* Refine search results */}
        {filters && (
          <div className="all-filters">
            <div className="filters">
              <Platforms platform={platform} setPlatform={setPlatform} />
              <Genres type={type} setType={setType} />
            </div>
            <div className="filters">
              <SortBy ordering={ordering} setOrdering={setOrdering} />
              <button className="primary-btn" onClick={handleFilters}>
                Go filters !
              </button>
            </div>
          </div>
        )}

        {/* Games list */}
        {!filters && <h2 className="sub-title">Most Revelance Games</h2>}
        <div className="cards">
          {games.results.map((game, index) => {
            return (
              <div
                key={index}
                className="card"
                style={{ backgroundImage: `url(${game.background_image})` }}
              >
                <h3>{game.name}</h3>
              </div>
            );
          })}
        </div>

        <div className="home-pagination">
          <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            pageCount={pageCount}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            activeClassName={"active"}
          />
        </div>
      </div>
    </main>
  );
};

export default Home;
