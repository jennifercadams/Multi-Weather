import * as React from "react";
import { Temp } from "~pages/MultiWeather/useMultiWeather";
import "./LocationPanel.css";

export type LocationPanelProps = {
    locationName: string;
    dateTime: string;
    currentTemp: Temp;
    conditionText: string;
    conditionIcon: string;
    maxTemp: string;
    minTemp: string;
}

const LocationPanel = (props: LocationPanelProps) => {
    return (
        <div className="location-panel">
            <h2 className="location-name">{props.locationName}</h2>
            <p className="location-time">{props.dateTime}</p>
            <div className="current">
                <div className="location-temp">
                    <p>{props.currentTemp.C}</p>
                    <p>{props.currentTemp.F}</p>
                </div>
                <div className="location-condition">
                    <img className="condition-icon" src={props.conditionIcon} />
                    <p>{props.conditionText}</p>
                </div>
            </div>
            <p>{`High: ${props.maxTemp}`}</p>
            <p>{`Low: ${props.minTemp}`}</p>
        </div>
    );
};

const LocationPanelPlaceholder = () => {
    return (
        <div className="location-panel">
            <div className="icon-placeholder placeholder" />
            <div className="name-placeholder placeholder" />
            <div className="text-placeholder placeholder" />
            <div className="text-placeholder placeholder" />
            <div className="text-placeholder placeholder" />
            <div className="text-placeholder placeholder" />
            <div className="text-placeholder placeholder" />
        </div>
    );
};

export { LocationPanel, LocationPanelPlaceholder };
