import { useState, useEffect } from 'react';
import './Parallax.scss';
import ParallaxImage from '../../assets/images/SafeHavenTO_ttc-queen-station.jpg';


export default function Hero2() {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <div className="parallax" style={{ backgroundImage: `url(${ParallaxImage})` }}></div>
    </>

  );
}
