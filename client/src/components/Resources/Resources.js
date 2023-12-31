import React, { useState, useEffect } from 'react';
import './Resources.scss';
import Logo from '../../assets/logo/SafeHavenTO.svg';

export default function Resources() {

  return (
    <>
      <section className="resources__section">
        <h2 className="resources__div-header" id="resources">Resources</h2>
        <div className="resources__div">
            <br />
            <div className="grid-container">
              <div className="grid-item">
                <h1 className="link">
                  <a className="link" href="https://www.toronto.ca/community-people/housing-shelter/homeless-help/shelters/#shelters">
                    Shelters
                  </a>
                </h1>
                <p>Emergency accommodation and related support services that assist people to move into housing.</p>
              </div>
              <div className="grid-item">
                <h1 className="link">
                  <a className="link" href="https://www.toronto.ca/community-people/housing-shelter/homeless-help/24-hour-respite-sites/#respitesites">
                    24-Hour Respite Sites
                  </a>
                </h1>
                <p>Low-barrier services, providing resting spaces, meals and service referrals. Open 24/7.</p>
              </div><div className="grid-item">
                <h1 className="link">
                  <a className="link" href="https://www.toronto.ca/community-people/housing-shelter/homeless-help/drop-ins/#dropin">
                  Drop-In Programs
                  </a>
                </h1>
                <p>Basic necessity services to people who are homeless or at risk of homelessness.</p>
              </div><div className="grid-item">
                <h1 className="link">
                  <a className="link" href="https://www.toronto.ca/community-people/housing-shelter/homeless-help/streets-to-homes-street-outreach-support-program/">
                  Street Outreach
                  </a>
                </h1>
                <p>Services for people experiencing homelessness and living outdoors.</p>
              </div><div className="grid-item">
                <h1 className="link">
                  <a className="link" href="https://www.toronto.ca/community-people/housing-shelter/homeless-help/toronto-warming-centres/">
                  Warming Centres
                  </a>
                </h1>
                <p>Warm spaces for vulnerable residents to come inside during extreme cold weather.</p>
              </div><div className="grid-item">
                <h1 className="link">
                  <a className="link" href="https://www.toronto.ca/community-people/housing-shelter/homeless-help/housing-help/">
                  Housing Help
                  </a>
                </h1>
                <p>Non-profit agencies that help people find and keep housing, and avoid eviction</p>
              </div><div className="grid-item">
                <h1 className="link">
                  <a className="link" href="https://www.toronto.ca/community-people/housing-shelter/homeless-help/pet-services-in-homeless-shelters/">
                  Pet Services for Clients of Homeless Services
                  </a>
                </h1>
                <p>No-charge services for pets of people staying at shelter sites.</p>
              </div><div className="grid-item">
                <h1 className="link">
                  <a className="link" href="https://www.toronto.ca/explore-enjoy/recreation/washrooms-drinking-water-in-parks-recreational-facilities/#location=&lat=&lng=">
                  Public Washrooms & Showers
                  </a>
                </h1>
                <p>Locations of public washrooms in parks and recreational facilities.</p>
              </div>
            </div>
          </div>
      </section>
    </>
  );
}
