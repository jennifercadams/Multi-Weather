import * as React from "react";
import { HashRouter, Routes, Route } from "react-router";
import LocationSearch from "~pages/LocationSearch/LocationSearch";
import MultiWeather from "~pages/MultiWeather/MultiWeather";

const App = () => (
  <HashRouter>
    <Routes>
      <Route path="/">
        <Route index element={<LocationSearch />} />
        <Route path="current/*" element={<MultiWeather />} />
      </Route>
    </Routes>
    <p id="weather-api-credit">Powered by <a href="https://www.weatherapi.com/" title="Weather API">WeatherAPI.com</a></p>
  </HashRouter>
);

export default App;
