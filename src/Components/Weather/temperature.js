// https://api.openweathermap.org/data/2.5/weather?q=Rawalpindi&appid=22e9f41837dd6e88c632948db222eb7d
import React, { useState, useEffect } from "react";
import "./style.css";
import WeatherCard from "./WeatherCard";

const Temperature = () => {
  const [searchVlaue, setsearchVlaue] = useState("Rawalpindi");
  const [tempInfo, settempInfo] = useState({});

  const getWeatherInfo = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchVlaue}&units=metric&appid=22e9f41837dd6e88c632948db222eb7d`;
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);

      //   destructuring data
      const { temp, humidity, pressure } = data.main;
      const { main: weatherMood } = data.weather[0];
      const { name } = data;
      const { speed } = data.wind;
      const { country, sunset } = data.sys;

      console.log("temp =>", temp);

      const myNewWeatherInfo = {
        temp,
        humidity,
        pressure,
        weatherMood,
        name,
        speed,
        country,
        sunset,
      };
      console.log("mynew weather temperature =>", myNewWeatherInfo.temp);
      settempInfo(myNewWeatherInfo);
    } catch (error) {
      console.log("api error ==>", error);
    }
  };

  useEffect(() => {
    getWeatherInfo();
  }, []);

  return (
    <>
      <div className="wrap">
        <div className="search">
          <input
            type="search"
            placeholder="search ..."
            autoFocus
            id="search"
            value={searchVlaue}
            onChange={(e) => setsearchVlaue(e.target.value)}
            className="searchTerm"
          />
          <button
            className="searchButton"
            type="button"
            onClick={getWeatherInfo}
          >
            Search
          </button>
        </div>
      </div>

      {/* our temperature card */}
      {/* <WeatherCard tempInfo={tempInfo} /> */}
      <WeatherCard {...tempInfo} />
    </>
  );
};

export default Temperature;
