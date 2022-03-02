// Lib
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../../config/api";
import { useParams } from "react-router-dom";
import Carousel from "react-multi-carousel";

// ICONS
import iconMessage from "../../assets/icons/icon-msg.png";
import iconBookmark from "../../assets/icons/icon-bookmark.png";

// Components
import Spinner from "../../Components/Spinner/Spinner";

// SCSS
import "./Game.scss";
import "react-multi-carousel/lib/styles.css";

const Game = () => {
  // STATES
  const [game, setGame] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // Retrieve the id of the game sent during navigation
  const { id } = useParams();
  useEffect(() => {
    const fetchGame = async () => {
      try {
        const response = await axios.get(`/game/${id}`);

        setGame(response.data);

        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchGame();
  }, [id]);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 8,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return isLoading ? (
    <Spinner />
  ) : (
    <main className="Game">
      <div className="main-title">
        <h2 className="Game-title">{game.game.name}</h2>
      </div>

      <div className="container">
        {/* Game Image */}
        <section
          className="Game-visual"
          style={{ backgroundImage: `url(${game.game.background_image})` }}
        ></section>

        <section className="Game-details">
          <div className="Game-details--cta">
            <Link to={"/collection"} className="secondary-btn">
              <span>
                Saved to <strong>Collection</strong>
              </span>
              <img src={iconBookmark} alt="icon bookmark" />
            </Link>
            <Link to={"/collection"} className="secondary-btn">
              <span>
                Add a <br />
                Review
              </span>
              <img src={iconMessage} alt="icon message"></img>
            </Link>
          </div>

          <div>
            {/* Platforms */}
            <div>
              <h4>Platforms</h4>
              <p>
                {game.game.platforms.map((platform, index) => {
                  return <span key={index}>{platform.platform.name}, </span>;
                })}
              </p>
            </div>

            {/* Released date */}
            <div>
              <h4>Released date</h4>
              <p>{game.game.released}</p>
            </div>

            {/* Publisher */}
            <div>
              <h4>Publisher</h4>
              <p>
                {game.game.publishers.map((publisher, index) => {
                  return <span key={index}>{publisher.name} </span>;
                })}
              </p>
            </div>
          </div>

          <div>
            {/* Genre */}
            <div>
              <h4>Genre</h4>
              <p>
                {game.game.genres.map((genre, index) => {
                  return <span key={index}>{genre.name} </span>;
                })}
              </p>
            </div>

            {/* Developer */}
            <div>
              <h4>Developers</h4>
              <p>
                {game.game.developers.map((developer, index) => {
                  return <span key={index}>{developer.name} </span>;
                })}
              </p>
            </div>

            {/* Rating */}
            <div>
              <h4>Rating</h4>
              <p>{game.game.rating}</p>
            </div>
          </div>
          <div>
            {/* Description */}
            <h4>About</h4>
            <p>{`${game.game.description_raw.substring(0, 200)}...`}</p>
          </div>
        </section>

        {game.relatedGames.length > 0 && (
          <section
            className="Game-related"
            style={{ maxWidth: 1200, height: 360 }}
          >
            <h2 className="Game-title">{game.game.name}</h2>
            <Carousel
              responsive={responsive}
              infinite={true}
              autoPlaySpeed={2000}
              customTransition="all .5"
              showDots={false}
            >
              {game.relatedGames.map((relatedGame) => {
                return (
                  <Link
                    to={`/game/${relatedGame.id}`}
                    key={relatedGame.id}
                    className="card"
                    style={{
                      backgroundImage: `url(${relatedGame.background_image})`,
                    }}
                  >
                    <h3>{relatedGame.name}</h3>
                  </Link>
                );
              })}
            </Carousel>
          </section>
        )}
      </div>
    </main>
  );
};

export default Game;
