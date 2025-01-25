import * as React from "react";
import { useEffect, useState } from "react";
import { WeatherApiClient, WeatherApiResponse } from "~services/WeatherApiClient";

type LocationPanelProps = {
    apiKey: string;
    locationQuery: string;
}

const LocationPanel = (props: LocationPanelProps) => {
    const weatherApiClient = new WeatherApiClient(props.apiKey);
    const [currentData, setCurrentData] = useState<WeatherApiResponse>();

    useEffect(() => {
        async function getCurrentData() {
            const data = await weatherApiClient.getCurrent(props.locationQuery);
            setCurrentData(data);
        }
        getCurrentData().then();
    }, []);

    return (
        <div className="location-panel">
            <img className="condition-icon" src={currentData?.conditionIcon} />
            <h2 className="location-name">{currentData?.locationName}</h2>
            <p>{currentData?.dateTime}</p>
            <p>{currentData?.temperature}</p>
            <p>{currentData?.conditionText}</p>
        </div>
    );
};

export default LocationPanel;
