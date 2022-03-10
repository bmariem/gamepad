// Lib
import React, { useState } from "react";
import axios from "../../config/api";
import { t } from "i18next";

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
          <h2 className="Comment-title">{t("addReview_main_title")}</h2>
          <form onSubmit={handleCommitSubmit}>
            <input
              required
              placeholder={t("addReview_title")}
              onChange={(event) => {
                setReviewTitle(event.target.value);
                setErrorMessage("");
              }}
            />

            <textarea
              required
              rows="5"
              placeholder={t("addReview_description")}
              onChange={(event) => {
                setReviewText(event.target.value);
                setErrorMessage("");
              }}
            />

            {errorMessage && (
              <span className="error-message">{errorMessage}</span>
            )}

            <button className="primary-btn" type="submit">
              {t("addReview_CTA")}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddComment;
