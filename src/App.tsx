import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import LocationSearch from "~pages/LocationSearch/LocationSearch";
import MultiWeather from "~pages/MultiWeather/MultiWeather";
import NotFoundPage from "~pages/NotFoundPage/NotFoundPage";
import PageLayout from "~pages/PageLayout/PageLayout";

const App = () => (
    <BrowserRouter>
        <Routes>
            <Route element={<PageLayout showActionButtons={false} />}> 
                <Route index element={<LocationSearch />} />
                <Route path="/404" element={<NotFoundPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Route>
            <Route element={<PageLayout showActionButtons={true} />}>
                <Route path="current" element={<MultiWeather />} />
            </Route>
        </Routes>
    </BrowserRouter>
);

export default App;
