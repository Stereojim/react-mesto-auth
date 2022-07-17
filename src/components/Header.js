import headerLogo from '../images/Logo-header.svg';
import React from 'react';



function Header() {
  return (
    <div className="header">
    <img
      className="header__logo"
      src={headerLogo}
      alt="логотип место"
    />
  </div>
  );
}
  
export default Header;
