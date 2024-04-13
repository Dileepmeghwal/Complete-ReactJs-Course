import React from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import Styles from "../components/Map.module.css";
import Button from "../components/Button";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useState } from "react";
import { useCities } from "../context/CitiesContext";
import { useEffect } from "react";
import { useGeolocation } from "../hooks/useGeolocation";
import { useUrlPosition } from "../hooks/useUrlPosition";

const Map = () => {
  const navigate = useNavigate();
  const { cities } = useCities();
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const [searchParams] = useSearchParams();

  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
    error,
  } = useGeolocation();

  const mapLat = searchParams.get("lat");
  const mapLng = searchParams.get("lng");

  useEffect(() => {
    if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
  }, [mapLat, mapLng]);

  useEffect(() => {
    if (geolocationPosition)
      setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
  }, [geolocationPosition]);

  return (
    <div
      className={Styles.mapContainer}
      // onClick={() => {
      //   navigate(`form`);
      // }}
    >
      {!geolocationPosition && (
        <Button type={"position"} onClick={getPosition}>
          {isLoadingPosition ? "Loading..." : "use Your position"}
        </Button>
      )}
      <MapContainer
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
        className={Styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities?.map((city) => (
          <Marker
            position={[city?.position?.lat, city?.position?.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji}</span> <span> {city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition} />
        <DeleteClick />
      </MapContainer>
    </div>
  );
};
function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DeleteClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => {
      console.log(e);
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
}

export default Map;
