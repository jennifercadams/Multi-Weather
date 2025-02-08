import * as React from "react";
import LocationPanel from "~components/LocationPanel";
import useMultiWeather from "./useMultiWeather";

const MultiWeather = () => {
    const {
        locations,
        getLocationPanelProps,
    } = useMultiWeather();

    return (
        <div id="multi-weather">
            <h1>MultiWeather</h1>
            {locations.map((location, index) => {
                const key = `LocationPanel${index}`;
                const locationPanelProps = getLocationPanelProps(location);
                return <LocationPanel key={key} {...locationPanelProps}/>;
            })}
        </div>
    );
};

export default MultiWeather;
