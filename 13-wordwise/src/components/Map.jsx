import React from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import Styles from "../components/Map.module.css";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useState } from "react";
import { useCities } from "../context/CitiesContext";
import { useEffect } from "react";

const Map = () => {
  const navigate = useNavigate();
  const { cities } = useCities();
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const [searchParams, setSearchParams] = useSearchParams();

  const mapLat = searchParams.get("lat");
  const mapLng = searchParams.get("lng");


  useEffect(() => {

  },[])
  return (
    <div
      className={Styles.mapContainer}
      // onClick={() => {
      //   navigate(`form`);
      // }}
    >
      <MapContainer
        center={mapPosition}
        // center={[mapLat, mapLng]}
        zoom={6}
        scrollWheelZoom={true}
        className={Styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city?.position?.lat, city?.position?.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji}</span> <span> {city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={[mapLat || 40, mapLng || 0]} />
      </MapContainer>
    </div>
  );
};
function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

export default Map;
