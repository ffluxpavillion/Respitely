import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from '../src/components/Header/Header';
import Hero from '../src/components/Hero/Hero';
import OurMission from './components/OurMission/OurMission';
import Parallax from './components/Parallax/Parallax';
import Parallax2 from './components/Parallax2/Parallax2';
import SheltersCard from './components/SheltersCard/SheltersCard';
import Footer from './components/Footer/Footer';

export default function App() {
  return (
    <BrowserRouter>
        <Header />
        <Hero />
        <OurMission />
        <Parallax />
        <SheltersCard />
        <Parallax2 />
        <Footer />
        <Routes>
            {/* <Route path='/' exact element={<Map />} />
          <Route path='/shelter/shelterId' exact element={<SheltersCard />} /> */}

        </Routes>
      </BrowserRouter>
  );
}