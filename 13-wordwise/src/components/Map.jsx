import React from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import Styles from "../components/Map.module.css";

const Map = () => {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams();

  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  return (
    <div className={Styles.mapContainer} onClick={() => {
      navigate(`form`)
    }}>
      <h1>Map</h1>
      <h1>
        Position: {lat} , {lng}
      </h1>

      <button
        onClick={() => {
          setSearchParams({ lat: 23, lng: 50 });
        }}
      >
        Change pos
      </button>
    </div>
  );
};

export default Map;