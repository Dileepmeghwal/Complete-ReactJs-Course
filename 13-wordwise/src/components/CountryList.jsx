import React from "react";
import Styles from "../components/CountryList.module.css";
import Spinner from "../components/Spinner";

import CityItem from "./CityItem";
import Message from "./Message";
import CountryItem from "./CountryItem";

const CountryList = ({ cities, isLoading }) => {
  if (isLoading) return <Spinner />;
  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );

  const countries = cities.reduce(
    (arr, city) => {
      if (!arr.map((el) => el.counrty).includes(city.counrty))
        return [...arr, { country: city.country, emoji: city.emoji }];
      else return arr;
    },

    []
  );
  return (
    <ul className={Styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.id} />
      ))}
    </ul>
  );
};

export default CountryList;
