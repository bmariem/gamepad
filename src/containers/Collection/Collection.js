// Lib
import React, { useState, useEffect } from "react";
import axios from "../../config/api";
import { t } from "i18next";

// ICONS
import iconFilledBookmark from "../../assets/icons/icon-filled-red-bookmark.png";

// Components
import Spinner from "../../Components/UI/Spinner/Spinner";

//SCSS
import "./Collection.scss";

const Collection = ({ connectedUser }) => {
  // STATES
  const [isLoading, setIsLoading] = useState(true);
  const [favoriteGames, setFavoriteGames] = useState([]);

  useEffect(() => {
    const fetchfavoriteGames = async () => {
      if (connectedUser) {
        try {
          const response = await axios.get(
            `/user/${connectedUser.id}/favorites`,
            {
              headers: {
                Authorization: `Bearer ${connectedUser.token}`,
              },
            }
          );
          setFavoriteGames(response.data.favorites);
          setIsLoading(false);
        } catch (error) {
          console.log(error.message);
        }
      }
    };
    fetchfavoriteGames();
  }, [connectedUser, favoriteGames]);

  const handleDeleteFavoriteGame = async (favGameId) => {
    if (connectedUser) {
      try {
        await axios.delete(`/user/${connectedUser.id}/favorite/${favGameId}`, {
          headers: {
            Authorization: `Bearer ${connectedUser.token}`,
          },
        });
      } catch (error) {
        console.log("Error has been occured");
      }
    }
  };

  return isLoading ? (
    <Spinner />
  ) : (
    <div className="Collection">
      <div className="container">
        <h2>{t("collection_title")}</h2>

        {favoriteGames.length > 0 ? (
          <div className="cards">
            {favoriteGames.map((favoriteGame) => {
              return (
                <div
                  key={favoriteGame.id}
                  className="card"
                  style={{
                    backgroundImage: `url(${favoriteGame.background_image})`,
                  }}
                >
                  <h3>{favoriteGame.name}</h3>
                  <img
                    src={iconFilledBookmark}
                    alt="favorite game"
                    className="tag"
                    onClick={() => handleDeleteFavoriteGame(favoriteGame.id)}
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="Collection-empty">
            <p>{t("collection_no_fav")}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Collection;
