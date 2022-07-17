import React, { useState } from "react";
import { Link } from 'react-router-dom';

function Register({ onRegister }) {

  const initialData = {
    email: '',
    password: '',
  }

  const [profileData, setProfileData] = useState(initialData);

  const handleChange = (e) => {
    const { name, value } = e.target
    setProfileData(profileData => ({
      ...profileData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    onRegister(profileData)
  }
//управление авторизацией

  return (
    <section className="authorization-page">
      <h1 className="authorization-page__title">Регистрация</h1>
      <form className="authorization-page__form" onSubmit={handleSubmit}>
      <input className="authorization-page__input" id="email"  name="email" type="email" placeholder="Email" onChange={handleChange}  value={profileData.email} minLength="2" maxLength="40" required/>
        <input className="authorization-page__input"  id="password" name="password" type="password"  placeholder="Пароль" onChange={handleChange} value={profileData.password} minLength="2" maxLength="40" required/>
        <button className="authorization-page__submit">Зарегистрироваться</button>
        <Link to="/sign-in" className="authorization-page__register-link">Уже зарегистрированы? Войти</Link>
      </form>
    </section>
  );
}


export default Register;
