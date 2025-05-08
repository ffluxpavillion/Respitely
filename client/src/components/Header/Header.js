import { useState, useEffect } from 'react';
import './Header.scss';
import { HashLink as Link } from 'react-router-hash-link';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { useAuth0 } from '@auth0/auth0-react';
import UserLoginMenu from '../UserLoginMenu/UserLoginMenu';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // state to check if the screen is mobile size
  const [isTablet, setIsTablet] = useState(window.innerWidth < 1279); // state to check if the screen is tablet size
  const [lastScrollY, setLastScrollY] = useState(window.scrollY);
  const [navBarVisible, setNavBarVisible] = useState(true);
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleHashLinkClick = (hash) => {
    setMenuOpen(false);
    // navigate('/', { replace: true });

    setTimeout(() => {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100); // Timeout to ensure the page has navigated
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
      setIsTablet(window.innerWidth < 1279);
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
        navBarVisible ? 'visible' : menuOpen ? 'visible' : 'visible'
      }`}
    >
    {isMobile || isTablet ?
      <>
      <div className='header__container'>
        <h3 className='header-brand'>
          <a href='/' aria-label='Link to Respitely Homepage'>
            RESPITELY·TO
          </a>
        </h3>
        {/* <span className=''>{<UserLoginMenu />}</span> // LOGIN BUTTON */}
        <div
          className={`navbar__burger menu  ${menuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
        >
          <div className='active-menu__fullscreen' aria-label='Toggle Nav Menu'>
            <span className='navbar__burger-bar bar'></span>
            <span className='navbar__burger-bar bar'></span>
            <span className='navbar__burger-bar bar'></span>
          </div>
        </div>
      </div>

      <nav className='navbar'>
        <div className='navbar__div'>
          <ul className={`navbar__div-ul navMenu ${menuOpen ? 'active' : ''}`}>
            <li onClick={() => handleHashLinkClick('')}>
              <Link smooth to='/' aria-label='Link to Respitely Homepage'>
                <h3 className='navbar__div-li '>Home ⟩⟩</h3>
              </Link>
            </li>
            <li onClick={() => handleHashLinkClick('#shelters')}>
              <Link smooth to='/#shelters' aria-label='Link to Shelters'>
                <h3 className='navbar__div-li '>SHELTERS ⟩⟩</h3>
              </Link>
            </li>
            <li onClick={() => handleHashLinkClick('#dropInMeals')}>
              <Link
                smooth
                to='/#drop-in-meals'
                aria-label='Link to Drop In Meals'
              >
                <h3 className='navbar__div-li '>DROP-IN MEALS ⟩⟩</h3>
              </Link>
            </li>
            <li onClick={toggleMenu}>
              <RouterLink to='/drop-in-map' aria-label='Link to Drop-In Map'>
                <h3 className='navbar__div-li '>DROP-IN MAP ⟩⟩</h3>
              </RouterLink>
            </li>
            <li onClick={() => handleHashLinkClick('#resources')}>
              <Link smooth to='/#resources' aria-label='Link to Resources'>
                <h3 className='navbar__div-li '>RESOURCES ⟩⟩</h3>
              </Link>
            </li>
            <li onClick={() => handleHashLinkClick('#about-us')}>
              <Link smooth to='/#about-us' aria-label='Link to About Us'>
                <h3 className='navbar__div-li '>ABOUT ⟩⟩</h3>
              </Link>
            </li>

            <br />
            <h3 className='navbar__div-li coming-soon'>
              (<p className='coming-soon-text'>Under Development</p>)
            </h3>
            {/* <li onClick={handleClick}> */}
            {/* <RouterLink to='/register' aria-label='Link to About Us'> */}
            <h3 className='navbar__div-li coming-soon'>
              <i>DROP-IN PROVIDER SIGNUP ⟩⟩</i>
            </h3>
            {/* </RouterLink> */}
            {/* </li> */}
            {/* <li onClick={handleClick}> */}
            {/* <RouterLink to='/login' aria-label='Link to About Us'> */}
            <h3 className='navbar__div-li coming-soon'>
              <i>DROP-IN PROVIDER LOGIN ⟩⟩</i>
            </h3>
            {/* </RouterLink> */}
            {/* </li> */}
            <div className='navbar__socials-container'>
              <li className='navbar__socials-item'>
                <a
                  className='navbar__socials-link'
                  href='https://www.linkedin.com/in/arjunsahjpaul/ '
                  target='_blank'
                  rel='noreferrer'
                  aria-label='Link to Founder LinkedIn Profile'
                >
                  <FontAwesomeIcon icon={faLinkedin} />
                </a>
              </li>
              <li className='navbar__socials-item'>
                <a
                  className='navbar__socials-link'
                  href='https://github.com/ffluxpavillion/Respitely'
                  target='_blank'
                  rel='noreferrer'
                  aria-label='Link to Github Repository'
                >
                  <FontAwesomeIcon icon={faGithub} />
                </a>
              </li>
              <li className='navbar__socials-item'>
                <a
                  className='navbar__socials-link'
                  href='mailto:contact@respitely.org'
                  target='_blank'
                  rel='noreferrer'
                  aria-label='Link to Email Respitely'
                >
                  <FontAwesomeIcon icon={faEnvelope} />
                </a>
              </li>
            </div>
          </ul>
        </div>
      </nav>
      </>
      :
      <>
      <div className='header__container'>
        <h3 className='header-brand'>
          <a href='/' aria-label='Link to Respitely Homepage'>
            RESPITELY·TO
          </a>
        </h3>
        <div
          className={`navbar__burger menu`}
        >
          <nav>
            <div className='navbar__div-desktop'>
              <ul className={'navbar__ul-desktop'}>

              <li onClick={() => handleHashLinkClick('#shelters')}>
                <Link smooth to='/#shelters' aria-label='Link to Shelters'>
                  <h3 className='navbar__div-li'>SHELTERS</h3>
                </Link>
              </li>
              <li onClick={() => handleHashLinkClick('#dropInMeals')}>
                <Link
                  smooth
                  to='/#drop-in-meals'
                  aria-label='Link to Drop In Meals'
                >
                  <h3 className='navbar__div-li'>DROP-IN MEALS</h3>
                </Link>
              </li>
              <li onClick={toggleMenu}>
                <RouterLink to='/drop-in-map' aria-label='Link to Drop-In Map'>
                  <h3 className='navbar__div-li'>DROP-IN MAP</h3>
                </RouterLink>
              </li>
              <li onClick={() => handleHashLinkClick('#resources')}>
                <Link smooth to='/#resources' aria-label='Link to Resources'>
                  <h3 className='navbar__div-li'>RESOURCES</h3>
                </Link>
              </li>
              <li onClick={() => handleHashLinkClick('#about-us')}>
                <Link smooth to='/#about-us' aria-label='Link to About Us'>
                  <h3 className='navbar__div-li'>ABOUT</h3>
                </Link>
              </li>

              {/* <span className='divider'>||</span>

              <h3 className='navbar__div-li coming-soon'>
                (<p className='coming-soon-text'>Under Development</p>)
              </h3>
              <li onClick={handleClick}>
              <RouterLink className='routerLink' to='/register' aria-label='Link to About Us'>
              <h3 className='navbar__div-li coming-soon'>
                <i className='navbar__div-li '>SIGNUP</i>
              </h3>
              </RouterLink>
              </li>
              <li onClick={handleClick}>
              <RouterLink to='/login' aria-label='Link to About Us'>
              <h3 className='navbar__div-li coming-soon'>
                <i className='navbar__div-li'>LOGIN</i>
              </h3>
              </RouterLink>
              </li>
              <span className=''>{<UserLoginMenu />}</span> */}
            </ul>
            </div>
          </nav>
        </div>
      </div>
      </>
      }
    </header>
  );
}
