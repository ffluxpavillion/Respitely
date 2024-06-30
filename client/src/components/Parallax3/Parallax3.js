import './Parallax3.scss';
import ParallaxImage3 from '../../assets/images/SafeHavenTO_graphic-art-skyline-2.png';
import { useEffect, useRef } from 'react';
import useIsMobile from '../../hooks/useIsMobile';

export default function Parallax3() {
  const isMobile = useIsMobile();
  const parallaxRef = useRef(null);
  const initialOffsetY = 850;
  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const offset = window.scrollY;
        parallaxRef.current.style.backgroundPositionY = `${
          initialOffsetY + offset * -0.2
        }px`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [initialOffsetY]);

  return (
    <>
      {isMobile ? (
        <div
          className='parallax3-mobile'
          style={{
            backgroundImage: `url(${ParallaxImage3})`,
            backgroundPositionY: `${initialOffsetY}px`,
          }}
          ref={parallaxRef}
        />
      ) : (
        <div
          className='parallax3'
          style={{ backgroundImage: `url(${ParallaxImage3})` }}
        />
      )}
    </>
  );
}
