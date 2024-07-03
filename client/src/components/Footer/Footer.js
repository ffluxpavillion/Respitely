import React from 'react';
import './Footer.scss';
import FooterImage from '../../assets/images/SafeHavenTO_graphic-art-community-1.png';
import { ReactComponent as Logo } from '../../assets/logo/SafeHavenTO.svg'; // Import SVG as a React component
import BuyMeACoffee from '../BuyMeACoffee/BuyMeACoffee';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <>
      <footer className='footer'>
        <div className='footer-left'>
          <h3 className='footer-brand'>RESPITELY·TO</h3>
          <div className='footer__list'>
            <ul className='footer__list-ul'>
              <li className='footer__list-li'>
                <a href='#home' className='footer__list-a'>
                  <h3 className='footer__item'>Home</h3>
                </a>
              </li>
              <li className='footer__list-li'>
                <a href='#shelters' className='footer__list-a'>
                  <h3 className='footer__item'>Shelters</h3>
                </a>
              </li>
              <li className='footer__list-li'>
                <a href='#dropInMeals' className='footer__list-a'>
                  <h3 className='footer__item'>Drop-In Meals</h3>
                </a>
              </li>
              <li className='footer__list-li'>
                <a href='/drop-in-map' className='footer__list-a'>
                  <h3 className='footer__item'>Explore Drop-In Map</h3>
                </a>
              </li>
              <li className='footer__list-li'>
                <a href='#resources' className='footer__list-a'>
                  <h3 className='footer__item'>Resources</h3>
                </a>
              </li>
              <li className='footer__list-li'>
                <a href='#aboutUs' className='footer__list-a'>
                  <h3 className='footer__item'>About Us</h3>
                </a>
              </li>
            </ul>
            <ul className='footer__list-ul'>
              <br />
              <br />
              <br />
              <br />

              <li className='footer__list-li'>
                <Link to='/cookie-policy' className='footer__list-a'>
                  <h3 className='footer__item legal-item'>Cookie Policy</h3>
                </Link>
              </li>
              <li className='footer__list-li'>
                <Link to='/terms-of-use' className='footer__list-a'>
                  <h3 className='footer__item legal-item'>Terms of Use</h3>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className='footer-middle'>
          <div className='footer-div__logo-container'>
            {/* <Logo className='footer__logo-svg' /> */}
          </div>
        </div>

        <div className='footer-right'>
          <div className='footer-right__socials'>
            <a
              className='footer-right__social-links'
              href='https://www.linkedin.com/in/arjunsahjpaul/ '
              target='_blank'
              rel='noreferrer'
            >
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
            <a
              className='footer-right__social-links'
              href='https://github.com/ffluxpavillion/SafeHavenTO'
              target='_blank'
              rel='noreferrer'
            >
              <FontAwesomeIcon icon={faGithub} />
            </a>
            <a
              className='footer-right__social-links'
              href='mailto:contact@safehavento.org'
              target='_blank'
              rel='noreferrer'
            >
              <FontAwesomeIcon icon={faEnvelope} />
            </a>
          </div>
        </div>
      </footer>
      <div className='footer-bottom'>
        <span className='copyright-disclaimer'>
          &copy; 2024 Respitely. All rights reserved.
        </span>
      </div>
    </>
  );
}
