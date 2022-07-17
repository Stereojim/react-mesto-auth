export default function ImagePopup({ card, isOpen, onClose }) {
  return (
    <div className={`popup popup_type_picture-open ${isOpen && "popup_opened"} `}>
      <figure className="popup__figure">
        <button
          className="popup__button-close popup__button-close_type_picture-open"
          aria-label="закрыть"
          type="button"
          onClick={onClose}
        ></button>
        <img
          className="popup__picture"
          src={card ? card.link : ""}
          alt={card ? card.name : ""}
        />
        <figcaption className="popup__picture-title">
          {card ? card.name : ""}
        </figcaption>
      </figure>
    </div>
  );
}
