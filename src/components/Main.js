import React, { useContext } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <div className="profile">
        <div className="profile__author">
          <img
            className="profile__avatar"
            alt="профиль пользователя"
            src={currentUser.avatar}
          />
          <div className="profile__overlay" onClick={onEditAvatar}></div>
        </div>
        <div className="profile__info">
          <div className="profile__rename">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              className="profile__edit-button"
              aria-label="изменить"
              type="button"
              onClick={onEditProfile}
            ></button>
          </div>
          <p className="profile__profession">{currentUser.about}</p>
        </div>
        <button
          className="profile__add-button"
          aria-label="добавить карточку"
          type="button"
          onClick={onAddPlace}
        ></button>
      </div>

      <article className="elements">
        {cards.map((item) => (
          <Card
            card={item}
            key={item._id}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          ></Card>
        ))}
      </article>
    </main>
  );
}

export default Main;
