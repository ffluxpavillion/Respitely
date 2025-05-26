import './App.scss';
import { Theme } from '@radix-ui/themes';
import { Routes, Route, Navigate } from 'react-router-dom'; // react-router
import { initGA } from './utils/analytics'; // google analytics
import ApiKeyProvider from './contexts/ApiKeyContext'; // contexts
import { DateTimeProvider } from './contexts/DateTimeContext'; // contexts
import { useGeolocation } from './hooks/useGeolocation'; // hooks
import { ParallaxProvider } from 'react-scroll-parallax';
// components
import Header from './components/Header/Header';
import SheltersCardOG from './components/SheltersCard-OG/SheltersCard-OG';
import CookiePolicy from './components/Legal/CookiePolicy/CookiePolicy';
import TermsOfUse from './components/Legal/TermsOfUse/TermsOfUse';
import MealsMap from './components/MealsMap/MealsMap';
import SheltersCard from './components/SheltersCard/SheltersCard';

import Homepage from './pages/Homepage/Homepage';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import ProviderSignupForm from './pages/ProviderSignupForm/ProviderSignupForm';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import { UserContextProvider } from './contexts/userContext';
import Dashboard from './pages/Dashboard/Dashboard';
import { GeocodedLocationsProvider } from './contexts/GeocodedDataContext'; // TODO - Need to fix before enabling
import ShelterMap from './components/ShelterMap/ShelterMap'; // Import SheltersMap component
import Profile from './pages/Profile/Profile';

export default function App() {
  const { locationInfo, locationError } = useGeolocation();
  console.log({ locationError, locationInfo });
  initGA(); // Initialize Google Analytics

  return (
    // <UserContextProvider>
    <Theme style={{ backgroundColor: '#0f0f0f' }}>
      <ApiKeyProvider>
      <DateTimeProvider>
        <ParallaxProvider>
          <Header />
          <Toaster position='top-center' toastoptions={{ duration: 6000 }} />
          <Routes>
            <Route path='/' element={<Homepage />} />
            <Route path='/shelters' element={<SheltersCard />} />
            <Route path='/login' element={<Login />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/register' element={<Register />} />
            <Route path='/provider-signup' element={<ProviderSignupForm />} />
            <Route path='/cookie-policy' element={<CookiePolicy />} />
            <Route path='/shelterscard-og' element={<SheltersCardOG />} />
            <Route path='/terms-of-use' element={<TermsOfUse />} />
            <Route path='/drop-in-map' element={<MealsMap />} />
            <Route path='/shelter-map' element={<ShelterMap />} />

            <Route path='*' element={<Navigate to='/' />} />
          </Routes>
        </ParallaxProvider>
      </DateTimeProvider>
      </ApiKeyProvider>
    </Theme>
    // </UserContextProvider>
  );
}
