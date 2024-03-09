import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from '../src/components/Header/Header';
import Hero from '../src/components/Hero/Hero';
import AboutUs from './components/AboutUs/AboutUs';
import Parallax from './components/Parallax/Parallax';
import Parallax2 from './components/Parallax2/Parallax2';
import SheltersCard from './components/SheltersCard/SheltersCard';
import Resources from './components/Resources/Resources';
import Footer from './components/Footer/Footer';
import './App.scss';

export default function App() {
  return (
    <BrowserRouter>
        <Header />
        <Hero />
        <AboutUs />
        <Parallax />
        <SheltersCard />
        <Parallax2 />
        <Resources />
        <Footer />
      </BrowserRouter>
  );
}