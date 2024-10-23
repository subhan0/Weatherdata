import React, { useEffect, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { MdVisibility } from "react-icons/md";
import Spinning from "../Spining";

const Travellers = () => {
  const [location, setLocation] = useState("Hyderabad");
  const [date, setDate] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeatherData = async () => {
    setLoading(true);
    try {
      const api_key = "5f657a33679d6ee79e8d5e97caa89a04";
      const url = `https://api.openweathermap.org/data/2.5/forecast`;
      const response = await fetch(
        `${url}?q=${location}&appid=${api_key}&dt=${date}&units=metric`
      );
      if (!response.ok) {
        throw new Error(
          "Weather data not available for the specified location."
        );
      }
      const responseData = await response.json();
      setData(responseData);

    } catch (error) {
      console.error("Error fetching weather data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if ((location !== " " && location.length >= 3) || date !== "") {
      fetchWeatherData();
    }
  }, [location, date]);

  const weekdays = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];
  const dayInAWeek = new Date().getDay();
  const forecastDays = [
    ...weekdays.slice(dayInAWeek),
    ...weekdays.slice(0, dayInAWeek),
  ];

  return (
    <div className="max-w-[1000px] mx-auto">
      <div className="flex flex-col justify-center items-center mt-8">
        <div className="flex justify-center items-center gap-4">
          <input
            type="text"
            placeholder="Search for city..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className=" text-white  h-[40px] w-[90%] px-3 py-3 rounded-lg  bg-black bg-opacity-30 placeholder-slate-300 text-lg outline-slate-900  "
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className=" text-white  h-[40px] w-[90%] px-3 py-3 rounded-lg  bg-black bg-opacity-30 placeholder-slate-300 text-lg outline-slate-900 "
          />
          <button onClick={fetchWeatherData} className="btn-style">
            <IoMdSearch className=" text-[24px] w-[40px] h-[40px] rounded-full p-1 px-2  text-white  bg-black bg-opacity-40" />
          </button>
        </div>
        {loading ? (
          <Spinning />
        ) : (
          data && (
            <div className="weather-info">
              <div className="flex flex-col gap-2 justify-center items-center mx-auto mt-4">
                <h2 className="text-white text-3xl">{data?.city?.name}</h2>
                <img
                  src={`https://flagcdn.com/144x108/${data?.city?.country.toLowerCase()}.png`}
                  height={36}
                  width={36}
                  className="object-contain"
                  alt=""
                />
                <p className="text-xl text-slate-300">
                  {data.list?.[0]?.weather?.[0]?.description}
                </p>
                <div className="text-2xl text-slate-300 text-center">
                  {data?.list?.weather?.main}
                </div>
                <div className="flex justify-center">
                  <img
                    src={`http://openweathermap.org/img/w/${data?.list?.[0]?.weather?.[0]?.icon}.png`}
                    height={100}
                    width={100}
                    alt=""
                  />
                </div>
                <p className="text-4xl text-white font-bold text-center">
                  {data?.list?.[0]?.main?.temp} °C
                </p>
              </div>
              <div className="w-[90%] flex flex-wrap justify-center gap-4 mt-5 mb-4 items-center mx-auto">
                <WeatherInfo
                  label="WindSpeed"
                  value={`${data.list?.[0]?.wind?.speed}m/s`}
                  icon="../wind.png"
                />
                <WeatherInfo
                  label="Humidity"
                  value={`${data?.list?.[0]?.main?.humidity}m/s`}
                  icon="../humidity.png"
                />
                <WeatherInfo
                  label="Clouds"
                  value={`${data?.list?.[0]?.clouds?.all}%`}
                  icon="../cloud.png"
                />
                <WeatherInfo
                  label="Visibility"
                  value={`${data?.list?.[0]?.visibility / 1000}km`}
                  icon="../visibility.png" // Corrected icon source
                />
              </div>
            </div>
          )
        )}
        <div className="w-[90%] max-w-[750px] mx-auto">
          <h3 className="text-lg text-slate-200 font-semibold text-start">
            Daily Forecast
          </h3>
        </div>
        <div className="w-[90%] max-w-[750px] h-[1px] bg-white mx-auto my-2" />
        <div className="w-[45%] flex flex-row mx-auto items-center mt-4 pb-7 justify-center gap-[50px]">
          {data &&
            data.list &&
            data.list.splice(0, 7).map((item, index) => (
              <div
                className="w-[90]% flex flex-col items-center justify-center"
                key={index}
              >
                <p className="text-white text-sm font-semibold">
                  {forecastDays[index]}
                </p>
                <img
                  alt="weather"
                  className=""
                  src={`http://openweathermap.org/img/w/${item.weather[0].icon}.png`}
                />
                <p className="text-white text-sm font-semibold">{`${item.main.temp}°C`}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

const WeatherInfo = ({ label, value, icon }) => (
  <div className="flex flex-col items-center w-[25%] max-w-[100px] bg-black bg-opacity-30 to-transparent rounded-md p-4">
    <img alt="" src={icon} className="h-10 w-10" />
    <p className="text-lg text-white">{label}</p>
    <p className="text-lg text-white">{value}</p>
  </div>
);

export default Travellers;
