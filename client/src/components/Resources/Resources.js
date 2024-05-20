import './Resources.scss';
import { useEffect, useRef } from 'react';

export default function Resources() {
  const observer = useRef(null); // Using useRef to persist the observer instance

  useEffect(() => {
    // Observer setup
    observer.current = new IntersectionObserver(
      (entries) => {
        console.log('entries', entries);
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
    const hiddenElements = document.querySelectorAll('.hidden');
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
        <h3 className='resources__div-header hidden' id='resources'>
          Resources
        </h3>
        <div className='resources__div'>
          <br />
          <div className='grid-container'>
            <a
              className='link'
              target='_blank'
              href='https://www.toronto.ca/community-people/housing-shelter/homeless-help/shelters/#shelters'
            >
              <div className='grid__item hidden'>
                <h4 className='grid__item-header hidden'>Shelters</h4>
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
              <div className='grid__item hidden'>
                <h4 className='grid__item-header hidden'>
                  24-Hour Respite Sites
                </h4>
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
              <div className='grid__item hidden'>
                <h4 className='grid__item-header hidden'>Drop-In Programs</h4>
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
              <div className='grid__item hidden'>
                <h4 className='grid__item-header hidden'>Street Outreach</h4>
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
              <div className='grid__item hidden'>
                <h4 className='grid__item-header hidden'>Warming Centres</h4>
                <p className='grid__item-text'>
                  Warm spaces for vulnerable residents to come inside during
                  extreme cold weather.
                </p>
              </div>
            </a>
            <a
              className='link'
              target='_blank'
              href='https://www.toronto.ca/community-people/housing-shelter/homeless-help/housing-help/'
            >
              <div className='grid__item hidden'>
                <h4 className='grid__item-header hidden'>Housing Help</h4>
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
              <div className='grid__item hidden'>
                <h4 className='grid__item-header hidden'>
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
              <div className='grid__item hidden'>
                <h4 className='grid__item-header hidden'>
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
