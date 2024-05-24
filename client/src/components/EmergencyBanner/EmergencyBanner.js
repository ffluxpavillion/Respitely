import React, { useState, useEffect } from 'react';
import './EmergencyBanner.scss';


export default function EmergencyBanner() {
  const [isPaused, setIsPaused] = useState(false);
  const [isClicked, setIsClicked] = useState(false);


  useEffect(() => {
    const handleMouseEnter = () => {
      if (!isClicked) setIsPaused(true);
    };
    const handleMouseLeave = () => {
      if (!isClicked) setIsPaused(false);
    };

    const banner = document.querySelector('.banner-container');
    banner.addEventListener('mouseenter', handleMouseEnter);
    banner.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      banner.removeEventListener('mouseenter', handleMouseEnter);
      banner.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isClicked]);

  const togglePlayPause = () => {
    setIsClicked(!isClicked);
    setIsPaused(!isClicked);
  };


  return (
    <div
      className="banner-container"
      role="region"
      aria-label="Emergency Shelter Information"
      onClick={togglePlayPause}
    >
      <div
        className="banner-content"
        style={{
          animationPlayState: isPaused ? 'paused' : 'running',
        }}
      >
        If you are in need of emergency shelter space, please call the City of Toronto’s Central Intake line at
        <a href="tel:4163384766" className="phone-link"> 416-338-4766 </a>
        or
        <a href="tel:18773383398" className="phone-link"> 1-877-338-3398 </a>
        or by calling
        <a href="tel:311" className="phone-link"> 311</a>.

      </div>
    </div>
  );
};