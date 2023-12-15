import { useEffect, useRef } from 'react';
import './Header.scss';
import Logo from '../../assets/logo/SafeHavenTO.svg';

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
      <header className="header">
        <nav
        // ref={navbarRef} // Attach the ref to the navbar
        className="navbar">
          <div className="navbar__div">
            <img className="navbar__div-logo" src={Logo}></img>
            <li>
              <a className="navbar__div-item" href="#">
                Home
              </a>
            </li>
            <li>
              <a className="navbar__div-item" href="#">
                Shelters
              </a>
            </li>
            <li>
              <a className="navbar__div-item" href="#">
                Resrouces
              </a>
            </li>
            <li>
              <a className="navbar__div-item" href="#">
                About Us
              </a>
            </li>
          </div>
        </nav>
      </header>
    </>
  );
}
