import { useState, useEffect } from 'react';
import './Header.scss';
import { HashLink as Link } from 'react-router-hash-link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // state to check if the screen is mobile size
  const [lastScrollY, setLastScrollY] = useState(window.scrollY);
  const [navBarVisible, setNavBarVisible] = useState(true);

  const toggleMenu = () => {
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

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setNavBarVisible(currentScrollY < lastScrollY || currentScrollY <= 10); // Show when scrolling up or at the top of the page
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`header ${
        navBarVisible ? 'visible' : menuOpen ? 'visible' : 'hidden'
      }`}
      id='home'
    >
      <div className='header__container'>
        <h3 className='header-brand'>
          <a href='https://www.safehavento.org'>SAFEHAVENTO</a>
        </h3>
        <div
          className={`navbar__burger menu  ${menuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
        >
          <div className='active-menu__fullscreen'>
            <span className='navbar__burger-bar bar'></span>
            <span className='navbar__burger-bar bar'></span>
            <span className='navbar__burger-bar bar'></span>
          </div>
        </div>
      </div>
      <nav className='navbar'>
        <div className='navbar__div'>
          <ul className={`navbar__div-ul navMenu ${menuOpen ? 'active' : ''}`}>
            <li onClick={handleClick}>
              <Link to='#landing'>
                <h3 className='navbar__div-li nav-stairs__home'>Home ⟩⟩</h3>
              </Link>
            </li>
            <li onClick={handleClick}>
              <Link to='#shelters'>
                <h3 className='navbar__div-li nav-stairs__shelters'>
                  SHELTERS ⟩⟩
                </h3>
              </Link>
            </li>
            <li onClick={handleClick}>
              <Link to='#dropInMeals'>
                <h3 className='navbar__div-li nav-stairs__about-us'>
                  DROP-IN MEALS ⟩⟩
                </h3>
              </Link>
            </li>
            <li onClick={handleClick}>
              <Link to='/drop-in-map'>
                <h3 className='navbar__div-li nav-stairs__about-us'>
                  EXPLORE DROP-IN MAP ⟩⟩
                </h3>
              </Link>
            </li>
            <li onClick={handleClick}>
              <Link to='#resources'>
                <h3 className='navbar__div-li nav-stairs__resources'>
                  RESOURCES ⟩⟩
                </h3>
              </Link>
            </li>
            <li onClick={handleClick}>
              <Link to='#aboutUs'>
                <h3 className='navbar__div-li nav-stairs__about-us'>
                  ABOUT US ⟩⟩
                </h3>
              </Link>
            </li>
            <div className='navbar__socials-container'>
              <li className='navbar__socials-item'>
                <a
                  className='navbar__socials-link'
                  href='https://www.linkedin.com/in/arjunsahjpaul/ '
                  target='_blank'
                  rel='noreferrer'
                >
                  <FontAwesomeIcon icon={faLinkedin} />
                </a>
              </li>
              <li className='navbar__socials-item'>
                <a
                  className='navbar__socials-link'
                  href='https://github.com/ffluxpavillion/SafeHavenTO'
                  target='_blank'
                  rel='noreferrer'
                >
                  <FontAwesomeIcon icon={faGithub} />
                </a>
              </li>
              <li className='navbar__socials-item'>
                <a
                  className='navbar__socials-link'
                  href='mailto:contact@safehavento.org'
                  target='_blank'
                  rel='noreferrer'
                >
                  <FontAwesomeIcon icon={faEnvelope} />
                </a>
              </li>
            </div>
          </ul>
        </div>
      </nav>
    </header>
  );
}
