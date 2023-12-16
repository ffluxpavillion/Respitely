import './Hero.scss';
import Banner from '../../assets/images/SafeHavenTO-banner.png';
import Banner2 from '../../assets/images/SafeHavenTO.png';



export default function Hero() {


  return (
    <>
    <div>
      {/* <div className="hero" style={{ backgroundImage: `url(${Banner})` }}>
       */}
       <div className="hero" style={{ backgroundImage: `url(${Banner2})` }} />

          <div className="hero__div">
            <h1 className="hero__div-h1">SafeHavenTO</h1>
          </div>
        </div>
</>
  );
}
