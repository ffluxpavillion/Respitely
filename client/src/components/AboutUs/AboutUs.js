import React, { useState, useEffect } from 'react';
import './AboutUs.scss';
import Logo from '../../assets/logo/SafeHavenTO.svg';

export default function AboutUs() {

  return (
    <>
      <section className="mission__section">
        <div className="mission__section__div">
          <h1 className="mission__section__div-h1" id="aboutUs">SafeHavenTO</h1>
        </div>
        <div className="mission__div">
          <div className="mission__div-inner">
            <h2 className="mission__div-header">About Us</h2>
            <br />
            <p className="mission__div-text">
              SafeHavenTO is a full-stack & responsive web application designed to help individuals
              experiencing homelessness find nearby shelters based on
              their individual needs, and the latest updates from locations around the city. This app
              leverages JSON data provided by the City of Toronto's Daily Shelter Occupancy Data API,
              via the city's Open Data Portal initiative.
            </p>
            <p className="mission__div-text">
              Our mission is to help bridge the gap between those in need and
              the resources available to them; to serve as a beacon of hope in
              addressing this pressing societal issue.
            </p>
            <p className="mission__div-text">
             The homelessness crisis is riddled with multifaceted challenges, one such obstacle is the access to timely and accurate shelter information. There is a lack of centralized, up-to-date resources for individuals in need, causing difficulties in finding suitable shelters, especially during urgent situations.
            </p>
            <p className="mission__div-text">
              By seamlessly integrating modern design and functionality with an intuitive and reliable user experience (UX), such an application holds the potential to revolutionize the way individuals experiencing homelessness access vital information.
            </p>
            <p className="mission__div-text">
              This platform aims to provide more than just basic information, but also a sense of security during times of intense vulnerability.
            </p>
            <div className="mission__div-logo-container">
              <img className="mission__div-logo" src={Logo}></img>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
