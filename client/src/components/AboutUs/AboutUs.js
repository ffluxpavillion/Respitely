import React, { useState, useEffect, useRef } from 'react';
import './AboutUs.scss';
import Logo from '../../assets/logo/SafeHavenTO.svg';
import { Collapse, theme } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';

export default function AboutUs() {
  const observer = useRef(null); // Using useRef to persist the observer instance

  useEffect(() => {
    // Observer setup
    observer.current = new IntersectionObserver(
      (entries) => {
        console.log('entries', entries);
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
          }
        });
      },
      {
        threshold: 0.3,
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
      label: 'THE MISSION',
      children: (
        <p className='mission__div-text'>
          To provide a sense of security during times of intense vulnerability,
          by bridging the gap between available resources and those in need.
          <br /> <br />
          SafeHavenTO is a project that I am proud to have built and I hope it
          can make a difference in the lives of those who need it most.
        </p>
      ),
    },
    {
      key: '3',
      label: 'THE CHALLENGE',
      children: (
        <p className='mission__div-text'>
          There is a lack of centralized, up-to-date resources, causing friction
          for those seeking accomodation.
          <br />
          <br />
          Modern problems require modern solutions. So, I built one.
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
          MapBox. For more information, check out my GitHub repo{' '}
          <a
            className='link'
            href='https://github.com/ffluxpavillion/SafeHavenTO'
          >
            here
          </a>
          .
        </p>
      ),
    },
    {
      key: '5',
      label: "WHAT'S NEXT?",
      children: (
        <p className='mission__div-text'>
          More resources on the way, stay tuned!
        </p>
      ),
    },
  ];

  return (
    <>
      <section className='mission__section' id='aboutUs'>
        <div className='mission__div'>
          <div className='mission__div-inner'>
            <div className='mission__div-inner-container-1 hidden'>
              <h2 className='mission__div-h2'>
                Moderninzing Shelter Access in the Heart of Toronto{' '}
              </h2>
              <img
                loading='lazy'
                className='mission__div-logo'
                src={Logo}
              ></img>
            </div>
            <br />
            <div className='mission__div-inner-container-2 hidden'>
              <Collapse
                className='custom-collapse'
                accordion
                expandIcon={({ isActive }) => (
                  <CaretRightOutlined rotate={isActive ? 90 : 0} />
                )}
                ghost
                items={items}
                size='large'
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
