import React, { useEffect, useState } from "react";
import { BsWind } from "react-icons/bs";
import { TiLocationArrow } from "react-icons/ti";
import { WiHumidity } from "react-icons/wi";
import { FaRadiation } from "react-icons/fa";
import { FaTemperatureHigh } from "react-icons/fa";
import Spining from "../Spining";
const Farmer = () => {
  const [data, setData] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [loading, setLoading] = useState(false);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setLatitude(latitude);
        setLongitude(longitude);
      });
    } else {
      console.error("Geolocation is not supported by this browser");
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchFarmerData = async () => {
    setLoading(true);
    try {
      const API_KEY = "b62881a963a640d2a94bcb7e626e4a7f";
      const url = `https://api.weatherbit.io/v2.0/forecast/agweather?key=${API_KEY}&lat=${latitude}&lon=${longitude}`;
      const response = await fetch(url);
      const responseData = await response.json();
      setData(responseData);
    } catch (error) {
      console.error("Error fetching farmer data:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (latitude !== null && longitude !== null) {
      fetchFarmerData();
    }
  }, [fetchFarmerData, latitude, longitude]);

  return (
    <div className="p-4">
      <div className="max-w-screen-lg mx-auto">
        <div className="flex items-center justify-center gap-4 mt-6">
          <input
            type="number"
            placeholder="Latitude"
            value={latitude || ""}
            onChange={(e) => setLatitude(e.target.value)}
            className="bg-black bg-opacity-30 placeholder:text-slate-100 text-lg p-2 rounded-md"
          />
          <input
            type="number"
            placeholder="Longitude"
            value={longitude || ""}
            onChange={(e) => setLongitude(e.target.value)}
            className="bg-black bg-opacity-30 placeholder:text-slate-100 text-lg p-2 rounded-md"
          />
          <div
            className="bg-black opacity-30 p-3 text-center rounded-full cursor-pointer"
            onClick={getUserLocation}
          >
            <TiLocationArrow className=" text-slate-50 text-xl" />
          </div>
        </div>

        {loading ? (
         <Spining/>
        ) : data ? (
          <div className="mt-8">
            <div className="grid grid-cols-2 gap-4">
              <WeatherCard
                iconUrl="https://cdn2.iconfinder.com/data/icons/gardening-caramel-vol-3/256/TEMPERATURE-512.png"
                value={`${data.data[0]?.soilt_0_10cm} cm`}
                label="Soil Temp"
              />
              <WeatherCard
                iconUrl="https://hometurf.ca/wp-content/uploads/2021/02/ht-soil-icon-500x500.png"
                value={`${data.data[0]?.soilm_0_10cm} cm`}
                label="Soil Moisture"
              />
            </div>

            <div className="grid grid-cols-4 gap-4 mt-8">
              <WeatherCard
                icon={<WiHumidity className="text-xl text-white" />}
                value={`${data.data[0]?.wind_10m_spd_avg} m/s`}
                label="Specific Humidity"
              />
              <WeatherCard
                icon={<BsWind className="text-xl text-white" />}
                value={`${data.data[0]?.wind_10m_spd_avg} m/s`}
                label="Wind Speed"
              />
              <WeatherCard
                icon={<FaRadiation className="text-xl text-white" />}
                value={`${data.data[0]?.dlwrf_net} W/m2`}
                label="Solar Radiation"
              />
              <WeatherCard
                icon={<FaTemperatureHigh className="text-xl text-white" />}
                value={`${data.data[0]?.skin_temp_max} mb`}
                label="Max Temp"
              />
            </div>
          </div>
        ) : (
          <p className="text-white text-center mt-8">Enter latitude and longitude to fetch data.</p>
        )}
      </div>
    </div>
  );
};

const WeatherCard = ({ icon, value, label }) => (
  <div className="bg-gray-800 p-4 rounded-lg flex flex-col justify-center items-center">
    {icon}
    <p className="text-xl text-slate-200">{label}</p>
    <p className="text-lg text-slate-300">{value}</p>
  </div>
);

export default Farmer;
