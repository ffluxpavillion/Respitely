import React, { useState, useEffect } from 'react';
import './OurMission.scss';

export default function HeroPurpose() {
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
      <section class="mission__section">
        <div class="mission__div">
          <h2 class="mission__div-header">Our Mission</h2>
          <br />

            <p class="mission__div-text">
            SafeHavenTO is a web app that aims to help individuals experiencing homelessness by finding nearby shelters based on their needs and the latest data from nearby shelters.  This app leverages the City of Toronto's Daily Shelter Occupancy Data API.
            </p>
            <br />
            <p class="mission__div-text">
            Our mission is to help bridge the gap between those in need and the resources available to them; to serve as a beacon of hope in addressing this pressing societal issue.  {' '}
            </p>

        </div>


      <div class="mission__parallax"></div>
      </section>
    </>
  );
}
