import ReactGA from 'react-ga4';

const GA_MEASUREMENT_ID = 'G-5W7B00BEM8';

export const initGA = () => {
  ReactGA.initialize(GA_MEASUREMENT_ID);
};

export const trackPageView = (pathname) => {
  ReactGA.send({ hitType: 'pageview', page: pathname });
};