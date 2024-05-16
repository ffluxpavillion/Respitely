import './Parallax3.scss';
import ParallaxImage from '../../assets/images/SafeHavenTO_ttc-queen-station.jpg';


export default function Parallax3() {
  return (
    <>
      <div className="parallax3" style={{ backgroundImage: `url(${ParallaxImage})` }}></div>
    </>
  );
}
