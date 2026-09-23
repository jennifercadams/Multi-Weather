import * as React from "react";
import { Link } from "react-router";
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
        handleLoadLocal,
    } = useMultiWeather();

    return (
        <div id="multi-weather">
            <p id="loading-message">
                <img className="icon" src={`/icons/warning-${colorTheme}.svg`} />
                Connecting to server. Loading may take up to a minute for the first request.
            </p>
            {!isLoading && locations != null && <div className="location-container">
                {locations.map((location, index) => {
                    const key = `LocationPanel${index}`;
                    const locationPanelProps = getLocationPanelProps(location);
                    return <LocationPanel key={key} {...locationPanelProps}/>;
                })}
            </div>}
            {isLoading && <div className="location-container">
                {locationNames.map((location, index) => {
                    const key = `LocationPanelPlaceholder${index}`;
                    const locationPanelPlaceholderProps = getLocationPanelPlaceholderProps(location);
                    return <LocationPanelPlaceholder key={key} {...locationPanelPlaceholderProps}/>;
                })}
            </div>}
            {!isLoading && (locationNames.length == 0 || locations == null) && <div className="no-locations">
                <h2>Oops!</h2>
                {locationNames.length == 0 ? <p className="text">No locations have been selected yet.</p> : 
                <p className="text">There was an error retrieving the requested weather data.</p>}
                <p className="text">Please return to the search page or load locations from local storage.</p>
                <div className="buttons">
                    <Link id="search-link" className="ui-button text-icon-button" to="/">
                        <img className="icon" src={`/icons/magnifying-glass-${colorTheme}.svg`} />
                        <p className="button-text">Search</p>
                    </Link>
                    <button id="load-button" className="text-icon-button" onClick={handleLoadLocal}>
                        <img className="icon" src={`/icons/folder-${colorTheme}.svg`} />
                        <p className="button-text">Load</p>
                    </button>
                </div>
            </div>}
        </div>
    );
};

export default MultiWeather;
