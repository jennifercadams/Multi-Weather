import * as React from "react";
import { Outlet } from "react-router";
import usePageLayout from "./usePageLayout";
import "./PageLayout.css";

export type PageLayoutProps = {
    showActionButtons: boolean;
};

const PageLayout = ({showActionButtons}: PageLayoutProps) => {
    const {
        colorTheme,
        handleCopyToClipboard,
        handleSaveLocal,
        handleToggleTheme,
    } = usePageLayout();

    return (
        <div id="page">
            <div id="main">
                <div id="header">
                    <h1>MultiWeather</h1>
                    <div id="action-buttons">
                        {showActionButtons && <>
                            <button id="copy" className="icon-button" onClick={handleCopyToClipboard}>
                                <img className="icon-button-img" src={`/icons/copy-${colorTheme}.svg`} />
                            </button>
                            <button id="save" className="icon-button" onClick={handleSaveLocal}>
                                <img className="icon-button-img" src={`/icons/save-${colorTheme}.svg`} />
                            </button>
                        </>}
                        <button id="theme-toggle" title="Toggle Dark/Light Mode" onClick={handleToggleTheme}>
                            <div id="theme-toggle-bg" className={colorTheme} />
                            <img id="light-icon" className={colorTheme} src={`/icons/sun-light.svg`}></img>
                            <img id="dark-icon" className={colorTheme} src={`/icons/moon-dark.svg`}></img>
                            <div id="theme-toggle-slider" className={colorTheme} />
                        </button>
                    </div>
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
