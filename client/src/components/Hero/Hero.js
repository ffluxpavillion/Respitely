import './Hero.scss';
import HeroImage from '../../assets/images/SafeHavenTO_graphic-art-skyline-1.png';

export default function Hero() {

  return (
    <>
      <div className="hero" style={{ backgroundImage: `url(${HeroImage})` }} />
    </>
  );
}
