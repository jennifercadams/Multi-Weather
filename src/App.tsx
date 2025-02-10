import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import LocationSearch from "~pages/LocationSearch/LocationSearch";
import MultiWeather from "~pages/MultiWeather/MultiWeather";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/Multi-Weather/">
        <Route index element={<LocationSearch />} />
        <Route path="current" element={<MultiWeather />} />
      </Route>
    </Routes>
    <p id="weather-api-credit">Powered by <a href="https://www.weatherapi.com/" title="Weather API">WeatherAPI.com</a></p>
  </BrowserRouter>
);

export default App;
