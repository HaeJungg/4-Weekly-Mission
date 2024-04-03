import React, { useState } from "react";
import "./LinkCard.scss";
import defaultImage from "../../image/no_image.svg";
import defaultStar from "../../image/state=Default.svg";
import kebab from "../../image/kebab.svg";
import DeleteLink from "../Modal/DeleteLink";
import AddToFolder from "../Modal/AddToFolder";

const LinkCard = ({ card, onDeleteLink, onAddToFolder }) => {
  const [showLinkOperation, setShowLinkOperation] = useState(false);

  const handleToggleLinkOperation = () => {
    setShowLinkOperation(!showLinkOperation);
  };

  return (
    <div className="card">
      <a href={card.url} target="_blank" rel="noopener noreferrer">
        <div className="star-image">
          <img src={defaultStar} alt="별" />
        </div>
        <div className="card-img">
          <img
            src={card.imageSource || card.image_source || defaultImage}
            alt={card.title}
          />
        </div>
        <div className="text-and-menu">
          <div className="text-area">
            <span className="timeAgo">{card.timeAgo}</span>
            <p>{card.description}</p>
            <span className="createdAt">{card.formattedCreatedAt}</span>
          </div>
        </div>
      </a>
      <div className="kebab-menu">
        <button className="kebab-menu-icon" onClick={handleToggleLinkOperation}>
          <img className="kebab-img" src={kebab} alt="메뉴" />
        </button>
        {showLinkOperation && (
          <div className="kebab-list">
            <ul>
              <li onClick={() => onDeleteLink(card.url)}>삭제하기</li>
              <li onClick={() => onAddToFolder(card.url)}>폴더에 추가</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default LinkCard;
