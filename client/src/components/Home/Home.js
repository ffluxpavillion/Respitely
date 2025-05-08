import './Home.scss';
import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';

export default function Home() {
  return (
    <>
      <section className='home-section' id='home'>
        <div className='home-header__container'>
          <div className='home-header__text'>
            <h1 className='home-header__line1'>
              Shelter Snapshots <span className='and-symbol'>&</span> Real-Time Meal Tracker
            </h1>
            <h1 className='home-header__line2'>for Toronto & the GTA.</h1>
          </div>
        </div>

        <div className='home-button__container'>
          <div className='center-con'>
            <span className='header-actions__text'>Jump to Shelters</span>
            <Link aria-label='Go to Shelters' to='#shelters'>
              <div className='round'>
                <div id='cta'>
                  <span className='arrow primera next '></span>
                  <span className='arrow segunda next '></span>
                </div>
              </div>
            </Link>
          </div>
          <div className='center-con'>
            <span className='header-actions__text'>Jump to Meals</span>
            <Link aria-label='Go to Meals' to='#meals'>
              <div className='round'>
                <div id='cta'>
                  <span className='arrow primera next '></span>
                  <span className='arrow segunda next '></span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
