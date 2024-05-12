import './Footer.scss';
import FooterImage from '../../assets/images/SafeHavenTO_graphic-art-community-1.png';
import Logo from '../../assets/logo/SafeHavenTO.svg';

export default function Footer() {
  return (
    <>
      <div
        className='hero'
        style={{ backgroundImage: `url(${FooterImage})` }}
      />

      <footer className='footer'>
        <div className='footer-left'>
          <h3 className='footer-brand'>SAFEHAVENTO</h3>
          {/* <p className='footer-paragraph'>
            SafeHavenTO is a service that provides shelter occupancy information and additional resources for those in need residing in Toronto.
          </p> */}
          <div className='footer__list'>
            <ul className='footer__list-ul'>
              <li className='footer__list-li'>
                <a href='#home' className='footer__list-a'>
                  <h3 className='footer__item'>Home</h3>
                </a>
              </li>
              <li className='footer__list-li'>
                <a href='#aboutUs' className='footer__list-a'>
                  <h3 className='footer__item'>About Us</h3>
                </a>
              </li>
              <li className='footer__list-li'>
                <a href='#shelters' className='footer__list-a'>
                  <h3 className='footer__item'>Shelters</h3>
                </a>
              </li>
              <li className='footer__list-li'>
                <a href='#resources' className='footer__list-a'>
                  <h3 className='footer__item'>Resources</h3>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className='footer-middle'>
          <div className='footer-div__logo-container'>
            <div className='mission__div-logo-container'>
              <img loading='lazy' className='footer-div__logo' src={Logo}></img>
            </div>
          </div>
        </div>

        <div className='footer-right'>
          <div className='footer-right__socials'>
            <a
              className='footer-right__social-links'
              href='https://www.linkedin.com/in/safehavento/'
              target='_blank'
              rel='noreferrer'
            >
              <i className='fab fa-instagram'>LinkedIn</i>
            </a>
            <a
              href='https://www.facebook.com/safehavento'
              target='_blank'
              rel='noreferrer'
            >
              <i className='fab fa-facebook-f'></i>
            </a>
            <a
              href='https://twitter.com/safehavento'
              target='_blank'
              rel='noreferrer'
            >
              <i className='fab fa-twitter'></i>
            </a>
          </div>
        </div>
      </footer>
      <div className='footer-bottom'>
        <span className='copyright-disclaimer'>
          &copy; 2024 SafeHavenTO. All rights reserved.
        </span>
      </div>
    </>
  );
}
