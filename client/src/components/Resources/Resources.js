import React, { useState, useEffect } from 'react';
import './Resources.scss';


export default function Resources() {

  return (
    <>
      <section className="resources__section">
        <h1 className="resources__div-header" id="resources">Resources</h1>
        <div className="resources__div">
          <br />
            <div className="grid-container">
              <a className="link" target='_blank' href="https://www.toronto.ca/community-people/housing-shelter/homeless-help/shelters/#shelters">
                <div className="grid__item">
                  <h2 className="grid__item-header">
                    Shelters
                  </h2>
                  <p className="grid__item-text">Emergency accommodation and related support services that assist people to move into housing.</p>
                </div>
              </a>
              <a className="link" target='_blank' href="https://www.toronto.ca/community-people/housing-shelter/homeless-help/24-hour-respite-sites/#respitesites">
                <div className="grid__item">
                  <h2 className="grid__item-header">
                    24-Hour <br />Respite Sites
                  </h2>
                  <p className="grid__item-text">Low-barrier services, providing resting spaces, meals and service referrals. Open 24/7.</p>
                </div>
              </a>
              <a className="link" target='_blank' href="https://www.toronto.ca/community-people/housing-shelter/homeless-help/drop-ins/#dropin">
                <div className="grid__item">
                  <h2 className="grid__item-header">
                    Drop-In Programs
                  </h2>
                  <p className="grid__item-text">Basic necessity services to people who are homeless or at risk of homelessness.</p>
                </div>
              </a>
              <a className="link" target='_blank' href="https://www.toronto.ca/community-people/housing-shelter/homeless-help/streets-to-homes-street-outreach-support-program/">
                <div className="grid__item">
                  <h2 className="grid__item-header">
                    Street Outreach
                  </h2>
                  <p className="grid__item-text">Services for people experiencing homelessness and living outdoors.</p>
                </div>
              </a>
              <a className="link" target='_blank' href="https://www.toronto.ca/community-people/housing-shelter/homeless-help/toronto-warming-centres/">
                <div className="grid__item">
                  <h2 className="grid__item-header">
                    Warming Centres
                  </h2>
                  <p className="grid__item-text">Warm spaces for vulnerable residents to come inside during extreme cold weather.</p>
                </div>
              </a>
              <a className="link" target='_blank' href="https://www.toronto.ca/community-people/housing-shelter/homeless-help/housing-help/">
                <div className="grid__item">
                  <h2 className="grid__item-header">
                    Housing Help
                  </h2>
                  <p className="grid__item-text">Non-profit agencies that help people find and keep housing, and avoid eviction</p>
                </div>
              </a>
              <a className="link" target='_blank' href="https://www.toronto.ca/community-people/housing-shelter/homeless-help/pet-services-in-homeless-shelters/">
                <div className="grid__item">
                  <h2 className="grid__item-header">
                    Pet Services <br />for clients of <br />Homeless Services
                  </h2>
                  <p className="grid__item-text">No-charge services for pets of people staying at shelter sites.</p>
                </div>
              </a>
              <a className="link" target='_blank' href="https://www.toronto.ca/explore-enjoy/recreation/washrooms-drinking-water-in-parks-recreational-facilities/#location=&lat=&lng=">
                <div className="grid__item">
                  <h2 className="grid__item-header">
                    Public Washrooms & Showers
                  </h2>
                  <p className="grid__item-text">Locations of public washrooms in parks and recreational facilities.</p>
                </div>
              </a>
            </div>
          </div>
      </section>
    </>
  );
}
