import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  //подписались на контент
  const currentUser = useContext(CurrentUserContext);

  // проверили, являемся ли хозяином карточки
  const isOwn = card.owner._id === currentUser._id;

  //создали класс для видимости иконки корзины и функцию нажатия
  const cardDeleteButtonClassName = `card__remove-button ${
    isOwn ? "card__remove-button_visible" : ""
  }`;

  // проверили свои лайки на карточке
  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  //создали класс для видимости иконки лайка и функцию нажатия
  const cardLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_active" : ""
  }`;

  //управление событиями
  const handleCardClick = () => {
    onCardClick(card);
  };

  const handleLikeClick = () => {
    onCardLike(card);
  };

  const handleCardDelete = () => {
    onCardDelete(card);
  };

  return (
    <div className="card">
      <img
        className="card__image"
        src={card.link}
        alt={card.name}
        onClick={handleCardClick}
      />
      <h2 className="card__place-name">{card.name}</h2>
      <button
        className={cardLikeButtonClassName}
        type="button"
        aria-label="поставить лайк"
        onClick={handleLikeClick}
      ></button>
      <span className="card__like-count">{card.likes.length}</span>
      <button
        className={cardDeleteButtonClassName}
        type="button"
        aria-label="удалить карточку"
        onClick={handleCardDelete}
      ></button>
    </div>
  );
}
