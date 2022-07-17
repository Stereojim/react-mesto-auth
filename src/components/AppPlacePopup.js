import React, { useState, useEffect } from 'react';
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
 
  const [cardTitle, setCardTitle] = useState('');
  const [cardLink, setCardLink] = useState('');

  function handleCardTitle(event) {
    setCardTitle(event.target.value)
  }

  function handleCardLink(event) {
    setCardLink(event.target.value)
  }

  function handleSubmit(event) {
    event.preventDefault();

    onAddPlace({
      name: cardTitle,
      link: cardLink
    })
  }

  useEffect(() => {
    setCardLink('')
    setCardTitle('')
  }, [isOpen])

  return (
    <PopupWithForm
      title="Новое место"
      name="create-place"
      isOpen={isOpen}
      button="Создать"
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        className="popup__input popup__input_type_name"
        name="name"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
        onChange={handleCardTitle}
        value={cardTitle || ''}
      />
      <span className="popup__error" id="add-name-input-error"></span>
      <input
        type="url"
        className="popup__input popup__input_type_link"
        name="link"
        placeholder="Ссылка на картинку"
        required
        onChange={handleCardLink}
        value={cardLink || ''}
      />
      <span className="popup__error" id="link-input-add-error"></span>
    </PopupWithForm>
  );
}
