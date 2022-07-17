//как корректно опубликовать страницу так и не догадался. ранее уже делали, вроде через deploy...выдает ошибки
import { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import AddPlacePopup from "./AppPlacePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";
import "../index.css";
import { api } from "../utils/api.js";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Confirmation from "../Confirmation";

function App() {
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setisEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setisEditProfilePopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [selectedCard, setSelectedCard] = useState({});
  const [cards, setCards] = useState([]);

  // получение изначальных карточек
  useEffect(() => {
    api
      .getInitialCards()
      .then((cards) => {
        setCards(cards);
      })
      .catch((err) => console.log("засада: " + err));
  }, []);

  //Функция лайка карточки
  function handleCardLike(card) {
    //Проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    //переключатель лукасов (как должен выглядеть api changeLikeCardStatus из тз неизвестно)
    !isLiked
      ? api.addLike(card._id).then((newCard) => {
          const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
          setCards(newCards);
        })
        .catch((err) => console.log("засада: " + err))
      : api
          .deleteLike(card._id)
          .then((newCard) => {
            const newCards = cards.map((c) =>
              c._id === card._id ? newCard : c
            );
            setCards(newCards);
          })

          .catch((err) => console.log("засада: " + err));
  }

  // функция удаления на карточке
  function handleCardDelete(card) {
    api
      .deleteCard(selectedCard._id)
      .then(() => {
        setCards(cards.filter((item) => item._id !== selectedCard._id));
        closeAllPopups();
      })
      .catch((err) => console.log("засада: " + err));
  }
  // вызов открытия подтверждения удаления
  const handleClickCardDelete = (card) => {
    setSelectedCard(card);
    setIsConfirmationOpen(true);
  };

  // управление нажатием на карточку
  const handleCardClick = (card) => {
    setIsImagePopupOpen(true);
    setSelectedCard(card);
  };

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setisEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setisEditProfilePopupOpen(true);
  }

  // закрытие всех модалок
  function closeAllPopups() {
    setisEditProfilePopupOpen(false);
    setisEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setIsImagePopupOpen(false);
    setIsConfirmationOpen(false);
  }

  // получение данных о пользователе
  useEffect(() => {
    api
      .getProfile()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => console.log("засада: " + err));
  }, []);

  // обновление данных пользователя
  function handleUpdateUser(user) {
    api
      .editProfile(user.name, user.about)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log("засада: " + err));
  }

  // запрос изменения данных аватара
  function handleUpdateAvatar(card) {
    api
      .editProfileImage(card.avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log("засада: " + err));
  }
  // функция создания новой карточки
  function handleAddPlaceSubmit(card) {
    api
      .addCard(card.name, card.link)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log("засада: " + err));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="body">
        <div className="page">
          <Header />
          <Main
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleClickCardDelete}
          ></Main>

          <Footer />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <ImagePopup
            card={selectedCard}
            isOpen={isImagePopupOpen}
            onClose={closeAllPopups}
          />

          <Confirmation
            isOpen={isConfirmationOpen}
            onClose={closeAllPopups}
            onSubmit={handleCardDelete}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
