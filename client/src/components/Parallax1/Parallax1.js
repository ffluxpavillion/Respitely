import './Parallax1.scss';
import ParallaxImage1 from '../../assets/images/SafeHavenTO_graphic-art-skyline-1.png';
import { useEffect, useRef } from 'react';
import useIsMobile from '../../hooks/useIsMobile';

export default function Parallax1() {
  const isMobile = useIsMobile();
  const parallaxRef = useRef(null);
  const initialOffsetY = 40;
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
    // <>
    //   {isMobile ? (
    //       <div
    //         className='parallax1-mobile'
    //         style={{
    //           backgroundImage: `url(${ParallaxImage1})`,
    //           backgroundPositionY: `${initialOffsetY}px`,
    //         }}
    //         ref={parallaxRef}
    //       />
    //   ) : (
    //     <div
    //       className='parallax1'
    //       style={{ backgroundImage: `url(${ParallaxImage1})` }}
    //     />
    //   )}
    // </>

    <>
      <div
        className='parallax1'
        style={{ backgroundImage: `url(${ParallaxImage1})` }}
      />
    </>
  );
}
