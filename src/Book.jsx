import React, { useState } from "react";
import "./Book.css";

const Book = ({ image, price, url, onRemove, status }) => {
  const [selected, setSelected] = useState(false);

  const handleClick = () => {
    setSelected(!selected); // Toggle highlight
  };

  return (
    <div
      className={`book ${selected ? "selected" : ""}`}
      onClick={handleClick}
      style={{ position: "relative" }}
    >
      <div className="book-top">
        <button onClick={onRemove} className="remove-button">
          <span>Remove</span>
        </button>

        <div className="book-cover">
          {image ? (
            <img src={image} alt="book-cover" />
          ) : (
            <div className="placeholder" />
          )}
        </div>

        {status === "On Loan" && <div className="status-badge">On Loan</div>}
      </div>

      <div className="book-info">
        {price && <p className="price">{price}</p>}
        {url && (
          <a
            href={url}
            className="learn-more"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn More
          </a>
        )}
      </div>
    </div>
  );
};

export default Book;
