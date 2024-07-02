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
      label: '🏠 WHAT IS RESPITELY·TO?',
      children: (
        <p className='mission__div-text'>
          This is a platform designed to help individuals who are homeless or at
          risk of becoming homeless in quickly identifying vacancies at support
          shelters, or drop-in meals across Toronto & the GTA.
        </p>
      ),
    },
    {
      key: '2',
      label: '🚧 THE CHALLENGE',
      children: (
        <p className='mission__div-text'>
          Navigating the landscape of available resources for the homeless
          population can be incredibly challenging.
          <br />
          <br />
          Although many support systems exist, quickly identifying shelter
          updates or meal services often proves cumbersome. Details are often
          fragmented across the web, buried within lengthly timetables, or
          require making numerous phone calls.
          <br />
          <br />
          This absence of of real-time, centralized data creates friction,
          leaving many individuals struggling to find the vital support they
          need.
        </p>
      ),
    },
    {
      key: '3',
      label: '💡 THE SOLUTION',
      children: (
        <p className='mission__div-text'>
          Respitely is a platform that provide the latest updates for shelter
          vacancies, and maps out meal schedules across the city.
          <br />
          <br />
          Both features are are supported by secondary information, dynamic
          filtering, and interactive maps.
          <br />
          <br />
          It is engineered to serve relevant information for that day, ensuring
          the most relevant and immediate information is always at users'
          fingertips, and helping them make informed decisions quickly.
        </p>
      ),
    },
    {
      key: '4',
      label: '🎯 THE MISSION',
      children: (
        <p className='mission__div-text'>
          Our mission is to modernize and transform how critical information
          like shelter status and meal times are accessed.
          <br />
          <br />
          By bridging the gap between available resources and those in need, we
          hope to provide a sense of security during times of intense
          vulnerability.
          <br />
          <br />
          The goal is to create a 'live' web application that shows current and
          upcoming events, and aspires to become the go-to resource for those
          seeking help, as well as for organizations managing these critical
          services.
        </p>
      ),
    },
    {
      key: '5',
      label: '⚙️ HOW DOES IT WORK?',
      children: (
        <p className='mission__div-text'>
          Empowered by the City of Toronto's Daily Shelter Occupancy API, this
          platform leverages this dataset by fetching, filtering, and sorting
          the most recent and relevant updates, which is then mapped using
          MapBox.
          <br />
          <br />
          The Drop-In Meals feature is powered by a custom-built database that I
          am currently maintaining and updating. A large portion of the data was
          sourced from the{' '}
          <a
            className='link'
            href='https://tdin.ca/resource.php?id=766'
            aria-label='Link to TDIN Drop-In Resource List'
          >
            TDIN Drop-In Resource List
          </a>
          , which was last updated on March 13, 2024 (according to the
          document). The static nature of this document means information can
          become outdated, so please verify with the service provider directly.
          I am exploring potential solutions to address this issue.
          <br />
          <br />
          For more information, check out my{' '}
          <a
            className='link'
            href='https://github.com/ffluxpavillion/Respitely'
            aria-label='Link to Respitely Github Repository'
          >
            GitHub repo.
          </a>
        </p>
      ),
    },
    {
      key: '6',
      label: "🔜 WHAT'S NEXT?",
      children: (
        <p className='mission__div-text'>
          This is an ongoing project, and I am continiously working hard to
          expand and improve. My vision for the future includes:
          <ul className='about__ul'>
            <br />
            <li className='about__list-item'>
              A centralized portal for drop-in organizers to manage and update
              their information, ensuring consistency and reliability.
            </li>
            <br />
            <li className='about__list-item'>
              A crowd-sourced component where service providers can input and
              verify information about drop-in meal locations and times.
            </li>
            <br />
            <li className='about__list-item'>
              Enhanced user experience with more intuitive navigation and
              additional filter options.
            </li>
            <br />
            <li className='about__list-item'>
              Explore potential partnerships with more shelters and meal
              providers to ensure comprehensive and accurate coverage.
            </li>
            <br />
            <li className='about__list-item'>
              Implementation of user feedback to refine and perfect the
              platform.
            </li>
            {/* <li>Food</li>
            <li>Legal/Pro Bono</li>
            <li>Childcare</li>
            <li>Clothing</li>
            <li>Personal Care</li>
            <li>Drug Testing / Support</li>
            <li>Employment</li>
            <li>Mental Health Support</li>
            <i>...AND MORE</i> */}
          </ul>
          <br />
          Stay tuned!
        </p>
      ),
    },
    {
      key: '7',
      label: '📬 WANT TO GET IN TOUCH?',
      children: (
        <p className='mission__div-text' id='contact'>
          I'd love to hear from you!
          <br />
          <br />
          Whether you have questions about Respitely, feedback, or just want to
          connect, feel free to reach out. Any constructive feedback on how I
          can improve this platform is wholeheartedly welcomed.
          <br />
          <br />
          You can email me at{' '}
          <a
            className='link'
            href='mailto:contact@respitely.org'
            aria-label='Send Mail to contact@respitely.org'
          >
            contact@respitely.org
          </a>{' '}
          or connect with me on{' '}
          <a
            className='link'
            href='https://www.linkedin.com/in/arjunsahjpaul/'
            target='_blank'
            rel='noreferrer'
            aria-label='Link to Founder LinkedIn Profile'
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
                Modernizing Access in the Heart of Toronto{' '}
              </h2>
              <img
                loading='lazy'
                className='mission__div-logo'
                src={Logo}
                alt='Respitely Logo'
              />
            </div>
            <br />
            <div className='mission__div-inner-container-2 hidden-about-us slide-left'>
              <Collapse
                className='custom-collapse about-us-collapse'
                accordion
                expandIcon={({ isActive }) => (
                  <CaretRightOutlined rotate={isActive ? 90 : 180} />
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
