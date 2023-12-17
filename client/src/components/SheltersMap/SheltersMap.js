import './SheltersMap.scss';
import GoogleMapReact from 'google-map-react';
import { useState, useEffect } from "react";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function SheltersMap () {
  // piece of state to store maps API key
  const [apiKey, setApiKey] = useState("");

  useEffect(() => {
    // fetch and set maps key from server
    fetch('http://localhost:8080/api/maps-key')
  .then(response => response.json())
  .then(data => {
    setApiKey(data.key);
  });
  }, []);

  const defaultProps = {
    // set default center of map to Toronto
    center: {
      lat: 43.653908,
      lng: -79.384293
    },
    zoom: 13
  };

  return (
    <>
        <div className="sheltersMap__Container">
        {apiKey && <GoogleMapReact
          bootstrapURLKeys={{ key: apiKey }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
        >
          <AnyReactComponent
            lat={43.653908}
            lng={-79.384293}
            text="My Marker"
          />
        </GoogleMapReact>}
    </div>
    </>

  );
}