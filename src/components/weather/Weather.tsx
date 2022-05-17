import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  loadWeather,
  selectWeather,
  // createUrl
} from "./weatherSlice";

import styles from './weather.module.scss'

export const Weather = () => {
  const dispatch = useAppDispatch();
  // const [geoUrl, setGeoUrl] = useState("");
  const [lat, setLat] = useState<number>();
  const [long, setLong] = useState<number>();

  const weather = useAppSelector(selectWeather);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      let yy: number = position.coords.longitude;
      let xx: number = position.coords.latitude;

      setLong(yy);
      setLat(xx);
    });
  }, []);

  useEffect(() => {
    lat !== undefined &&
      long !== undefined &&
      dispatch(
        loadWeather({
          lat: lat,
          long: long,
        })
      );
  }, [dispatch, lat, long]);

  return (
    <div className={styles.weatherContainer}>
      <h3 className={styles.weatherHeader}>Погода сейчас:</h3>
      <div className={styles.weatherInnerContainer}>
        <i className={`wi wi-icon ${styles.weatherIcon} wi-${weather.icon}`}></i>
        <h3 className={styles.weatherDegree}>{`${weather.degree} C`}</h3>
      </div>
      <h3 className={styles.weatherDescr}>{weather.descr}</h3>
    </div>
  );
};

//   export default Weather;
