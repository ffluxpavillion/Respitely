import './Resources.scss';
import { useEffect, useRef } from 'react';

export default function Resources() {
  const observer = useRef(null); // Using useRef to persist the observer instance

  useEffect(() => {
    // Observer setup
    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show-resources');
          }
        });
      },
      {
        threshold: 0.5,
      },
      []
    );

    // Attaching observer to elements
    const hiddenElements = document.querySelectorAll('.hidden-resources');
    hiddenElements.forEach((el) => observer.current.observe(el));

    // Cleanup function to disconnect observer
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  return (
    <>
      <section className='resources__section'>
        <br />
        <h3 className='resources__div-header hidden-resources' id='resources'>
          Resources
        </h3>
        <div className='resources__div'>
          <br />
          <div className='grid-container'>
            <a
              className='link'
              target='_blank'
              href='https://communityfridgesto.org/'
            >
              <div className='grid__item hidden-resources'>
                <h4 className='grid__item-header'>Community Fridges Toronto</h4>
                <p className='grid__item-text'>
                  Accessible food located in refridgerators around the city,
                  24/7.
                </p>
              </div>
            </a>
            <a
              className='link'
              target='_blank'
              href='https://www.toogoodtogo.com/en-ca'
            >
              <div className='grid__item hidden-resources'>
                <h4 className='grid__item-header'>Too Good To Go</h4>
                <p className='grid__item-text'>
                  Free app that connects you with local restaurants & stores
                  that sell surplus (unsold) food at a discount.
                </p>
              </div>
            </a>
            <a
              className='link'
              target='_blank'
              href='https://www.toronto.ca/community-people/employment-social-support/housing-support/financial-support-for-renters/toronto-rent-bank/'
            >
              <div className='grid__item hidden-resources'>
                <h4 className='grid__item-header'>Toronto Rent Bank</h4>
                <p className='grid__item-text'>
                  Interest-free loans to low-income households facing eviction.
                </p>
              </div>
            </a>
            <a
              className='link'
              target='_blank'
              href='https://everydayconnect.ca/legal/'
            >
              <div className='grid__item hidden-resources'>
                <h4 className='grid__item-header'>Legal Resoures</h4>
                <p className='grid__item-text'>
                  Legal services for:
                  <br /> immigration, housing/tenant, human rights, criminal,
                  and more.
                </p>
              </div>
            </a>
            <a
              className='link'
              target='_blank'
              href='https://www.icha-toronto.ca/shelter-health-services-map'
            >
              <div className='grid__item hidden-resources'>
                <h4 className='grid__item-header'>
                  Toronto Homelessness Health Services
                </h4>
                <p className='grid__item-text'>
                  Mapping tool for clinical services, primary care & psychiatry,
                  referral status, harm reduction, etc.
                </p>
              </div>
            </a>
            <a className='link' target='_blank' href='https://srhrmap.ca/map'>
              <div className='grid__item hidden-resources'>
                <h4 className='grid__item-header'>
                  Sexual & Reproductive Health Services Map
                </h4>
                <p className='grid__item-text'>
                  Mapping tool that detailing all sexual and reproductive health
                  services in Canada.
                </p>
              </div>
            </a>
            <a
              className='link'
              target='_blank'
              href='https://www.awhl.org/home'
            >
              <div className='grid__item hidden-resources'>
                <h4 className='grid__item-header'>Assulted Womens Hotline</h4>
                <p className='grid__item-text'>
                  Crisis counselling, shelter referrals, employment, legal, and
                  more. Available in 200 languages -- 24/7.
                </p>
              </div>
            </a>
            <a
              className='link'
              target='_blank'
              href='https://www.toronto.ca/community-people/housing-shelter/homeless-help/shelters/#shelters'
            >
              <div className='grid__item hidden-resources'>
                <h4 className='grid__item-header'>Shelters</h4>
                <p className='grid__item-text'>
                  Emergency accommodation and related support services that
                  assist people to move into housing.
                </p>
              </div>
            </a>
            <a
              className='link'
              target='_blank'
              href='https://www.toronto.ca/community-people/housing-shelter/homeless-help/24-hour-respite-sites/#respitesites'
            >
              <div className='grid__item hidden-resources'>
                <h4 className='grid__item-header'>24-Hour Respite Sites</h4>
                <p className='grid__item-text'>
                  Low-barrier services, providing resting spaces, meals and
                  service referrals. <br />
                  Open 24/7.
                </p>
              </div>
            </a>
            <a
              className='link'
              target='_blank'
              href='https://www.toronto.ca/community-people/housing-shelter/homeless-help/drop-ins/#dropin'
            >
              <div className='grid__item hidden-resources'>
                <h4 className='grid__item-header'>Drop-In Programs</h4>
                <p className='grid__item-text'>
                  Basic necessity services to people who are homeless or at risk
                  of homelessness.
                </p>
              </div>
            </a>
            <a
              className='link'
              target='_blank'
              href='https://www.toronto.ca/community-people/housing-shelter/homeless-help/streets-to-homes-street-outreach-support-program/'
            >
              <div className='grid__item hidden-resources'>
                <h4 className='grid__item-header'>Street Outreach</h4>
                <p className='grid__item-text'>
                  Services for people experiencing homelessness and living
                  outdoors.
                </p>
              </div>
            </a>
            <a
              className='link'
              target='_blank'
              href='https://www.toronto.ca/community-people/housing-shelter/homeless-help/toronto-warming-centres/'
            >
              <div className='grid__item hidden-resources'>
                <h4 className='grid__item-header'>Warming Centres</h4>
                <p className='grid__item-text'>
                  Warm spaces during extreme cold weather.
                </p>
              </div>
            </a>
            <a
              className='link'
              target='_blank'
              href='https://www.toronto.ca/community-people/housing-shelter/homeless-help/housing-help/'
            >
              <div className='grid__item hidden-resources'>
                <h4 className='grid__item-header'>Housing Help</h4>
                <p className='grid__item-text'>
                  Non-profit agencies that help people find and keep housing,
                  and avoid eviction.
                </p>
              </div>
            </a>
            <a
              className='link'
              target='_blank'
              href='https://www.toronto.ca/community-people/housing-shelter/homeless-help/pet-services-in-homeless-shelters/'
            >
              <div className='grid__item hidden-resources'>
                <h4 className='grid__item-header'>
                  Pet Services for clients of Homeless Services
                </h4>
                <p className='grid__item-text'>
                  No-charge services for pets of people staying at shelter
                  sites.
                </p>
              </div>
            </a>
            <a
              className='link'
              target='_blank'
              href='https://www.toronto.ca/explore-enjoy/recreation/washrooms-drinking-water-in-parks-recreational-facilities/#location=&lat=&lng='
            >
              <div className='grid__item hidden-resources'>
                <h4 className='grid__item-header'>
                  Public Washrooms & Showers
                </h4>
                <p className='grid__item-text'>
                  Locations of public washrooms in parks and recreational
                  facilities.
                </p>
              </div>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
