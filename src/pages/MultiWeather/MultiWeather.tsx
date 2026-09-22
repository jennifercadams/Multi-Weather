import * as React from "react";
import { LocationPanel, LocationPanelPlaceholder } from "~components/LocationPanel/LocationPanel";
import useMultiWeather from "./useMultiWeather";
import "./MultiWeather.css";

const MultiWeather = () => {
    const {
        colorTheme,
        isLoading,
        locationNames,
        locations,
        getLocationPanelProps,
        getLocationPanelPlaceholderProps,
    } = useMultiWeather();

    return (
        <div id="multi-weather">
            <p id="loading-message">
                <img className="icon" src={`/icons/warning-${colorTheme}.svg`} />
                Connecting to server. Loading may take up to a minute for the first request.
            </p>
            <div id="location-container">
                {!isLoading ? locations.map((location, index) => {
                    const key = `LocationPanel${index}`;
                    const locationPanelProps = getLocationPanelProps(location);
                    return <LocationPanel key={key} {...locationPanelProps}/>;
                }) :
                locationNames.map((location, index) => {
                    const key = `LocationPanelPlaceholder${index}`;
                    const locationPanelPlaceholderProps = getLocationPanelPlaceholderProps(location);
                    return <LocationPanelPlaceholder key={key} {...locationPanelPlaceholderProps}/>;
                })}
            </div>
        </div>
    );
};

export default MultiWeather;
