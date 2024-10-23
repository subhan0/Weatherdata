
import React, { useState, useEffect } from "react";
import Spining from "./Spining";
const UserWeatherData = () => {
  const [loading, setLoading] = useState(true);
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    getUserLocation();
  }, []);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchUserWeatherData(latitude, longitude);
        },
        () => {
          console.error("Geolocation permission denied");
          setLoading(false);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser");
      setLoading(false);
    }
  };

  const fetchUserWeatherData = async (lat, lon) => {
    const API_KEY = "d1845658f92b31c64bd94f06f7188c9c";
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Weather data not available");
      }
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[90%] max-w-[1000px] mx-auto">
    
      {loading ? (
        <Spining />
      ) : !weatherData ? (
        <div className="flex flex-col items-center mt-4">
          <img
            width="80"
            height="80"
            loading="lazy"
            src="../location.png"
            alt="locationImg"
            className="mt-6 mb-4"
          />
          <div className="text-4xl font-semibold text-slate-100">
            Grant Location Access
          </div>
          <p className="mt-3 text-lg text-slate-300">
            Allow access to get weather information
          </p>
          <div className="mt-5 bg-slate-200 bg-opacity-45 rounded-md py-2 px-3">
            <button
              onClick={getUserLocation}
              className="text-lg font-semibold text-slate-200"
            >
              Grant Access
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center mt-4">
          <div className="flex items-center gap-4 mt-12 mb-5">
            <h2 className="text-3xl text-white">{weatherData.name}</h2>
            <img
              src={`https://flagcdn.com/144x108/${weatherData.sys.country.toLowerCase()}.png`}
              height={36}
              width={36}
              alt=""
              className="object-contain"
            />
          </div>
          <div className="text-2xl text-slate-300">
            {weatherData.weather[0].main}
          </div>
          <div className="flex justify-center mt-2">
            <img
              src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
              height={100}
              width={100}
              alt=""
            />
          </div>
          <p className="text-4xl font-bold text-white">
            {weatherData.main.temp} °C
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-5 mb-4">
            <WeatherInfo icon="../wind.png" label="WindSpeed" value={`${weatherData.wind.speed} m/s`} />
            <WeatherInfo icon="../humidity.png" label="Humidity" value={`${weatherData.main.humidity}%`} />
            <WeatherInfo icon="../cloud.png" label="Clouds" value={`${weatherData.clouds.all}%`} />
          </div>
        </div>
      )}
    </div>
  );
};

const WeatherInfo = ({ icon, label, value }) => (
  <div className="flex flex-col items-center w-[30%] max-w-[200px] bg-black bg-opacity-30 to-transparent rounded-md p-4 px-6">
    <img src={icon} alt="" className="h-[60px] w-[60px]" />
    <p className="text-[24px] text-white">{label}</p>
    <p className="text-xl text-white">{value}</p>
  </div>
);

export default UserWeatherData;
