import * as React from "react";
import { Outlet } from "react-router";
import "./PageLayout.css";

const PageLayout = () => {
    return (
        <div id="page">
            <div id="header">
                <h1>MultiWeather</h1>
            </div>
            <Outlet />
            <div id="footer">
                <p id="weather-api-credit">Powered by <a href="https://www.weatherapi.com/" title="Weather API">WeatherAPI.com</a></p>
            </div>
        </div>
    );
};

export default PageLayout;
