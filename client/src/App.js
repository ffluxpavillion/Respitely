import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from '../src/components/Header/Header';
import Hero from '../src/components/Hero/Hero';
import OurMission from './components/OurMission/OurMission';
import SheltersCard from './components/SheltersCard/SheltersCard';
import SheltersMap from './components/SheltersMap/SheltersMap';
import Footer from './components/Footer/Footer';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Hero />
      <OurMission />
      <SheltersCard />
      {/* <SheltersMap />
      <Footer /> */}

      <Routes></Routes>
    </BrowserRouter>
  );
}