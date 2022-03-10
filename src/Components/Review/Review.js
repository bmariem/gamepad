// Lib
import React, { useState, useEffect } from "react";
import axios from "../../config/api";

// ICONS
import like from "../../assets/icons/icon-facebook-like.png";
import dislike from "../../assets/icons/icon-thumbs-down.png";

// SCSS
import "./Review.scss";

const Review = ({ review, connectedUser }) => {
  // STATES
  const [reviewData, setReviewData] = useState(review);
  const [likesVotes, setLikesVotes] = useState(0);
  const [dislikeVotes, setDislikesVotes] = useState(0);

  useEffect(() => {
    setLikesVotes(votesCounter(reviewData.votes, 1));
    setDislikesVotes(votesCounter(reviewData.votes, -1));
  }, [reviewData]);

  const handleVoteClick = async (value) => {
    try {
      const response = await axios.post(
        `/game/${review.game_id}/review/${review._id}/vote`,
        {
          value: value,
        },
        {
          headers: {
            Authorization: `Bearer ${connectedUser.token}`, // token
          },
        }
      );

      setReviewData(response.data);
    } catch (error) {
      console.log("Catch Comment Error => ", error);
    }
  };

  const votesCounter = (votes, value) => {
    const count = votes.filter((vote) => {
      return vote["value"] === value;
    }).length;
    return count;
  };

  return (
    <div className="Review">
      <p className="Review-title">{reviewData.title}</p>
      <p className="Review-text">{reviewData.text}</p>
      <div className="Review-author">
        <img
          className="Review-author--avatar"
          src={reviewData.author.avatar}
          alt={reviewData.author.username}
        />
        <p className="Review-author--infos">
          <span className="Review-author--date">
            {new Date(reviewData.date).toLocaleDateString("fr")}
          </span>
          <span className="Review-author--username">
            {reviewData.author.username}
          </span>
        </p>
      </div>

      <div className="Review-vote">
        <div className="Review-vote--nbre">
          <img
            src={like}
            alt="like icon"
            title="Like this vote"
            onClick={() => handleVoteClick(1)}
          />
          <span className="like">{likesVotes ? "+" + likesVotes : "0"}</span>
        </div>
        <div className="Review-vote--nbre">
          <img
            src={dislike}
            alt="dislike icon"
            title="Dislike this vote"
            onClick={() => handleVoteClick(-1)}
          />
          <span className="dislike">
            {dislikeVotes ? "-" + dislikeVotes : "0"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Review;
