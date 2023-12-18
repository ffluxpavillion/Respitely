import { useEffect, useRef } from 'react';
import './Header.scss';
import Logo from '../../assets/logo/SafeHavenTO.svg';
import {HashLink as Link} from 'react-router-hash-link';

export default function Header() {

  // ------------------ Sticky Navbar ------------------

  // const navbarRef = useRef(null); // Create a ref for the navbar

  // useEffect(() => {
  //   const navbar = navbarRef.current; // Get the navbar element
  //   const sticky = navbar.offsetTop; // Get the offset position of the navbar

  //   const handleScroll = () => {
  //     if (window.scrollY >= sticky) {
  //       //helps smooth transition
  //       navbar.classList.add('sticky'); // Add the sticky class to the navbar
  //     } else {
  //       navbar.classList.remove('sticky'); // Remove the sticky class from the navbar
  //     }
  //   };

  //   window.addEventListener('scroll', handleScroll); // Listen for scroll events

  //   return () => {
  //     window.removeEventListener('scroll', handleScroll); // Removes scroll event listener
  //   };
  // }, []); // Empty dependency array means this runs once on mount

  // ------------------ Sticky Navbar ------------------


  return (
    <>
      <header className="header" id="home">
        <nav
        // ref={navbarRef} // Attach the ref to the navbar
        className="navbar">
          <div className="navbar__div">
            <img className="navbar__div-logo" src={Logo}></img>
            <li>
              <Link to='#home'><h1 className="navbar__div-item">Home</h1></Link>
            </li>
            <li>
              <Link to='#aboutUs'><h1 className="navbar__div-item">About Us</h1></Link>
            </li>
            <li>
              <Link to='#shelters'><h1 className="navbar__div-item">Shelters</h1></Link>
            </li>
            <li>
              <Link to='#resources'><h1 className="navbar__div-item">Resources</h1></Link>
            </li>
          </div>
        </nav>
      </header>
    </>
  );
}
