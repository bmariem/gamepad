// ICONS
import like from "../../assets/icons/icon-facebook-like.png";
import dislike from "../../assets/icons/icon-thumbs-down.png";

// SCSS
import "./Review.scss";

const Review = ({ review }) => {
  return (
    <div className="Review">
      <p className="Review-title">{review.title}</p>
      <p className="Review-text">{review.text}</p>
      <div className="Review-author">
        <img
          className="Review-author--avatar"
          src={review.author.avatar}
          alt={review.author.username}
        />
        <p className="Review-author--infos">
          <span className="Review-author--date">
            {new Date(review.date).toLocaleDateString("fr")}
          </span>
          <span className="Review-author--username">
            {review.author.username}
          </span>
        </p>
      </div>
      <div className="Review-vote">
        <div>
          <img src={like} alt="like icon" title="Like this vote" />
        </div>
        <div>
          <img src={dislike} alt="dislike icon" title="Dislike this vote" />
        </div>
      </div>
    </div>
  );
};

export default Review;
