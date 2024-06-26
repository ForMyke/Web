// ReviewsSection.js
import React from "react";

const ReviewsSection = ({ reviews }) => {
  return (
    <div className="reviews-section text-center my-5">
      <h2>Opiniones de los clientes</h2>
      <div className="reviews-container">
        {reviews.map((review) => (
          <div className="review-card" key={review.id}>
            <h5 className="reviewer-name">{review.name}</h5>
            <p className="review-text">"{review.review}"</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsSection;
