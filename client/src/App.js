import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from '../src/components/Header/Header';
import Home from '../src/components/Home/Home';
import Parallax1 from './components/Parallax1/Parallax1';
import AboutUs from './components/AboutUs/AboutUs';
import Parallax3 from './components/Parallax3/Parallax3';
import Parallax2 from './components/Parallax2/Parallax2';
import SheltersCard from './components/SheltersCard/SheltersCard';
import Resources from './components/Resources/Resources';
import Footer from './components/Footer/Footer';
import './App.scss';
import { FloatButton } from 'antd';
import { initGA } from './utils/analytics';

export default function App() {
  initGA(); // Initialize Google Analytics

  return (
    <BrowserRouter>
      <Header />
      <Home />
      <Parallax1 />
      <SheltersCard />
      <Parallax2 />
      <Resources />
      <Parallax3 />
      <AboutUs />
      <Footer />
      <FloatButton.BackTop />
    </BrowserRouter>
  );
}
