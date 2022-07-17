import PopupWithForm from "./PopupWithForm";
import React, { useState, useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {

// Подписка на контекст
const currentUser = React.useContext(CurrentUserContext);

// стейты имени и описания
const [name, setName] = useState('');
const [description, setDescription] = useState('');

// прописывание данных в стейты
useEffect(() => {
  setName(currentUser.name);
  setDescription(currentUser.about);
}, [currentUser, isOpen]); 

//использование данных инпута имени
function handleUserName(event) {
  setName(event.target.value)
}

//использование данных инпута описания
function handleUserDescription(event) {
  setDescription(event.target.value)
}

// перезаписывание данных в инпуты
function handleSubmit(e) {
  e.preventDefault();
  onUpdateUser({
    name: name,
    about: description,
  });
} 

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="change-avatar"
      isOpen={isOpen}
      button="Изменить"
      onClose={onClose}
      onSubmit={handleSubmit}
    >
     <label className="popup__label">
            <input
              className="popup__input popup__input_type_author"
              id="author-input"
              type="text"
              minLength="2"
              maxLength="40"
              required
              placeholder="Имя"
              onChange={handleUserName}
              value={name || ''}
            
            />
            <span id="author-input-error" className="popup__error"></span>
          </label>

          <label className="popup__label">
            <input
              className="popup__input popup__input_type_profession"
              name="description"
              id="profession-input"
              type="text"
              minLength="2"
              maxLength="200"
              required
              placeholder="Профессия"
              onChange={handleUserDescription}
              value={description || ''}
           
            />
            <span id="profession-input-error" className="popup__error"></span>
          </label>
    </PopupWithForm>
  );
}