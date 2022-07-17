function InfoTooltip ({onClose, isOpen, message}) {

  return (
    <div className={`popup popup_type_infotool ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <img src='' alt="" className="popup__authorization-icon" />
        <p className="popup__title-info">hr</p>
        <button type="button" className="popup__button-close" onClick={onClose} />
      </div>
    </div>
  );
}

export default InfoTooltip ;