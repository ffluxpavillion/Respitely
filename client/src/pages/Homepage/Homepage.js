import React from 'react';
import Home from '../../components/Home/Home';
import Parallax1 from '../../components/Parallax1/Parallax1';
import AboutUs from '../../components/AboutUs/AboutUs';
import Parallax3 from '../../components/Parallax3/Parallax3';
import Parallax2 from '../../components/Parallax2/Parallax2';
import SheltersCard from '../../components/SheltersCard/SheltersCard';
import SheltersCardOG from '../../components/SheltersCard-OG/SheltersCard-OG';
import Resources from '../../components/Resources/Resources';
import Footer from '../../components/Footer/Footer';
import CookiePolicy from '../../components/Legal/CookiePolicy/CookiePolicy';
import TermsOfUse from '../../components/Legal/TermsOfUse/TermsOfUse';
import MealsCard from '../../components/MealsCard/MealsCard';
import MealsMap from '../../components/MealsMap/MealsMap';
import '../Homepage/Homepage.scss';
import { GeocodedLocationsProvider } from '../../contexts/GeocodedDataContext'; // TODO - Need to fix before enabling

export default function Homepage() {
  return (
    <>
      <Home />
      <Parallax1 />
      {/* <GeocodedLocationsProvider> */}
      <SheltersCard />
      {/* </GeocodedLocationsProvider> */}
      <MealsCard />
      <Parallax2 />
      <Resources />
      <Parallax3 />
      <AboutUs />
      <Footer />
    </>
  );
}
