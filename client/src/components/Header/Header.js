import { useState, useEffect } from 'react';
import './Header.scss';
import Logo from '../../assets/logo/SafeHavenTO.svg';
import { HashLink as Link } from 'react-router-hash-link';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => { // toggles menu open and closed
    setMenuOpen(!menuOpen);
  };

  const handleClick = () => { // closes menu when link is clicked
    setMenuOpen(false);
  };

  useEffect(() => { // enable user to close nav via ESC key
    const closeOnEscape = (e) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
      }
    };

    document.addEventListener('keydown', closeOnEscape);

    return () => document.removeEventListener('keydown', closeOnEscape); // cleanup eventListener
  }, []);

  return (
    <header className="header" id="home">
      <nav className="navbar">
        <div className="navbar__div">
          <img className="navbar__div-logo" src={Logo} alt="Logo"></img>
          <ul className={`navbar__div-ul navMenu ${menuOpen ? 'active' : ''}`}>
            <li onClick={handleClick}><Link to='#home'><h1 className="navbar__div-li">Home</h1></Link></li>
            <li onClick={handleClick}><Link to='#aboutUs'><h1 className="navbar__div-li">About Us</h1></Link></li>
            <li onClick={handleClick}><Link to='#shelters'><h1 className="navbar__div-li">Shelters</h1></Link></li>
            <li onClick={handleClick}><Link to='#resources'><h1 className="navbar__div-li">Resources</h1></Link></li>
          </ul>
          <div className={`navbar__burger-menu menu ${menuOpen ? 'active' : ''}`} onClick={toggleMenu}>
            <span className='navbar__burger-bar bar'></span>
            <span className='navbar__burger-bar bar'></span>
            <span className='navbar__burger-bar bar'></span>
          </div>
        </div>
      </nav>
    </header>
  );
}
