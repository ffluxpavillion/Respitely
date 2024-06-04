import './Parallax2.scss';
import ParallaxImage2 from '../../assets/images/SafeHavenTO_graphic-art-skyline-3.png';

export default function Parallax2() {
  return (
    <>
      <div
        className='parallax2'
        style={{ backgroundImage: `url(${ParallaxImage2})` }}
      ></div>
    </>
  );
}
