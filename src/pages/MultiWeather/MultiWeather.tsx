import * as React from "react";
import { LocationPanel, LocationPanelPlaceholder } from "~components/LocationPanel/LocationPanel";
import useMultiWeather from "./useMultiWeather";

const MultiWeather = () => {
    const {
        isLoading,
        locationNames,
        locations,
        getLocationPanelProps,
    } = useMultiWeather();

    return (
        <div id="multi-weather">
            <h1>MultiWeather</h1>
            {!isLoading ? locations.map((location, index) => {
                const key = `LocationPanel${index}`;
                const locationPanelProps = getLocationPanelProps(location);
                return <LocationPanel key={key} {...locationPanelProps}/>;
            }) :
            locationNames.map((_, index) => {
                const key = `LocationPanelPlaceholder${index}`;
                return <LocationPanelPlaceholder key={key} />;
            })}
        </div>
    );
};

export default MultiWeather;
