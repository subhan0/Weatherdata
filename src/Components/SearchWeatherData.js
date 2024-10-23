import React, { useEffect, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import Spining from "./Spining";

function SearchWeatherData() {
  const [place, setPlace] = useState("Hyderabad");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeatherData = async () => {
    setLoading(true);
    try {
      const api_key = "5f657a33679d6ee79e8d5e97caa89a04";
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${api_key}&units=metric`
      );
      if (!response.ok) {
        throw new Error("Weather data not available for the specified location.");
      }
      const data = await response.json();
      setWeatherData(data);
      setPlace(""); // Reset the input box
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    if (place !== "") {
      fetchWeatherData();
    }
  }, []);

  return (
    <div>
      <div className="">
        {loading ? (
          <Spining />
        ) : (
          <div>
            <div className="max-w-[1000px] mx-auto flex flex-col justify-center items-center">
              <div className="w-[90%] max-w-[550px] flex justify-center items-center gap-[10px] mt-[45px]">
                <input
                  type="text"
                  placeholder="Search for city.."
                  value={place}
                  onChange={(e) => setPlace(e.target.value)}
                  className="text-white h-[40px] w-[90%] px-3 py-3 rounded-lg bg-black bg-opacity-30 placeholder-slate-300 text-lg outline-slate-900"
                />
                <button onClick={fetchWeatherData}>
                  <IoMdSearch className="text-[24px] w-[40px] h-[40px] rounded-full p-1 px-2 text-white bg-black bg-opacity-30" />
                </button>
              </div>

              {weatherData && (
                <div className="w-[90%]">
                  <div className="flex gap-4 mt-12 mb-5 justify-center items-center">
                    <h2 className="text-white text-3xl">{weatherData.name}</h2>
                    <img
                      src={`https://flagcdn.com/144x108/${weatherData?.sys?.country.toLowerCase()}.png`}
                      height={36}
                      width={36}
                      className="object-contain"
                      alt=""
                    />
                  </div>

                  <div className="text-2xl text-slate-300 text-center">
                    {weatherData?.weather?.[0]?.main}
                  </div>

                  <div className="flex justify-center mt-2">
                    <img
                      src={`http://openweathermap.org/img/w/${weatherData?.weather?.[0]?.icon}.png`}
                      height={100}
                      width={100}
                      alt=""
                    />
                  </div>

                  <p className="text-4xl font-bold text-white text-center">
                    {weatherData?.main?.temp} °C
                  </p>

                  <div className="w-[90%] flex flex-wrap justify-center items-center gap-x-[10px] gap-y-[20px] mt-8 mx-auto mb-4">
                    <WeatherInfo
                      label="WindSpeed"
                      value={`${weatherData?.wind?.speed} m/s`}
                      icon="wind.png"
                    />
                    <WeatherInfo
                      label="Humidity"
                      value={`${weatherData?.main?.humidity} m/s`}
                      icon="humidity.png"
                    />
                    <WeatherInfo
                      label="Clouds"
                      value={`${weatherData?.clouds?.all}%`}
                      icon="cloud.png"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const WeatherInfo = ({ label, value, icon }) => (
  <div className="flex flex-col justify-center items-center w-[30%] max-w-[200px] bg-black bg-opacity-30 to-transparent rounded-md p-4">
    <img
      src={icon} // Assuming the icon props contains the path to the image
      height={50}
      width={50}
      className="object-cover"
      alt={label}
    />
    <p className="text-[24px] text-white">{label}</p>
    <p className="text-xl text-white">{value}</p>
  </div>
);

export default SearchWeatherData;
