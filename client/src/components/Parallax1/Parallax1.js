import './Parallax1.scss';
import ParallaxImage1 from '../../assets/images/SafeHavenTO_graphic-art-skyline-1.png';

export default function Parallax1() {
  return (
    <>
      <div
        className='parallax1'
        style={{ backgroundImage: `url(${ParallaxImage1})` }}
      />
    </>
  );
}