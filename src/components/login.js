import React, { useState } from "react";

function Login({ onLogin }) {
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

    if (!profileData.password || !profileData.email) {
      return;
    }

    onLogin(profileData)
  }
    
  return (
    <section className="authorization-page" >
      <h1 className="authorization-page__title">Вход</h1>
      <form className="authorization-page__form" onSubmit={handleSubmit}>
        <input className="authorization-page__input" id="email"  name="email" type="email" placeholder="Email" onChange={handleChange}  value={profileData.email} minLength="2" maxLength="40" required/>
        <input className="authorization-page__input"  id="password" name="password" type="password"  placeholder="Пароль" onChange={handleChange} value={profileData.password} minLength="2" maxLength="40" required/>
        <button className="authorization-page__submit">Войти</button>
      </form>
    </section>
  );
}

export default Login;
