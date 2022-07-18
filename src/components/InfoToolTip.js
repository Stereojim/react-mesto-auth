export default function InfoTooltip({
  onClose,
  status: { isOpen, successful },
}) {
  return (
    <div className={`popup ${isOpen && "popup_opened"}`}>
      <div className="popup__login">
        <div
          className={`popup__authorization ${
            successful
              ? "popup__authorization-image_success"
              : "popup__authorization-image_failed"
          }`}
        ></div>
        <h2 className="popup__authorization-title">
          {successful
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте еще раз."}
        </h2>
      </div>
      <button
        type="button"
        onClick={onClose}
        className="popup__button-close popup__button-close_type_login"
      ></button>
    </div>
  );
}
