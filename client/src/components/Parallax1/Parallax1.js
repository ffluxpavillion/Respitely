import './Parallax1.scss';
import HeroImage from '../../assets/images/SafeHavenTO_graphic-art-skyline-1.png';

export default function Parallax1() {

  return (
    <>
      <div className="parallax" style={{ backgroundImage: `url(${HeroImage})` }} />
    </>
  );
}
