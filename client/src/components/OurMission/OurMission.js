import React, { useState, useEffect } from 'react';
import './OurMission.scss';
import Logo from '../../assets/logo/SafeHavenTO.svg';

export default function HeroPurpose() {

  return (
    <>
      <section className="mission__section">
        <div className="mission__div">
          <div className="mission__div-inner">
            <h2 className="mission__div-header">Our Mission</h2>
            <br />

            <p className="mission__div-text">
              SafeHavenTO is a web app that aims to help individuals
              experiencing homelessness by finding nearby shelters based on
              their needs and the latest data from nearby shelters. This app
              leverages the City of Toronto's Daily Shelter Occupancy Data API.
            </p>
            <p className="mission__div-text">
              Our mission is to help bridge the gap between those in need and
              the resources available to them; to serve as a beacon of hope in
              addressing this pressing societal issue.{' '}
            </p>
            {/* <img className="mission__div-logo" src={Logo}></img> */}
          </div>
        </div>
      </section>
    </>
  );
}
