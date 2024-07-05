import './Parallax2.scss';
import ParallaxImage2 from '../../assets/images/SafeHavenTO_graphic-art-skyline-3.png';
import { useEffect, useRef } from 'react';
import useIsMobile from '../../hooks/useIsMobile';

export default function Parallax2() {
  const isMobile = useIsMobile();
  const parallaxRef = useRef(null);
  const initialOffsetY = 650;
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
    //     {/* <div
    //       className='parallax2-mobile'
    //       style={{
    //         backgroundImage: `url(${ParallaxImage2})`,
    //         backgroundPositionY: `${initialOffsetY}px`,
    //       }}
    //       ref={parallaxRef}
    //     /> */}
    //   ) : (
    //     <div
    //       className='parallax2'
    //       style={{ backgroundImage: `url(${ParallaxImage2})` }}
    //     />
    //   )}
    // </>

    <>
      <div
        className='parallax2'
        style={{ backgroundImage: `url(${ParallaxImage2})` }}
      />
    </>
  );
}
