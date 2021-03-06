// Lib
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../../config/api";
import { useParams } from "react-router-dom";
import Carousel from "react-multi-carousel";
import Modal from "react-modal";
import { t } from "i18next";

// ICONS
import iconMessage from "../../assets/icons/icon-msg.png";
import iconBookmark from "../../assets/icons/icon-bookmark.png";
import iconFilledBookmark from "../../assets/icons/icon-filled-bookmark.png";

// images
import logo from "../../assets/images/logo.png";

// Components
import Spinner from "../../Components/UI/Spinner/Spinner";
import AddComment from "../../Components/AddComment/AddComment";
import Review from "../../Components/Review/Review";

// SCSS
import "./Game.scss";
import "react-multi-carousel/lib/styles.css";

const Game = ({ connectedUser }) => {
  // STATES
  const [game, setGame] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [favoriteGames, setFavoriteGames] = useState([]);
  const [added, isAdded] = useState(false);
  const [isReadMore, setIsReadMore] = useState(true);
  const [modalCommentIsOpen, setCommentIsOpen] = useState(false);
  const [reviews, setReviews] = useState([]);

  const toggleReadMore = () => {
    // handle Read More on description
    setIsReadMore(!isReadMore);
  };

  // Retrieve the id of the game sent during navigation
  const { id } = useParams();
  useEffect(() => {
    const fetchGame = async () => {
      try {
        const response = await axios.get(`/game/${id}`);

        if (connectedUser) {
          const fetchCollection = await axios.get(
            `/user/${connectedUser.id}/favorites`,
            {
              headers: {
                Authorization: `Bearer ${connectedUser.token}`,
              },
            }
          );

          // game already exists in user's Fav
          if (
            fetchCollection.data.favorites.filter((element) => {
              return element.id === Number(id);
            }).length > 0
          ) {
            isAdded(true); // set on true fav state
          } else {
            isAdded(false);
          }
        }

        setGame(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log("Error has been occured");
      }
    };
    fetchGame();
  }, [id, connectedUser]);

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
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  // Comment Modal
  const openCommentModal = () => {
    setCommentIsOpen(true);
  };

  const closeCommentModal = () => {
    setCommentIsOpen(false);
  };

  useEffect(() => {
    Modal.setAppElement(document.getElementById("Game"));
  }, []);

  const handleAddFavoriteGame = async () => {
    if (connectedUser) {
      try {
        const response = await axios.post(
          `/user/${connectedUser.id}/favorites`,
          {
            id: game.game.id,
          },
          {
            headers: {
              Authorization: `Bearer ${connectedUser.token}`,
            },
          }
        );
        setFavoriteGames(response.data.favorites);
        console.log(favoriteGames);
        isAdded(true); // set on true fav state
      } catch (error) {
        console.log("Error has been occured");
      }
    }
  };

  const customStyles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgb(23 23 25 / 82%)",
      zIndex: 1001,
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      padding: 0,
      border: "none",
      background: "transparent",
      zIndex: 1001,
    },
  };

  useEffect(() => {
    const fetchGameReviews = async () => {
      try {
        const response = await axios.get(`/game/${id}/reviews`, {
          headers: {
            Authorization: `Bearer ${connectedUser.token}`,
          },
        });
        setReviews(response.data.reviews); // set reviews
      } catch (error) {
        console.log("Error has been occured");
      }
    };
    fetchGameReviews();
  }, [id, connectedUser, reviews]);

  return isLoading ? (
    <Spinner />
  ) : (
    <main className="Game" id="Game">
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
          {connectedUser && (
            <div className="Game-details--cta">
              <button onClick={handleAddFavoriteGame} className="secondary-btn">
                <span>
                  {t("game_details_favorite_1")} <br />
                  <strong className={added ? "add-favorite" : ""}>
                    {t("game_details_favorite_2")}
                  </strong>
                </span>
                {added ? (
                  <img src={iconFilledBookmark} alt="icon filled bookmark" />
                ) : (
                  <img src={iconBookmark} alt="icon bookmark" />
                )}
              </button>

              <button onClick={openCommentModal} className="secondary-btn">
                <span>
                  {t("game_details_review_1")} <br />
                  {t("game_details_review_2")}
                </span>
                <img src={iconMessage} alt="icon message"></img>
              </button>

              {/* open modal to add a comment */}
              <Modal
                isOpen={modalCommentIsOpen}
                onRequestClose={closeCommentModal}
                style={customStyles}
                contentLabel="Comment Modal"
              >
                <img
                  src={logo}
                  alt="close modal"
                  className="close-modal"
                  onClick={closeCommentModal}
                />
                <AddComment
                  gameid={game.game.id}
                  connectedUser={connectedUser}
                  setCommentIsOpen={setCommentIsOpen}
                />
              </Modal>
            </div>
          )}

          <div>
            {/* Platforms */}
            {game.game.platforms.length > 0 && (
              <div>
                <h4>{t("game_platforms")}</h4>
                <p>
                  {game.game.platforms.map((platform, index) => {
                    return <span key={index}>{platform.platform.name}, </span>;
                  })}
                </p>
              </div>
            )}

            {/* Released date */}
            {game.game.released && (
              <div>
                <h4>{t("game_released")}</h4>
                <p>{game.game.released}</p>
              </div>
            )}

            {/* Publisher */}
            {game.game.publishers.length > 0 && (
              <div>
                <h4>{t("game_Publisher")}</h4>
                <p>
                  {game.game.publishers.map((publisher, index) => {
                    return <span key={index}>{publisher.name} </span>;
                  })}
                </p>
              </div>
            )}
          </div>

          <div>
            {/* Genre */}
            {game.game.genres.length > 0 && (
              <div>
                <h4>{t("game_Genre")}</h4>
                <p>
                  {game.game.genres.map((genre, index) => {
                    return <span key={index}>{genre.name} </span>;
                  })}
                </p>
              </div>
            )}

            {/* Developer */}
            {game.game.developers.length > 0 && (
              <div>
                <h4>{t("game_developers")}</h4>
                <p>
                  {game.game.developers.map((developer, index) => {
                    return <span key={index}>{developer.name} </span>;
                  })}
                </p>
              </div>
            )}

            {/* Rating */}
            <div>
              <h4>{t("game_Rating")}</h4>
              <p>{game.game.rating}</p>
            </div>
          </div>

          {/* Description */}
          {game.game.description_raw && (
            <div>
              <h4>{t("game_description")}</h4>

              <p>
                {isReadMore
                  ? game.game.description_raw.slice(0, 200)
                  : game.game.description_raw}
                <span onClick={toggleReadMore} className="read-or-hide">
                  {isReadMore
                    ? `... ${t("game_desc_more")}`
                    : ` ${t("game_desc_less")}`}
                </span>
              </p>
            </div>
          )}
        </section>

        {game.relatedGames.length > 0 && (
          <section className="Game-related">
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
        {connectedUser && (
          <section className="Game-reviews">
            <h2 className="Game-reviews-title">
              {t("game_reviews")}
              <span className="Game-reviews-nbre">
                {reviews.length > 0 ? reviews.length : "0"}
              </span>
            </h2>
            {reviews.length > 0 ? (
              <div className="Game-reviews-wrapper">
                <h3 className="Game-reviews-subtitle">
                  {t("game_relevant_reviews")}
                </h3>
                {reviews.map((review) => {
                  return (
                    <Review
                      key={review._id}
                      review={review}
                      connectedUser={connectedUser}
                    />
                  );
                })}
              </div>
            ) : (
              <p className="Game-reviews-noReview">{t("game_no_review_msg")}</p>
            )}
          </section>
        )}
      </div>
    </main>
  );
};

export default Game;
