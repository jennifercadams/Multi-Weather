import * as React from "react";
import { Temp } from "~pages/MultiWeather/useMultiWeather";
import "./LocationPanel.css";

export type LocationPanelProps = {
    locationName: string;
    dateTime: string;
    conditionText: string;
    conditionIcon: string;
    currentTemp: Temp;
    feelsLike: string;
    maxTemp: string;
    minTemp: string;
    willItRain: boolean;
    chanceOfRain: string;
    totalPrecip: string;
    willItSnow: boolean;
    chanceOfSnow: string;
    totalSnow: string;
}

const LocationPanel = (props: LocationPanelProps) => {
    return (
        <div className="location-panel">
            <h2 className="location-name">{props.locationName}</h2>
            <p className="location-time">{props.dateTime}</p>
            <div className="current">
                <img className="condition-icon" src={props.conditionIcon} />
                <div className="current-details">
                    <p className="condition-text">{props.conditionText}</p>
                    <div className="location-temp-container">
                        <p className="location-temp">{props.currentTemp.C}</p>
                        <p className="location-temp">{props.currentTemp.F}</p>
                    </div>
                    <p>
                        <span className="detail-label">Feels like</span>
                        <span className="detail-text">{props.feelsLike}</span>
                    </p>
                </div>
            </div>
            <p>
                <span className="detail-label">High</span>
                <span className="detail-text">{props.maxTemp}</span>
                <span className="detail-label">Low</span>
                <span className="detail-text">{props.minTemp}</span>
            </p>
            {props.willItRain && <p>
                    <span className="detail-label">Chance of rain</span>
                    <span className="detail-text">{props.chanceOfRain}</span>
                    <span className="detail-label">Total precipitation</span>
                    <span className="detail-text">{props.totalPrecip}</span>
            </p>}
            {props.willItSnow && <p>
                <span className="detail-label">Chance of snow</span>
                <span className="detail-text">{props.chanceOfSnow}</span>
                <span className="detail-label">Total snowfall</span>
                <span className="detail-text">{props.totalSnow}</span>
            </p>}
            {!props.willItRain && !props.willItSnow && <p className="detail-label">No precipitation</p>}
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
