import * as React from "react";

export type LocationPanelProps = {
    locationName: string;
    dateTime: string;
    temperature: string;
    conditionText: string;
    conditionIcon: string;
}

const LocationPanel = (props: LocationPanelProps) => {
    return (
        <div className="location-panel">
            <img className="condition-icon" src={props.conditionIcon} />
            <h2 className="location-name">{props.locationName}</h2>
            <p>{props.dateTime}</p>
            <p>{props.temperature}</p>
            <p>{props.conditionText}</p>
        </div>
    );
};

export default LocationPanel;
