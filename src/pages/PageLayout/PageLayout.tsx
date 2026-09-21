import * as React from "react";
import { Outlet } from "react-router";
import usePageLayout from "./usePageLayout";
import "./PageLayout.css";

const PageLayout = () => {
    const {
        colorTheme,
        handleToggleTheme,
    } = usePageLayout();

    return (
        <div id="page">
            <div id="main">
                <div id="header">
                    <h1>MultiWeather</h1>
                    <button onClick={handleToggleTheme}>Dark / Light</button>
                </div>
                <Outlet context={[colorTheme]} />
            </div>
            <div id="footer">
                <p id="weather-api-credit">Powered by <a href="https://www.weatherapi.com/" title="Weather API">WeatherAPI.com</a></p>
            </div>
        </div>
    );
};

export default PageLayout;
