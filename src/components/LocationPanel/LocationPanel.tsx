import * as React from "react";
import "./LocationPanel.css";

export type LocationPanelProps = {
    locationName: string;
    dateTime: string;
    currentTemp: string;
    conditionText: string;
    conditionIcon: string;
    maxTemp: string;
    minTemp: string;
}

const LocationPanel = (props: LocationPanelProps) => {
    return (
        <div className="location-panel">
            <img className="condition-icon" src={props.conditionIcon} />
            <h2 className="location-name">{props.locationName}</h2>
            <p>{props.dateTime}</p>
            <p>{props.currentTemp}</p>
            <p>{props.conditionText}</p>
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
