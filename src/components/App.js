import { useEffect, useState } from "react";
import "../index.css";
import api from "../utils/api.js";
import Login from "./Login";
import Register from "./Register";
import {
  Route,
  Redirect,
  Switch,
  useHistory,
} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoToolTip";
import Header from "./Header";
import Main from "./Main";
import ImagePopup from "./ImagePopup";
import AddPlacePopup from "./AppPlacePopup";
import Confirmation from "../Confirmation";
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App() {
  const history = useHistory();

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setisEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setisEditProfilePopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isInfoTooltipShow, setInfoTooltipShow] = useState({
    isOpen: false,
    successful: false,
  });

  const [currentUser, setCurrentUser] = useState({});
  const [selectedCard, setSelectedCard] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [profileEmail, setProfileEmail] = useState("");

  // проверка на наличие токена
  useEffect(
    () => {
      const jwt = localStorage.getItem("jwt");
      if (jwt) {
        api
          .getProfile(jwt)
          .then((data) => {
            if (data) {
              setProfileEmail(data.email);
              setLoggedIn(true);
              history.push("/");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    [
      /* history */
    ]
  );

  useEffect(() => {
    if (loggedIn) {
      api
        .getUserInfo()
        .then((res) => {
          setCurrentUser(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  // получение изначальных карточек
  useEffect(() => {
    if (loggedIn) {
      api
        .getInitialCards()
        .then((cards) => {
          setCards(cards);
        })
        .catch((err) => console.log("засада: " + err));
    }
  }, [loggedIn]);

  function handleInfoTooltip(res) {
    setInfoTooltipShow({ ...isInfoTooltipShow, isOpen: true, successful: res });
  }

  function handleLogin({ email, password }) {
    api
      .login(email, password)
      .then((res) => {
        if (res.token) {
          setProfileEmail(email);
          localStorage.setItem("jwt", res.token);
          setLoggedIn(true);
          /* history.push('/'); */
        }
      })
      .catch((err) => {
        handleInfoTooltip(false);
        console.log(err);
      });
  }

  function handleRegister({ email, password }) {
    api
      .register(email, password)
      .then((data) => {
        if (data) {
          handleInfoTooltip(true);
          /* history.push('/sign-in'); */
        }
      })
      .catch((err) => {
        handleInfoTooltip(false);
        console.log(err);
      });
  }

  //Функция лайка карточки
  function handleCardLike(card) {
    //Проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    //переключатель лукасов (как должен выглядеть api changeLikeCardStatus из тз неизвестно)
    !isLiked
      ? api
          .addLike(card._id)
          .then((newCard) => {
            const newCards = cards.map((c) =>
              c._id === card._id ? newCard : c
            );
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
    setInfoTooltipShow({ isOpen: false, successful: false });
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

  function handleLogin({ email, password }) {
    api
      .login(email, password)
      .then((res) => {
        if (res.token) {
          setProfileEmail(email);
          localStorage.setItem("jwt", res.token);
          setLoggedIn(true);
          /* history.push('/') */
        }
      })
      .catch((err) => {
        handleInfoTooltip(false);
        console.log(err);
      });
  }

  function handleRegister({ email, password }) {
    api
      .register(email, password)
      .then((data) => {
        if (data) {
          handleInfoTooltip(true);
          /* history.push('/sign-in'); */
        }
      })
      .catch((err) => {
        handleInfoTooltip(false);
        console.log(err);
      });
  }

  function signOut() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    setProfileEmail("");
    /*  history.push('/sign-in'); */
  }

  function handleLogin() {
    setLoggedIn(true);
  }

  return (
    <div className="body">
      <div className="page">
        <CurrentUserContext.Provider value={currentUser}>
          <Header
            loggedIn={loggedIn}
            email={profileEmail}
            onSignOut={signOut}
          />
          <Switch>
            <ProtectedRoute
              exact
              path="/"
              loggedIn={loggedIn}
              component={Main}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleClickCardDelete}
            />

            <Route path="/sign-up">
              <Register onRegister={handleRegister} />
            </Route>
            <Route path="/sign-in">
              <Login onLogin={handleLogin} />
            </Route>
            <Route>
              {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
            </Route>
          </Switch>
          <InfoTooltip onClose={closeAllPopups} status={isInfoTooltipShow} />
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
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default App;
