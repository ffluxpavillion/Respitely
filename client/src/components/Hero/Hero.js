import './Hero.scss';
import Banner from '../../assets/images/SafeHavenTO-banner.png';


export default function Hero() {
 

  return (
    <div>
      <div className="hero" style={{ backgroundImage: `url(${Banner})` }}>
          <div className="hero__div">
            <h1 className="hero__div-h1">SafeHavenTO</h1>
          </div>
        </div>
    </div>

  );
}
