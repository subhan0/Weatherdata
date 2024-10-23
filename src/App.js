import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar";
import SearchWeatherData from "./Components/SearchWeatherData";
import UserWeatherData from "./Components/UserWeatherData";
import EventPlanner from "./Components/Tailor Design/EventPlanner";
import Farmer from "./Components/Tailor Design/Farmer";
import Travellers from "./Components/Tailor Design/Travellers";

function App() {
  return (
    <div className="min-h-screen w-full object-contain bg-gradient-to-r from-[#ff9103] to-[#3c49c0] m-0 p-0 box-border">
      <Navbar />
      <Routes>
        <Route path="/search" element={<SearchWeatherData />} />
        <Route path="/user" element={<UserWeatherData />} />
        <Route path="/eventplanner" element={<EventPlanner />} />
        <Route path="/farmer" element={<Farmer />} />
        <Route path="/travels" element={<Travellers />} />
      </Routes>
    </div>
  );
}

export default App;
