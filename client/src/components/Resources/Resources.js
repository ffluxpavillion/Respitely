import './Resources.scss';

export default function Resources() {
  return (
    <>
      <section className="resources__section">
      <br />
        <h3 className="resources__div-header" id="resources">Resources</h3>
        <div className="resources__div">
          <br />
            <div className="grid-container">
              <a className="link" target='_blank' href="https://www.toronto.ca/community-people/housing-shelter/homeless-help/shelters/#shelters">
                <div className="grid__item">
                  <h4 className="grid__item-header">Shelters</h4>
                  <h4 className="grid__item-text">Emergency accommodation and related support services that assist people to move into housing.</h4>
                </div>
              </a>
              <a className="link" target='_blank' href="https://www.toronto.ca/community-people/housing-shelter/homeless-help/24-hour-respite-sites/#respitesites">
                <div className="grid__item">
                  <h4 className="grid__item-header">24-Hour Respite Sites</h4>
                  <h4 className="grid__item-text">Low-barrier services, providing resting spaces, meals and service referrals. <br />Open 24/7.</h4>
                </div>
              </a>
              <a className="link" target='_blank' href="https://www.toronto.ca/community-people/housing-shelter/homeless-help/drop-ins/#dropin">
                <div className="grid__item">
                  <h4 className="grid__item-header">Drop-In Programs</h4>
                  <h4 className="grid__item-text">Basic necessity services to people who are homeless or at risk of homelessness.</h4>
                </div>
              </a>
              <a className="link" target='_blank' href="https://www.toronto.ca/community-people/housing-shelter/homeless-help/streets-to-homes-street-outreach-support-program/">
                <div className="grid__item">
                  <h4 className="grid__item-header">Street Outreach</h4>
                  <h4 className="grid__item-text">Services for people experiencing homelessness and living outdoors.</h4>
                </div>
              </a>
              <a className="link" target='_blank' href="https://www.toronto.ca/community-people/housing-shelter/homeless-help/toronto-warming-centres/">
                <div className="grid__item">
                  <h4 className="grid__item-header">Warming Centres</h4>
                  <h4 className="grid__item-text">Warm spaces for vulnerable residents to come inside during extreme cold weather.</h4>
                </div>
              </a>
              <a className="link" target='_blank' href="https://www.toronto.ca/community-people/housing-shelter/homeless-help/housing-help/">
                <div className="grid__item">
                  <h4 className="grid__item-header">Housing Help</h4>
                  <h4 className="grid__item-text">Non-profit agencies that help people find and keep housing, and avoid eviction.</h4>
                </div>
              </a>
              <a className="link" target='_blank' href="https://www.toronto.ca/community-people/housing-shelter/homeless-help/pet-services-in-homeless-shelters/">
                <div className="grid__item">
                  <h4 className="grid__item-header">Pet Services <br />for clients of <br />Homeless Services</h4>
                  <h4 className="grid__item-text">No-charge services for pets of people staying at shelter sites.</h4>
                </div>
              </a>
              <a className="link" target='_blank' href="https://www.toronto.ca/explore-enjoy/recreation/washrooms-drinking-water-in-parks-recreational-facilities/#location=&lat=&lng=">
                <div className="grid__item">
                  <h4 className="grid__item-header">Public Washrooms & Showers</h4>
                  <h4 className="grid__item-text">Locations of public washrooms in parks and recreational facilities.</h4>
                </div>
              </a>
            </div>
          </div>
      </section>
    </>
  );
}
