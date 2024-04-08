import React from "react";
import Styles from "../components/CityList.module.css";
import Spinner from "../components/Spinner";

import CityItem from "./CityItem";
import Message from "./Message";

const CityList = ({ cities, isLoading }) => {
  
  if (isLoading) return <Spinner />;
  if(!cities.length) return <Message message="Add your first city by clicking on a city on the map" />
  return (
    <ul className={Styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id}/>
      ))}
    </ul>
  );
};

export default CityList;
