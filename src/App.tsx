import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import LocationSearch from "~components/LocationSearch";
import MultiWeather from "~components/MultiWeather";

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
