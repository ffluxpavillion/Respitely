import React from 'react';
import './Footer.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

export default function Footer() {
  return (
    <>
      <footer className='footer'>
        <div className='footer-left'>
          <h3 className='footer-brand'>
            <a href='/' aria-label='Link to Respitely Homepage'>
              RESPITELY·TO
            </a>
          </h3>
          <div className='footer__list'>
            <ul className='footer__list-ul'>
              <li className='footer__list-li'>
                <a
                  href='#home'
                  className='footer__list-a'
                  aria-label='Link to Respitely Homepage'
                >
                  <h3 className='footer__item'>Home</h3>
                </a>
              </li>
              <li className='footer__list-li'>
                <a
                  href='#shelters'
                  className='footer__list-a'
                  aria-label='Link to Shelters'
                >
                  <h3 className='footer__item'>Shelters</h3>
                </a>
              </li>
              <li className='footer__list-li'>
                <a
                  href='#dropInMeals'
                  className='footer__list-a'
                  aria-label='Link to Drop-In Meals'
                >
                  <h3 className='footer__item'>Drop-In Meals</h3>
                </a>
              </li>
              <li className='footer__list-li'>
                <RouterLink
                  to='/drop-in-map'
                  className='footer__list-a'
                  aria-label='Link to Drop-In Map'
                >
                  <h3 className='footer__item'>Explore Drop-In Map</h3>
                </RouterLink>
              </li>

              <li className='footer__list-li'>
                <a
                  href='#resources'
                  className='footer__list-a'
                  aria-label='Link to Resources'
                >
                  <h3 className='footer__item'>Resources</h3>
                </a>
              </li>
              <li className='footer__list-li'>
                <a
                  href='#about-us'
                  className='footer__list-a'
                  aria-label='Link to About Us'
                >
                  <h3 className='footer__item'>About Us</h3>
                </a>
              </li>
            </ul>
            <ul className='footer__list-ul'>
              <br />

              <li className='footer__list-li'>
                <RouterLink
                  to='/cookie-policy'
                  className='footer__list-a'
                  aria-label='Link to Cookie Policy'
                >
                  <h3 className='footer__item legal-item'>Cookie Policy</h3>
                </RouterLink>
              </li>
              <li className='footer__list-li'>
                <RouterLink
                  to='/terms-of-use'
                  className='footer__list-a'
                  aria-label='Link to Terms of Use'
                >
                  <h3 className='footer__item legal-item'>Terms of Use</h3>
                </RouterLink>
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
              aria-label='Link to Founder LinkedIn Profile'
            >
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
            <a
              className='footer-right__social-links'
              href='https://github.com/ffluxpavillion/Respitely'
              target='_blank'
              rel='noreferrer'
              aria-label='Link to GitHub Repository'
            >
              <FontAwesomeIcon icon={faGithub} />
            </a>
            <a
              className='footer-right__social-links'
              href='mailto:contact@respitely.org'
              target='_blank'
              rel='noreferrer'
              aria-label='Send Mail to contact@respitely.org'
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
