import React, { useEffect } from 'react';

export default function InfoTooltip({ onClose, status: { isOpen, successful } }) {

  useEffect(() => {
    if (!isOpen) return;
    const handleEscapeClose = (evt) => {
      if (evt.key === 'Escape') {
        onClose()
      };
    };
    document.addEventListener('keyup', handleEscapeClose);
    return () => {
      document.removeEventListener('keyup', handleEscapeClose);
    };
  }, [isOpen, onClose])

  return (
    <div className={`popup ${isOpen && 'popup_opened'}`}>
      <div className="popup__info">
        <div className={`popup__status ${successful ? 'popup__status_success' : 'popup__status_fail'}`}></div>
        <h2 className="popup__title popup__title_center">{successful ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте еще раз.'}</h2>
        <button type="button" onClick={onClose} className="popup__close-button popup__close-button_info"></button>
      </div>
      <div onClick={onClose} className="popup__overlay"></div>
    </div>
  );
}