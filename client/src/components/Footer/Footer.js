import './Footer.scss'
import FooterImage from '../../assets/images/SafeHavenTO_graphic-art-community-1.png';

export default function Footer () {

  return (
    <>
      <footer className="footer">
            <div className="hero" style={{ backgroundImage: `url(${FooterImage})` }} />
          <p className="copyright">&copy; 2024 SafeHavenTO. All rights reserved.</p>
      </footer>
    </>
  )


}