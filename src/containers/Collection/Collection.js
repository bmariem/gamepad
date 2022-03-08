// Lib
import React, { useState, useEffect } from "react";
import axios from "../../config/api";

// ICONS
import iconFilledBookmark from "../../assets/icons/icon-filled-red-bookmark.png";

// Components
import Spinner from "../../Components/UI/Spinner/Spinner";

//SCSS
import "./Collection.scss";

const Collection = ({ token }) => {
  // STATES
  const [isLoading, setIsLoading] = useState(true);
  const [favoriteGames, setFavoriteGames] = useState([]);
  const [collection, setcollection] = useState([]);
  useEffect(() => {
    const fetchfavoriteGames = async () => {
      if (token) {
        try {
          const response = await axios.get(`/user/collections`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setFavoriteGames(response.data.favorites.favoriteGames);
          setIsLoading(false);
        } catch (error) {
          console.log(error.message);
        }
      }
    };
    fetchfavoriteGames();
  }, [token]);

  const handleDeleteFavoriteGame = async (favGameId) => {
    if (token) {
      try {
        const response = await axios.post(
          `/user/collections`,
          {
            id: favGameId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        setcollection(response.data.favorites.favoriteGames);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return isLoading ? (
    <Spinner />
  ) : (
    <div className="Collection">
      <div className="container">
        <h2>My Collection</h2>

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
                  title={`Remove ${favoriteGame.name} from my collection`}
                  onClick={() => handleDeleteFavoriteGame(favoriteGame.id)}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Collection;
