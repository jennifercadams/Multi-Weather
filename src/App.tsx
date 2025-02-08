import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import LocationSearch from "~pages/LocationSearch/LocationSearch";
import MultiWeather from "~pages/MultiWeather/MultiWeather";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/">
        <Route index element={<LocationSearch />} />
        <Route path="current" element={<MultiWeather />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
