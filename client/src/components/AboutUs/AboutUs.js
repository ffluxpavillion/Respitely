import React, { useState, useEffect, useRef } from 'react';
import './AboutUs.scss';
import Logo from '../../assets/logo/SafeHavenTO.svg';
import { Collapse, FloatButton } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';

export default function AboutUs() {
  const [activeKey, setActiveKey] = useState(null);
  const observer = useRef(null);

  useEffect(() => {
    // Observer setup
    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show-about-us');
          }
        });
      },
      {
        threshold: 0.3,
      }
    );

    // Attaching observer to elements
    const hiddenElements = document.querySelectorAll('.hidden-about-us');
    hiddenElements.forEach((el) => observer.current.observe(el));

    // Cleanup function to disconnect observer
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (window.location.hash === '#contact') {
      setTimeout(() => {
        setActiveKey('6');
        document
          .getElementById('contact')
          ?.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    }
  }, []);

  const items = [
    {
      key: '1',
      label: 'WHAT IS THIS?',
      children: (
        <p className='mission__div-text'>
          A tool that helps users find vacancies at nearby shelters, by
          providing the latest updates from these facilities.
        </p>
      ),
    },
    {
      key: '2',
      label: 'THE CHALLENGE',
      children: (
        <p className='mission__div-text'>
          There is a lack of centralized, up-to-date resources, causing friction
          for those in need of accomodation.
          <br />
          <br />
          Modern problems require modern solutions <br />
          ⎯So I built one.
        </p>
      ),
    },
    {
      key: '3',
      label: 'THE MISSION',
      children: (
        <p className='mission__div-text'>
          To provide a sense of security during times of intense vulnerability,
          by bridging the gap between available resources and those in need.
          <br />
          <br />
          SafeHavenTO is a project that I am proud to have built and I hope it
          can make a difference in the lives of those who need it most.
        </p>
      ),
    },
    {
      key: '4',
      label: 'HOW DOES IT WORK?',
      children: (
        <p className='mission__div-text'>
          Empowered by the City of Toronto's Daily Shelter Occupancy API, this
          platform leverages this dataset by fetching, filtering, and sorting
          the most recent and relevant updates, which is then mapped using
          MapBox.
          <br />
          <br />
          For more information, check out my{' '}
          <a
            className='link'
            href='https://github.com/ffluxpavillion/SafeHavenTO'
          >
            GitHub repo.
          </a>
        </p>
      ),
    },
    {
      key: '5',
      label: "WHAT'S NEXT?",
      children: (
        <p className='mission__div-text'>
          Currently building a database/API and allocating resources on:
          <ul>
            <br />
            <li>Food</li>
            <li>Legal/Pro Bono</li>
            <li>Childcare</li>
            <li>Clothing</li>
            <li>Personal Care</li>
            <li>Drug Testing / Support</li>
            <li>Employment</li>
            <li>Mental Health Support</li>
            <i>...AND MORE</i>
          </ul>
          <br />
          Stay tuned!
        </p>
      ),
    },
    {
      key: '6',
      label: 'WANT TO GET IN TOUCH?',
      children: (
        <p className='mission__div-text' id='contact'>
          I'd love to hear from you!
          <br />
          <br />
          Whether you have questions about SafeHavenTO, feedback, or just want
          to connect, feel free to reach out. I welcome any feedback on how I
          can improve this platform.
          <br />
          <br />
          You can email me at{' '}
          <a className='link' href='mailto:contact@safehavento.org'>
            contact@safehavento.org
          </a>{' '}
          or connect with me on{' '}
          <a
            className='link'
            href='https://www.linkedin.com/in/arjunsahjpaul/'
            target='_blank'
            rel='noreferrer'
          >
            LinkedIn
          </a>{' '}
          and send me DM.
          <br />
          <br />
        </p>
      ),
    },
  ];

  return (
    <>
      <section className='mission__section' id='aboutUs'>
        <div className='mission__div'>
          <div className='mission__div-inner'>
            <div className='mission__div-inner-container-1 hidden-about-us slide-right'>
              <h2 className='mission__div-h2'>
                Modernizing Shelter Access in the Heart of Toronto{' '}
              </h2>
              <img
                loading='lazy'
                className='mission__div-logo'
                src={Logo}
                alt='SafeHavenTO Logo'
              />
            </div>
            <br />
            <div className='mission__div-inner-container-2 hidden-about-us slide-left'>
              <Collapse
                className='custom-collapse'
                accordion
                expandIcon={({ isActive }) => (
                  <CaretRightOutlined rotate={isActive ? 90 : 0} />
                )}
                ghost
                items={items}
                size='large'
                activeKey={activeKey}
                onChange={(key) => setActiveKey(key)}
              />
            </div>
          </div>
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <FloatButton.BackTop />
      </section>
    </>
  );
}
