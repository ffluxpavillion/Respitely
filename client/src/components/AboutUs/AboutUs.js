import React, { useState, useEffect } from 'react';
import './AboutUs.scss';
import Logo from '../../assets/logo/SafeHavenTO.svg';

export default function AboutUs() {
  return (
    <>
      <section className='mission__section'>
        <br />
        <div className='mission__section-div'>
          <h1 className='mission__section-div-h1' id='aboutUs'>
            SAFEHAVEN•TO
          </h1>
        </div>
        <br />
        <br />
        <br />

        <div className='mission__div'>
          <div className='mission__div-inner'>
            <div className='mission__div-inner-container-1'>
              <h2 className='mission__div-h2'>Moderninzing Shelter Access</h2>
              <h2 className='mission__div-h2'>in the Heart of Toronto</h2>
            </div>
            <br />
            <div className='mission__div-inner-container-2'>
              <p className='mission__div-text'>
                SafeHavenTO is a full-stack & responsive web application
                designed to help those experiencing homelessness in finding
                nearby shelters based on their individual needs, and the latest
                updates from locations around the city. This app leverages data
                provided by the City of Toronto's Daily Shelter Occupancy Data
                API, via the city's Open Data Portal initiative.
                <br />
                <br />
                Our mission is to help bridge the gap between those in need and
                the resources available to them; to serve as a beacon of hope in
                addressing this pressing societal issue.
                <br />
                <br />
                The homelessness crisis is riddled with multifaceted challenges,
                one such obstacle is the access to timely and accurate shelter
                information. There is a lack of centralized, up-to-date
                resources for individuals in need, causing difficulties in
                finding suitable shelters, especially during urgent situations.
                <br />
                <br />
                By seamlessly integrating modern design and functionality with
                an intuitive and reliable user experience, such an application
                holds the potential to revolutionize the way individuals
                experiencing homelessness access vital information.
                <br />
                <br />
                This platform aims to provide critical information, but also a
                sense of security during times of intense vulnerability. We
                believe that everyone deserves a SafeHaven, and we are committed
                to making that a reality.
              </p>
            </div>
            <div className='mission__div-logo-container'>
              <img className='mission__div-logo' src={Logo}></img>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
