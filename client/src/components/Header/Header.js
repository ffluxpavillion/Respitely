import { useState, useEffect } from 'react';
import './Header.scss';
import { HashLink as Link } from 'react-router-hash-link';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // state to check if the screen is mobile size

  const toggleMenu = () => {
    // toggles menu open and closed
    setMenuOpen(!menuOpen);
  };

  const handleClick = () => {
    // closes menu when link is clicked
    setMenuOpen(false);
  };

  useEffect(() => {
    // enable user to close nav via ESC key
    const closeOnEscape = (e) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
      }
    };

    document.addEventListener('keydown', closeOnEscape);

    return () => document.removeEventListener('keydown', closeOnEscape); // cleanup eventListener
  }, []);

  useEffect(() => {
    // check if the screen is mobile size
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header className='header' id='home'>
      <h3 className='mobile-static-header'> SAFEHAVENTO</h3>

      <nav className='navbar'>
        <div className='navbar__div'>
          <ul className={`navbar__div-ul navMenu ${menuOpen ? 'active' : ''}`}>
            <li onClick={handleClick}>
              <Link to='#home'>
                <h3 className='navbar__div-li nav-stairs__home'>Home</h3>
              </Link>
            </li>
            <li onClick={handleClick}>
              <Link to='#aboutUs'>
                <h3 className='navbar__div-li mobile-nav-item nav-stairs__about-us'>
                  About Us
                </h3>
              </Link>
            </li>
            <li onClick={handleClick}>
              <Link to='#shelters'>
                <h3 className='navbar__div-li nav-stairs__shelters'>
                  Shelters
                </h3>
              </Link>
            </li>
            <li onClick={handleClick}>
              <Link to='#resources'>
                <h3 className='navbar__div-li nav-stairs__resources'>
                  Resources
                </h3>
              </Link>
            </li>
          </ul>
          <div
            className={`navbar__burger menu ${menuOpen ? 'active' : ''}`}
            onClick={toggleMenu}
          >
            <span className='navbar__burger-bar bar'></span>
            <span className='navbar__burger-bar bar'></span>
            <span className='navbar__burger-bar bar'></span>
          </div>
        </div>
      </nav>
    </header>
  );
}
