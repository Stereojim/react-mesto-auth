import React from 'react';

//c вариантом подстановки года от системы
function Footer() {
  return (
    <footer className="footer">
    <p className="footer__capture">&copy;  {new Date().getFullYear()} Mesto Russia</p>
  </footer>
  );
}
  
export default Footer;
