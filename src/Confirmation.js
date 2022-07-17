import PopupWithForm from "./components/PopupWithForm";

export default function Confirmation({ isOpen, onClose, onSubmit }) {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSubmit();
  };

  return (
    <PopupWithForm
      title="Вы уверены?"
      name="remove-card"
      isOpen={isOpen}
      button="Удалить"
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <span className="popup__error" id="link-input-add-error"></span>
    </PopupWithForm>
  );
}
