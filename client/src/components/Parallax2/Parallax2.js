import { useState, useEffect } from 'react';
import './Parallax2.scss';
import ParallaxImage2 from '../../assets/images/SafeHavenTO_public-art-display.jpg';


export default function Parallax2() {
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
      <div className="parallax2" style={{ backgroundImage: `url(${ParallaxImage2})` }}></div>
    </>

  );
}
