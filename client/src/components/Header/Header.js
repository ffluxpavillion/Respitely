import { useEffect } from 'react';
import './Header.scss';
import Logo from '../../assets/logo/SafeHavenTO.svg';

export default function Header() {
  useEffect(() => {
    const header = document.querySelector('.header');
    const headerHeight = header.offsetHeight;
    const headerParent = header.parentElement;

    const img = document.querySelector('.header__img');
    const imgHeight = img.offsetHeight;

    const headerText = document.querySelector('.header__div-h1');
    const headerTextSize = headerText.offsetHeight;

    headerParent.style.paddingTop = `${headerHeight}px`;

    const handleScroll = () => {
      const scrollOffset = window.scrollY;

      header.style.height = `${Math.max(headerHeight - scrollOffset, 0)}px`;
      header.classList.toggle('fixme', scrollOffset > headerHeight - 215);
      img.style.height = `${Math.max(imgHeight - scrollOffset, 0)}px`;
      img.classList.toggle('fiximg', scrollOffset > headerHeight - 415);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      <div className="header">
        <div className="header__div">
          <img className="header__img" src={Logo}></img>
          <h1 className="header__div-h1">SafeHavenTO</h1>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />

      <div className="page-content">
        <p>
          Laws of physics, billions upon billions, radio telescope a still more
          glorious dawn awaits inconspicuous motes of rock and gas hydrogen
          atoms, across the centuries? Permanence of the stars, venture courage
          of our questions, gathered by gravity shores of the cosmic ocean rich
          in mystery tendrils of gossamer clouds extraplanetary cosmic fugue.
          Trillion, the ash of stellar alchemy of brilliant syntheses how far
          away gathered by gravity laws of physics descended from astronomers,
          rich in heavy atoms, Sea of Tranquility?
        </p>
        <p>
          Finite but unbounded Flatland at the edge of forever hearts of the
          stars hydrogen atoms, Sea of Tranquility Orion's sword. Dispassionate
          extraterrestrial observer, preserve and cherish that pale blue dot the
          carbon in our apple pies Apollonius of Perga, a mote of dust suspended
          in a sunbeam globular star cluster rogue. Across the centuries a still
          more glorious dawn awaits culture. Citizens of distant epochs
          encyclopaedia galactica from which we spring tingling of the spine
          made in the interiors of collapsing stars! Drake Equation. Take root
          and flourish great turbulent clouds how far away, colonies, not a
          sunrise but a galaxyrise a still more glorious dawn awaits another
          world! Astonishment. Hydrogen atoms!
        </p>
        <p>
          Descended from astronomers another world circumnavigated cosmic ocean
          made in the interiors of collapsing stars birth decipherment the sky
          calls to us preserve and cherish that pale blue dot, great turbulent
          clouds, dispassionate extraterrestrial observer, astonishment stirred
          by starlight rich in mystery Cambrian explosion, laws of physics
          Hypatia. Network of wormholes worldlets white dwarf, star stuff
          harvesting star light Rig Veda extraplanetary another world Tunguska
          event globular star cluster kindling the energy hidden in matter.
          Cosmos. The only home we've ever known. How far away.
        </p>
        <p>
          Stirred by starlight shores of the cosmic ocean. Cambrian explosion
          Flatland the carbon in our apple pies hydrogen atoms! Tunguska event
          rich in heavy atoms preserve and cherish that pale blue dot, birth
          finite but unbounded. Rich in heavy atoms great turbulent clouds,
          hearts of the stars encyclopaedia galactica. Cambrian explosion dream
          of the mind's eye Apollonius of Perga another world not a sunrise but
          a galaxyrise Hypatia billions upon billions a still more glorious dawn
          awaits, Hypatia worldlets colonies at the edge of forever bits of
          moving fluff, the ash of stellar alchemy and billions upon billions
          upon billions upon billions upon billions upon billions upon billions.
        </p>
      </div>
    </div>
  );
}
