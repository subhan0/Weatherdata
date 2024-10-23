import React, { useEffect, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import Spining from "../Spining";

const EventPlanner = () => {
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState("hyderabad");
  const [data, setData] = useState(null);

  const fetchWeatherData = async () => {
    setLoading(true);
    const api_key = "f31bc35da571420c90e63136230612";
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${api_key}&q=${location}&days=7`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Weather data not available for the specified location.");
      }
      const responseData = await response.json();
      setData(responseData);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (location.trim() !== "") {
      fetchWeatherData();
    }
  }, [location]);

  const renderHourlyForecast = () => {
    if (!data || !data.forecast || !data.forecast.forecastday[0].hour) {
      return null;
    }

    return data.forecast.forecastday[0].hour.map((item, index) => (
      <div key={index} className="inline-grid text-white">
        <div className="w-[90%] bg-black bg-opacity-30 flex flex-col justify-center items-center px-4 py-4 gap-2 rounded-md">
          <p className="text-sm font-semibold">{item.time}</p>
          <img alt="weather" src={item.condition.icon}></img>
          <p className="text-sm font-semibold">{`${item.temp_c}`}°C</p>
        </div>
      </div>
    ));
  };

  return (
    <div>
      <div className="w-[90%] max-w-[550px] flex justify-center items-center gap-[10px] mt-[45px] mx-auto">
        <input
          type="text"
          placeholder="Search for city.."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="text-white h-[40px] w-[90%] px-3 py-3 rounded-lg bg-black bg-opacity-30 placeholder-slate-300 text-lg outline-slate-900"
        />
        <button onClick={fetchWeatherData}>
          <IoMdSearch className="text-[24px] w-[40px] h-[40px] rounded-full p-1 px-2 text-white bg-black bg-opacity-30" />
        </button>
      </div>

      <div>
        {loading ? (
          <Spining />
        ) : (
          <div className="w-[90%] max-w-[1000px] flex flex-col justify-center items-center mx-auto">
            <div className="w-[90%] max-w-[1000px] flex flex-col justify-center items-center mx-auto">
              <div className="flex gap-4 mt-12 mb-5 justify-center">
                <h2 className="text-white text-3xl">
                  {data?.location?.name}, <span>{data?.location?.country}</span>
                </h2>
              </div>
              <div className="text-2xl text-slate-300 text-center">
                {data?.current?.condition?.text}
              </div>
              <div className="flex justify-center mt-3">
                <img src={data?.current?.condition?.icon} height={80} width={80} alt="weatherImg"></img>
              </div>
              <p className="text-4xl text-slate-100 font-semibold text-center mt-3">
                <span className="font-semibold text-4xl">Temp</span> {data?.current?.temp_c} °C
              </p>
              <div className="w-[90%] flex flex-wrap justify-center items-center gap-x-[10px] gap-y-[20px] mt-8 mx-auto mb-4">
                <WeatherInfo label="WindSpeed" value={`${data?.current?.wind_mph} mph`} icon="../wind.png" />
                <WeatherInfo label="Humidity" value={`${data?.current?.humidity} m/s`} icon="../humidity.png" />
                <WeatherInfo label="Precipitation" value={`${data?.current?.precip_in} in`} icon="../precipitation.webp" />
                <WeatherInfo label="Clouds" value={`${data?.current?.cloud}%`} icon="../cloud.png" />
              </div>
              <div className="w-[90%] max-w-[750px] mx-auto">
                <h3 className="text-xl text-slate-100 font-semibold text-start">Hourly forecast</h3>
              </div>
              <div className="w-[90%] h-[2px] bg-white mx-auto my-1"></div>
              <div className="w-[90%] whitespace-nowrap rounded-lg overflow-auto mx-auto mb-4">
                {renderHourlyForecast()}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const WeatherInfo = ({ label, value, icon }) => (
  <div className="w-[20%] max-w-[150px] flex flex-col justify-center items-center bg-black bg-opacity-30 to-transparent rounded-md p-4">
    <img src={icon} className="object-cover" height="50px" width="50px" alt={label}></img>
    <p className="text-lg text-white">{label}</p>
    <p className="text-lg text-white">{value}</p>
  </div>
);

export default EventPlanner;
