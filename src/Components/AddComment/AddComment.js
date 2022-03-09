// Lib
import React, { useState } from "react";
import axios from "../../config/api";

// SCSS
import "./AddComment.scss";

const AddComment = ({ gameid, connectedUser, setCommentIsOpen }) => {
  // STATES
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const handleCommitSubmit = async (event) => {
    // Adding a comment for a logged in user
    if (connectedUser) {
      try {
        event.preventDefault();
        setErrorMessage("");
        const response = await axios.post(
          `/game/${gameid}/review`,
          {
            title: reviewTitle,
            text: reviewText,
          },
          {
            headers: {
              Authorization: `Bearer ${connectedUser.token}`, // token
            },
          }
        );
        setCommentIsOpen(false);
        console.log(response.data);
      } catch (error) {
        console.log("Catch Comment Error => ", error.response);
        if (error.response.status === 400) {
          setErrorMessage(error.response.data.message);
        }
      }
    }
  };

  return (
    <div className="Comment">
      <div className="container">
        <div className="Comment-form">
          <h2 className="Comment-title">Write a Review</h2>
          <form onSubmit={handleCommitSubmit}>
            <input
              required
              placeholder="Review title..."
              onChange={(event) => {
                setReviewTitle(event.target.value);
                setErrorMessage("");
              }}
            />

            <textarea
              required
              rows="5"
              placeholder="Review text..."
              onChange={(event) => {
                setReviewText(event.target.value);
                setErrorMessage("");
              }}
            />

            {errorMessage && (
              <span className="error-message">{errorMessage}</span>
            )}

            <button className="primary-btn" type="submit">
              Publish
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddComment;
