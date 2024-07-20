import './App.scss';
import { Routes, Route, Navigate } from 'react-router-dom'; // react-router
import { initGA } from './utils/analytics'; // google analytics
import ApiKeyProvider from './contexts/ApiKeyContext'; // contexts
import { useGeolocation } from './hooks/useGeolocation'; // hooks
import { ParallaxProvider } from 'react-scroll-parallax';
// components
import Header from '../src/components/Header/Header';
import SheltersCardOG from './components/SheltersCard-OG/SheltersCard-OG';
import CookiePolicy from './components/Legal/CookiePolicy/CookiePolicy';
import TermsOfUse from './components/Legal/TermsOfUse/TermsOfUse';
import MealsMap from './components/MealsMap/MealsMap';
import SheltersCard from './components/SheltersCard/SheltersCard';
import Homepage from './pages/Homepage/Homepage';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import { UserContextProvider } from './contexts/userContext';
import Dashboard from './pages/Dashboard/Dashboard';
import { GeocodedLocationsProvider } from './contexts/GeocodedDataContext'; // TODO - Need to fix before enabling
// import ShelterMap from './components/SheltersMap/SheltersMap'; // Import SheltersMap component

export default function App() {
  const { locationInfo, locationError } = useGeolocation();
  console.log({ locationError, locationInfo });
  initGA(); // Initialize Google Analytics

  return (
    <UserContextProvider>
      <ApiKeyProvider>
        <ParallaxProvider>
          <Header />
          <Toaster position='top-center' toastoptions={{ duration: 6000 }} />
          <Routes>
            <Route path='/' element={<Homepage />} />
            <Route path='/shelters' element={<SheltersCard />} />
            <Route path='/login' element={<Login />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/register' element={<Register />} />
            <Route path='/cookie-policy' element={<CookiePolicy />} />
            <Route path='/shelterscard-og' element={<SheltersCardOG />} />
            <Route path='/terms-of-use' element={<TermsOfUse />} />
            <Route path='/drop-in-map' element={<MealsMap />} />
            <Route path='*' element={<Navigate to="/" />} />

            {/* <Route path='/shelter-map' element={<ShelterMap />} /> */}
          </Routes>
        </ParallaxProvider>
      </ApiKeyProvider>
    </UserContextProvider>
  );
}
