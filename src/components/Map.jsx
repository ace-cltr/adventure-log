import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useState, useEffect } from "react";
import { useCities } from "../contexts/CityContext";

export default function Map() {
  const navigate = useNavigate(); // this is very useful functionality provided by react-router
  // we use this when we want to send user to any other page without clicking on any button
  // commonly used in forms submission then we re-direct user to dashboard and in our case we will open form component

  const { cities } = useCities();
  const [mapPosition, setMapPosition] = useState([19.0815772, 72.8866275]);

  const [searchParams, setSearchParams] = useSearchParams(); // here useSearchParams is like a state

  const mapLat = searchParams.get("lat"); // to get the data from it we have to call the get method then name of the value => ('value')
  const mapLng = searchParams.get("lng");

  useEffect(() => {
    if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
  }, [mapLat, mapLng]);

  return (
    <div className={styles.mapContainer} onClick={() => navigate("form")}>
      <MapContainer
        center={mapPosition}
        // center={[mapLat, mapLng]}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((cities) => (
          <Marker
            position={[cities.position.lat, cities.position.lng]}
            key={cities.id}
          >
            <Popup>
              <span>{cities.emoji}</span>
              <span>{cities.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenterPos position={mapPosition} />
      </MapContainer>
    </div>
  );
}

function ChangeCenterPos({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}
