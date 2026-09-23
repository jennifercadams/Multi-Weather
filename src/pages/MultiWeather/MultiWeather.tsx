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
            {!isLoading && locationNames.length == 0 && <div className="no-locations">
                <h2>Oops!</h2>
                <p>No locations have been selected yet.</p>
                <p>Please return to the <Link to="/">search page</Link> and try again.</p>
            </div>}
            {!isLoading && locations == null && <div className="no-locations">
                <h2>Oops!</h2>
                <p>There was an error retrieving the requested weather data.</p>
                <p>Please return to the <Link to="/">search page</Link> and try again.</p>
            </div>}
        </div>
    );
};

export default MultiWeather;
