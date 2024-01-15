import './Hero.scss';
import HeroImage from '../../assets/images/SafeHavenTO_graphic-art-skyline-1.png';

export default function Hero() {

  return (
    <>
      <div>
        <div className="hero" style={{ backgroundImage: `url(${HeroImage})` }} />
          <div className="hero__div">
            <h1 className="hero__div-h1" id="aboutUs">SafeHavenTO</h1>
        </div>
      </div>
    </>
  );
}
